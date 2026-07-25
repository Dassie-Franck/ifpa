<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CampusResource;
use App\Models\Campus;

class CampusController extends Controller
{
    public function index()
    {
        return CampusResource::collection(
            Campus::where('actif', true)->orderBy('ordre')->get()
        );
    }

    public function show(string $slug)
    {
        return new CampusResource(
            Campus::where('slug', $slug)->where('actif', true)->firstOrFail()
        );
    }
}
