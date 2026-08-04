<?php

namespace App\Mail;

use App\Models\Candidature;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue; // 
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class DossierValideMail extends Mailable implements ShouldQueue //
{
    use Queueable, SerializesModels;

    public function __construct(public Candidature $candidature) {}

    public function build()
    {
        return $this->subject('Votre dossier IFPA a été validé — Réf. ' . $this->candidature->reference)
            ->view('emails.dossier-valide');
    }
}
