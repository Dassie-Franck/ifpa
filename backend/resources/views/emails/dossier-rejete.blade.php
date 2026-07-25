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
        .motif { background-color: #fdecea; border-left: 4px solid #d32f2f; padding: 12px 16px; margin: 20px 0; }
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

            <p>Après étude de votre dossier de candidature pour la filière
                <strong>{{ $candidature->filiere->titre }}</strong>, nous ne sommes malheureusement pas en mesure de le retenir en l'état.</p>

            <div class="reference">Référence : {{ $candidature->reference }}</div>

            <div class="motif">
                <strong>Motif :</strong> {{ $candidature->motif_rejet }}
            </div>

            <p>Vous pouvez soumettre un nouveau dossier corrigé à tout moment depuis notre site.</p>

            <p>Cordialement,<br>L'équipe des admissions — Institut IFPA</p>
        </div>
        <div class="footer">
            © {{ date('Y') }} Institut IFPA — Ceci est un message automatique, merci de ne pas y répondre directement.
        </div>
    </div>
</body>
</html>
