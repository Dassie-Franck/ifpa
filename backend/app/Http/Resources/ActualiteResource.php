<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ActualiteResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'titre' => $this->titre,
            'slug' => $this->slug,
            'extrait' => $this->extrait,
            'contenu' => $this->whenNotNull($this->contenu), // seulement sur la fiche détail
            'categorie' => $this->categorie,
            'image_couverture' => $this->image_couverture ? asset('storage/' . $this->image_couverture) : null,
            'date_publication' => $this->date_publication?->format('Y-m-d H:i'),
        ];
    }
}
