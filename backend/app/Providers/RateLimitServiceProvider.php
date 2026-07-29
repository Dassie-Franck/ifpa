<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class RateLimitServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        // Connexion : strict, par IP + email combinés (évite de bloquer tout un cybercafé
        // à cause d'un seul utilisateur qui se trompe de mot de passe)
        RateLimiter::for('login', function ($request) {
            return Limit::perMinute(5)->by($request->ip() . '|' . $request->input('email'));
        });

        // Inscription : évite la création en masse de faux comptes
        RateLimiter::for('register', function ($request) {
            return Limit::perMinute(3)->by($request->ip());
        });

        // Dépôt de candidature : généreux mais pas illimité (un candidat légitime
        // peut vouloir corriger et renvoyer plusieurs fois)
        RateLimiter::for('candidature', function ($request) {
            return Limit::perMinute(3)->by($request->ip());
        });

        // Formulaire de contact / newsletter : anti-spam
        RateLimiter::for('contact', function ($request) {
            return Limit::perMinute(3)->by($request->ip());
        });

        // API générale de lecture : souple
        RateLimiter::for('api', function ($request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });
    }
}
