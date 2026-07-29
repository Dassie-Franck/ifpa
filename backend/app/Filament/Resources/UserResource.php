<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Models\User;
use App\Support\UserRoles;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Hash;

class UserResource extends Resource
{
    protected static ?string $model = User::class;
    protected static ?string $navigationIcon = 'heroicon-o-users';
    protected static ?string $navigationLabel = 'Utilisateurs internes';
    protected static ?string $navigationGroup = 'Administration';

    public static function canViewAny(): bool
    {
        return UserRoles::peutGererUtilisateurs();
    }

    public static function canCreate(): bool
    {
        return UserRoles::peutGererUtilisateurs();
    }

    public static function canEdit($record): bool
    {
        return UserRoles::peutGererUtilisateurs();
    }

    public static function canDelete($record): bool
    {
        return UserRoles::peutGererUtilisateurs();
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('name')->label('Nom complet')->required(),
            Forms\Components\TextInput::make('email')->email()->required()->unique(ignoreRecord: true),
            Forms\Components\Select::make('role')
                ->options([
                    UserRoles::ADMIN => 'Administrateur général',
                    UserRoles::AGENT_ADMISSIONS => 'Agent des admissions',
                    UserRoles::GESTIONNAIRE_CONTENU => 'Gestionnaire de contenu',
                ])
                ->required(),
            Forms\Components\TextInput::make('password')
                ->password()
                ->dehydrateStateUsing(fn ($state) => Hash::make($state))
                ->dehydrated(fn ($state) => filled($state))
                ->required(fn (string $context) => $context === 'create')
                ->label('Mot de passe'),
            Forms\Components\Toggle::make('actif')->default(true),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->label('Nom')->searchable(),
                Tables\Columns\TextColumn::make('email')->searchable(),
                Tables\Columns\TextColumn::make('role')
                    ->badge()
                    ->formatStateUsing(fn (string $state) => match ($state) {
                        UserRoles::ADMIN => 'Administrateur',
                        UserRoles::AGENT_ADMISSIONS => 'Agent admissions',
                        UserRoles::GESTIONNAIRE_CONTENU => 'Gestionnaire contenu',
                        default => $state,
                    }),
                Tables\Columns\IconColumn::make('actif')->boolean(),
            ])
            ->actions([Tables\Actions\EditAction::make(), Tables\Actions\DeleteAction::make()])
            ->bulkActions([Tables\Actions\BulkActionGroup::make([Tables\Actions\DeleteBulkAction::make()])]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }
    public static function getEloquentQuery(): \Illuminate\Database\Eloquent\Builder
{
    return parent::getEloquentQuery()->whereIn('role', [
        \App\Support\UserRoles::ADMIN,
        \App\Support\UserRoles::AGENT_ADMISSIONS,
        \App\Support\UserRoles::GESTIONNAIRE_CONTENU,
    ]);
}
}
