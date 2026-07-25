<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Evenement;
use App\Models\EventRegistration;
use Illuminate\Http\Request;

class EventRegistrationController extends Controller
{
    public function store(Request $request, Evenement $evenement)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telephone' => 'nullable|string|max:30',
        ]);

        $validated['evenement_id'] = $evenement->id;
        EventRegistration::create($validated);

        return response()->json(['message' => 'Inscription à l\'événement confirmée.'], 201);
    }
}
