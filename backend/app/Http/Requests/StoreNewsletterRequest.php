<?php

namespace App\Http\Requests;

use App\Http\Requests\Concerns\HasHoneypot;
use Illuminate\Foundation\Http\FormRequest;

class StoreNewsletterRequest extends FormRequest
{
    use HasHoneypot;

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return array_merge($this->honeypotRules(), [
            'email' => ['required', 'email', 'max:255'],
        ]);
    }
}
