<?php

namespace App\Observers;

use Illuminate\Support\Facades\Cache;

class ClearApiCacheObserver
{
    /**
     * Vide tout le cache API dès qu'un contenu est créé/modifié/supprimé.
     * Approche simple et sûre : mieux vaut un cache vidé un peu trop souvent
     * qu'un contenu obsolète affiché aux visiteurs.
     */
    public function saved($model): void
    {
        $this->clearCache();
    }

    public function deleted($model): void
    {
        $this->clearCache();
    }

    private function clearCache(): void
    {
        Cache::flush();
    }
}
