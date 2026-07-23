<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('membres_equipe', function (Blueprint $table) {
            $table->id();
            $table->string('nom_complet');
            $table->string('titre');
            $table->string('specialite')->nullable();
            $table->text('biographie')->nullable();
            $table->string('photo')->nullable();
            $table->string('type')->default('formateur');
            $table->boolean('actif')->default(true);
            $table->integer('ordre')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('membres_equipe');
    }
};
