<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FiliereResource\Pages;
use App\Models\Filiere;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class FiliereResource extends Resource
{
    protected static ?string $model = Filiere::class;

    protected static ?string $navigationIcon = 'heroicon-o-academic-cap';

    protected static ?string $navigationLabel = 'Filières';

    protected static ?string $modelLabel = 'Filière';

    protected static ?string $navigationGroup = 'Contenu du site';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Informations générales')
                ->schema([
                    Forms\Components\TextInput::make('titre')
                        ->required()
                        ->maxLength(255)
                        ->live(onBlur: true)
                        ->afterStateUpdated(fn (string $state, callable $set) =>
                            $set('slug', Str::slug($state))
                        ),

                    Forms\Components\TextInput::make('slug')
                        ->required()
                        ->maxLength(255)
                        ->unique(ignoreRecord: true)
                        ->helperText('Généré automatiquement, modifiable si besoin. Utilisé dans l\'URL du site (/formation/soins-infirmiers).'),

                    Forms\Components\TextInput::make('niveau_diplome')
                        ->label('Niveau du diplôme')
                        ->maxLength(255)
                        ->placeholder('Ex: Diplôme d\'État'),

                    Forms\Components\TextInput::make('duree')
                        ->maxLength(255)
                        ->placeholder('Ex: 3 ans'),

                    Forms\Components\Textarea::make('resume')
                        ->label('Résumé (affiché sur les cartes filières)')
                        ->rows(3)
                        ->columnSpanFull(),
                ])->columns(2),

            Forms\Components\Section::make('Contenu détaillé de la fiche filière')
                ->schema([
                    Forms\Components\RichEditor::make('programme_pedagogique')
                        ->label('Programme pédagogique')
                        ->columnSpanFull(),

                    Forms\Components\RichEditor::make('conditions_acces')
                        ->label('Conditions d\'accès')
                        ->columnSpanFull(),

                    Forms\Components\RichEditor::make('debouches')
                        ->label('Débouchés professionnels')
                        ->columnSpanFull(),
                ]),

            Forms\Components\Section::make('Frais et paiement')
                ->schema([
                    Forms\Components\TextInput::make('frais_formation')
                        ->label('Frais de formation (FCFA)')
                        ->numeric()
                        ->prefix('FCFA'),

                    Forms\Components\Textarea::make('modalites_paiement')
                        ->label('Modalités de paiement')
                        ->rows(2),
                ])->columns(2),

            Forms\Components\Section::make('Image et publication')
                ->schema([
                    Forms\Components\FileUpload::make('image_couverture')
                        ->label('Image de couverture')
                        ->image()
                        ->directory('filieres')
                        ->imageEditor(),

                    Forms\Components\Toggle::make('admissions_ouvertes')
                        ->label('Admissions ouvertes')
                        ->default(true),

                    Forms\Components\Toggle::make('actif')
                        ->label('Filière visible sur le site')
                        ->default(true),

                    Forms\Components\TextInput::make('ordre')
                        ->label('Ordre d\'affichage')
                        ->numeric()
                        ->default(0),
                ])->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image_couverture')
                    ->label('')
                    ->circular(),

                Tables\Columns\TextColumn::make('titre')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('niveau_diplome')
                    ->label('Niveau')
                    ->badge(),

                Tables\Columns\TextColumn::make('duree'),

                Tables\Columns\IconColumn::make('admissions_ouvertes')
                    ->label('Admissions')
                    ->boolean(),

                Tables\Columns\IconColumn::make('actif')
                    ->label('Visible')
                    ->boolean(),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Créée le')
                    ->dateTime('d/m/Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('actif')
                    ->label('Visible sur le site'),
                Tables\Filters\TernaryFilter::make('admissions_ouvertes'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->reorderable('ordre')
            ->defaultSort('ordre');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListFilieres::route('/'),
            'create' => Pages\CreateFiliere::route('/create'),
            'edit' => Pages\EditFiliere::route('/{record}/edit'),
        ];
    }
}
