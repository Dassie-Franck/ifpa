<?php

namespace App\Filament\Resources\CandidatureResource\RelationManagers;

use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class PaiementsRelationManager extends RelationManager
{
    protected static string $relationship = 'paiements';

    protected static ?string $title = 'Historique des paiements';

    public function form(Form $form): Form
    {
        // Lecture seule : les paiements ne sont créés/modifiés que via les webhooks
        // des fournisseurs (Orange Money, MTN, PayPal...), jamais manuellement ici.
        return $form->schema([]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('reference_transaction')
            ->columns([
                Tables\Columns\TextColumn::make('reference_transaction')->label('Référence'),
                Tables\Columns\TextColumn::make('methode')->badge(),
                Tables\Columns\TextColumn::make('montant')
                    ->money('XAF')
                    ->label('Montant'),
                Tables\Columns\TextColumn::make('statut')
                    ->badge()
                    ->color(fn (string $state) => match ($state) {
                        'confirme' => 'success',
                        'en_attente' => 'warning',
                        'echoue' => 'danger',
                        'rembourse' => 'gray',
                        default => 'gray',
                    }),
                Tables\Columns\TextColumn::make('confirme_le')->dateTime('d/m/Y H:i'),
            ])
            ->actions([])
            ->headerActions([]);
    }
}
