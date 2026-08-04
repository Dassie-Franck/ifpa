<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::command('candidatures:relancer')->hourly();
Schedule::command('candidatures:expirer')->hourly();
Schedule::command('activitylog:purge-custom')->monthly();
Schedule::command('sanctum:prune-expired-custom')->daily();
