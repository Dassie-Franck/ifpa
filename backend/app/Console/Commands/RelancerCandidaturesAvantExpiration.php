<?php

namespace App\Console\Commands;

use App\Models\Candidature;
use App\Services\NotificationService;
use Illuminate\Console\Command;

class RelancerCandidaturesAvantExpiration extends Command
{
    protected $signature = 'candidatures:relancer';

    protected $description = 'Envoie un rappel aux candidats dont le délai de paiement expire dans moins de 12h';

    public function handle(NotificationService $notifications): int
    {
        $candidatures = Candidature::where('statut', 'dossier_valide')
            ->whereBetween('date_limite_paiement', [now(), now()->addHours(12)])
            ->whereNull('relance_envoyee_le')
            ->get();

        foreach ($candidatures as $candidature) {
            $notifications->notifierRelancePaiement($candidature);
            $candidature->update(['relance_envoyee_le' => now()]);

            $this->line("Relance envoyée : {$candidature->reference} ({$candidature->email})");
        }

        $this->info("{$candidatures->count()} relance(s) envoyée(s).");

        return self::SUCCESS;
    }
}
