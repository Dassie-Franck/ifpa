<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CandidatureDocument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DocumentAccessController extends Controller
{
    /**
     * Sert un document de candidature de façon contrôlée :
     * - le candidat propriétaire du dossier peut le voir (via son compte)
     * - un agent/admin authentifié sur Filament peut le voir
     * - personne d'autre, même avec l'URL exacte, ne peut y accéder
     */
    public function voir(Request $request, CandidatureDocument $document)
    {
        $candidature = $document->candidature;
        $user = $request->user(); // via Sanctum, peut être null si non connecté

        $estProprietaire = $user && $candidature->user_id === $user->id;
        $estPersonnelInterne = $user && in_array($user->role, ['admin', 'agent_admissions', 'gestionnaire_contenu'], true);

        if (! $estProprietaire && ! $estPersonnelInterne) {
            abort(403, "Vous n'êtes pas autorisé à consulter ce document.");
        }

        if (! Storage::disk('candidatures')->exists($document->fichier)) {
            abort(404, 'Fichier introuvable.');
        }

        return Storage::disk('candidatures')->response($document->fichier, $document->nom_original);
    }
}
