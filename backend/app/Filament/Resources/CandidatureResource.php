<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CandidatureResource\Pages;
use App\Filament\Resources\CandidatureResource\RelationManagers;
use App\Models\Candidature;
use App\Models\Filiere;
use App\Models\Campus;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Support\Colors\Color;
use App\Support\UserRoles;
use App\Services\NotificationService;
class CandidatureResource extends Resource
{
    protected static ?string $model = Candidature::class;

    protected static ?string $navigationIcon = 'heroicon-o-identification';

    protected static ?string $navigationLabel = 'Candidatures';

    protected static ?string $navigationGroup = 'Admissions';

    // Badge sur le menu latéral : nombre de dossiers à traiter (pas encore admis/rejeté)
    public static function getNavigationBadge(): ?string
    {
        return (string) static::getModel()::whereNotIn('statut', ['admis', 'rejete'])->count();
    }

    public static function canViewAny(): bool
{
    return UserRoles::peutGererCandidatures();
}

public static function canCreate(): bool
{
    return UserRoles::peutGererCandidatures();
}

public static function canEdit($record): bool
{
    return UserRoles::peutGererCandidatures();
}

public static function canDelete($record): bool
{
    // Seul un admin peut supprimer une candidature (traçabilité importante)
    return auth()->user()?->role === UserRoles::ADMIN;
}

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Identité du candidat')
                ->schema([
                    Forms\Components\TextInput::make('reference')->disabled()->dehydrated(false),
                    Forms\Components\TextInput::make('nom')->required(),
                    Forms\Components\TextInput::make('prenom')->required(),
                    Forms\Components\DatePicker::make('date_naissance'),
                    Forms\Components\Select::make('sexe')->options(['M' => 'Masculin', 'F' => 'Féminin']),
                    Forms\Components\TextInput::make('email')->email()->required(),
                    Forms\Components\TextInput::make('telephone')->tel()->required(),
                    Forms\Components\TextInput::make('adresse'),
                    Forms\Components\TextInput::make('niveau_etudes'),
                ])->columns(2),

            Forms\Components\Section::make('Filière & campus')
                ->schema([
                    Forms\Components\Select::make('filiere_id')
                        ->label('Filière')
                        ->options(Filiere::pluck('titre', 'id'))
                        ->required()
                        ->searchable(),
                    Forms\Components\Select::make('campus_id')
                        ->label('Campus')
                        ->options(Campus::pluck('nom', 'id'))
                        ->searchable(),
                ])->columns(2),

            Forms\Components\Section::make('Traitement du dossier')
                ->schema([
                    Forms\Components\Select::make('statut')
    ->options([
        'soumis' => 'Soumis — en attente d\'étude',
        'dossier_valide' => 'Dossier validé — en attente de paiement',
        'rejete' => 'Rejeté',
        'paiement_recu' => 'Paiement reçu',
        'expire' => 'Expiré (délai de paiement dépassé)',
        'admis' => 'Admis',
    ])
    ->required()
    ->native(false)
    ->disabled(), // Le changement de statut passe désormais par les actions dédiées, pas ce select

    Forms\Components\Textarea::make('motif_rejet')
    ->label('Motif de rejet')
    ->rows(2)
    ->visible(fn ($record) => $record?->statut === 'rejete')
    ->disabled(),

Forms\Components\DateTimePicker::make('date_limite_paiement')
    ->label('Date limite de paiement')
    ->visible(fn ($record) => $record?->statut === 'dossier_valide')
    ->disabled(),

                    Forms\Components\Toggle::make('dossier_complet')
                        ->label('Toutes les pièces sont présentes')
                        ->disabled()
                        ->helperText('Calculé automatiquement selon les documents uploadés (onglet Documents ci-dessous)'),

                    Forms\Components\Textarea::make('notes_admission')
                        ->label('Notes internes (visibles uniquement par l\'équipe admissions)')
                        ->rows(3)
                        ->columnSpanFull(),
                ])->columns(2),

