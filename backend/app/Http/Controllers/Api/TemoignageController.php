<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TemoignageResource;
use App\Models\Temoignage;

class TemoignageController extends Controller
{
    public function index()
    {
        return TemoignageResource::collection(
            Temoignage::with('filiere')->where('actif', true)->orderBy('ordre')->get()
        );
    }
}
