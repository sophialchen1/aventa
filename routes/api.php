<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArchivoCotizacionController;

Route::post('/guardar-archivo',[ArchivoCotizacionController::class,'store']);
