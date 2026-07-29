// app/Rules/RecaptchaRule.php
<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use App\Services\RecaptchaService;

class RecaptchaRule implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $recaptcha = app(RecaptchaService::class);
        if (!$recaptcha->verify($value)) {
            $fail('La vérification reCAPTCHA a échoué. Veuillez réessayer.');
        }
    }
}
