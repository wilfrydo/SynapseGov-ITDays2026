<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DisableEmailInDevelopment
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Do not discard password reset messages in development.
        if (app()->environment('local', 'development')) {
            config(['mail.default' => 'log']);
        }

        return $next($request);
    }
}
