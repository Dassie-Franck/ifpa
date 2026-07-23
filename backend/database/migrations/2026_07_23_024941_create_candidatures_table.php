<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('candidatures', function (Blueprint $table) {
            $table->id();
            $table->string('reference')->unique();

            $table->string('nom');
            $table->string('prenom');
            $table->date('date_naissance')->nullable();
            $table->string('sexe')->nullable();
            $table->string('email');
            $table->string('telephone');
            $table->string('adresse')->nullable();
            $table->string('niveau_etudes')->nullable();

            $table->foreignId('filiere_id')->constrained('filieres');
            $table->foreignId('campus_id')->nullable()->constrained('campus')->nullOnDelete();

            $table->string('photo_identite')->nullable();

            $table->enum('statut', [
                'paiement_en_attente',
                'paiement_recu',
                'dossier_en_cours',
                'pieces_manquantes',
                'admis',
                'rejete',
            ])->default('paiement_en_attente');

            $table->boolean('dossier_complet')->default(false);
            $table->text('notes_admission')->nullable();

            $table->string('token_suivi')->unique()->nullable();

            $table->string('crm_contact_id')->nullable();
            $table->boolean('synchronise_crm')->default(false);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('candidatures');
    }
};
