<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DocumentInstitutionnel;

class DocumentInstitutionnelController extends Controller
{
    public function show()
    {
        $document = DocumentInstitutionnel::instance();

        return response()->json([
            'fiche_inscription_vierge' => $document->fiche_inscription_vierge
                ? asset('storage/' . $document->fiche_inscription_vierge)
                : null,
            'fiche_inscription_modele' => $document->fiche_inscription_modele
                ? asset('storage/' . $document->fiche_inscription_modele)
                : null,
        ]);
    }
}
