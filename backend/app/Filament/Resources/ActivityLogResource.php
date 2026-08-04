<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ActivityLogResource\Pages;
use App\Support\UserRoles;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Spatie\Activitylog\Models\Activity;

class ActivityLogResource extends Resource
{
    protected static ?string $model = Activity::class;
    protected static ?string $navigationIcon = 'heroicon-o-clock';
    protected static ?string $navigationLabel = 'Journal d\'activité';
    protected static ?string $navigationGroup = 'Administration';
    protected static ?string $modelLabel = 'Entrée de journal';

    public static function canViewAny(): bool
    {
        // Réservé strictement à l'administrateur — traçabilité sensible
        return auth()->user()?->role === UserRoles::ADMIN;
    }

    public static function canCreate(): bool
    {
        return false; // Le journal ne se crée jamais manuellement
    }

    public static function canEdit($record): bool
    {
        return false; // Jamais modifiable — intégrité du log
    }

    public static function canDelete($record): bool
    {
        return false; // Jamais supprimable individuellement
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Date')
                    ->dateTime('d/m/Y H:i:s')
                    ->sortable(),

                Tables\Columns\TextColumn::make('log_name')
                    ->label('Type')
                    ->badge(),

                Tables\Columns\TextColumn::make('description')
                    ->label('Action'),

                Tables\Columns\TextColumn::make('subject_type')
                    ->label('Sur')
                    ->formatStateUsing(fn (string $state) => class_basename($state)),

                Tables\Columns\TextColumn::make('subject_id')
                    ->label('ID'),

                Tables\Columns\TextColumn::make('causer.name')
                    ->label('Auteur')
                    ->default('Système'),

                Tables\Columns\TextColumn::make('properties')
                    ->label('Détail')
                    ->formatStateUsing(function ($state) {
                        $old = $state['old'] ?? [];
                        $attributes = $state['attributes'] ?? [];
                        $lignes = [];
                        foreach ($attributes as $champ => $valeur) {
                            $ancienneValeur = $old[$champ] ?? '—';
                            $lignes[] = "{$champ}: {$ancienneValeur} → {$valeur}";
                        }
                        return implode(' | ', $lignes);
                    })
                    ->wrap(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('log_name')
                    ->label('Type')
                    ->options(['candidature' => 'Candidature', 'user' => 'Utilisateur']),
            ])
            ->defaultSort('created_at', 'desc')
            ->poll('30s');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListActivityLogs::route('/'),
        ];
    }
}
