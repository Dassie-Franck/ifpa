<?php

namespace App\Mail;

use App\Models\Candidature;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class DossierRejeteMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Candidature $candidature) {}

    public function build()
    {
        return $this->subject('Concernant votre dossier IFPA — Réf. ' . $this->candidature->reference)
            ->view('emails.dossier-rejete');
    }
}