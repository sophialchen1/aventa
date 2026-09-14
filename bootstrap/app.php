<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

$app = Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();

/*
 * Shared hosting: the document root is a sibling of this project, not this
 * project's own public/ folder.
 *
 *   /home/aveniqck/aventa        <- this application (base path)
 *   /home/aveniqck/public_html   <- what visitors actually reach (document root)
 *
 * Without this, public_path() resolves to aventa/public, so @vite() reads its
 * manifest from aventa/public/build/manifest.json while the browser downloads
 * the hashed asset files from public_html/build/. Those two directories then
 * have to be kept in sync by hand, and when they drift, Laravel emits the
 * previous build's filenames, the browser finds those old files still sitting
 * there, and the site silently serves the old version with no error.
 *
 * Pointing public_path() at the real document root means one upload location
 * and no drift.
 *
 * The is_dir() guard keeps local development untouched: there is no
 * public_html sibling on a developer machine, so Laravel falls back to its
 * normal behaviour and public/ is used as usual.
 */
$documentRoot = dirname(__DIR__, 2) . '/public_html';

if (is_dir($documentRoot)) {
    $app->usePublicPath($documentRoot);
}

return $app;
