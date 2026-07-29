<?php

namespace App\Filament\Resources\PartenariatResource\Pages;

use App\Filament\Resources\PartenariatResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListPartenariats extends ListRecords
{
    protected static string $resource = PartenariatResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
