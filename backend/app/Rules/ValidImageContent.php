<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Http\UploadedFile;

class ValidImageContent implements ValidationRule
{
    public function validate(string $attribute, mixed $value, \Closure $fail): void
    {
        if (! $value instanceof UploadedFile) {
            $fail("Le fichier {$attribute} est invalide.");
            return;
        }

        // Vérifie que le fichier est réellement décodable comme image
        // (bloque les polyglot files : JPEG contenant du code PHP exécutable caché)
        $imageInfo = @getimagesize($value->getRealPath());

        if ($imageInfo === false) {
            $fail("Le fichier {$attribute} n'est pas une image valide.");
            return;
        }

        // Rejette les dimensions absurdes (protection contre les "image bombs" —
        // fichiers minuscules en poids mais énormes en dimensions, qui épuisent la RAM au traitement)
        [$largeur, $hauteur] = $imageInfo;
        if ($largeur > 6000 || $hauteur > 6000) {
            $fail("L'image {$attribute} a des dimensions trop importantes.");
        }
    }
}
