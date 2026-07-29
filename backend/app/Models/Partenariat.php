<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Partenariat extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom_structure', 'logo', 'type', 'description', 'nombre_etudiants_accueillis', 'ville',
        'temoignage_auteur', 'temoignage_citation', 'temoignage_photo',
        'actif', 'ordre',
    ];

    protected $casts = [
        'actif' => 'boolean',
    ];
}
