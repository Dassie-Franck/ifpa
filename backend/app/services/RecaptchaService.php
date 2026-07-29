<?php

namespace App\Services;

use ReCaptcha\ReCaptcha;

class RecaptchaService
{
    public function verify(string $token, ?string $remoteIp = null): bool
    {
        $recaptcha = new ReCaptcha(config('services.recaptcha.secret_key'));
        $response = $recaptcha->setExpectedAction('contact')
                              ->setScoreThreshold(0.5)
                              ->verify($token, $remoteIp);

        return $response->isSuccess();
    }
}
