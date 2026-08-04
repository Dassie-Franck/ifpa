<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SendWhatsAppMessageJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;
    public int $backoff = 30; // secondes entre chaque tentative en cas d'échec

    public function __construct(
        public string $telephone,
        public string $message
    ) {}

    public function handle(): void
    {
        $token = config('services.whatsapp.token');
        $phoneNumberId = config('services.whatsapp.phone_number_id');

        if (! $token || ! $phoneNumberId) {
            Log::info("WhatsApp (simulation) → {$this->telephone} : {$this->message}");
            return;
        }

        Http::withToken($token)
            ->timeout(10)
            ->post("https://graph.facebook.com/v20.0/{$phoneNumberId}/messages", [
                'messaging_product' => 'whatsapp',
                'to' => $this->telephone,
                'type' => 'text',
                'text' => ['body' => $this->message],
            ])
            ->throw(); // déclenche une exception si l'appel échoue → retry automatique
    }

    public function failed(\Throwable $exception): void
    {
        Log::error('Échec définitif envoi WhatsApp après plusieurs tentatives', [
            'telephone' => $this->telephone,
            'erreur' => $exception->getMessage(),
        ]);
    }
}
