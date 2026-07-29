<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentInstitutionnel extends Model
{
    use HasFactory;

  
    protected $table = 'documents_institutionnels';

    protected $fillable = ['fiche_inscription_vierge', 'fiche_inscription_modele'];

    /**
     * Il n'existe qu'un seul enregistrement de configuration pour tout le site —
     * cette méthode le récupère (ou le crée s'il n'existe pas encore).
     */
    public static function instance(): self
    {
        return static::firstOrCreate(['id' => 1]);
    }
}
