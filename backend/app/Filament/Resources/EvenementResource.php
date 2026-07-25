<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EvenementResource\Pages;
use App\Models\Evenement;
use App\Models\Campus;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;
use App\Support\UserRoles;
class EvenementResource extends Resource
{
    protected static ?string $model = Evenement::class;
    protected static ?string $navigationIcon = 'heroicon-o-calendar';
    protected static ?string $navigationLabel = 'Événements';
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
                Forms\Components\Textarea::make('description')->rows(3)->columnSpanFull(),
                Forms\Components\DateTimePicker::make('date_debut')->required(),
                Forms\Components\DateTimePicker::make('date_fin'),
                Forms\Components\TextInput::make('lieu'),
                Forms\Components\Select::make('campus_id')
                    ->label('Campus')
                    ->options(Campus::pluck('nom', 'id'))
                    ->searchable(),
                Forms\Components\FileUpload::make('image_couverture')->image()->directory('evenements')->imageEditor()->columnSpanFull(),
                Forms\Components\Toggle::make('inscription_requise')->default(false),
                Forms\Components\Toggle::make('actif')->default(true),
            ])->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image_couverture')->label(''),
                Tables\Columns\TextColumn::make('titre')->searchable(),
                Tables\Columns\TextColumn::make('date_debut')->dateTime('d/m/Y H:i')->sortable(),
                Tables\Columns\TextColumn::make('campus.nom')->label('Campus'),
                Tables\Columns\IconColumn::make('inscription_requise')->boolean(),
                Tables\Columns\IconColumn::make('actif')->boolean(),
            ])
            ->defaultSort('date_debut', 'desc')
            ->actions([Tables\Actions\EditAction::make(), Tables\Actions\DeleteAction::make()])
            ->bulkActions([Tables\Actions\BulkActionGroup::make([Tables\Actions\DeleteBulkAction::make()])]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListEvenements::route('/'),
            'create' => Pages\CreateEvenement::route('/create'),
            'edit' => Pages\EditEvenement::route('/{record}/edit'),
        ];
    }
//     public static function canViewAny(): bool
// {
//     return auth()->user()->can('gerer_contenu');
// }
}
