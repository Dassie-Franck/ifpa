<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('filieres', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->string('slug')->unique();
            $table->string('niveau_diplome')->nullable();
            $table->string('duree')->nullable();
            $table->longText('programme_pedagogique')->nullable();
            $table->longText('conditions_acces')->nullable();
            $table->longText('debouches')->nullable();
            $table->decimal('frais_formation', 12, 2)->nullable();
            $table->text('modalites_paiement')->nullable();
            $table->string('image_couverture')->nullable();
            $table->text('resume')->nullable();
            $table->boolean('admissions_ouvertes')->default(true);
            $table->boolean('actif')->default(true);
            $table->integer('ordre')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('filieres');
    }
};
