<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventRegistration extends Model
{
    use HasFactory;

    protected $fillable = ['evenement_id', 'nom', 'email', 'telephone'];

    public function evenement()
    {
        return $this->belongsTo(Evenement::class);
    }
}
