<?php

namespace App\Support;

class UserRoles
{
    public const ADMIN = 'admin';
    public const AGENT_ADMISSIONS = 'agent_admissions';
    public const GESTIONNAIRE_CONTENU = 'gestionnaire_contenu';

    public static function peutGererCandidatures(): bool
    {
        $role = auth()->user()?->role;
        return in_array($role, [self::ADMIN, self::AGENT_ADMISSIONS], true);
    }

    public static function peutGererContenu(): bool
    {
        $role = auth()->user()?->role;
        return in_array($role, [self::ADMIN, self::GESTIONNAIRE_CONTENU], true);
    }

    public static function peutGererUtilisateurs(): bool
    {
        return auth()->user()?->role === self::ADMIN;
    }
}
