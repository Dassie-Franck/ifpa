<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Actualite extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre', 'slug', 'extrait', 'contenu', 'image_couverture', 'categorie',
        'auteur_id', 'publie', 'date_publication',
    ];

    protected $casts = [
        'publie' => 'boolean',
        'date_publication' => 'datetime',
    ];

    public function auteur()
    {
        return $this->belongsTo(User::class, 'auteur_id');
    }
}
