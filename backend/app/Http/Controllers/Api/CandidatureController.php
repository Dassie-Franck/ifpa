<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCandidatureRequest;
use App\Models\Candidature;
use App\Models\CandidatureDocument;
use Illuminate\Http\Request;
use App\Notifications\DossierResoumisNotification;
use App\Models\User;
class CandidatureController extends Controller
{
    /**
     * Crée le dossier de candidature + upload des documents.
     * Statut initial : "soumis" — en attente d'étude par l'équipe admissions.
     */
    public function store(StoreCandidatureRequest $request)
    {
    logger()->info('DEBUG CANDIDATURE', [
    'user' => $request->user(),
    'user_id' => optional($request->user())->id,
    'auth_check' => auth()->check(),
    'authorization' => $request->header('Authorization'),
]);
        $validated = $request->validated();

        $candidature = Candidature::create([
    'user_id' => auth('sanctum')->id(),
    'nom' => $validated['nom'],
    'prenom' => $validated['prenom'],
    'date_naissance' => $validated['date_naissance'] ?? null,
            'sexe' => $validated['sexe'] ?? null,
            'email' => $validated['email'],
            'telephone' => $validated['telephone'],
            'adresse' => $validated['adresse'] ?? null,
            'niveau_etudes' => $validated['niveau_etudes'] ?? null,
            'filiere_id' => $validated['filiere_id'],
            'campus_id' => $validated['campus_id'] ?? null,
            'statut' => 'soumis',
        ]);

        $documentsMap = [
            'photo_identite' => 'photo_identite',
            'acte_naissance' => 'acte_naissance',
            'diplome' => 'diplome',
            'certificat_medical' => 'certificat_medical',
        ];

        foreach ($documentsMap as $inputName => $type) {
            if ($request->hasFile($inputName)) {
                $file = $request->file($inputName);
                $path = $file->store('candidatures/documents', 'public');

                CandidatureDocument::create([
                    'candidature_id' => $candidature->id,
                    'type' => $type,
                    'fichier' => $path,
                    'nom_original' => $file->getClientOriginalName(),
                ]);
            }
        }

        $photoDoc = $candidature->documents()->where('type', 'photo_identite')->first();
        if ($photoDoc) {
            $candidature->update(['photo_identite' => $photoDoc->fichier]);
        }

        // TODO : accusé de réception email/WhatsApp

        return response()->json([
            'message' => 'Votre dossier a bien été transmis à l\'administration.',
            'candidature' => [
                'id' => $candidature->id,
                'reference' => $candidature->reference,
                'token_suivi' => $candidature->token_suivi,
            ],
        ], 201);
    }

    public function suivi(string $token)
    {
        $candidature = Candidature::where('token_suivi', $token)
            ->with(['filiere', 'campus', 'paiements'])
            ->firstOrFail();

        return response()->json([
            'reference' => $candidature->reference,
            'nom' => $candidature->nom,
            'prenom' => $candidature->prenom,
            'filiere' => $candidature->filiere->titre,
            'statut' => $candidature->statut,
            'motif_rejet' => $candidature->motif_rejet,
            'date_limite_paiement' => $candidature->date_limite_paiement,
            'dossier_complet' => $candidature->dossier_complet,
            'dernier_paiement' => $candidature->paiements->last()?->statut,
        ]);
    }

public function mesCandidatures(Request $request)
{
    $candidatures = $request->user()
        ->candidatures()
        ->with(['filiere', 'documents'])
        ->orderByDesc('created_at')
        ->get();

    return response()->json(
        $candidatures->map(fn ($c) => [
            'id' => $c->id,
            'reference' => $c->reference,
            'filiere' => $c->filiere->titre,
            'statut' => $c->statut,
            'motif_rejet' => $c->motif_rejet,
            'token_suivi' => $c->token_suivi,
            'date_limite_paiement' => $c->date_limite_paiement,
            'created_at' => $c->created_at,
            'documents' => $c->documents->map(fn ($d) => [
                'id' => $d->id,
                'type' => $d->type,
                'valide' => $d->valide,
            ]),
        ])
    );
}

/**
 * Permet au candidat de remplacer les documents invalides d'un dossier rejeté
 * et de le renvoyer dans la file d'étude de l'équipe admissions.
 */
public function resoumettre(Request $request, Candidature $candidature)
{
    // Sécurité : seul le propriétaire du dossier peut le corriger
    if ($candidature->user_id !== $request->user()->id) {
        abort(403, 'Vous n\'êtes pas autorisé à modifier ce dossier.');
    }

    if ($candidature->statut !== 'rejete') {
        return response()->json([
            'message' => 'Seul un dossier rejeté peut être renvoyé.',
        ], 422);
    }

    $validated = $request->validate([
        'photo_identite' => 'nullable|file|image|max:5120',
        'acte_naissance' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
        'diplome' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
        'certificat_medical' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
    ]);

    foreach ($validated as $type => $file) {
        if ($file) {
            // Supprime l'ancien document invalide de ce type et le remplace
            $ancien = $candidature->documents()->where('type', $type)->first();
            if ($ancien) {
                \Storage::disk('public')->delete($ancien->fichier);
                $ancien->delete();
            }

            $path = $file->store('candidatures/documents', 'public');
            $candidature->documents()->create([
                'type' => $type,
                'fichier' => $path,
                'nom_original' => $file->getClientOriginalName(),
                'valide' => null, // à réévaluer par l'agent
            ]);
        }
    }

    $candidature->update([
        'statut' => 'soumis',
        'motif_rejet' => null,
    ]);

    // TODO (optionnel) : notification interne à l'agent qu'un dossier corrigé est de retour
        $agents = User::whereIn('role', ['admin', 'agent_admissions'])->get();
foreach ($agents as $agent) {
    $agent->notify(new DossierResoumisNotification($candidature->fresh()));
};
    return response()->json(['message' => 'Votre dossier corrigé a bien été renvoyé.']);
}

/**
 * Permet à un candidat connecté de rattacher à son compte une candidature
 * déposée avant la création de ce compte (via la référence du dossier).
 * Sécurité : l'email du dossier doit correspondre à celui du compte connecté,
 * pour éviter qu'un candidat s'approprie le dossier de quelqu'un d'autre.
 */
public function lier(Request $request)
{
    $validated = $request->validate([
        'reference' => 'required|string|exists:candidatures,reference',
    ]);

    $candidature = Candidature::where('reference', $validated['reference'])->firstOrFail();

    if ($candidature->user_id !== null && $candidature->user_id !== $request->user()->id) {
        return response()->json([
            'message' => 'Ce dossier est déjà rattaché à un autre compte.',
        ], 422);
    }

    if (strcasecmp($candidature->email, $request->user()->email) !== 0) {
        return response()->json([
            'message' => "L'email associé à ce dossier ne correspond pas à celui de votre compte.",
        ], 422);
    }

    $candidature->update(['user_id' => $request->user()->id]);

    return response()->json([
        'message' => 'Votre dossier a bien été rattaché à votre compte.',
        'candidature' => [
            'id' => $candidature->id,
            'reference' => $candidature->reference,
            'filiere' => $candidature->filiere->titre,
            'statut' => $candidature->statut,
        ],
    ]);
}
}
