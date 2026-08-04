<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\DocumentAccessController;
use Illuminate\Http\Request;

Route::get('/', function () {
    return view('welcome');
});


Route::middleware(['auth'])->get(
    '/admin/documents/{document}/voir',
    [DocumentAccessController::class, 'voir']
)->name('admin.documents.voir');

Route::get('/login', function (Request $request) {
    return response()->json(['message' => 'Non authentifié.'], 401);
})->name('login');
