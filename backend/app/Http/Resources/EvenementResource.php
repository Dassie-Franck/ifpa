<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EvenementResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'titre' => $this->titre,
            'slug' => $this->slug,
            'description' => $this->description,
            'date_debut' => $this->date_debut?->format('Y-m-d H:i'),
            'date_fin' => $this->date_fin?->format('Y-m-d H:i'),
            'lieu' => $this->lieu,
            'campus' => $this->whenLoaded('campus', fn () => ['id' => $this->campus->id, 'nom' => $this->campus->nom]),
            'image_couverture' => $this->image_couverture ? asset('storage/' . $this->image_couverture) : null,
            'inscription_requise' => $this->inscription_requise,
        ];
    }
}
