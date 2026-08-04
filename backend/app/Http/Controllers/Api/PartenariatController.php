<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PartenariatApiResource;
use App\Models\Partenariat;
use Illuminate\Http\Request;

class PartenariatController extends Controller
{
    public function index()
{
    return PartenariatApiResource::collection(
        Partenariat::where('actif', true)->orderBy('ordre')->paginate(20)
    );
}
}
