<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactRequest;
use App\Models\ContactMessage;

class ContactController extends Controller
{
    public function store(StoreContactRequest $request)
    {
        ContactMessage::create($request->safe()->except('website'));

        return response()->json(['message' => 'Votre message a bien été envoyé.'], 201);
    }
}
