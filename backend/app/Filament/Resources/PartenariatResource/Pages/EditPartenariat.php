<?php

namespace App\Filament\Resources\PartenariatResource\Pages;

use App\Filament\Resources\PartenariatResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditPartenariat extends EditRecord
{
    protected static string $resource = PartenariatResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
