<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCandidatureRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'date_naissance' => 'nullable|date',
            'sexe' => 'nullable|in:M,F',
            'email' => 'required|email|max:255',
            'telephone' => 'required|string|max:30',
            'adresse' => 'nullable|string|max:500',
            'niveau_etudes' => 'nullable|string|max:255',
            'filiere_id' => 'required|exists:filieres,id',
            'campus_id' => 'nullable|exists:campus,id',

            'photo_identite' => 'required|file|image|max:5120',
            'acte_naissance' => 'required|file|mimes:pdf,jpg,jpeg,png|max:5120',
            'diplome' => 'required|file|mimes:pdf,jpg,jpeg,png|max:5120',
            'certificat_medical' => 'required|file|mimes:pdf,jpg,jpeg,png|max:5120',
        ];
    }

    public function messages(): array
    {
        return [
            'filiere_id.required' => 'Veuillez sélectionner une filière.',
            'photo_identite.required' => "La photo d'identité est obligatoire.",
            'acte_naissance.required' => "L'acte de naissance est obligatoire.",
            'diplome.required' => 'Le diplôme est obligatoire.',
            'certificat_medical.required' => 'Le certificat médical est obligatoire.',
        ];
    }
}
