<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Candidature;
use Barryvdh\DomPDF\Facade\Pdf;

class FicheInscriptionController extends Controller
{
    /**
     * Génère et télécharge la fiche d'inscription en PDF pour une candidature donnée,
     * accessible via son token de suivi (pas besoin d'être connecté).
     */
    public function telecharger(string $token)
    {
        $candidature = Candidature::where('token_suivi', $token)
            ->with(['filiere', 'campus', 'documents'])
            ->firstOrFail();

        $pdf = Pdf::loadView('pdf.fiche-inscription', [
    'candidature' => $candidature,
    'photoAbsolutePath' => $candidature->photo_identite
        ? \Storage::disk('candidatures')->path($candidature->photo_identite)
        : null,
])->setPaper('a4', 'portrait');

        $nomFichier = 'Fiche_Inscription_' . $candidature->reference . '.pdf';

        return $pdf->download($nomFichier);
    }
}
