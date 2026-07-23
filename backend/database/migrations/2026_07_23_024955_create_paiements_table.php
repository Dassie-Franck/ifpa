<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('paiements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('candidature_id')->nullable()->constrained('candidatures')->nullOnDelete();
            $table->string('reference_transaction')->unique();
            $table->enum('methode', ['orange_money', 'mtn_momo', 'carte_bancaire', 'paypal']);
            $table->decimal('montant', 12, 2);
            $table->string('devise')->default('XAF');
            $table->enum('statut', ['en_attente', 'confirme', 'echoue', 'rembourse'])->default('en_attente');
            $table->json('payload_webhook')->nullable();
            $table->timestamp('confirme_le')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('paiements');
    }
};
