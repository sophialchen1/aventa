const routes = [
    {
        path: "/",
        name: "inicio",
        component: () => import("../pages/Inicio.vue"),
        meta: {
            title: "Puertas y Ventanas de Madera Termoacústicas | Aventa Windows",
            description: "Diseñamos puertas y ventanas de madera sólida termoacústicas para quienes buscan confort, diseño y eficiencia. Calidad superior desde México.",
            canonical: "https://www.aventawindows.com"
        }
    },
    {
        path: "/config-diseno",
        name: "configd",
        component: () => import("../components/ConfigDiseños.vue"),
    },
    {
        path: "/ventanas",
        name: "ventanas",
        component: () => import("../pages/Ventanas.vue"),
        meta: {
            title: "Ventanas de Madera con Aislamiento Termoacústico | Aventa Windows",
            description: "Ventanas termoacústicas en madera sólida: diseño, aislamiento y durabilidad. Hechas a medida para proyectos arquitectónicos exigentes.",
            canonical: "https://www.aventawindows.com/ventanas"
        }
    },
    {
        path: "/puertas",
        name: "puertas",
        component: () => import("../pages/Puertas.vue"),
        meta: {
            title: "Puertas de Madera Termoacústicas Premium | Aventa Windows",
            description: "Descubre nuestras puertas termoacústicas: diseño exclusivo, aislamiento superior y acabados de alto nivel para espacios residenciales y comerciales.",
            canonical: "https://www.aventawindows.com/puertas"
        }
    },
    {
        path: "/contacto",
        name: "contacto",
        component: () => import("../pages/Contacto.vue"),
        meta: {
            title: "Contáctanos para Cotizar Puertas y Ventanas | Aventa Windows",
            description: "Déjanos tus datos y recibe asesoría personalizada. Cotiza puertas y ventanas de madera termoacústicas o agenda una visita con nuestro equipo.",
            canonical: "https://www.aventawindows.com/contacto"
        }
    },
    {
        path: "/catalogo",
        name: "catalogo",
        component: () => import("../pages/Catalogo.vue"),
        meta: {
            title: "Catálogo de Puertas y Ventanas de Madera | Aventa Windows",
            description: "Explora nuestro catálogo digital de puertas y ventanas termoacústicas. Modelos, acabados y configuraciones para cada tipo de proyecto.",
            canonical: "https://www.aventawindows.com/catalogo"
        }
    },
    {
        path: "/planea-visita",
        name: "planeav",
        component: () => import("../pages/PlaneaVisita.vue"),
        meta: {
            title: "Visita Nuestro Showroom en CDMX | Aventa Windows",
            description: "Agenda una cita en nuestro showroom en Santa Fe. Conoce nuestras puertas y ventanas en persona y vive la experiencia termoacústica.",
            canonical: "https://www.aventawindows.com/planea-visita"
        }
    },
    {
        path: "/aviso-privacidad",
        name: "aviso-privacidad",
        component: () => import("../pages/AvisoPrivacidad.vue"),
        meta: {
            title: "Aviso Privacidad | Aventa Windows",
            description: "",
            canonical: "https://www.aventawindows.com/aviso-privacidad"
        }
    },
    {
        path: "/condiciones-venta",
        name: "condiciones-venta",
        component: () => import("../pages/CondicionesVenta.vue"),
        meta: {
            title: "Condiciones venta | Aventa Windows",
            description: "",
            canonical: "https://www.aventawindows.com/condiciones-venta"
      }
    },
    {
        path: "/condiciones-compra",
        name: "condiciones-compra",
        component: () => import("../pages/TerminosCompra.vue"),
        meta: {
            title: "Condiciones compra | Aventa Windows",
            description: "",
            canonical: "https://www.aventawindows.com/condiciones-compra"
        }
    },
    {
        path: "/politica-de-garantia",
        name: "politica-de-garantia",
        component: () => import("../pages/PoliticaGarantia.vue"),
        meta: {
            title: "Politica Garantia | Aventa Windows",
            description: "",
            canonical: "https://www.aventawindows.com/politica-de-garantia"
        }
    },
    {
        path: "/merida",
        name: "Merida",
        component: () => import("../pages/Merida.vue"),
        meta: {
            title: "Inauguración Aventa Windows Mérida | Ventanas y Puertas de Lujo",
            description: "Descubre la nueva sucursal de Aventa Windows en Mérida. Ventanas y puertas de madera de lujo, termoacústicas, anti ruido y de alta calidad. ¡Gran inauguración!",
            canonical: "https://www.aventawindows.com/merida",

            // Open Graph
            ogType: "website",
            ogUrl: "https://www.aventawindows.com/merida",
            ogImage: "https://www.aventawindows.com/build/assets/puertas_aventa-Db__J6Vz.png",
            ogTitle: "Inauguración de Aventa Windows en Mérida",
            ogDescription: "¡Aventa Windows llega a Mérida! Conoce nuestras exclusivas ventanas y puertas de madera de lujo y alta calidad.",

            // (Opcional) Twitter Cards
            twitterCard: "summary_large_image",
            twitterTitle: "Inauguración Aventa Windows Mérida | Ventanas y Puertas de Lujo",
            twitterDescription: "Descubre la nueva sucursal de Aventa Windows en Mérida.",
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
      meta: {}
    },
    {
        path: "/inspiracion",
        name: "inspiracion",
        component: () => import("../pages/Inspiracion.vue"),
    },
    {
        path: "/recursos-profesionales",
        name: "Recursos Profesionales",
        component: () => import("../pages/RecursosProfesionales.vue"),
    },
    {
        path: "/:pathMatch",
        name: "NotFound",
        component: () => import("../layouts/NotFound.vue"),
    },
];

export default routes;
