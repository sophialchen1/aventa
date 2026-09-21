import { createRouter, createWebHistory } from "vue-router";
import { watch } from "vue";
import { useHead } from "@vueuse/head";
import { i18n } from "./i18n.js";
import routes from "./routes.js";

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition;

        if (to.hash) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        el: to.hash,
                        top: 110,
                        behavior: "smooth",
                    });
                }, 400);
            });
        }

        return { top: 0 };
    }
});

router.afterEach((to, from) => {
    let attempts = 0;
    const maxAttempts = 10;
    const delay = 300;

    const retry = () => {
        if (window._hsq) {
            window._hsq.push(["setPath", to.fullPath]);
            window._hsq.push(["trackPageView"]);
        } else if (attempts < maxAttempts) {
            attempts++;
            setTimeout(retry, delay);
        } else {
            console.warn("HubSpot script no cargó después de varios intentos.");
        }
    };

    retry();
});

// Page titles and descriptions live in the locale files, like the rest of the
// copy, and routes.js holds the key names. Re-applied when the visitor switches
// language, so an English visitor does not get a Spanish tab or link preview.
const { t, te, locale } = i18n.global;

function text(key, fallback = "") {
    return key && te(key) ? t(key) : fallback;
}

function headInput(route) {
    const m = route.meta || {};
    const title = text(m.titleKey, "Aventa Windows");
    const description = text(m.descKey, t("seo_default_desc"));
    return {
        htmlAttrs: { lang: locale.value },
        title,
        meta: [
            { name: "description", content: description },
            { property: "og:title", content: text(m.ogTitleKey, title) },
            { property: "og:description", content: text(m.ogDescriptionKey, description) },
            { property: "og:type", content: m.ogType || "website" },
            { property: "og:url", content: m.ogUrl || m.canonical || "https://www.aventawindows.com" },
            { property: "og:image", content: m.ogImage || "https://www.aventawindows.com/default-og.jpg" },
            { property: "og:locale", content: locale.value === "es" ? "es_MX" : "en_US" },
            { name: "twitter:card", content: m.twitterCard || "summary_large_image" },
            { name: "twitter:title", content: text(m.twitterTitleKey, title) },
            { name: "twitter:description", content: text(m.twitterDescriptionKey, description) },
            { name: "twitter:image", content: m.twitterImage || m.ogImage || "https://www.aventawindows.com/default-og.jpg" },
            ...(m.twitterSite ? [{ name: "twitter:site", content: m.twitterSite }] : []),
        ],
        link: [{ rel: "canonical", href: m.canonical || "https://www.aventawindows.com" }],
        script: m.ldJson
            ? [{ type: "application/ld+json", children: JSON.stringify(m.ldJson) }]
            : [],
    };
}

// One head entry, patched in place. Calling useHead on every navigation would
// stack a new entry each time.
let headEntry = null;
function applyHead(route) {
    const input = headInput(route);
    if (headEntry && typeof headEntry.patch === "function") headEntry.patch(input);
    else headEntry = useHead(input);
}

router.afterEach((to) => applyHead(to));
watch(locale, () => applyHead(router.currentRoute.value));

export default router;
