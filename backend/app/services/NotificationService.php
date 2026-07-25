<?php

namespace App\Services;

use App\Mail\DossierValideMail;
use App\Mail\DossierRejeteMail;
use App\Models\Candidature;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Mail\RelancePaiementMail;

class NotificationService
{
    public function notifierDossierValide(Candidature $candidature): void
    {
        Mail::to($candidature->email)->send(new DossierValideMail($candidature));

        $this->envoyerWhatsApp(
            $candidature->telephone,
            "Bonjour {$candidature->prenom}, votre dossier IFPA (réf. {$candidature->reference}) a été validé ! "
            . "Vous avez jusqu'au {$candidature->date_limite_paiement->format('d/m/Y H:i')} pour régler les frais de dossier. "
            . "Consultez votre email pour le lien de paiement."
        );
    }

    public function notifierDossierRejete(Candidature $candidature): void
    {
        Mail::to($candidature->email)->send(new DossierRejeteMail($candidature));

        $this->envoyerWhatsApp(
            $candidature->telephone,
            "Bonjour {$candidature->prenom}, votre dossier IFPA (réf. {$candidature->reference}) n'a pas pu être retenu. "
            . "Motif : {$candidature->motif_rejet}. Consultez votre email pour plus de détails."
        );
    }

    private function envoyerWhatsApp(string $telephone, string $message): void
    {
        $token = config('services.whatsapp.token');
        $phoneNumberId = config('services.whatsapp.phone_number_id');

        if (! $token || ! $phoneNumberId) {
            // Tant que l'API WhatsApp Business n'est pas configurée (clés manquantes),
            // on journalise simplement au lieu d'échouer silencieusement.
            Log::info("WhatsApp (simulation) → {$telephone} : {$message}");
            return;
        }

        try {
            Http::withToken($token)->post("https://graph.facebook.com/v20.0/{$phoneNumberId}/messages", [
                'messaging_product' => 'whatsapp',
                'to' => $telephone,
                'type' => 'text',
                'text' => ['body' => $message],
            ]);
        } catch (\Throwable $e) {
            Log::error('Échec envoi WhatsApp : ' . $e->getMessage());
        }
    }

    public function notifierRelancePaiement(Candidature $candidature): void
{
    Mail::to($candidature->email)->send(new RelancePaiementMail($candidature));

    $this->envoyerWhatsApp(
        $candidature->telephone,
        "Bonjour {$candidature->prenom}, rappel : il vous reste moins de 12h pour payer les frais de dossier "
        . "(réf. {$candidature->reference}), avant le {$candidature->date_limite_paiement->format('d/m/Y H:i')}. "
        . "Passé ce délai, votre candidature sera annulée."
    );
}
}
