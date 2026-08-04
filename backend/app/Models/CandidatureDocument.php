<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class CandidatureDocument extends Model
{
    use HasFactory,  LogsActivity;


    protected $fillable = ['candidature_id', 'type', 'fichier', 'nom_original', 'valide'];

    protected $casts = ['valide' => 'boolean'];

    public function candidature()
    {
        return $this->belongsTo(Candidature::class);
    }
     public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['valide'])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs()
            ->useLogName('document');
    }
}
