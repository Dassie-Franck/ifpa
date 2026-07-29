<?php

namespace App\Http\Requests;

use App\Http\Requests\Concerns\HasHoneypot;
use Illuminate\Foundation\Http\FormRequest;
use App\Rules\RecaptchaRule;
class StoreContactRequest extends FormRequest
{
    use HasHoneypot;

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return array_merge($this->honeypotRules(), [
            'nom' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telephone' => 'nullable|string|max:30',
            'objet' => 'nullable|string|max:255',
            'message' => 'required|string|max:5000',
             'g-recaptcha-response' => ['required', new RecaptchaRule()],
        ]);
    }
}
