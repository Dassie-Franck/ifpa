<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MembreEquipe extends Model
{
    use HasFactory;

    protected $table = 'membres_equipe';

   protected $fillable = ['nom_complet', 'titre', 'email', 'specialite', 'biographie', 'photo', 'type', 'actif', 'ordre'];

    protected $casts = ['actif' => 'boolean'];
}
