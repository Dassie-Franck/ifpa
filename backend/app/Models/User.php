<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Traits\HasRoles;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class User extends Authenticatable implements FilamentUser
{
    use HasFactory, Notifiable, HasRoles , HasApiTokens , LogsActivity;

    protected $fillable = [
        'name', 'email', 'password', 'role', 'actif', 'tentatives_echouees', 'verrouille_jusqu_a',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'actif' => 'boolean',
            'verrouille_jusqu_a' => 'datetime',
        ];
    }

    // Seuls les comptes actifs peuvent accéder au panneau Filament
    public function canAccessPanel(Panel $panel): bool
    {
        return $this->actif === true;
    }

    public function actualites()
    {
        return $this->hasMany(Actualite::class, 'auteur_id');
    }

    public function candidatures()
{
    return $this->hasMany(Candidature::class);
}
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['role', 'actif', 'email'])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs()
            ->useLogName('user');
    }
    
}
