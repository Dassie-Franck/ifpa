<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CampusResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nom' => $this->nom,
            'slug' => $this->slug,
            'description' => $this->description,
            'adresse' => $this->adresse,
            'ville' => $this->ville,
            'telephone' => $this->telephone,
            'whatsapp' => $this->whatsapp,
            'email' => $this->email,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'image_couverture' => $this->image_couverture ? asset('storage/' . $this->image_couverture) : null,
            'galerie_images' => collect($this->galerie_images ?? [])
                ->map(fn ($img) => asset('storage/' . $img)),
        ];
    }
}
