<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GalerieItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'titre' => $this->titre,
            'type' => $this->type,
            'categorie' => $this->categorie,
            'fichier' => $this->resolveUrl(),
            'source_video' => $this->type === 'video' ? $this->detecterSourceVideo() : null,
        ];
    }

    private function resolveUrl(): string
    {
        if ($this->type === 'photo') {
            return asset('storage/' . $this->fichier);
        }

        // Vidéo : soit une URL externe (YouTube/Vimeo), soit un fichier uploadé
        if (str_starts_with($this->fichier, 'http')) {
            return $this->fichier;
        }

        return asset('storage/' . $this->fichier);
    }

    private function detecterSourceVideo(): string
    {
        if (str_contains($this->fichier, 'youtube.com') || str_contains($this->fichier, 'youtu.be')) {
            return 'youtube';
        }

        if (str_contains($this->fichier, 'vimeo.com')) {
            return 'vimeo';
        }

        return 'fichier'; // MP4 uploadé directement
    }
}
