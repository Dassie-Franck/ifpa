<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PartenaireResource;
use App\Models\Partenaire;

class PartenaireController extends Controller
{
    public function index()
{
    return PartenaireResource::collection(
        Partenaire::where('actif', true)->orderBy('ordre')->paginate(20)
    );
}
}
