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
        .deadline { background-color: #fff3cd; border-left: 4px solid #E8871E; padding: 12px 16px; margin: 20px 0; }
        .footer { text-align: center; font-size: 12px; color: #888; padding: 16px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Institut IFPA</h2>
        </div>
        <div class="content">
            <p>Bonjour {{ $candidature->prenom }} {{ $candidature->nom }},</p>

            <p>Bonne nouvelle : votre dossier de candidature pour la filière
                <strong>{{ $candidature->filiere->titre }}</strong> a été <strong>validé</strong> par notre équipe des admissions.</p>

            <div class="reference">Référence : {{ $candidature->reference }}</div>

            <div class="deadline">
                <strong>Action requise :</strong> vous devez régler les frais de dossier avant le
                <strong>{{ $candidature->date_limite_paiement->format('d/m/Y à H:i') }}</strong>,
                faute de quoi votre candidature sera automatiquement annulée.
            </div>

            <p>Pour procéder au paiement, rendez-vous sur votre espace de suivi :</p>
            <p><a href="{{ config('app.frontend_url') }}/inscription/suivi/{{ $candidature->token_suivi }}">
                Accéder à mon espace de suivi
            </a></p>

            <p>Cordialement,<br>L'équipe des admissions — Institut IFPA</p>
        </div>
        <div class="footer">
            © {{ date('Y') }} Institut IFPA — Ceci est un message automatique, merci de ne pas y répondre directement.
        </div>
    </div>
</body>
</html>
