<?php

namespace App\Notifications;

use App\Models\Candidature;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Filament\Notifications\Notification as FilamentNotification;
use Filament\Notifications\Actions\Action;

class DossierResoumisNotification extends Notification
{
    use Queueable;

    public function __construct(public Candidature $candidature) {}

    public function via($notifiable): array
    {
        return ['database'];
    }

    public function toDatabase($notifiable): array
    {
        return FilamentNotification::make()
            ->title('Dossier corrigé reçu')
            ->body("{$this->candidature->prenom} {$this->candidature->nom} a renvoyé son dossier (réf. {$this->candidature->reference}).")
            ->icon('heroicon-o-arrow-path')
            ->iconColor('warning')
            ->actions([
                Action::make('voir')
                    ->label('Voir le dossier')
                    ->url(route('filament.admin.resources.candidatures.edit', $this->candidature))
                    ->markAsRead(),
            ])
            ->getDatabaseMessage();
    }
}
