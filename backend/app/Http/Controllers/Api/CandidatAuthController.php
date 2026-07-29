<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

class CandidatAuthController extends Controller
{
    private const MAX_TENTATIVES = 5;
    private const DUREE_VERROUILLAGE_MINUTES = 15;

    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => ['required', 'confirmed', Password::min(8)],
            // Honeypot — voir étape 2, champ 'website' doit rester vide
            'website' => 'prohibited',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'candidat',
        ]);

        $token = $user->createToken('candidat-token')->plainTextToken;

        return response()->json([
            'user' => ['id' => $user->id, 'name' => $user->name, 'email' => $user->email],
            'token' => $token,
        ], 201);
    }

    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'website' => 'prohibited', // honeypot
        ]);

        // Un seul compte candidat par email garanti par la contrainte unique en base —
        // first() est désormais fiable, mais on garde une vérification défensive.
        $user = User::where('email', $validated['email'])
            ->where('role', 'candidat')
            ->first();

        if (! $user) {
            throw ValidationException::withMessages(['email' => ['Identifiants incorrects.']]);
        }

        // Vérifie si le compte est actuellement verrouillé
        if ($user->verrouille_jusqu_a && $user->verrouille_jusqu_a->isFuture()) {
            $minutesRestantes = now()->diffInMinutes($user->verrouille_jusqu_a);
            throw ValidationException::withMessages([
                'email' => ["Compte temporairement verrouillé suite à plusieurs échecs. Réessayez dans {$minutesRestantes} minute(s)."],
            ]);
        }

        if (! Hash::check($validated['password'], $user->password)) {
            $user->increment('tentatives_echouees');

            if ($user->tentatives_echouees >= self::MAX_TENTATIVES) {
                $user->update([
                    'verrouille_jusqu_a' => now()->addMinutes(self::DUREE_VERROUILLAGE_MINUTES),
                    'tentatives_echouees' => 0,
                ]);

                throw ValidationException::withMessages([
                    'email' => ['Trop de tentatives échouées. Compte verrouillé ' . self::DUREE_VERROUILLAGE_MINUTES . ' minutes.'],
                ]);
            }

            throw ValidationException::withMessages(['email' => ['Identifiants incorrects.']]);
        }

        // Connexion réussie : réinitialiser le compteur
        $user->update(['tentatives_echouees' => 0, 'verrouille_jusqu_a' => null]);

        $token = $user->createToken('candidat-token')->plainTextToken;

        return response()->json([
            'user' => ['id' => $user->id, 'name' => $user->name, 'email' => $user->email],
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Déconnecté avec succès.']);
    }

    public function me(Request $request)
    {
        return response()->json($request->user());
    }
}
