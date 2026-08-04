<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Http\UploadedFile;

class ValidPdfContent implements ValidationRule
{
    public function validate(string $attribute, mixed $value, \Closure $fail): void
    {
        if (! $value instanceof UploadedFile) {
            $fail("Le fichier {$attribute} est invalide.");
            return;
        }

        $handle = fopen($value->getRealPath(), 'rb');
        $signature = fread($handle, 5);
        fclose($handle);

        // Tout PDF valide commence par cette signature binaire ("%PDF-")
        if ($signature !== '%PDF-') {
            $fail("Le fichier {$attribute} n'est pas un PDF valide.");
        }
    }
}
