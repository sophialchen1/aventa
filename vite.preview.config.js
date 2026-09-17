// Local preview server. Run with: npm run preview
//
// The live site boots through Laravel, which needs PHP installed. This config
// skips Laravel and lets Vite serve the Vue app straight from index.html, so
// previewing only needs Node. `npm run build` does not use this file, and
// index.html is not part of the production build.
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [vue(), tailwindcss()],
    // laravel-vite-plugin normally supplies this alias; we are not loading it here
    resolve: { alias: { "@": "/resources/js" } },
    server: { port: 5173 },
    // public/ is served at the web root, so /media/... resolves as it does live
    publicDir: "public",
});
