<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PartenariatApiResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nom_structure' => $this->nom_structure,
            'logo' => $this->logo ? asset('storage/' . $this->logo) : null,
            'type' => $this->type,
            'description' => $this->description,
            'nombre_etudiants_accueillis' => $this->nombre_etudiants_accueillis,
            'ville' => $this->ville,
            'temoignage_auteur' => $this->temoignage_auteur,
            'temoignage_citation' => $this->temoignage_citation,
            'temoignage_photo' => $this->temoignage_photo ? asset('storage/' . $this->temoignage_photo) : null,
        ];
    }
}
