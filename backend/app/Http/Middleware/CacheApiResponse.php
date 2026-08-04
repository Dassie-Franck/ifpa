<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class CacheApiResponse
{
    /**
     * Met en cache la réponse JSON d'un endpoint public en lecture seule,
     * pour éviter de recalculer/requêter la base à chaque appel identique.
     */
    public function handle(Request $request, Closure $next, int $secondes = 300)
    {
        // Ne jamais cacher si l'utilisateur est authentifié (contenu potentiellement personnalisé)
        if ($request->user()) {
            return $next($request);
        }

        $cleCache = 'api_cache_' . md5($request->fullUrl());

        if (Cache::has($cleCache)) {
            return response(Cache::get($cleCache))
                ->header('Content-Type', 'application/json')
                ->header('X-Cache', 'HIT');
        }

        $response = $next($request);

        if ($response->getStatusCode() === 200) {
            Cache::put($cleCache, $response->getContent(), $secondes);
        }

        return $response->header('X-Cache', 'MISS');
    }
}
