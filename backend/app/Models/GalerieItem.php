<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GalerieItem extends Model
{
    use HasFactory;

    protected $table = 'galerie_items';

    protected $fillable = ['titre', 'type', 'fichier', 'categorie', 'actif', 'ordre'];

    protected $casts = ['actif' => 'boolean'];
}
