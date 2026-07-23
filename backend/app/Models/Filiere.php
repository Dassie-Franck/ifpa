<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Filiere extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre', 'slug', 'niveau_diplome', 'duree', 'programme_pedagogique',
        'conditions_acces', 'debouches', 'frais_formation', 'modalites_paiement',
        'image_couverture', 'resume', 'admissions_ouvertes', 'actif', 'ordre',
    ];

    protected $casts = [
        'admissions_ouvertes' => 'boolean',
        'actif' => 'boolean',
        'frais_formation' => 'decimal:2',
    ];

    public function candidatures()
    {
        return $this->hasMany(Candidature::class);
    }

    public function temoignages()
    {
        return $this->hasMany(Temoignage::class);
    }
}
