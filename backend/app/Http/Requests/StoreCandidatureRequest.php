<?php

namespace App\Http\Requests;

use App\Models\Candidature;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;
use App\Rules\ValidDocumentContent;
use App\Rules\ValidImageContent;
use App\Http\Requests\Concerns\HasHoneypot;


class StoreCandidatureRequest extends FormRequest
{
    use HasHoneypot;
    public function authorize(): bool
    {
        return true;
    }


public function rules(): array
{
    return array_merge($this->honeypotRules(), [
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
        'ramettes_papier_payantes' => 'nullable|boolean',

        'demande_manuscrite' => ['required', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:5120', new ValidDocumentContent],
        'diplome_releve_notes' => ['required', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:5120', new ValidDocumentContent],
        'acte_naissance' => ['required', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:5120', new ValidDocumentContent],
        'carte_identite' => ['required', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:5120', new ValidDocumentContent],
        'photo_identite' => ['required', 'file', 'image', 'max:5120', new ValidImageContent],
    ]);
}

    public function messages(): array
    {
        return [
            'filiere_id.required' => 'Veuillez sélectionner une filière.',
            'demande_manuscrite.required' => 'La demande d\'admission manuscrite est obligatoire.',
            'diplome_releve_notes.required' => 'Le diplôme, relevé de notes ou bordereau de réussite est obligatoire.',
            'acte_naissance.required' => 'L\'acte de naissance est obligatoire.',
            'carte_identite.required' => 'La carte nationale d\'identité est obligatoire.',
            'photo_identite.required' => 'La photo d\'identité est obligatoire.',
        ];
    }

    /**
     * Empêche un second dépôt actif pour la même filière avec le même email —
     * mais autorise un nouveau dépôt si l'ancien a été rejeté ou a expiré,
     * ou pour une filière différente.
     */
    public function withValidator(Validator $validator): void
    {
        $validator->after(function ($validator) {
            $email = $this->input('email');
            $filiereId = $this->input('filiere_id');

            if (! $email || ! $filiereId) {
                return;
            }

            $dejaEnCours = Candidature::where('email', $email)
                ->where('filiere_id', $filiereId)
                ->whereIn('statut', ['soumis', 'paiement_en_attente', 'dossier_valide', 'admis'])
                ->exists();

            if ($dejaEnCours) {
                $validator->errors()->add(
                    'email',
                    'Une candidature est déjà en cours avec cet email pour cette filière. '
                    . 'Connectez-vous à votre espace candidat pour suivre son évolution.'
                );
            }
        });
    }
}
