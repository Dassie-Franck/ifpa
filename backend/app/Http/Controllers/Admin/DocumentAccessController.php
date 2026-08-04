<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CandidatureDocument;
use Illuminate\Support\Facades\Storage;

class DocumentAccessController extends Controller
{
    public function voir(CandidatureDocument $document)
    {
        if (! Storage::disk('candidatures')->exists($document->fichier)) {
            abort(404, 'Fichier introuvable.');
        }

        return Storage::disk('candidatures')->response($document->fichier, $document->nom_original);
    }
}
