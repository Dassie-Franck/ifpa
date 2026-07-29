<?php

use App\Http\Controllers\Api\ActualiteController;
use App\Http\Controllers\Api\CampusController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\EvenementController;
use App\Http\Controllers\Api\EventRegistrationController;
use App\Http\Controllers\Api\FiliereController;
use App\Http\Controllers\Api\GalerieController;
use App\Http\Controllers\Api\MembreEquipeController;
use App\Http\Controllers\Api\NewsletterController;
use App\Http\Controllers\Api\PartenaireController;
use App\Http\Controllers\Api\TemoignageController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CandidatureController;
use App\Http\Controllers\Api\CandidatAuthController;
use App\Http\Controllers\Api\FicheInscriptionController;
use App\Http\Controllers\Api\EspacePresseController;
use App\Http\Controllers\Api\PartenariatController;
use App\Http\Controllers\Api\DocumentInstitutionnelController;

Route::prefix('v1')->group(function () {
    Route::get('filieres', [FiliereController::class, 'index']);
    Route::get('filieres/{slug}', [FiliereController::class, 'show']);

    Route::get('campus', [CampusController::class, 'index']);
    Route::get('campus/{slug}', [CampusController::class, 'show']);

    Route::get('actualites', [ActualiteController::class, 'index']);
    Route::get('actualites/{slug}', [ActualiteController::class, 'show']);

    Route::get('evenements', [EvenementController::class, 'index']);
    Route::get('evenements/{slug}', [EvenementController::class, 'show']);
    Route::post('evenements/{evenement}/inscription', [EventRegistrationController::class, 'store']);

    Route::get('temoignages', [TemoignageController::class, 'index']);
    Route::get('partenaires', [PartenaireController::class, 'index']);
    Route::get('galerie', [GalerieController::class, 'index']);
    Route::get('equipe', [MembreEquipeController::class, 'index']);

    // ========== ROUTES AVEC LIMITEURS AJOUTÉS ==========
    Route::post('contact', [ContactController::class, 'store'])->middleware('throttle:contact');
    Route::post('newsletter/abonner', [NewsletterController::class, 'store'])->middleware('throttle:contact');
    Route::post('candidatures', [CandidatureController::class, 'store'])->middleware('throttle:candidature');
    // ===================================================

    Route::get('candidatures/suivi/{token}', [CandidatureController::class, 'suivi']);

    Route::prefix('candidat')->group(function () {
        // ========== ROUTES AVEC LIMITEURS AJOUTÉS ==========
        Route::post('register', [CandidatAuthController::class, 'register'])->middleware('throttle:register');
        Route::post('login', [CandidatAuthController::class, 'login'])->middleware('throttle:login');
        // ===================================================

        Route::middleware('auth:sanctum')->group(function () {
            Route::post('logout', [CandidatAuthController::class, 'logout']);
            Route::get('me', [CandidatAuthController::class, 'me']);
        });

        Route::middleware('auth:sanctum')->group(function () {
            Route::post('logout', [CandidatAuthController::class, 'logout']);
            Route::get('me', [CandidatAuthController::class, 'me']);
            Route::get('mes-candidatures', [CandidatureController::class, 'mesCandidatures']);
            Route::post('candidatures/{candidature}/resoumettre', [CandidatureController::class, 'resoumettre']);
            Route::post('candidatures/lier', [CandidatureController::class, 'lier']);
        });
    });

    Route::get('documents-institutionnels', [DocumentInstitutionnelController::class, 'show']);
    Route::get('partenariats-stages', [PartenariatController::class, 'index']);

    Route::get('espace-presse', [EspacePresseController::class, 'index']);
    Route::get('candidatures/suivi/{token}/fiche-pdf', [FicheInscriptionController::class, 'telecharger']);
});
