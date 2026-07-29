<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Evenement;
use Illuminate\Http\Request;

class EspacePresseController extends Controller
{
    public function index(Request $request)
    {
        $query = Evenement::where('visible_presse', true)
            ->where('actif', true)
            ->with('campus')
            ->orderByDesc('date_debut');

        if ($request->filled('type')) {
            $query->where('type_communique', $request->input('type'));
        }

        return $query->get()->map(fn ($e) => [
            'id' => $e->id,
            'titre' => $e->titre,
            'slug' => $e->slug,
            'description' => $e->description,
            'type_communique' => $e->type_communique,
            'date_debut' => $e->date_debut?->format('Y-m-d H:i'),
            'lieu' => $e->lieu,
            'campus' => $e->campus?->nom,
            'image_couverture' => $e->image_couverture ? asset('storage/' . $e->image_couverture) : null,
        ]);
    }
}
