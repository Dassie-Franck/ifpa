<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Temoignage extends Model
{
    use HasFactory;

    protected $fillable = ['nom', 'promotion', 'filiere_id', 'citation', 'photo', 'video_url', 'actif', 'ordre'];

    protected $casts = ['actif' => 'boolean'];

    public function filiere()
    {
        return $this->belongsTo(Filiere::class);
    }
}
