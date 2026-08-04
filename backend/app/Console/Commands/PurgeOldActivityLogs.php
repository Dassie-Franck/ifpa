<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Spatie\Activitylog\Models\Activity;

class PurgeOldActivityLogs extends Command
{
    protected $signature = 'activitylog:purge-custom';
    protected $description = 'Supprime les logs d\'activité de plus de 12 mois';

    public function handle(): int
    {
        $supprimes = Activity::where('created_at', '<', now()->subMonths(12))->delete();
        $this->info("{$supprimes} entrée(s) de log supprimée(s).");
        return self::SUCCESS;
    }
}
