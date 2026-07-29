<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('partenariats', function (Blueprint $table) {
            $table->id();
            $table->string('nom_structure'); // Ex: Hôpital Général de Douala
            $table->string('logo')->nullable();
            $table->enum('type', ['structure_stage', 'partenaire_institutionnel', 'employeur'])
                ->default('structure_stage');
            $table->text('description')->nullable();
            $table->integer('nombre_etudiants_accueillis')->nullable();
            $table->string('ville')->nullable();

            // Témoignage d'un responsable de la structure partenaire
            $table->string('temoignage_auteur')->nullable(); // Ex: "Dr. Fotso, Directeur médical"
            $table->text('temoignage_citation')->nullable();
            $table->string('temoignage_photo')->nullable();

            $table->boolean('actif')->default(true);
            $table->integer('ordre')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('partenariats');
    }
};
