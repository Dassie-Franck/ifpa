<?php

namespace App\Observers;

use App\Models\CandidatureDocument;

class CandidatureDocumentObserver
{
    // Pièces requises pour toute candidature (version simple, cf. décision prise ensemble)
   private const PIECES_REQUISES = [
    'demande_manuscrite',
    'diplome_releve_notes',
    'acte_naissance',
    'carte_identite',
    'photo_identite',
];

    public function created(CandidatureDocument $document): void
    {
        $this->recalculerDossierComplet($document);
    }

    public function deleted(CandidatureDocument $document): void
    {
        $this->recalculerDossierComplet($document);
    }

    private function recalculerDossierComplet(CandidatureDocument $document): void
    {
        $candidature = $document->candidature;

        if (! $candidature) {
            return;
        }

        $typesPresents = $candidature->documents()->pluck('type')->unique()->toArray();

        $complet = empty(array_diff(self::PIECES_REQUISES, $typesPresents));

        $candidature->update(['dossier_complet' => $complet]);
    }
}
