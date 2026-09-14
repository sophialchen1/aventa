import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.js"],
            refresh: true,
        }),
        vue(),
        tailwindcss(),
    ],
    build: {
        outDir: "public/build",
        emptyOutDir: true,
        chunkSizeWarningLimit: Infinity, // aumenta el límite a 1MB
        rollupOptions: {
            output: {
                manualChunks: {
                    vue: ["vue", "vue-router"],
                    vendor: ["vue-3d-loader", "lodash"], // puedes agregar más librerías aquí
                },
            },
        },
    },
});
