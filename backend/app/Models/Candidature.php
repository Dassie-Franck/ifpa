<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Candidature extends Model
{
    use HasFactory;

  protected $fillable = [
    'user_id', 'reference', 'nom', 'prenom', 'date_naissance', 'sexe', 'email', 'telephone',
    'adresse', 'niveau_etudes', 'filiere_id', 'campus_id', 'photo_identite',
    'statut', 'dossier_complet', 'notes_admission', 'token_suivi',
    'crm_contact_id', 'synchronise_crm',
    'motif_rejet', 'dossier_valide_le', 'date_limite_paiement', 'traite_par', 'relance_envoyee_le', 'ramettes_papier_payantes',
];

protected $casts = [
    'date_naissance' => 'date',
    'dossier_complet' => 'boolean',
    'synchronise_crm' => 'boolean',
    'dossier_valide_le' => 'datetime',
    'date_limite_paiement' => 'datetime',
    'relance_envoyee_le' => 'datetime',
    'ramettes_papier_payantes' => 'boolean',
];

public function agentTraitant()
{
    return $this->belongsTo(User::class, 'traite_par');
}

    protected static function booted(): void
    {
        static::creating(function (Candidature $candidature) {
            $candidature->reference = $candidature->reference ?? 'IFPA-' . strtoupper(Str::random(8));
            $candidature->token_suivi = $candidature->token_suivi ?? Str::uuid()->toString();
        });
    }

    public function filiere()
    {
        return $this->belongsTo(Filiere::class);
    }

    public function campus()
    {
        return $this->belongsTo(Campus::class);
    }

    public function documents()
    {
        return $this->hasMany(CandidatureDocument::class);
    }

    public function paiements()
    {
        return $this->hasMany(Paiement::class);
    }

    public function user()
{
    return $this->belongsTo(User::class);
}
}
