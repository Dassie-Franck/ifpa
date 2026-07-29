<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('documents_institutionnels', function (Blueprint $table) {
            $table->id();
            $table->string('fiche_inscription_vierge')->nullable();
            $table->string('fiche_inscription_modele')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('documents_institutionnels');
    }
};
