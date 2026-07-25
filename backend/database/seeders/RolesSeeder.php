<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesSeeder extends Seeder
{
    public function run(): void
    {
        // Permissions par domaine fonctionnel
        $permissions = [
            'gerer_contenu',        // filières, actualités, événements, témoignages, partenaires, galerie, équipe
            'voir_candidatures',
            'gerer_candidatures',   // changer statut, valider documents
            'gerer_utilisateurs',
            'voir_messages_contact',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Rôle Administrateur général — tous les droits
        $admin = Role::firstOrCreate(['name' => 'admin']);
        $admin->givePermissionTo($permissions);

        // Rôle Agent des admissions — uniquement les candidatures + messages de contact
        $agentAdmissions = Role::firstOrCreate(['name' => 'agent_admissions']);
        $agentAdmissions->givePermissionTo(['voir_candidatures', 'gerer_candidatures', 'voir_messages_contact']);

        // Rôle Gestionnaire de contenu — uniquement le contenu du site
        $gestionnaireContenu = Role::firstOrCreate(['name' => 'gestionnaire_contenu']);
        $gestionnaireContenu->givePermissionTo(['gerer_contenu']);
    }
}
