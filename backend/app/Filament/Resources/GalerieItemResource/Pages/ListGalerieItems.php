<?php

namespace App\Filament\Resources\GalerieItemResource\Pages;

use App\Filament\Resources\GalerieItemResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListGalerieItems extends ListRecords
{
    protected static string $resource = GalerieItemResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
