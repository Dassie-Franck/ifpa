<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ImageCompressionService
{
    private ImageManager $manager;

    public function __construct()
    {
        $this->manager = new ImageManager(new Driver());
    }

    /**
     * Compresse et redimensionne une image avant stockage — réduit le poids
     * sans dégrader significativement la qualité visuelle.
     */
    public function compresser(UploadedFile $file, int $largeurMax = 1600, int $qualite = 80): string
    {
        $image = $this->manager->read($file->getRealPath());

        if ($image->width() > $largeurMax) {
            $image->scale(width: $largeurMax);
        }

        return $image->toJpeg($qualite)->toString();
    }
}
