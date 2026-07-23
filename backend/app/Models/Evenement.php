<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evenement extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre', 'slug', 'description', 'date_debut', 'date_fin', 'lieu', 'campus_id',
        'image_couverture', 'inscription_requise', 'actif',
    ];

    protected $casts = [
        'date_debut' => 'datetime',
        'date_fin' => 'datetime',
        'inscription_requise' => 'boolean',
        'actif' => 'boolean',
    ];

    public function campus()
    {
        return $this->belongsTo(Campus::class);
    }

    public function inscriptions()
    {
        return $this->hasMany(EventRegistration::class, 'evenement_id');
    }
}
