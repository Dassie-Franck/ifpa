<?php

namespace App\Providers;

use App\Models\CandidatureDocument;
use App\Observers\CandidatureDocumentObserver;
use Illuminate\Support\ServiceProvider;
use App\Models\Filiere;
use App\Models\Campus;
use App\Models\Actualite;
use App\Models\Evenement;
use App\Models\Temoignage;
use App\Models\Partenaire;
use App\Models\Partenariat;
use App\Models\GalerieItem;
use App\Models\MembreEquipe;
use App\Models\DocumentInstitutionnel;
use App\Observers\ClearApiCacheObserver;

class AppServiceProvider extends ServiceProvider
{
    public function boot(): void
{
    CandidatureDocument::observe(CandidatureDocumentObserver::class);

    // Invalidation automatique du cache API à chaque modification de contenu public
    Filiere::observe(ClearApiCacheObserver::class);
    Campus::observe(ClearApiCacheObserver::class);
    Actualite::observe(ClearApiCacheObserver::class);
    Evenement::observe(ClearApiCacheObserver::class);
    Temoignage::observe(ClearApiCacheObserver::class);
    Partenaire::observe(ClearApiCacheObserver::class);
    Partenariat::observe(ClearApiCacheObserver::class);
    GalerieItem::observe(ClearApiCacheObserver::class);
    MembreEquipe::observe(ClearApiCacheObserver::class);
    DocumentInstitutionnel::observe(ClearApiCacheObserver::class);
}
}
