<?php

namespace App\Providers;

use App\Models\CandidatureDocument;
use App\Observers\CandidatureDocumentObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        CandidatureDocument::observe(CandidatureDocumentObserver::class);
    }
}
