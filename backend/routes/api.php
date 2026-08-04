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
use App\Http\Controllers\Api\DocumentAccessController;

Route::prefix('v1')->group(function () {

    // =========================================================
    // 1. GROUPE CACHE LONG (600 secondes) - Faible variation
    // =========================================================
    Route::middleware('cache.api:600')->group(function () {
        Route::get('filieres', [FiliereController::class, 'index']);
        Route::get('filieres/{slug}', [FiliereController::class, 'show']);

        Route::get('campus', [CampusController::class, 'index']);
        Route::get('campus/{slug}', [CampusController::class, 'show']);

        Route::get('equipe', [MembreEquipeController::class, 'index']);
        Route::get('partenaires', [PartenaireController::class, 'index']);
        Route::get('partenariats-stages', [PartenariatController::class, 'index']);
        Route::get('documents-institutionnels', [DocumentInstitutionnelController::class, 'show']);
    });

    // =========================================================
    // 2. GROUPE CACHE MOYEN (120 secondes) - Variation modérée
    // =========================================================
    Route::middleware('cache.api:120')->group(function () {
        Route::get('actualites', [ActualiteController::class, 'index']);
        Route::get('actualites/{slug}', [ActualiteController::class, 'show']);

        Route::get('evenements', [EvenementController::class, 'index']);
        Route::get('evenements/{slug}', [EvenementController::class, 'show']);

        Route::get('galerie', [GalerieController::class, 'index']);
        Route::get('temoignages', [TemoignageController::class, 'index']);
        Route::get('espace-presse', [EspacePresseController::class, 'index']);
    });

    // =========================================================
    // 3. ROUTES NON MISES EN CACHE (POST, AUTH, TÉLÉCHARGEMENTS...)
    // =========================================================

    // Inscription à un événement (POST) - exclus du cache GET
    Route::post('evenements/{evenement}/inscription', [EventRegistrationController::class, 'store']);

    // Routes avec limiteurs de débit (throttle)
    Route::post('contact', [ContactController::class, 'store'])->middleware('throttle:contact');
    Route::post('newsletter/abonner', [NewsletterController::class, 'store'])->middleware('throttle:contact');
    Route::post('candidatures', [CandidatureController::class, 'store'])->middleware('throttle:candidature');

    // Suivi de candidature (token dynamique) - exclus du cache
    Route::get('candidatures/suivi/{token}', [CandidatureController::class, 'suivi']);

    // Document sécurisé (authentification requise) - exclus du cache
    Route::middleware('auth:sanctum')->get(
        'documents/{document}/voir',
        [DocumentAccessController::class, 'voir']
    );

    // =========================================================
    // 4. GROUPE CANDIDAT (AUTH)
    // =========================================================
    Route::prefix('candidat')->group(function () {

        // Inscription / Connexion avec limiteurs
        Route::post('register', [CandidatAuthController::class, 'register'])->middleware('throttle:register');
        Route::post('login', [CandidatAuthController::class, 'login'])->middleware('throttle:login');

        // Routes protégées par Sanctum
        Route::middleware('auth:sanctum')->group(function () {
            Route::post('logout', [CandidatAuthController::class, 'logout']);
            Route::get('me', [CandidatAuthController::class, 'me']);
            Route::get('mes-candidatures', [CandidatureController::class, 'mesCandidatures']);
            Route::post('candidatures/{candidature}/resoumettre', [CandidatureController::class, 'resoumettre']);
            Route::post('candidatures/lier', [CandidatureController::class, 'lier']);
        });
    });

    // Téléchargement du PDF (génération dynamique) - exclus du cache
    Route::get('candidatures/suivi/{token}/fiche-pdf', [FicheInscriptionController::class, 'telecharger']);
});
