<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('candidatures', function (Blueprint $table) {
            // Motif communiqué au candidat en cas de rejet du dossier
            $table->text('motif_rejet')->nullable()->after('notes_admission');

            // Horodatage de la validation du dossier par l'agent (déclenche le compte à rebours)
            $table->timestamp('dossier_valide_le')->nullable()->after('motif_rejet');

            // Date limite calculée (dossier_valide_le + 24h ou 48h) pour effectuer le paiement
            $table->timestamp('date_limite_paiement')->nullable()->after('dossier_valide_le');

            // Agent ayant traité le dossier (traçabilité)
            $table->foreignId('traite_par')->nullable()->after('date_limite_paiement')
                ->constrained('users')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('candidatures', function (Blueprint $table) {
            $table->dropForeign(['traite_par']);
            $table->dropColumn(['motif_rejet', 'dossier_valide_le', 'date_limite_paiement', 'traite_par']);
        });
    }
};
