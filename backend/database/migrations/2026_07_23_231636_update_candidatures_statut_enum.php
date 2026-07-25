<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // MySQL ne permet pas de modifier un ENUM directement via Blueprint,
        // on passe par une requête SQL brute.
        DB::statement("ALTER TABLE candidatures MODIFY COLUMN statut ENUM(
            'soumis',
            'dossier_valide',
            'rejete',
            'paiement_recu',
            'expire',
            'admis'
        ) NOT NULL DEFAULT 'soumis'");
    }

    public function down(): void
    {
        DB::statement("ALTER TABLE candidatures MODIFY COLUMN statut ENUM(
            'paiement_en_attente',
            'paiement_recu',
            'dossier_en_cours',
            'pieces_manquantes',
            'admis',
            'rejete'
        ) NOT NULL DEFAULT 'paiement_en_attente'");
    }
};
