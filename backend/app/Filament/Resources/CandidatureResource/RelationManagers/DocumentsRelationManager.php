<?php

namespace App\Filament\Resources\CandidatureResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class DocumentsRelationManager extends RelationManager
{
    protected static string $relationship = 'documents';

    protected static ?string $title = 'Pièces justificatives';

    public function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Select::make('type')
                ->options([
                    'photo_identite' => 'Photo d\'identité',
                    'acte_naissance' => 'Acte de naissance',
                    'diplome' => 'Diplôme',
                    'certificat_medical' => 'Certificat médical',
                    'autre' => 'Autre',
                ])
                ->required(),
            Forms\Components\FileUpload::make('fichier')
                ->directory('candidatures/documents')
                ->required(),
            Forms\Components\Toggle::make('valide')
                ->label('Pièce validée par l\'équipe admissions'),
        ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('type')
            ->columns([
                Tables\Columns\TextColumn::make('type')
                    ->formatStateUsing(fn (string $state) => match ($state) {
                        'photo_identite' => "Photo d'identité",
                        'acte_naissance' => 'Acte de naissance',
                        'diplome' => 'Diplôme',
                        'certificat_medical' => 'Certificat médical',
                        default => 'Autre',
                    })
                    ->badge(),
                Tables\Columns\TextColumn::make('nom_original')->label('Fichier'),
                Tables\Columns\IconColumn::make('valide')->boolean()->label('Validé'),
                Tables\Columns\TextColumn::make('created_at')->dateTime('d/m/Y')->label('Ajouté le'),
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make(),
            ])
            ->actions([
                Tables\Actions\Action::make('voir')
                    ->label('Voir')
                    ->icon('heroicon-o-eye')
                    ->url(fn ($record) => \Storage::url($record->fichier))
                    ->openUrlInNewTab(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }
}
