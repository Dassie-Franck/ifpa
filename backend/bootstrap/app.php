<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
         api: __DIR__.'/../routes/api.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
    $middleware->alias([
        'cache.api' => \App\Http\Middleware\CacheApiResponse::class,
    ]);

    $middleware->append(\App\Http\Middleware\SecurityHeaders::class);
})
  ->withExceptions(function (Exceptions $exceptions) {
    $exceptions->render(function (\Illuminate\Auth\AuthenticationException $e, $request) {
        if ($request->is('api/*') || $request->expectsJson()) {
            return response()->json([
                'message' => 'Non authentifié.',
            ], 401);
        }
    });
})->create();
