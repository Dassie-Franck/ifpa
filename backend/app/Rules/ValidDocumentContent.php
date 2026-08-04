<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Http\UploadedFile;

class ValidDocumentContent implements ValidationRule
{
    public function validate(string $attribute, mixed $value, \Closure $fail): void
    {
        if (! $value instanceof UploadedFile) {
            $fail("Le fichier {$attribute} est invalide.");
            return;
        }

        $handle = fopen($value->getRealPath(), 'rb');
        $signature = fread($handle, 8);
        fclose($handle);

        $estPdf = str_starts_with($signature, '%PDF-');
        $estJpeg = str_starts_with($signature, "\xFF\xD8\xFF");
        $estPng = str_starts_with($signature, "\x89PNG");

        if (! $estPdf && ! $estJpeg && ! $estPng) {
            $fail("Le fichier {$attribute} doit être un PDF, JPG ou PNG valide.");
            return;
        }

        // Vérification complémentaire pour les images : décodage réel + dimensions raisonnables
        if ($estJpeg || $estPng) {
            $imageInfo = @getimagesize($value->getRealPath());
            if ($imageInfo === false) {
                $fail("Le fichier {$attribute} n'est pas une image valide.");
                return;
            }
            if ($imageInfo[0] > 6000 || $imageInfo[1] > 6000) {
                $fail("L'image {$attribute} a des dimensions trop importantes.");
            }
        }
    }
}
