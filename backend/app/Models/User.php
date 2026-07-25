<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Traits\HasRoles;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Laravel\Sanctum\HasApiTokens;
class User extends Authenticatable implements FilamentUser
{
    use HasFactory, Notifiable, HasRoles , HasApiTokens;

    protected $fillable = [
        'name', 'email', 'password', 'role', 'actif',
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
}
