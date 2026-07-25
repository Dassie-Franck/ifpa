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

    Route::post('contact', [ContactController::class, 'store']);
    Route::post('newsletter/abonner', [NewsletterController::class, 'store']);
    Route::post('candidatures', [CandidatureController::class, 'store']);
Route::get('candidatures/suivi/{token}', [CandidatureController::class, 'suivi']);

Route::prefix('candidat')->group(function () {
    Route::post('register', [CandidatAuthController::class, 'register']);
    Route::post('login', [CandidatAuthController::class, 'login']);

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



});

