<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: 'DejaVu Sans', Arial, sans-serif; font-size: 12px; color: #2B2B2B; }
        .header { background-color: #A6192E; color: #fff; padding: 20px 24px; text-align: center; }
        .header h1 { margin: 0; font-size: 20px; }
        .header p { margin: 4px 0 0; font-size: 11px; opacity: 0.9; }

        .container { padding: 24px; }

        .reference-box {
            border: 1px dashed #A6192E;
            background-color: #fff5ec;
            color: #A6192E;
            padding: 10px 16px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 20px;
            font-size: 14px;
        }

        .section-title {
            background-color: #f0f0f0;
            color: #A6192E;
            font-weight: bold;
            padding: 8px 12px;
            margin-top: 16px;
            margin-bottom: 10px;
            font-size: 13px;
        }

        table.info-table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
        table.info-table td { padding: 6px 8px; vertical-align: top; }
        table.info-table td.label { font-weight: bold; width: 35%; color: #555; }

        .photo-box { text-align: center; margin-bottom: 16px; }
        .photo-box img { width: 100px; height: 100px; object-fit: cover; border: 1px solid #ccc; }

        table.documents-table { width: 100%; border-collapse: collapse; margin-top: 8px; }
        table.documents-table th, table.documents-table td {
            border: 1px solid #ddd; padding: 6px 8px; text-align: left; font-size: 11px;
        }
        table.documents-table th { background-color: #f7f7f7; }

        .statut-badge {
            display: inline-block;
            padding: 3px 10px;
            border-radius: 3px;
            font-weight: bold;
            font-size: 11px;
            color: #fff;
        }

        .footer {
            margin-top: 30px;
            border-top: 1px solid #eee;
            padding-top: 10px;
            text-align: center;
            font-size: 10px;
            color: #999;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Institut IFPA</h1>
        <p>Fiche officielle de dépôt de candidature</p>
    </div>

    <div class="container">
        <div class="reference-box">
            Référence du dossier : {{ $candidature->reference }}
        </div>

       @if ($photoAbsolutePath && file_exists($photoAbsolutePath))
            <div class="photo-box">
                <img src="{{ $photoAbsolutePath }}" alt="Photo d'identité">
            </div>
        @endif

        <div class="section-title">Identité du candidat</div>
        <table class="info-table">
            <tr>
                <td class="label">Nom complet</td>
                <td>{{ $candidature->nom }} {{ $candidature->prenom }}</td>
            </tr>
            <tr>
                <td class="label">Date de naissance</td>
                <td>{{ $candidature->date_naissance?->format('d/m/Y') ?? 'Non renseignée' }}</td>
            </tr>
            <tr>
                <td class="label">Email</td>
                <td>{{ $candidature->email }}</td>
            </tr>
            <tr>
                <td class="label">Téléphone</td>
                <td>{{ $candidature->telephone }}</td>
            </tr>
            <tr>
                <td class="label">Adresse</td>
                <td>{{ $candidature->adresse ?? 'Non renseignée' }}</td>
            </tr>
            <tr>
                <td class="label">Niveau d'études</td>
                <td>{{ $candidature->niveau_etudes ?? 'Non renseigné' }}</td>
            </tr>
        </table>

        <div class="section-title">Filière et campus</div>
        <table class="info-table">
            <tr>
                <td class="label">Filière choisie</td>
                <td>{{ $candidature->filiere->titre }}</td>
            </tr>
            <tr>
                <td class="label">Campus</td>
                <td>{{ $candidature->campus->nom ?? 'Non renseigné' }}</td>
            </tr>
            <tr>
                <td class="label">Date de dépôt</td>
                <td>{{ $candidature->created_at->format('d/m/Y à H:i') }}</td>
            </tr>
            <tr>
                <td class="label">Statut actuel</td>
                <td>
                    <span class="statut-badge" style="background-color:
                        @if($candidature->statut === 'admis') #2e7d32
                        @elseif($candidature->statut === 'rejete') #d32f2f
                        @elseif($candidature->statut === 'paiement_en_attente') #E8871E
                        @else #888
                        @endif;">
                        {{ match($candidature->statut) {
                            'soumis' => 'Soumis',
                            'paiement_en_attente' => 'Paiement en attente',
                            'dossier_valide' => 'Dossier validé',
                            'rejete' => 'Rejeté',
                            'expire' => 'Expiré',
                            'admis' => 'Admis',
                            default => $candidature->statut,
                        } }}
                    </span>
                </td>
            </tr>
        </table>

        <div class="section-title">Pièces jointes au dossier</div>
        <table class="documents-table">
            <tr>
                <th>Document</th>
                <th>Fichier fourni</th>
                <th>État</th>
            </tr>
            @foreach ($candidature->documents as $document)
                <tr>
                    <td>
                        {{ match($document->type) {
                            'demande_manuscrite' => "Demande d'admission manuscrite",
                            'diplome_releve_notes' => 'Diplôme / Relevé de notes / Bordereau de réussite',
                            'acte_naissance' => 'Acte de naissance',
                            'carte_identite' => "Carte nationale d'identité",
                            'photo_identite' => "Photo d'identité",
                            default => 'Autre',
                        } }}
                    </td>
                    <td>{{ $document->nom_original ?? '—' }}</td>
                    <td>
                        @if ($document->valide === true) Validé
                        @elseif ($document->valide === false) À corriger
                        @else En attente d'étude
                        @endif
                    </td>
                </tr>
            @endforeach
        </table>

        @if ($candidature->motif_rejet)
            <div class="section-title" style="color: #d32f2f;">Motif de rejet</div>
            <p>{{ $candidature->motif_rejet }}</p>
        @endif
    </div>

    <div class="footer">
        Document généré automatiquement le {{ now()->format('d/m/Y à H:i') }} — Institut IFPA<br>
        Ce document ne constitue pas une preuve d'admission définitive.
    </div>
</body>
</html>
