<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ActualiteResource\Pages;
use App\Models\Actualite;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;
use App\Support\UserRoles;
class ActualiteResource extends Resource
{
    protected static ?string $model = Actualite::class;
    protected static ?string $navigationIcon = 'heroicon-o-newspaper';
    protected static ?string $navigationLabel = 'Actualités';
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
                Forms\Components\TextInput::make('titre')
                    ->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn (string $state, callable $set) => $set('slug', Str::slug($state)))
                    ->columnSpanFull(),
                Forms\Components\TextInput::make('slug')->required()->unique(ignoreRecord: true)->columnSpanFull(),
                Forms\Components\Textarea::make('extrait')->rows(2)->columnSpanFull(),
                Forms\Components\RichEditor::make('contenu')->required()->columnSpanFull(),
                Forms\Components\Select::make('categorie')->options([
                    'rentree' => 'Rentrée',
                    'evenement' => 'Événement',
                    'portes_ouvertes' => 'Portes ouvertes',
                    'resultats' => 'Résultats',
                    'partenariat' => 'Partenariat',
                ]),
                Forms\Components\FileUpload::make('image_couverture')->image()->directory('actualites')->imageEditor(),
                Forms\Components\Toggle::make('publie')->default(false),
                Forms\Components\DateTimePicker::make('date_publication'),
            ])->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image_couverture')->label(''),
                Tables\Columns\TextColumn::make('titre')->searchable()->limit(40),
                Tables\Columns\TextColumn::make('categorie')->badge(),
                Tables\Columns\IconColumn::make('publie')->boolean(),
                Tables\Columns\TextColumn::make('date_publication')->dateTime('d/m/Y')->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->actions([Tables\Actions\EditAction::make(), Tables\Actions\DeleteAction::make()])
            ->bulkActions([Tables\Actions\BulkActionGroup::make([Tables\Actions\DeleteBulkAction::make()])]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListActualites::route('/'),
            'create' => Pages\CreateActualite::route('/create'),
            'edit' => Pages\EditActualite::route('/{record}/edit'),
        ];
    }


}
