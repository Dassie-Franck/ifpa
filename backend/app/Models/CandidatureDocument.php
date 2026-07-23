<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CandidatureDocument extends Model
{
    use HasFactory;

    protected $fillable = ['candidature_id', 'type', 'fichier', 'nom_original', 'valide'];

    protected $casts = ['valide' => 'boolean'];

    public function candidature()
    {
        return $this->belongsTo(Candidature::class);
    }
}
