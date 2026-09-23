const routes = [
    {
        path: "/",
        name: "inicio",
        component: () => import("../pages/Inicio.vue"),
        meta: {
            titleKey: "seo_home_title",
            descKey: "seo_home_desc",
            canonical: "https://www.aventawindows.com"
        }
    },
    {
        path: "/ventanas",
        name: "ventanas",
        component: () => import("../pages/Ventanas.vue"),
        meta: {
            titleKey: "seo_ventanas_title",
            descKey: "seo_ventanas_desc",
            canonical: "https://www.aventawindows.com/ventanas"
        }
    },
    {
        path: "/puertas",
        name: "puertas",
        component: () => import("../pages/Puertas.vue"),
        meta: {
            titleKey: "seo_puertas_title",
            descKey: "seo_puertas_desc",
            canonical: "https://www.aventawindows.com/puertas"
        }
    },
    {
        path: "/contacto",
        name: "contacto",
        component: () => import("../pages/Contacto.vue"),
        meta: {
            titleKey: "seo_contacto_title",
            descKey: "seo_contacto_desc",
            canonical: "https://www.aventawindows.com/contacto"
        }
    },
    {
        path: "/catalogo",
        name: "catalogo",
        component: () => import("../pages/Catalogo.vue"),
        meta: {
            titleKey: "seo_catalogo_title",
            descKey: "seo_catalogo_desc",
            canonical: "https://www.aventawindows.com/catalogo"
        }
    },
    {
        path: "/planea-visita",
        name: "planeav",
        component: () => import("../pages/PlaneaVisita.vue"),
        meta: {
            titleKey: "seo_visita_title",
            descKey: "seo_visita_desc",
            canonical: "https://www.aventawindows.com/planea-visita"
        }
    },
    {
        path: "/aviso-privacidad",
        name: "aviso-privacidad",
        component: () => import("../pages/AvisoPrivacidad.vue"),
        meta: {
            titleKey: "seo_privacidad_title",
            canonical: "https://www.aventawindows.com/aviso-privacidad"
        }
    },
    {
        path: "/condiciones-venta",
        name: "condiciones-venta",
        component: () => import("../pages/CondicionesVenta.vue"),
        meta: {
            titleKey: "seo_venta_title",
            canonical: "https://www.aventawindows.com/condiciones-venta"
      }
    },
    {
        path: "/condiciones-compra",
        name: "condiciones-compra",
        component: () => import("../pages/TerminosCompra.vue"),
        meta: {
            titleKey: "seo_compra_title",
            canonical: "https://www.aventawindows.com/condiciones-compra"
        }
    },
    {
        path: "/politica-de-garantia",
        name: "politica-de-garantia",
        component: () => import("../pages/PoliticaGarantia.vue"),
        meta: {
            titleKey: "seo_garantia_title",
            canonical: "https://www.aventawindows.com/politica-de-garantia"
        }
    },
    {
        path: "/merida",
        name: "Merida",
        component: () => import("../pages/Merida.vue"),
        meta: {
            titleKey: "seo_merida_title",
            descKey: "seo_merida_desc",
            canonical: "https://www.aventawindows.com/merida",

            // Open Graph
            ogType: "website",
            ogUrl: "https://www.aventawindows.com/merida",
            ogImage: "https://www.aventawindows.com/build/assets/puertas_aventa-Db__J6Vz.png",
            ogTitleKey: "seo_merida_og_title",
            ogDescriptionKey: "seo_merida_og_desc",

            // (Opcional) Twitter Cards
            twitterCard: "summary_large_image",
            twitterTitleKey: "seo_merida_title",
            twitterDescriptionKey: "seo_merida_tw_desc",
            twitterImage: "https://www.aventawindows.com/build/assets/puertas_aventa-Db__J6Vz.png",
            twitterSite: "@TuCuentaSiAplica",

            // (Opcional) JSON-LD para SEO
            ldJson: {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "Aventa Windows - Mérida",
                "url": "https://www.aventawindows.com/merida",
                "image": "https://www.aventawindows.com/build/assets/puertas_aventa-Db__J6Vz.png",
                "description": "Ventanas y puertas de madera de lujo en Mérida.",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Mérida",
                    "addressRegion": "Yucatán",
                    "addressCountry": "MX"
                }
            }
        }
    },
    {
      path: "/design-experience",
      name: "Design Experience",
      component: () => import("../pages/DesignExperience.vue"),
      meta: {
          titleKey: "seo_design_title",
          descKey: "seo_design_desc",
          canonical: "https://www.aventawindows.com/design-experience"
      }
    },
    {
        path: "/inspiracion",
        name: "inspiracion",
        component: () => import("../pages/Inspiracion.vue"),
        meta: {
            titleKey: "seo_inspiracion_title",
            descKey: "seo_inspiracion_desc",
            canonical: "https://www.aventawindows.com/inspiracion"
        }
    },
    {
        path: "/recursos-profesionales",
        name: "Recursos Profesionales",
        component: () => import("../pages/RecursosProfesionales.vue"),
        meta: {
            titleKey: "seo_recursos_title",
            descKey: "seo_recursos_desc",
            canonical: "https://www.aventawindows.com/recursos-profesionales",
            // Built from the same faq keys the page renders, so the markup and
            // the visible questions cannot drift apart. Google requires them to
            // match.
            ldJson: (t) => ({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: Array.from({ length: 10 }, (_, i) => ({
                    "@type": "Question",
                    name: t(`faq${i + 1}_q`),
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: t(`faq${i + 1}_a`),
                    },
                })),
            })
        }
    },
    {
        path: "/:pathMatch",
        name: "NotFound",
        component: () => import("../layouts/NotFound.vue"),
        meta: {
            titleKey: "seo_notfound_title",
            noindex: true
        }
    },
];

export default routes;
