<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Campus extends Model
{
    use HasFactory;

    protected $table = 'campus';

    protected $fillable = [
        'nom', 'slug', 'description', 'adresse', 'ville', 'telephone', 'whatsapp',
        'email', 'latitude', 'longitude', 'image_couverture', 'galerie_images', 'actif', 'ordre',
    ];

    protected $casts = [
        'galerie_images' => 'array',
        'actif' => 'boolean',
    ];

    public function candidatures()
    {
        return $this->hasMany(Candidature::class);
    }

    public function evenements()
    {
        return $this->hasMany(Evenement::class);
    }
}
