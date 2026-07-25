<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TemoignageResource\Pages;
use App\Models\Temoignage;
use App\Models\Filiere;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use App\Support\UserRoles;
class TemoignageResource extends Resource
{
    protected static ?string $model = Temoignage::class;
    protected static ?string $navigationIcon = 'heroicon-o-chat-bubble-left-right';
    protected static ?string $navigationLabel = 'Témoignages';
    protected static ?string $navigationGroup = 'Contenu du site';
    public static function canViewAny(): bool
{
    return UserRoles::peutGererContenu();
}

public static function canCreate(): bool
{
    return UserRoles::peutGererContenu();
}

public static function canEdit($record): bool
{
    return UserRoles::peutGererContenu();
}

public static function canDelete($record): bool
{
    return UserRoles::peutGererContenu();
}
    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make()->schema([
                Forms\Components\TextInput::make('nom')->required(),
                Forms\Components\TextInput::make('promotion')->placeholder('Ex: Promotion 2024'),
                Forms\Components\Select::make('filiere_id')
                    ->label('Filière')
                    ->options(Filiere::pluck('titre', 'id'))
                    ->searchable(),
                Forms\Components\Textarea::make('citation')->required()->rows(4)->columnSpanFull(),
                Forms\Components\FileUpload::make('photo')->image()->directory('temoignages')->imageEditor(),
                Forms\Components\TextInput::make('video_url')->label('Lien vidéo (optionnel)'),
                Forms\Components\Toggle::make('actif')->default(true),
                Forms\Components\TextInput::make('ordre')->numeric()->default(0),
            ])->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('photo')->circular(),
                Tables\Columns\TextColumn::make('nom')->searchable(),
                Tables\Columns\TextColumn::make('promotion'),
                Tables\Columns\TextColumn::make('filiere.titre')->label('Filière'),
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
            'index' => Pages\ListTemoignages::route('/'),
            'create' => Pages\CreateTemoignage::route('/create'),
            'edit' => Pages\EditTemoignage::route('/{record}/edit'),
        ];
    }

//     public static function canViewAny(): bool
// {
//     return auth()->user()->can('gerer_contenu');
// }
}
