<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ArchivoCotizacionController
{
    public function store(Request $request): JsonResponse
    {
        if (!$request->hasFile('archivo')) {
            return response()->json(['error' => 'Archivo no recibido'], 400);
        }

        $archivo = $request->file('archivo');

        $nombre = Str::slug((string) $request->input('nombre', 'archivo'));
        $random = Str::random(5);
        $extension = strtolower($archivo->getClientOriginalExtension());

        $nombreArchivo = "{$nombre}_{$random}.{$extension}";

        $destino = base_path('../public_html/proyectos');

        // ✅ crea la carpeta donde realmente vas a mover
        if (!file_exists($destino)) {
            mkdir($destino, 0775, true);
        }

        $archivo->move($destino, $nombreArchivo);

        // ✅ OJO: asset() usa tu public actual; si en tu dominio "/proyectos" apunta a public_html/proyectos, ok.
        $urlArchivo = url("/proyectos/{$nombreArchivo}");

        return response()->json([
            'url' => $urlArchivo,
            'nombre' => $nombreArchivo,
        ]);
    }

}

