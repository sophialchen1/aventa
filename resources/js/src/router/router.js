import { createRouter, createWebHistory } from "vue-router";
import {useHead} from "@vueuse/head";
import routes from "./routes.js";

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to) {
        if (to.hash){
            return {
                el: to.hash,
                top: 150,
                behavior: 'smooth'
            }
        }
        return { top: 0 };
    },
});

router.afterEach((to, from) => {
    let attempts = 0;
    const maxAttempts = 10;
    const delay = 300; // ms

    const retry = () => {
        if (window._hsq) {
            window._hsq.push(['setPath', to.fullPath]);
            window._hsq.push(['trackPageView']);
        } else if (attempts < maxAttempts) {
            attempts++;
            setTimeout(retry, delay);
        } else {
            console.warn("HubSpot script no cargó después de varios intentos.");
        }
    };

    retry();
});

router.afterEach((to) => {
    const m = to.meta || {}

    useHead({
        title: m.title || 'Aventa Windows',
        meta: [
            // Description base
            { name: 'description', content: m.description || 'Aventa Windows, puertas y ventanas personalizadas en madera de alta calidad.' },

            // Open Graph
            { property: 'og:title', content: m.ogTitle || m.title || 'Aventa Windows' },
            { property: 'og:description', content: m.ogDescription || m.description || '' },
            { property: 'og:type', content: m.ogType || 'website' },
            { property: 'og:url', content: m.ogUrl || m.canonical || 'https://www.aventawindows.com' },
            { property: 'og:image', content: m.ogImage || 'https://www.aventawindows.com/default-og.jpg' },

            // Twitter Card (opcional pero recomendado)
            { name: 'twitter:card', content: m.twitterCard || 'summary_large_image' },
            { name: 'twitter:title', content: m.twitterTitle || m.title || 'Aventa Windows' },
            { name: 'twitter:description', content: m.twitterDescription || m.description || '' },
            { name: 'twitter:image', content: m.twitterImage || m.ogImage || 'https://www.aventawindows.com/default-og.jpg' },
            ...(m.twitterSite ? [{ name: 'twitter:site', content: m.twitterSite }] : []),
        ],
        link: [
            { rel: 'canonical', href: m.canonical || 'https://www.aventawindows.com' }
        ],
        // JSON-LD (si lo definiste)
        script: m.ldJson ? [
            { type: 'application/ld+json', children: JSON.stringify(m.ldJson) }
        ] : []
    })
})


export default router;
