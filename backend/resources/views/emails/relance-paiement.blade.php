<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; color: #2B2B2B; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 24px; }
        .header { background-color: #A6192E; color: #fff; padding: 20px; text-align: center; }
        .content { padding: 24px; background-color: #fafafa; }
        .reference { display: inline-block; background: #fff5ec; border: 1px dashed #A6192E; color: #A6192E; padding: 10px 20px; font-weight: bold; margin: 16px 0; }
        .urgent { background-color: #fdecea; border-left: 4px solid #d32f2f; padding: 12px 16px; margin: 20px 0; font-weight: bold; }
        .footer { text-align: center; font-size: 12px; color: #888; padding: 16px; }
        .cta { display: inline-block; background-color: #A6192E; color: #fff !important; padding: 12px 28px; text-decoration: none; border-radius: 4px; font-weight: bold; margin-top: 16px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Institut IFPA</h2>
        </div>
        <div class="content">
            <p>Bonjour {{ $candidature->prenom }} {{ $candidature->nom }},</p>

            <p>Nous vous rappelons que votre dossier pour la filière
                <strong>{{ $candidature->filiere->titre }}</strong> a été validé, mais que le paiement des frais de dossier n'a pas encore été effectué.</p>

            <div class="reference">Référence : {{ $candidature->reference }}</div>

            <div class="urgent">
                ⏰ Il vous reste moins de 12 heures pour procéder au paiement, avant le
                {{ $candidature->date_limite_paiement->format('d/m/Y à H:i') }}.
                Passé ce délai, votre candidature sera automatiquement annulée.
            </div>

            <p style="text-align: center;">
                <a href="{{ config('app.frontend_url') }}/inscription/suivi/{{ $candidature->token_suivi }}" class="cta">
                    Payer maintenant
                </a>
            </p>

            <p>Cordialement,<br>L'équipe des admissions — Institut IFPA</p>
        </div>
        <div class="footer">
            © {{ date('Y') }} Institut IFPA — Ceci est un message automatique, merci de ne pas y répondre directement.
        </div>
    </div>
</body>
</html>
