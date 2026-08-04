<?php

namespace App\Services;

use App\Mail\DossierValideMail;
use App\Mail\DossierRejeteMail;
use App\Mail\RelancePaiementMail;
use App\Models\Candidature;
use App\Jobs\SendWhatsAppMessageJob;
use Illuminate\Support\Facades\Mail;

class NotificationService
{
    public function notifierDossierValide(Candidature $candidature): void
    {
        Mail::to($candidature->email)->queue(new DossierValideMail($candidature));

        SendWhatsAppMessageJob::dispatch(
            $candidature->telephone,
            "Bonjour {$candidature->prenom}, votre dossier IFPA (réf. {$candidature->reference}) a été validé ! "
            . "Vous avez jusqu'au {$candidature->date_limite_paiement->format('d/m/Y H:i')} pour régler les frais de dossier. "
            . "Consultez votre email pour le lien de paiement."
        );
    }

    public function notifierDossierRejete(Candidature $candidature): void
    {
        Mail::to($candidature->email)->queue(new DossierRejeteMail($candidature));

        SendWhatsAppMessageJob::dispatch(
            $candidature->telephone,
            "Bonjour {$candidature->prenom}, votre dossier IFPA (réf. {$candidature->reference}) n'a pas pu être retenu. "
            . "Motif : {$candidature->motif_rejet}. Consultez votre email pour plus de détails."
        );
    }

    public function notifierRelancePaiement(Candidature $candidature): void
    {
        Mail::to($candidature->email)->queue(new RelancePaiementMail($candidature));

        SendWhatsAppMessageJob::dispatch(
            $candidature->telephone,
            "Bonjour {$candidature->prenom}, rappel : il vous reste moins de 12h pour payer les frais de dossier "
            . "(réf. {$candidature->reference}), avant le {$candidature->date_limite_paiement->format('d/m/Y H:i')}. "
            . "Passé ce délai, votre candidature sera annulée."
        );
    }
}
