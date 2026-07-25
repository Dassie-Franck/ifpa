<?php

namespace App\Console\Commands;

use App\Models\Candidature;
use App\Services\NotificationService;
use Illuminate\Console\Command;

class ExpireCandidaturesSansPaiement extends Command
{
    protected $signature = 'candidatures:expirer';

    protected $description = 'Fait passer au statut "expiré" les dossiers validés dont le délai de paiement est dépassé';

    public function handle(NotificationService $notifications): int
    {
        $candidatures = Candidature::where('statut', 'dossier_valide')
            ->where('date_limite_paiement', '<', now())
            ->get();

        if ($candidatures->isEmpty()) {
            $this->info('Aucun dossier à expirer.');
            return self::SUCCESS;
        }

        foreach ($candidatures as $candidature) {
            $candidature->update(['statut' => 'expire']);

            $this->line("Dossier expiré : {$candidature->reference} ({$candidature->nom} {$candidature->prenom})");

            // TODO (optionnel) : notifier le candidat que son délai est dépassé
        }

        $this->info("{$candidatures->count()} dossier(s) expiré(s).");

        return self::SUCCESS;
    }
}
