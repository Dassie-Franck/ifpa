<?php

namespace App\Http\Requests\Concerns;

trait HasHoneypot
{
    /**
     * Règle de validation à fusionner dans rules() de chaque FormRequest concerné.
     * Le champ 'website' ne doit JAMAIS être rempli par un humain (il est caché en CSS
     * côté frontend) — s'il l'est, la requête vient très probablement d'un bot.
     */
    protected function honeypotRules(): array
    {
        return [
        'website' => 'nullable|string|max:0', // autorise vide ou absent, rejette si rempli
    ];
    }
}
