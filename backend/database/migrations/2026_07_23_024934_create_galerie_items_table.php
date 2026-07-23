<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('galerie_items', function (Blueprint $table) {
            $table->id();
            $table->string('titre')->nullable();
            $table->string('type')->default('photo');
            $table->string('fichier');
            $table->string('categorie')->default('locaux');
            $table->boolean('actif')->default(true);
            $table->integer('ordre')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('galerie_items');
    }
};
