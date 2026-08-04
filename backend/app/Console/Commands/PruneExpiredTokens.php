<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Laravel\Sanctum\PersonalAccessToken;

class PruneExpiredTokens extends Command
{
    protected $signature = 'sanctum:prune-expired-custom';
    protected $description = 'Supprime les tokens Sanctum expirés';

    public function handle(): int
    {
        $expirationMinutes = config('sanctum.expiration');

        if (! $expirationMinutes) {
            $this->info('Aucune expiration configurée — rien à purger.');
            return self::SUCCESS;
        }

        $supprimes = PersonalAccessToken::where('created_at', '<', now()->subMinutes($expirationMinutes))->delete();

        $this->info("{$supprimes} token(s) expiré(s) supprimé(s).");
        return self::SUCCESS;
    }
}
