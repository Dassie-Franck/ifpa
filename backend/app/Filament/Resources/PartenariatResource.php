<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PartenariatResource\Pages;
use App\Models\Partenariat;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class PartenariatResource extends Resource
{
    protected static ?string $model = Partenariat::class;
    protected static ?string $navigationIcon = 'heroicon-o-building-office';
    protected static ?string $navigationLabel = 'Partenariats & stages';
    protected static ?string $navigationGroup = 'Contenu du site';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Informations sur la structure')
                ->schema([
                    Forms\Components\TextInput::make('nom_structure')
                        ->label('Nom de la structure')
                        ->required()
                        ->placeholder('Ex: Hôpital Général de Douala'),

                    Forms\Components\Select::make('type')
                        ->options([
                            'structure_stage' => 'Structure de stage',
                            'partenaire_institutionnel' => 'Partenaire institutionnel',
                            'employeur' => 'Employeur',
                        ])
                        ->required()
                        ->default('structure_stage'),

                    Forms\Components\TextInput::make('ville'),

                    Forms\Components\TextInput::make('nombre_etudiants_accueillis')
                        ->label('Nombre d\'étudiants accueillis')
                        ->numeric()
                        ->helperText('Toutes promotions confondues, à titre indicatif'),

                    Forms\Components\FileUpload::make('logo')
                        ->image()
                        ->directory('partenariats')
                        ->columnSpanFull(),

                    Forms\Components\Textarea::make('description')
                        ->rows(3)
                        ->columnSpanFull()
                        ->placeholder('Présentation courte du partenariat et de la collaboration avec l\'IFPA'),
                ])->columns(2),

            Forms\Components\Section::make('Témoignage (optionnel)')
                ->schema([
                    Forms\Components\TextInput::make('temoignage_auteur')
                        ->label('Auteur du témoignage')
                        ->placeholder('Ex: Dr. Fotso, Directeur médical'),

                    Forms\Components\FileUpload::make('temoignage_photo')
                        ->image()
                        ->directory('partenariats/temoignages'),

                    Forms\Components\Textarea::make('temoignage_citation')
                        ->label('Citation')
                        ->rows(3)
                        ->columnSpanFull(),
                ])->columns(2)
                ->collapsed(),

            Forms\Components\Section::make('Publication')
                ->schema([
                    Forms\Components\Toggle::make('actif')->default(true),
                    Forms\Components\TextInput::make('ordre')->numeric()->default(0),
                ])->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->poll('30s')
            ->columns([
                Tables\Columns\ImageColumn::make('logo')->label(''),
                Tables\Columns\TextColumn::make('nom_structure')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('type')->badge(),
                Tables\Columns\TextColumn::make('ville'),
                Tables\Columns\TextColumn::make('nombre_etudiants_accueillis')
                    ->label('Étudiants accueillis')
                    ->alignCenter(),
                Tables\Columns\IconColumn::make('actif')->boolean(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('type')->options([
                    'structure_stage' => 'Structure de stage',
                    'partenaire_institutionnel' => 'Partenaire institutionnel',
                    'employeur' => 'Employeur',
                ]),
                Tables\Filters\TernaryFilter::make('actif'),
            ])
            ->actions([Tables\Actions\EditAction::make(), Tables\Actions\DeleteAction::make()])
            ->bulkActions([Tables\Actions\BulkActionGroup::make([Tables\Actions\DeleteBulkAction::make()])])
            ->reorderable('ordre')
            ->defaultSort('ordre');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPartenariats::route('/'),
            'create' => Pages\CreatePartenariat::route('/create'),
            'edit' => Pages\EditPartenariat::route('/{record}/edit'),
        ];
    }
}
