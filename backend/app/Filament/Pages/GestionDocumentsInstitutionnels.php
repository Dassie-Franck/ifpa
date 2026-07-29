<?php

namespace App\Filament\Pages;

use App\Models\DocumentInstitutionnel;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Pages\Page;
use Filament\Notifications\Notification;

class GestionDocumentsInstitutionnels extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    protected static ?string $navigationLabel = 'Documents institutionnels';
    protected static ?string $navigationGroup = 'Contenu du site';
    protected static string $view = 'filament.pages.gestion-documents-institutionnels';

    public ?array $data = [];

    public function mount(): void
    {
        $document = DocumentInstitutionnel::instance();
        $this->form->fill($document->toArray());
    }

    public function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Fiche d\'inscription')
                ->description('Ces 2 documents sont proposés au téléchargement sur le site, sur la page Admission.')
                ->schema([
                    Forms\Components\FileUpload::make('fiche_inscription_vierge')
                        ->label('Fiche d\'inscription vierge (à remplir à la main)')
                        ->acceptedFileTypes(['application/pdf'])
                        ->directory('documents-institutionnels')
                        ->required(),

                    Forms\Components\FileUpload::make('fiche_inscription_modele')
                        ->label('Fiche d\'inscription modèle (exemple déjà rempli)')
                        ->acceptedFileTypes(['application/pdf'])
                        ->directory('documents-institutionnels')
                        ->required(),
                ])->columns(2),
        ])->statePath('data');
    }

    public function save(): void
    {
        $data = $this->form->getState();
        DocumentInstitutionnel::instance()->update($data);

        Notification::make()
            ->title('Documents mis à jour avec succès')
            ->success()
            ->send();
    }
}