            Forms\Components\Section::make('Suivi CRM')
                ->schema([
                    Forms\Components\TextInput::make('crm_contact_id')->label('ID contact Zoho CRM')->disabled(),
                    Forms\Components\Toggle::make('synchronise_crm')->label('Synchronisé avec le CRM')->disabled(),
                ])
                ->columns(2)
                ->collapsed(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('reference')
                    ->searchable()
                    ->weight('bold'),

                Tables\Columns\TextColumn::make('nom')
                    ->formatStateUsing(fn ($record) => "{$record->nom} {$record->prenom}")
                    ->searchable(['nom', 'prenom'])
                    ->label('Candidat'),

                Tables\Columns\TextColumn::make('filiere.titre')
                    ->label('Filière')
                    ->badge(),

                Tables\Columns\TextColumn::make('campus.nom')
                    ->label('Campus'),

                Tables\Columns\TextColumn::make('statut')
    ->badge()
    ->formatStateUsing(fn (string $state) => match ($state) {
        'soumis' => 'Soumis',
        'dossier_valide' => 'Dossier validé',
        'rejete' => 'Rejeté',
        'paiement_recu' => 'Paiement reçu',
        'expire' => 'Expiré',
        'admis' => 'Admis',
        default => $state,
    })
    ->color(fn (string $state) => match ($state) {
        'soumis' => 'warning',
        'dossier_valide' => 'info',
        'rejete' => 'danger',
        'paiement_recu' => 'success',
        'expire' => 'gray',
        'admis' => 'success',
        default => 'gray',
    }),

                Tables\Columns\IconColumn::make('dossier_complet')
                    ->label('Complet')
                    ->boolean(),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Reçu le')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('statut')
    ->options([
        'soumis' => 'Soumis',
        'dossier_valide' => 'Dossier validé',
        'rejete' => 'Rejeté',
        'paiement_recu' => 'Paiement reçu',
        'expire' => 'Expiré',
        'admis' => 'Admis',
    ]),
                Tables\Filters\SelectFilter::make('filiere_id')
                    ->label('Filière')
                    ->options(Filiere::pluck('titre', 'id')),
                Tables\Filters\SelectFilter::make('campus_id')
                    ->label('Campus')
                    ->options(Campus::pluck('nom', 'id')),
                Tables\Filters\TernaryFilter::make('dossier_complet'),
            ])
            ->actions([
    Tables\Actions\Action::make('valider')
        ->label('Valider le dossier')
        ->icon('heroicon-o-check-circle')
        ->color('success')
        ->visible(fn ($record) => $record->statut === 'soumis')
        ->form([
            Forms\Components\Select::make('delai_heures')
                ->label('Délai accordé pour le paiement')
                ->options([24 => '24 heures', 48 => '48 heures'])
                ->default(48)
                ->required(),
        ])
       ->action(function ($record, array $data) {
    $record->update([
        'statut' => 'dossier_valide',
        'dossier_valide_le' => now(),
        'date_limite_paiement' => now()->addHours((int) $data['delai_heures']),
        'traite_par' => auth()->id(),
    ]);

    app(NotificationService::class)->notifierDossierValide($record->fresh());
})
        ->requiresConfirmation()
        ->modalHeading('Valider ce dossier de candidature')
        ->modalDescription('Le candidat recevra une notification l\'invitant à payer les frais de dossier dans le délai choisi.'),

    Tables\Actions\Action::make('rejeter')
    ->label('Rejeter le dossier')
    ->icon('heroicon-o-x-circle')
    ->color('danger')
    ->visible(fn ($record) => $record->statut === 'soumis')
    ->form(function ($record) {
        return [
            Forms\Components\CheckboxList::make('documents_invalides')
                ->label('Document(s) à corriger')
                ->options(
                    $record->documents->mapWithKeys(fn ($doc) => [
                        $doc->id => match ($doc->type) {
                            'photo_identite' => "Photo d'identité",
                            'acte_naissance' => 'Acte de naissance',
                            'diplome' => 'Diplôme',
                            'certificat_medical' => 'Certificat médical',
                            default => 'Autre',
                        },
                    ])
                )
                ->required()
                ->helperText('Cochez uniquement les documents que le candidat doit soumettre à nouveau.'),

            Forms\Components\Textarea::make('motif_rejet')
                ->label('Motif détaillé (communiqué au candidat)')
                ->required()
                ->rows(3)
                ->placeholder('Ex: Le certificat médical fourni n\'est pas lisible. Merci de le soumettre à nouveau.'),
        ];
    })
    ->action(function ($record, array $data) {
        // Marquer les documents cochés comme invalides, les autres comme valides
        $record->documents()->update(['valide' => true]);
        $record->documents()->whereIn('id', $data['documents_invalides'])->update(['valide' => false]);

        $record->update([
            'statut' => 'rejete',
            'motif_rejet' => $data['motif_rejet'],
            'traite_par' => auth()->id(),
        ]);

        app(\App\Services\NotificationService::class)->notifierDossierRejete($record->fresh());
    })
    ->requiresConfirmation()
    ->modalHeading('Rejeter ce dossier de candidature')
    ->modalWidth('lg'),

    Tables\Actions\ViewAction::make(),
    Tables\Actions\EditAction::make(),
])
            ->bulkActions([
    Tables\Actions\BulkActionGroup::make([
        Tables\Actions\DeleteBulkAction::make(),
    ]),
])
            ->defaultSort('created_at', 'desc');
    }

    public static function getRelations(): array
    {
        return [
            RelationManagers\DocumentsRelationManager::class,
            RelationManagers\PaiementsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCandidatures::route('/'),
            'create' => Pages\CreateCandidature::route('/create'),
            'edit' => Pages\EditCandidature::route('/{record}/edit'),
        ];
    }

//     public static function canViewAny(): bool
// {
//     return auth()->user()->can('voir_candidatures');
// }

// public static function canEdit($record): bool
// {
//     return auth()->user()->can('gerer_candidatures');
// }

// public static function canDelete($record): bool
// {
//     return auth()->user()->can('gerer_candidatures');
// }

}
