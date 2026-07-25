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
            'fichier' => $this->type === 'photo' ? asset('storage/' . $this->fichier) : $this->fichier,
        ];
    }
}
