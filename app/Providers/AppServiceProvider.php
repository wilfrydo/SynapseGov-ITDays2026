<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Keep development email local, while preserving reset links for testing.
        if (app()->environment('local', 'development')) {
            config(['mail.default' => 'log']);
        }
    }
}
