<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    use HasFactory;

    protected $fillable = [
        'candidature_id', 'reference_transaction', 'methode', 'montant', 'devise',
        'statut', 'payload_webhook', 'confirme_le',
    ];

    protected $casts = [
        'payload_webhook' => 'array',
        'confirme_le' => 'datetime',
        'montant' => 'decimal:2',
    ];

    public function candidature()
    {
        return $this->belongsTo(Candidature::class);
    }
}
