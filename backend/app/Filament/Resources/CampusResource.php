<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CampusResource\Pages;
use App\Models\Campus;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;
use App\Support\UserRoles;
class CampusResource extends Resource
{
    protected static ?string $model = Campus::class;
    protected static ?string $navigationIcon = 'heroicon-o-building-office-2';
    protected static ?string $navigationLabel = 'Campus / Sites';
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
                Forms\Components\TextInput::make('nom')
                    ->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn (string $state, callable $set) => $set('slug', Str::slug($state))),
                Forms\Components\TextInput::make('slug')->required()->unique(ignoreRecord: true),
                Forms\Components\Textarea::make('description')->rows(3)->columnSpanFull(),
                Forms\Components\TextInput::make('adresse'),
                Forms\Components\TextInput::make('ville'),
                Forms\Components\TextInput::make('telephone'),
                Forms\Components\TextInput::make('whatsapp')->helperText('Format international, ex: 237600000000'),
                Forms\Components\TextInput::make('email')->email(),
                Forms\Components\TextInput::make('latitude')->numeric(),
                Forms\Components\TextInput::make('longitude')->numeric(),
            ])->columns(2),

            Forms\Components\Section::make('Médias et publication')->schema([
                Forms\Components\FileUpload::make('image_couverture')->image()->directory('campus')->imageEditor(),
                Forms\Components\FileUpload::make('galerie_images')->image()->multiple()->directory('campus/galerie'),
                Forms\Components\Toggle::make('actif')->default(true),
                Forms\Components\TextInput::make('ordre')->numeric()->default(0),
            ])->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image_couverture')->label('')->circular(),
                Tables\Columns\TextColumn::make('nom')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('ville'),
                Tables\Columns\TextColumn::make('telephone'),
                Tables\Columns\IconColumn::make('actif')->boolean(),
            ])
            ->actions([Tables\Actions\EditAction::make(), Tables\Actions\DeleteAction::make()])
            ->bulkActions([Tables\Actions\BulkActionGroup::make([Tables\Actions\DeleteBulkAction::make()])])
            ->reorderable('ordre')
            ->defaultSort('ordre');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCampuses::route('/'),
            'create' => Pages\CreateCampus::route('/create'),
            'edit' => Pages\EditCampus::route('/{record}/edit'),
        ];
    }

}
