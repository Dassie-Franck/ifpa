<?php

namespace App\Filament\Resources;

use App\Filament\Resources\GalerieItemResource\Pages;
use App\Models\GalerieItem;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class GalerieItemResource extends Resource
{
    protected static ?string $model = GalerieItem::class;
    protected static ?string $navigationIcon = 'heroicon-o-photo';
    protected static ?string $navigationLabel = 'Galerie';
    protected static ?string $navigationGroup = 'Contenu du site';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('titre'),
            Forms\Components\Select::make('type')->options(['photo' => 'Photo', 'video' => 'Vidéo'])->default('photo')->live(),
            Forms\Components\Select::make('categorie')->options([
                'locaux' => 'Locaux',
                'evenements' => 'Événements',
                'vie_etudiante' => 'Vie étudiante',
                'remise_diplomes' => 'Remise de diplômes',
            ])->default('locaux'),
            Forms\Components\FileUpload::make('fichier')
                ->label('Fichier (image) ou laissez vide et renseignez une URL vidéo ci-dessous')
                ->image()
                ->directory('galerie')
                ->visible(fn (callable $get) => $get('type') === 'photo'),
            Forms\Components\TextInput::make('fichier')
                ->label('URL de la vidéo')
                ->visible(fn (callable $get) => $get('type') === 'video'),
            Forms\Components\Toggle::make('actif')->default(true),
            Forms\Components\TextInput::make('ordre')->numeric()->default(0),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('titre'),
                Tables\Columns\TextColumn::make('type')->badge(),
                Tables\Columns\TextColumn::make('categorie')->badge(),
                Tables\Columns\IconColumn::make('actif')->boolean(),
            ])
            ->reorderable('ordre')
            ->defaultSort('ordre')
            ->actions([Tables\Actions\EditAction::make(), Tables\Actions\DeleteAction::make()])
            ->bulkActions([Tables\Actions\BulkActionGroup::make([Tables\Actions\DeleteBulkAction::make()])]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListGalerieItems::route('/'),
            'create' => Pages\CreateGalerieItem::route('/create'),
            'edit' => Pages\EditGalerieItem::route('/{record}/edit'),
        ];
    }
}
