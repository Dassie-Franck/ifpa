<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ActualiteResource;
use App\Models\Actualite;

class ActualiteController extends Controller
{
    public function index()
    {
        return ActualiteResource::collection(
            Actualite::where('publie', true)
                ->orderByDesc('date_publication')
                ->paginate(9)
        );
    }

    public function show(string $slug)
    {
        return new ActualiteResource(
            Actualite::where('slug', $slug)->where('publie', true)->firstOrFail()
        );
    }
}
