<?php

namespace App\Filament\Resources;

use App\Filament\Resources\MembreEquipeResource\Pages;
use App\Models\MembreEquipe;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class MembreEquipeResource extends Resource
{
    protected static ?string $model = MembreEquipe::class;
    protected static ?string $navigationIcon = 'heroicon-o-user-group';
    protected static ?string $navigationLabel = 'Équipe';
    protected static ?string $navigationGroup = 'Contenu du site';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('nom_complet')->required(),
            Forms\Components\TextInput::make('titre')->required()->placeholder('Ex: Formateur en soins infirmiers'),
            Forms\Components\TextInput::make('specialite'),
            Forms\Components\Select::make('type')->options([
                'formateur' => 'Formateur',
                'direction' => 'Direction',
                'encadrement' => 'Encadrement',
            ])->default('formateur'),
            Forms\Components\Textarea::make('biographie')->rows(3)->columnSpanFull(),
            Forms\Components\FileUpload::make('photo')->image()->directory('equipe')->imageEditor(),
            Forms\Components\Toggle::make('actif')->default(true),
            Forms\Components\TextInput::make('ordre')->numeric()->default(0),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('photo')->circular(),
                Tables\Columns\TextColumn::make('nom_complet')->searchable(),
                Tables\Columns\TextColumn::make('titre'),
                Tables\Columns\TextColumn::make('type')->badge(),
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
            'index' => Pages\ListMembreEquipes::route('/'),
            'create' => Pages\CreateMembreEquipe::route('/create'),
            'edit' => Pages\EditMembreEquipe::route('/{record}/edit'),
        ];
    }
}
