<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\MembreEquipeResource;
use App\Models\MembreEquipe;

class MembreEquipeController extends Controller
{
    public function index()
    {
        return MembreEquipeResource::collection(
            MembreEquipe::where('actif', true)->orderBy('ordre')->get()
        );
    }
}
