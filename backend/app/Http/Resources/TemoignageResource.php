<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TemoignageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nom' => $this->nom,
            'promotion' => $this->promotion,
            'citation' => $this->citation,
            'photo' => $this->photo ? asset('storage/' . $this->photo) : null,
            'video_url' => $this->video_url,
            'filiere' => $this->whenLoaded('filiere', fn () => ['id' => $this->filiere->id, 'titre' => $this->filiere->titre]),
        ];
    }
}
