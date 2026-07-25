<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\EvenementResource;
use App\Models\Evenement;

class EvenementController extends Controller
{
    public function index()
    {
        return EvenementResource::collection(
            Evenement::with('campus')
                ->where('actif', true)
                ->where('date_debut', '>=', now())
                ->orderBy('date_debut')
                ->get()
        );
    }

    public function show(string $slug)
    {
        return new EvenementResource(
            Evenement::with('campus')->where('slug', $slug)->firstOrFail()
        );
    }
}
