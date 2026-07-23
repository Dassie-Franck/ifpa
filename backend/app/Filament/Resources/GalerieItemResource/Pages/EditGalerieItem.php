<?php

namespace App\Filament\Resources\GalerieItemResource\Pages;

use App\Filament\Resources\GalerieItemResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditGalerieItem extends EditRecord
{
    protected static string $resource = GalerieItemResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
