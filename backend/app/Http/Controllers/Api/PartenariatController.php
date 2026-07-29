<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PartenariatApiResource;
use App\Models\Partenariat;
use Illuminate\Http\Request;

class PartenariatController extends Controller
{
    public function index(Request $request)
    {
        $query = Partenariat::where('actif', true)->orderBy('ordre');

        if ($request->filled('type')) {
            $query->where('type', $request->input('type'));
        }

        return PartenariatApiResource::collection($query->get());
    }
}
