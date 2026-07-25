<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // On passe "role" en simple string (déjà le cas) mais on ajoute un champ
        // dédié pour bien distinguer "compte candidat" de "compte personnel IFPA".
        DB::table('users')->whereNull('role')->update(['role' => 'candidat']);
    }

    public function down(): void
    {
        //
    }
};
