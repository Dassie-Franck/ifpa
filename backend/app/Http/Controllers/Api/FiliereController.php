<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FiliereResource;
use App\Models\Filiere;
use Illuminate\Http\Request;

class FiliereController extends Controller
{
   public function index(Request $request)
{
    $query = Filiere::query()->where('actif', true)->orderBy('ordre');

    if ($request->filled('search')) {
        $query->where('titre', 'like', '%' . $request->input('search') . '%');
    }

    return FiliereResource::collection($query->paginate(20));
}

    public function show(string $slug)
    {
        $filiere = Filiere::where('slug', $slug)->where('actif', true)->firstOrFail();

        return new FiliereResource($filiere);
    }
}
