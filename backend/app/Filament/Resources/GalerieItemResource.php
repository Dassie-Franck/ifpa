<?php

namespace App\Filament\Resources;

use App\Filament\Resources\GalerieItemResource\Pages;
use App\Models\GalerieItem;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use App\Support\UserRoles;
class GalerieItemResource extends Resource
{
    protected static ?string $model = GalerieItem::class;
    protected static ?string $navigationIcon = 'heroicon-o-photo';
    protected static ?string $navigationLabel = 'Galerie';
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
        Forms\Components\TextInput::make('titre'),
        Forms\Components\Select::make('type')
            ->options(['photo' => 'Photo', 'video' => 'Vidéo'])
            ->default('photo')
            ->live()
            ->required(),
        Forms\Components\Select::make('categorie')->options([
            'locaux' => 'Locaux',
            'evenements' => 'Événements',
            'vie_etudiante' => 'Vie étudiante',
            'remise_diplomes' => 'Remise de diplômes',
        ])->default('locaux'),

        Forms\Components\FileUpload::make('fichier')
            ->label('Image')
            ->image()
            ->directory('galerie')
            ->visible(fn (callable $get) => $get('type') === 'photo')
            ->required(fn (callable $get) => $get('type') === 'photo'),

        Forms\Components\Radio::make('source_video')
            ->label('Source de la vidéo')
            ->options([
                'upload' => 'Uploader un fichier vidéo',
                'lien' => 'Lien YouTube / Vimeo',
            ])
            ->default('lien')
            ->live()
            ->visible(fn (callable $get) => $get('type') === 'video')
            ->dehydrated(false),

        Forms\Components\FileUpload::make('fichier')
            ->label('Fichier vidéo (MP4)')
            ->acceptedFileTypes(['video/mp4', 'video/webm'])
            ->directory('galerie/videos')
            ->visible(fn (callable $get) => $get('type') === 'video' && $get('source_video') === 'upload')
            ->required(fn (callable $get) => $get('type') === 'video' && $get('source_video') === 'upload'),

        Forms\Components\TextInput::make('fichier')
            ->label('URL de la vidéo (YouTube, Vimeo...)')
            ->placeholder('https://www.youtube.com/watch?v=...')
            ->visible(fn (callable $get) => $get('type') === 'video' && $get('source_video') === 'lien')
            ->required(fn (callable $get) => $get('type') === 'video' && $get('source_video') === 'lien'),

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

//     public static function canViewAny(): bool
// {
//     return auth()->user()->can('gerer_contenu');
// }
}
