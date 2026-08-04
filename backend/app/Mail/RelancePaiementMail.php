<?php

namespace App\Mail;

use App\Models\Candidature;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue; // 
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class RelancePaiementMail extends Mailable implements ShouldQueue //
{
    use Queueable, SerializesModels;

    public function __construct(public Candidature $candidature) {}

    public function build()
    {
        return $this->subject('Dernier rappel : paiement à effectuer — Réf. ' . $this->candidature->reference)
            ->view('emails.relance-paiement');
    }
}
