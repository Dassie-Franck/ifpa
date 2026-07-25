<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\GalerieItemResource;
use App\Models\GalerieItem;
use Illuminate\Http\Request;

class GalerieController extends Controller
{
    public function index(Request $request)
    {
        $query = GalerieItem::where('actif', true)->orderBy('ordre');

        if ($request->filled('categorie')) {
            $query->where('categorie', $request->input('categorie'));
        }

        return GalerieItemResource::collection($query->get());
    }
}
