<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FiliereResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'titre' => $this->titre,
            'slug' => $this->slug,
            'niveau_diplome' => $this->niveau_diplome,
            'duree' => $this->duree,
            'resume' => $this->resume,
            'image_couverture' => $this->image_couverture ? asset('storage/' . $this->image_couverture) : null,
            'admissions_ouvertes' => $this->admissions_ouvertes,
            // Champs détaillés uniquement sur la fiche filière (voir show()), pas sur la liste
            'programme_pedagogique' => $this->whenNotNull($this->programme_pedagogique),
            'conditions_acces' => $this->whenNotNull($this->conditions_acces),
            'debouches' => $this->whenNotNull($this->debouches),
            'frais_formation' => $this->whenNotNull($this->frais_formation),
            'modalites_paiement' => $this->whenNotNull($this->modalites_paiement),
        ];
    }
}
