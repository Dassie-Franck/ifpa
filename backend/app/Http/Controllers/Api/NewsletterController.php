<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreNewsletterRequest;
use App\Models\NewsletterSubscriber;

class NewsletterController extends Controller
{
    public function store(StoreNewsletterRequest $request)
    {
        NewsletterSubscriber::firstOrCreate(['email' => $request->validated('email')]);

        return response()->json(['message' => 'Inscription à la newsletter confirmée.'], 201);
    }
}
