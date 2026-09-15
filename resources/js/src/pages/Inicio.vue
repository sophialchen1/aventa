<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, computed } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Scrollbar, A11y, Zoom } from "swiper/modules";
import { useI18n } from "vue-i18n";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/zoom";

import { maderas } from "../data/trabajos";

import TittleCustom from "../components/TittleCustom.vue";
import InstalacionesSection from "../layouts/InstalacionesSection.vue";
import MainLayout from "../layouts/MainLayout.vue";
import IconCustom from "../components/IconCustom.vue";
import FormGrande from "@/src/layouts/formGrande.vue";
import VsModal from "../layouts/VsModal.vue";

const { t } = useI18n();

const video = ref<HTMLVideoElement | null>(null);
const videoBanner = ref<HTMLVideoElement | null>(null);

const video_src = "/media/sobre_aventa_2026.mp4";
const srcVideoBanner = "/media/bannerHome.mp4";

let observer: IntersectionObserver | null = null;
let bannerInterval: ReturnType<typeof setInterval> | null = null;

const va = "/media/puertas_ventanas/ventanas_abiertas/";
const pa = "/media/puertas_ventanas/puertas_abiertas/";
const vc = "/media/puertas_ventanas/ventanas/";
const pc = "/media/puertas_ventanas/puertas/";

const banner = [
    "/media/banner_home/banner_1.jpg",
    "/media/banner_home/banner_2.jpg",
    "/media/banner_home/banner_3.jpeg",
    "/media/banner_home/banner_4.jpg",
    "/media/banner_home/banner_5.jpg",
    "/media/banner_home/banner_6.jpeg",
    "/media/banner_home/banner_7.jpeg",
    "/media/banner_home/banner_8.jpeg",
    "/media/banner_home/banner_9.jpeg",
    "/media/banner_home/banner_10.jpeg",
    "/media/banner_home/banner_11.jpeg",
    "/media/banner_home/banner_12.jpeg",
    "/media/banner_home/banner_13.jpeg",
    "/media/banner_home/banner_14.jpeg",
];

const ventanas = [
    {
        id: 0,
        name: t("ini_ab"),
        des: t("ini_ab_p"),
        abierta: va + "ventana_fija.png",
        cerrada: vc + "ventana_fija.png",
        tipo: t("ini_ventana"),
        key: "ventana",
    },
    {
        id: 1,
        name: t("ini_osc"),
        des: t("ini_osc_p"),
        abierta: va + "ventana_fija.png",
        cerrada: vc + "ventana_fija.png",
        tipo: t("ini_ventana"),
        key: "ventana",
    },
    {
        id: 2,
        name: t("ini_pro"),
        des: t("ini_pro_p"),
        abierta: va + "ventana_fija.png",
        cerrada: vc + "ventana_fija.png",
        tipo: t("ini_ventana"),
        key: "ventana",
    },
    {
        id: 3,
        name: t("ini_gui"),
        des: t("ini_gui_p"),
        abierta: va + "ventana_fija.png",
        cerrada: vc + "ventana_fija.png",
        tipo: t("ini_ventana"),
        key: "ventana",
    },
];

const puertas = [
    {
        id: 4,
        name: t("ini_sol"),
        des: t("ini_sol_p"),
        abierta: pa + "puerta_solida.png",
        cerrada: pc + "puerta_solida.png",
        tipo: t("ini_puerta"),
        key: "puerta",
    },
    {
        id: 5,
        name: t("ini_vid"),
        des: t("ini_vid_p"),
        abierta: pa + "puerta_solida.png",
        cerrada: pc + "puerta_solida.png",
        tipo: t("ini_puerta"),
        key: "puerta",
    },
    {
        id: 6,
        name: t("ini_com"),
        des: t("ini_com_p"),
        abierta: pa + "puerta_solida.png",
        cerrada: pc + "puerta_solida.png",
        tipo: t("ini_puerta"),
        key: "puerta",
    },
];

const u_media = "/media/proyectos/";
const u_madera = "/media/maderas/";

const n_trabajos = [
    {
        id: 1,
        et_nuevo: false,
        name_p: "La Valise",
        img: "valise.jpeg",
        modal: [
            {
                titulo: "La Valise",
                ubi: "San Miguel de Allende",
                subt: t("ini_val_sub"),
                details_t: t("ini_val_dt"),
                details_p:
                    t("ini_val_dp1") +
                    "\n" +
                    "\n" +
                    t("ini_val_dp2") +
                    "\n" +
                    "\n" +
                    t("ini_val_dp3"),
                details_p2:
                    t("ini_val_ep1") +
                    "\n" +
                    "\n" +
                    t("ini_val_ep2") +
                    "\n" +
                    "\n" +
                    t("ini_val_ep3"),
                img_p: "valise1.jpeg",
                imgs: [
                    "valise2.jpeg",
                    "valise3.jpeg",
                    "valise4.jpeg",
                    "valise5.jpeg",
                ],
            },
        ],
    },
    {
        id: 2,
        et_nuevo: false,
        name_p: "Las Agujas",
        img: "agujas.jpeg",
        modal: [
            {
                titulo: "La Agujas",
                ubi: "",
                subt: t("ini_agu_sub"),
                details_t: t("ini_agu_dt"),
                details_p: t("ini_agu_dp1") + "\n" + "\n" + t("ini_agu_dp2"),
                details_p2: t("ini_agu_ep1") + "\n" + "\n" + t("ini_agu_ep2"),
                img_p: "agujas1.jpeg",
                imgs: [
                    "agujas2.jpeg",
                    "agujas3.jpeg",
                    "agujas4.jpeg",
                    "agujas5.jpeg",
                ],
            },
        ],
    },
    {
        id: 3,
        et_nuevo: false,
        name_p: "Aura",
        img: "ceballos.jpg",
        modal: [
            {
                titulo: "Aura",
                ubi: "",
                subt: t("ini_ceb_sub"),
                details_t: t("ini_ceb_dt"),
                details_p: t("ini_ceb_dp1"),
                details_p2: t("ini_ceb_ep1"),
                img_p: "aura1.jpg",
                imgs: ["aura2.jpg", "aura3.jpg", "aura4.jpg", "aura5.jpg"],
            },
        ],
    },
    {
        id: 4,
        et_nuevo: false,
        name_p: "Los Grullos",
        img: "grullos.jpeg",
        modal: [
            {
                titulo: "Los Grullos",
                ubi: "",
                subt: t("ini_gru_sub"),
                details_t: t("ini_gru_dt"),
                details_p: t("ini_gru_dp1"),
                details_p2: t("ini_gru_ep1"),
                img_p: "grullos1.jpeg",
                imgs: [
                    "grullos2.jpeg",
                    "grullos3.jpeg",
                    "grullos4.jpeg",
                    "grullos5.jpeg",
                ],
            },
        ],
    },
    {
        id: 5,
        et_nuevo: false,
        name_p: "Siari Reserve",
        img: "ritz.jpg",
        modal: [
            {
                titulo: "Siari Reserve",
                ubi: "",
                subt: t("ini_ritz_sub"),
                details_t: t("ini_ritz_dt"),
                details_p: t("ini_ritz_dp1"),
                details_p2:
                    t("ini_ritz_ep1") +
                    "\n" +
                    "\n" +
                    t("ini_ritz_ep2") +
                    "\n" +
                    "\n" +
                    t("ini_ritz_ep3"),
                img_p: "ritz.jpg",
                imgs: ["ritz2.jpg", "ritz3.jpg", "ritz4.jpg", "ritz5.jpg"],
            },
        ],
    },
    {
        id: 6,
        et_nuevo: false,
        name_p: "Villa entre sueños",
        img: "goe.jpg",
        modal: [
            {
                titulo: "Villa entre sueños",
                ubi: "",
                subt: t("ini_goe_sub"),
                details_t: t("ini_goe_dt"),
                details_p: t("ini_goe_dp1"),
                details_p2: t("ini_goe_ep1") + "\n" + "\n" + t("ini_goe_ep2"),
                img_p: "goe.jpg",
                imgs: ["goe2.jpg", "goe3.jpg", "goe4.jpg", "goe5.jpg"],
            },
        ],
    },
    {
        id: 7,
        et_nuevo: false,
        name_p: "Casa Oasis",
        img: "oasis.jpg",
        modal: [
            {
                titulo: "Casa Oasis",
                ubi: "",
                subt: t("ini_oas_sub"),
                details_t: t("ini_oas_dt"),
                details_p: t("ini_oas_dp1") + "\n" + t("ini_oas_dp2"),
                details_p2: t("ini_oas_ep1") + "\n" + "\n" + t("ini_oas_ep2"),
                img_p: "oasis.jpg",
                imgs: ["oasis1.jpg", "oasis2.jpg", "oasis3.jpg", "oasis4.jpg"],
            },
        ],
    },
    {
        id: 8,
        et_nuevo: true,
        name_p: "Alba",
        img: "alba.jpg",
        modal: [
            {
                titulo: "Alba",
                ubi: "",
                subt: t("ini_alba_sub"),
                details_t: t("ini_alba_dt"),
                details_p: t("ini_alba_dp1"),
                details_p2: t("ini_alba_ep1") + "\n" + "\n" + t("ini_alba_ep2"),
                img_p: "alba.jpg",
                imgs: ["alba1.jpg", "alba2.jpg", "alba3.jpg", "alba4.jpg"],
            }
        ]
    }
];

const VISIBLE_COUNT = 4;
const startIndex = ref(0);

// Cuánto puede avanzar como máximo
const maxStart = computed(() =>
    Math.max(0, n_trabajos.reverse().length - VISIBLE_COUNT),
);

// Los trabajos visibles en este "slide"
const visibleTrabajos = computed(() =>
    n_trabajos.slice(startIndex.value, startIndex.value + VISIBLE_COUNT),
);

const canPrev = computed(() => startIndex.value > 0);
const canNext = computed(() => startIndex.value < maxStart.value);

function prevSlide() {
    if (canPrev.value) startIndex.value--;
}

function nextSlide() {
    if (canNext.value) startIndex.value++;
}

const hoveredImg = ref(null);

const itemSeleccionado = ref(ventanas[0]);
const imagenActual = ref(ventanas[0].cerrada);
const indexSelect = ref(ventanas[0].id);

const banner_index = ref(0);
const ref_cer = ref(0);

const activeModal = ref(null);
const itemModal = ref(null);
const itemModalId = ref(null);

const openForm = ref(false);

function openFormW() {
    openForm.value = true;
    document.body.style.overflow = openForm.value ? "hidden" : "";
}

function openProyectsForm() {
    activeModal.value = null;
    openFormW();
}

function openM(item, modal) {
    if (modal === "woods") {
        activeModal.value = "woods";
    } else {
        activeModal.value = modal;
        itemModal.value = item.modal;
        itemModalId.value = item.id;
    }
    document.body.style.overflow = "hidden";
}
function closeM() {
    activeModal.value = null;
    document.body.style.overflow = "";
}

function scrollToProductos() {
    const el = document.querySelector("#productos");
    if (el) {
        const offset = 150;
        const bodyTop = document.body.getBoundingClientRect().top;
        const elementTop = el.getBoundingClientRect().top;
        const scrollTarget = elementTop - bodyTop - offset;

        window.scrollTo({
            top: scrollTarget,
            behavior: "smooth",
        });
    }
}

const showModal3d = ref(false);
function openModalD() {
    showModal3d.value = !showModal3d.value;
    document.body.style.overflow = showModal3d.value ? "hidden" : "";
}

onMounted(() => {
    bannerInterval = setInterval(() => {
        banner_index.value = (banner_index.value + 1) % banner.length;
        ref_cer.value = (ref_cer.value + 1) % 2;
    }, 4000);

    observer = new IntersectionObserver(
        ([entry]) => {
            const videoElement = video.value;

            if (!videoElement) return;

            if (entry.isIntersecting) {
                videoElement.play().catch(() => {
                    // El navegador puede bloquear la reproducción automática.
                });
            } else {
                videoElement.pause();
            }
        },
        {
            threshold: 0.25,
        },
    );

    if (video.value) {
        observer.observe(video.value);
    }

    videoBanner.value?.play().catch(() => {
        console.warn("El navegador bloqueó la reproducción del banner.");
    });
});

onBeforeUnmount(() => {
    observer?.disconnect();

    if (bannerInterval) {
        clearInterval(bannerInterval);
    }
});
</script>

<template>
    <main-layout>
        <!-- 1 -->
        <div
            class="relative flex h-[250px] md:h-[300px] lg:h-[480px] justify-center"
        >
            <!--<img class="object-cover absolute w-full h-full transition-opacity duration-2000" v-for="(img, i) in banner"
                :key="i" :src="img" alt="banner_home" title="banner_home"
                :class="{ 'opacity-0': i !== banner_index, 'opacity-100': i === banner_index }">-->

            <div
                class="absolute inset-0 flex justify-center items-center overflow-hidden"
            >
                <video
                    ref="videoBanner"
                    class="w-full h-full object-cover"
                    :src="srcVideoBanner"
                    autoplay
                    muted
                    loop
                    playsinline
                    preload="auto"
                ></video>
            </div>

            <div
                class="absolute inset-0 bg-gradient-to-tr from-[black] to-transparent opacity-90"
            ></div>

            <div
                class="relative flex flex-col gap-8 px-5 justify-center w-full lg:px-0 lg:items-start lg:max-w-[1150px]"
            >
                <div class="flex flex-col gap-0">
                    <tittle-custom
                        :titulo="$t('ini_hero_h1')"
                    />
                    <h2
                        class="text-white italic tracking-wider text-[1.2rem] lg:text-[1.875rem]"
                    >
                        {{ $t('ini_hero_sub') }}
                    </h2>
                </div>
                <div class="flex gap-2 items-center justify-center lg:gap-5">
                    <button
                        class="font-bold w-fit cursor-pointer text-sm py-3 px-3 bg-[#ee7465] text-white rounded-lg transition-normal duration-300 hover:translate-y-[-8px] lg:py-4 lg:px-5 lg:text-base"
                        @click="scrollToProductos"
                    >
                        {{ $t('ini_hero_cta1') }}
                    </button>
                    <router-link
                        class="font-bold w-fit text-sm py-3 px-3 bg-[#ee7465] text-white rounded-lg transition-normal duration-300 hover:translate-y-[-8px] lg:py-4 lg:px-5 lg:text-base"
                        to="/design-experience"
                        >{{ $t('ini_hero_cta2') }}</router-link
                    >
                </div>
            </div>
        </div>
        <!-- 2 -->
        <div
            class="mt-[4vh] mb-[4vh] bg-white flex justify-center px-5 pt-[2vh] pb-[2vh] lg:px-0"
        >
            <div
                class="flex flex-col w-full justify-between items-center gap-3 lg:gap-5 lg:flex-row lg:max-w-[1150px]"
            >
                <h2
                    class="flex-2/5 text-[1.7rem] italic text-[#657d88] tracking-wider lg:text-[2.5rem]"
                >
                    {{ $t("ini_confian") }}
                </h2>
                <div
                    class="flex-3/5 flex justify-center w-full gap-5 lg:gap-15"
                >
                    <div class="flex-1/3 flex items-center justify-center">
                        <img
                            class="object-contain w-20 md:w-[100px] lg:w-[120px] opacity-50"
                            src="../assets/media/ritz.png"
                            alt="ritz"
                            title="ritz"
                        />
                    </div>
                    <div class="flex-1/3 flex items-center justify-center">
                        <img
                            class="object-contain md:w-[150px] lg:w-[180px] opacity-50"
                            src="../assets/media/valise.png"
                            alt="valise"
                            title="valise"
                        />
                    </div>
                    <div class="flex-1/3 flex items-center justify-center">
                        <img
                            class="object-contain md:w-[150px] lg:w-[180px] opacity-50"
                            src="../assets/media/rosewood.jpg"
                            alt="rosewood"
                            title="rosewood"
                        />
                    </div>
                </div>
            </div>
        </div>
        <!-- 3 -->
        <div id="productos" class="flex justify-center bg-[#f7f7f7]">
            <div
                class="w-full flex flex-col px-2 py-3 gap-3 items-center justify-center lg:justify-start lg:items-start lg:gap-10 lg:py-8 lg:max-w-[1150px]"
            >
                <h2
                    class="font-light italic tracking-wider text-[1.7rem] lg:text-[2.5rem]"
                >
                    {{ $t("ini_sub1") }}
                </h2>
                <div class="flex gap-5 px-5 lg:px-5">
                    <div
                        class="w-full flex flex-col gap-5 lg:flex-row lg:gap-10 lg:h-[500px]"
                    >
                        <router-link
                            to="/puertas"
                            class="w-full h-[150px] flex flex-col group lg:w-1/3 lg:h-full"
                        >
                            <div
                                class="relative w-full h-full overflow-hidden rounded-xl lg:rounded-t-xl lg:rounded-b-none select-btn"
                            >
                                <div
                                    class="hidden absolute bottom-0 right-0 left-0 h-[10px] z-10 bg-[#ee7465] lg:flex"
                                ></div>
                                <p
                                    class="absolute bottom-2 left-2 z-10 bg-white/80 py-2 px-4 rounded-xl lg:hidden"
                                >
                                    Nuestras Puertas
                                </p>
                                <img
                                    src="../assets/media/nuestras_puertas_aventa.jpg"
                                    class="absolute top-0 left-0 w-full h-full lg:scale-120 object-cover transition-transform duration-400 ease-in-out hover:scale-100 hover:brightness-90"
                                    alt="puertas"
                                    title="Nuestras Puertas"
                                />
                            </div>
                            <div class="hidden lg:flex lg:flex-col">
                                <p class="text-[1.3rem]">
                                    {{ $t("ini_puertas") }}
                                </p>
                                <router-link
                                    class="w-fit text-[#757575] text-start cursor-pointer lg:text-lg bg-gradient-to-r from-[#757575] to-[#757575] bg-no-repeat bg-[length:0%_2px] bg-left-bottom group-hover:bg-[length:100%_2px] transition-all duration-300 ease-in-out"
                                    to=""
                                    >{{ $t("ini_descubrir") }}</router-link
                                >
                            </div>
                        </router-link>

                        <router-link
                            to="/ventanas"
                            class="w-full h-[150px] flex flex-col group lg:w-1/3 lg:h-full"
                        >
                            <div
                                class="relative w-full h-full overflow-hidden rounded-xl lg:rounded-t-xl lg:rounded-b-none select-btn"
                            >
                                <div
                                    class="hidden absolute bottom-0 right-0 left-0 h-[10px] z-10 bg-[#ee7465] lg:flex"
                                ></div>
                                <p
                                    class="absolute bottom-2 left-2 z-10 bg-white/80 py-2 px-4 rounded-xl lg:hidden"
                                >
                                    Nuestras Ventanas
                                </p>

                                <img
                                    src="../assets/media/nuestras_ventanas_aventa.jpg"
                                    class="absolute top-0 left-0 w-full h-full scale-120 object-cover transition-transform duration-400 ease-in-out hover:scale-100 hover:brightness-90"
                                    alt="ventanas"
                                    title="Nuestras Ventanas"
                                />
                            </div>
                            <div class="hidden lg:flex lg:flex-col">
                                <p class="text-[1.3rem]">
                                    {{ $t("ini_ventanas") }}
                                </p>
                                <router-link
                                    class="w-fit text-[#757575] text-start cursor-pointer lg:text-lg bg-gradient-to-r from-[#757575] to-[#757575] bg-no-repeat bg-[length:0%_2px] bg-left-bottom group-hover:bg-[length:100%_2px] transition-all duration-300 ease-in-out"
                                    to=""
                                    >{{ $t("ini_descubrir") }}</router-link
                                >
                            </div>
                        </router-link>

                        <div
                            class="w-full flex flex-col gap-5 cursor-pointer lg:gap-10 lg:w-1/3 lg:h-full"
                        >
                            <div>
                                <div
                                    class="flex-none w-full h-[150px] lg:h-[180px] relative flex flex-col"
                                    @click="openM('', 'woods')"
                                >
                                    <div
                                        class="relative w-full h-full overflow-hidden rounded-xl lg:rounded-t-xl lg:rounded-b-none select-btn"
                                    >
                                        <div
                                            class="hidden absolute bottom-0 right-0 left-0 h-[10px] z-10 bg-[#ee7465] lg:flex"
                                        ></div>
                                        <p
                                            class="absolute bottom-2 left-2 z-10 bg-white/80 py-2 px-4 rounded-xl lg:hidden"
                                        >
                                            Nuestras Maderas
                                        </p>

                                        <img
                                            src="../assets/media/maderas.jpg"
                                            class="absolute top-0 left-0 w-full h-full scale-120 object-cover transition-transform duration-400 ease-in-out hover:scale-100 hover:brightness-90"
                                            alt="maderas"
                                            title="Nuestras Maderas"
                                        />
                                    </div>
                                </div>
                                <div class="hidden lg:flex lg:flex-col">
                                    <p
                                        class="group-hover:text-[#657d88] lg:text-[1.3rem]"
                                    >
                                        {{ $t("ini_maderas") }}
                                    </p>
                                </div>
                            </div>
                            <div class="flex-1 justify-start items-center">
                                <p
                                    class="text-base text-justify lg:text-left lg:text-lg"
                                >
                                    {{ $t("ini_p1") }}
                                </p>
                            </div>
                            <div class="flex flex-none mb-14">
                                <router-link
                                    class="flex items-center py-4 justify-center bg-[#ee7465] text-white text-xl w-full rounded-xl transition-normal duration-300 hover:translate-y-[-15px] hover:text-[1.35rem] lg:h-[62px] lg:py-0"
                                    to="/design-experience"
                                    >Descubre cuál es ideal para ti</router-link
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 4 -->
        <div
            class="mt-[4vh] mb-[4vh] bg-white flex justify-center pt-[5vh] pb-[5vh] h-[180px] lg:h-[180px] md:p-5 md:h-[180px]"
        >
            <div
                class="flex flex-col w-full items-center gap-3 px-2 lg:gap-5 lg:px-0 lg:flex-row lg:max-w-[1150px]"
            >
                <h2
                    class="text-[1.7rem] italic text-[#657d88] tracking-wider font-light lg:flex-2/5 lg:text-[2.5rem]"
                >
                    {{ $t("ini_cer") }}
                </h2>
                <transition name="fade" mode="out-in">
                    <div
                        class="flex justify-center items-center w-full gap-5 lg:justify-start lg:flex-3/5 flex-gap-15"
                    >
                        <div class="flex-1/4 flex justify-center items-center">
                            <img
                                class="object-contain w-15 lg:w-[110px]"
                                src="../assets/media/warm.png"
                                alt="warm"
                                title="Warm"
                            />
                        </div>
                        <div class="flex-1/4 flex justify-center items-center">
                            <img
                                class="object-contain w-15 lg:w-[140px]"
                                src="../assets/media/esg.png"
                                alt="esg"
                                title="Esg"
                            />
                        </div>
                        <div class="flex-1/4 flex justify-center items-center">
                            <img
                                class="object-contain w-15 lg:w-[80px]"
                                src="../assets/media/fsc.png"
                                alt="fsc"
                                title="Fsc"
                            />
                        </div>
                        <div class="flex-1/4 gap-5 lg:gap-15">
                            <div class="flex justify-center">
                                <img
                                    class="object-contain w-15 h-15 lg:w-[120px] lg:h-[120px]"
                                    src="../assets/media/nfrlogo.png"
                                    alt="proximo1"
                                    title="Proximo Colaborador"
                                />
                            </div>
                            <h3
                                class="text-base text-[#657d88] text-center tracking-wider italic"
                            >
                                Próximamente
                            </h3>
                        </div>
                    </div>
                </transition>
            </div>
        </div>

        <!-- 5 -->
        <div class="pt-[4vh] pb-[4vh] hidden justify-center bg-[#f7f7f7]">
            <div class="flex flex-col w-full max-w-[1150px] gap-10">
                <h2 class="font-light italic tracking-wider lg:text-[2.5rem]">
                    {{ $t("ini_sub2") }}
                </h2>
                <div class="h-[500px] bg-white rounded-xl shadow-md">
                    <div class="flex h-full">
                        <div class="flex-1/4 flex flex-col lg:py-10 lg:pl-8">
                            <div class="flex-1/2">
                                <div>
                                    <h3 class="text-[#657d88] font-bold">
                                        {{ $t("ini_ventanas").toUpperCase() }}
                                    </h3>
                                    <div class="h-[3px] bg-[#657d88]"></div>
                                </div>
                                <div class="flex flex-col mt-2">
                                    <div
                                        v-for="item in ventanas"
                                        :key="item.id"
                                        @click="
                                            () => {
                                                itemSeleccionado = item;
                                                imagenActual = item.cerrada;
                                                indexSelect = item.id;
                                            }
                                        "
                                        class="flex justify-start w-full pl-5 pt-2 pb-2 items-center gap-3 cursor-pointer hover:bg-[#e6e9ee] hover:rounded-l-full"
                                        :class="{
                                            'bg-[#e6e9ee] rounded-l-full':
                                                indexSelect === item.id,
                                        }"
                                    >
                                        <div
                                            class="w-2 h-2 rounded-full"
                                            :class="{
                                                'bg-[#657d88]':
                                                    indexSelect === item.id,
                                            }"
                                        />
                                        <p class="text-black">
                                            {{ item.name }}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="flex-1/2">
                                <div>
                                    <h3 class="text-[#657d88] font-bold">
                                        {{ $t("ini_puertas").toUpperCase() }}
                                    </h3>
                                    <div class="h-[3px] bg-[#657d88]"></div>
                                </div>
                                <div class="flex flex-col mt-2">
                                    <div
                                        v-for="item in puertas"
                                        :key="item.id"
                                        @click="
                                            () => {
                                                itemSeleccionado = item;
                                                imagenActual = item.cerrada;
                                                indexSelect = item.id;
                                            }
                                        "
                                        class="flex justify-start w-full pl-5 pt-2 pb-2 items-center gap-3 cursor-pointer hover:bg-[#e6e9ee] hover:rounded-l-full"
                                        :class="{
                                            'bg-[#e6e9ee] rounded-l-full':
                                                indexSelect === item.id,
                                        }"
                                    >
                                        <div
                                            class="w-2 h-2 rounded-full"
                                            :class="{
                                                'bg-[#657d88]':
                                                    indexSelect === item.id,
                                            }"
                                        />
                                        <p class="text-black">
                                            {{ item.name }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex-3/4 flex bg-[#E6E9EE] rounded-xl p-10">
                            <div class="flex-1 flex gap-10 items-center">
                                <div
                                    v-if="itemSeleccionado"
                                    class="flex-1/2 h-full w-full"
                                >
                                    <img
                                        class="w-full h-full object-contain transition-all duration-200 ease-in-out"
                                        :src="imagenActual"
                                        :alt="itemSeleccionado.name"
                                        @mouseover="
                                            imagenActual =
                                                itemSeleccionado.abierta
                                        "
                                        @mouseleave="
                                            imagenActual =
                                                itemSeleccionado.cerrada
                                        "
                                        :title="itemSeleccionado.name"
                                    />
                                </div>

                                <div
                                    v-if="itemSeleccionado"
                                    class="flex-1/2 flex flex-col gap-5"
                                >
                                    <div>
                                        <h4 class="text-[#657d88] font-bold">
                                            {{
                                                itemSeleccionado.name.toUpperCase()
                                            }}
                                        </h4>
                                        <div class="h-[3px] bg-[#657d88]"></div>
                                    </div>
                                    <div class="w-full h-[180px]">
                                        <p class="text-justify">
                                            {{ itemSeleccionado.des }}
                                        </p>
                                    </div>
                                    <router-link
                                        class="bg-[#ee7465] w-fit text-white p-3 rounded-xl transition-normal duration-300 ease-in-out hover:shadow-xl"
                                        :to="{
                                            name: 'configd',
                                            query: {
                                                tipo: itemSeleccionado.key,
                                            },
                                        }"
                                    >
                                        {{ $t("ini_div") }}
                                        {{ itemSeleccionado.tipo }}</router-link
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 6 -->
        <div class="pt-[4vh] pb-[4vh] flex justify-center bg-[#f7f7f7]">
            <div
                class="w-full max-w-[1150px] flex flex-col px-2 gap-5 lg:gap-10 lg:px-0"
            >
                <h2
                    class="text-[1.7rem] text-center font-light italic tracking-wider lg:text-[2.5rem] lg:text-start"
                >
                    {{ $t("ini_sub3") }}
                </h2>

                <div class="px-5 lg:px-0">
                    <div class="flex flex-col gap-5 lg:hidden">
                        <div
                            v-for="item in n_trabajos"
                            :key="item.id"
                            @click="openM(item, 'normal')"
                            class="relative bg-black cursor-pointer overflow-hidden rounded-xl w-full h-[200px] transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl"
                        >
                            <img
                                class="w-full h-full object-cover transition-all duration-300 ease-in-out hover:scale-110 hover:brightness-75"
                                :src="u_media + item.img"
                                :alt="item.name_p"
                                :title="item.name_p"
                            />
                            <p
                                class="etiqueta-flotante font-light tracking-wider"
                            >
                                {{ item.name_p }}
                            </p>
                        </div>
                    </div>

                    <div class="relative hidden lg:block">
                        <!-- Botón anterior -->
                        <button
                            type="button"
                            @click="prevSlide"
                            :disabled="!canPrev"
                            class="hidden lg:flex items-center justify-center absolute left-[-2.5rem] top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-[#657d88] opacity-70 text-white cursor-pointer transition-opacity ease-in-out duration-300 hover:opacity-100 disabled:opacity-0"
                        >
                            <icon-custom icon="angle-small-left" />
                        </button>

                        <!-- Botón siguiente -->
                        <button
                            type="button"
                            @click="nextSlide"
                            :disabled="!canNext"
                            class="hidden lg:flex items-center justify-center absolute right-[-2.5rem] top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-[#657d88] opacity-70 text-white cursor-pointer transition-opacity ease-in-out duration-300 hover:opacity-100 disabled:opacity-0"
                        >
                            <icon-custom icon="angle-small-right" />
                        </button>

                        <!-- Carrusel desktop -->
                        <div
                            class="flex flex-row flex-nowrap gap-5 h-[150px] lg:h-[420px]"
                        >
                            <div
                                v-for="item in visibleTrabajos"
                                :key="item.id"
                                @click="openM(item, 'normal')"
                                class="relative bg-black cursor-pointer overflow-hidden rounded-xl shrink-0 basis-[calc((100%-3*1.25rem)/4)] h-full transition-transform duration-300 ease-in-out hover:-translate-y-3 hover:shadow-xl"
                            >
                                <p
                                    v-if="item.et_nuevo"
                                    class="absolute right-2 top-2 bg-white rounded-lg font-bold px-2 opacity-70"
                                >
                                    {{ $t("ini_et_nuevo") }}
                                </p>

                                <img
                                    class="w-full h-full object-cover transition-all duration-300 ease-in-out hover:scale-110 hover:brightness-75"
                                    :src="u_media + item.img"
                                    :alt="item.name_p"
                                    :title="item.name_p"
                                />
                                <p
                                    class="etiqueta-flotante font-light leading-10 tracking-wider"
                                >
                                    {{ item.name_p }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col gap-4 items-center">
                    <p class="text-base lg:text-xl">{{ $t("ini_p2") }}</p>
                    <div
                        class="h-[1px] bg-black w-75 lg:w-full md:w-[80%] lg:max-w-[575px]"
                    ></div>
                </div>
            </div>
        </div>

        <div
            class="mt-[4vh] mb-[4vh] pt-[4vh] pb-[4vh] flex justify-center bg-white"
        >
            <div
                class="flex flex-col-reverse gap-5 w-full px-5 items-center lg:gap-5 md:gap-5 md:max-w-[1000px] lg:max-w-[1150px] lg:flex-row"
            >
                <div class="flex-1/2 flex flex-col gap-1">
                    <p
                        class="text-base lg:text-lg text-gray-400 leading-none translate-y-2 lg:translate-y-0"
                    >
                        Explora y conecta con nosotros:
                    </p>
                    <h2
                        class="w-70 lg:w-75 lg:leading-12 text-3xl font-light text-[#657d88] tracking-wide lg:text-5xl lg:flex-2/5"
                    >
                        Encuentra Tu Pieza Ideal
                    </h2>
                    <p class="mt-3 max-w-[460px]">
                        Descubre una propuesta pensada para tu espacio, tu
                        arquitectura y tu estilo de vida.
                    </p>
                    <p class="mt-3 max-w-[460px]">
                        Completa el recorrido y accede a recomendaciones creadas
                        especialmente para tu proyecto.
                    </p>

                    <router-link
                        to="/design-experience"
                        class="flex cursor-pointer items-center py-4 justify-center mt-5 lg:w-60 bg-[#ee7465] text-white text-xl w-full rounded-xl transition-normal duration-300 hover:translate-y-[-15px] hover:text-[1.35rem] lg:h-[62px] lg:py-0"
                    >
                        Iniciar
                    </router-link>
                </div>
                <div class="flex-1/2 h-90 lg:py-5 lg:px-8">
                    <div class="w-full h-full overflow-hidden rounded-xl">
                        <img
                            :src="'/media/encuentra-pieza-ideal.png'"
                            alt=""
                            class="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div
            class="mt-[4vh] mb-[4vh] bg-white flex justify-center pt-[2vh] pb-[2vh]"
        >
            <div
                class="flex flex-col w-full px-2 items-center lg:gap-5 md:gap-5 md:max-w-[1000px] lg:max-w-[1150px] lg:flex-row"
            >
                <h2
                    class="text-[1.7rem] italic text-[#657d88] tracking-wider lg:text-[2.5rem] lg:flex-2/5"
                >
                    Elegidos por:
                </h2>
                <div class="flex gap-5 lg:flex-3/5 lg:gap-15 md:w-[100%]">
                    <div class="flex-1/4 flex items-center justify-center">
                        <img
                            class="object-contain w-20 lg:w-[160px]"
                            src="../assets/media/bernardi.jpg"
                            alt="bernardi"
                            title="Bernardi"
                        />
                    </div>
                    <div class="flex-1/4 flex items-center justify-center">
                        <img
                            class="object-contain w-20 lg:w-[180px]"
                            src="../assets/media/tallerg.png"
                            alt="taller-g"
                            title="Taller-g"
                        />
                    </div>
                    <div class="flex-1/4 flex items-center justify-center">
                        <img
                            class="object-contain w-15 lg:w-[80px]"
                            src="../assets/media/cuatro44.jpg"
                            alt="cuatro44"
                            title="Cuatro444"
                        />
                    </div>
                    <div class="flex-1/4 flex items-center justify-center">
                        <img
                            class="object-contain w-15 lg:w-[80px]"
                            src="../assets/media/beck.jpg"
                            alt="beck"
                            title="Beck"
                        />
                    </div>
                </div>
            </div>
        </div>

        <!-- Sobre Nosotros-->
        <div class="pt-[4vh] pb-[4vh] bg-[#f7f7f7] flex justify-center">
            <div
                class="w-full px-5 flex flex-col gap-5 lg:gap-8 lg:max-w-[1150px] lg:px-0"
            >
                <h2
                    class="text-[1.7rem] text-center leading-none font-light italic tracking-wider lg:text-left lg:text-[2.5rem]"
                >
                    {{ $t("ini_sub4") }}
                </h2>
                <div class="flex flex-col-reverse lg:flex-row lg:gap-[2vw]">
                    <div class="flex-1/2 p-2">
                        <div class="rounded-[40px] overflow-hidden h-full">
                            <!--<img class="object-cover w-full h-full" src="../assets/media/aventa-verde.jpg">-->
                            <video
                                ref="video"
                                class="h-full w-full object-cover"
                                :src="video_src"
                                playsinline
                                muted
                                preload="none"
                            ></video>
                        </div>
                    </div>
                    <div
                        class="flex-2/3 flex flex-col gap-[2vh] pt-[3vh] pb-[3vh]"
                    >
                        <p
                            class="text-base flex-1/2 whitespace-pre-line text-justify lg:text-left"
                        >
                            {{ 'Somos una empresa mexicana especializada en la fabricación de puertas y ventanas de alta gama, donde combinamos la precisión de la ingeniería alemana con el talento y la experiencia de la manufactura mexicana. Cada una de nuestras piezas está diseñada para cumplir con los más altos estándares de desempeño, calidad y estética, llegando a proyectos residenciales y comerciales en toda la República Mexicana.' + '\n\n' + 'Nuestro compromiso con el medio ambiente comienza desde el origen. Operamos en una fábrica construida completamente con madera proveniente de fuentes sustentables, reflejando la confianza que depositamos en este material por su resistencia, durabilidad y desempeño estructural.' + '\n\n' + 'Además, nuestra planta es autosustentable, lo que significa que gran parte de la energía utilizada en nuestros procesos proviene de fuentes renovables y de lavalorización de los propios residuos de producción, minimizando el impacto ambiental y promoviendo una fabricación responsable.'}}
                        </p>
                        <div class="flex-1/2 flex flex-col gap-3 lg:gap-10">
                            <p class="text-xl lg:text-[1.3rem]">
                                <b>{{ $t("ini_p9") }}:</b>
                            </p>
                            <div
                                class="grid grid-cols-2 md:grid-cols-4 lg:flex"
                            >
                                <div
                                    class="flex-1/4 flex flex-col justify-center items-center gap-5"
                                >
                                    <img
                                        class="w-15 lg:w-[3.5vw]"
                                        src="../assets/media/icons/icon-sus.png"
                                        alt="icon-sus"
                                        title="Sostenibilidad"
                                    />
                                    <p>Sostenibilidad</p>
                                </div>
                                <div
                                    class="flex-1/4 flex flex-col justify-center items-center gap-5"
                                >
                                    <img
                                        class="w-15 lg:w-[3.5vw]"
                                        src="../assets/media/icons/icon-lujo.png"
                                        alt="icon-lujo"
                                        title="Premium"
                                    />
                                    <p>Premium</p>
                                </div>
                                <div
                                    class="flex-1/4 flex flex-col justify-center items-center gap-5"
                                >
                                    <img
                                        class="w-15 lg:w-[3.5vw]"
                                        src="../assets/media/icons/icon-seg.png"
                                        alt="icon-seg"
                                        title="Seguridad"
                                    />
                                    <p>Seguridad</p>
                                </div>
                                <div
                                    class="flex-1/4 flex flex-col justify-center items-center gap-5"
                                >
                                    <img
                                        class="w-15 lg:w-[3.5vw]"
                                        src="../assets/media/icons/icon-tran.png"
                                        alt="icon-tran"
                                        title="Tranquilidad"
                                    />
                                    <p>Tranquilidad</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hidden gap-[2vw] h-[350px] lg:flex">
                    <div
                        class="flex-1/4 rounded-xl overflow-hidden duration-300 ease-in-out hover:brightness-90"
                    >
                        <img
                            class="object-cover w-full h-full"
                            src="../assets/media/nosotros_ventana.jpg"
                            alt="nosotros_ventana"
                        />
                    </div>
                    <div
                        class="flex-1/4 rounded-xl overflow-hidden duration-300 ease-in-out hover:brightness-90"
                    >
                        <img
                            class="object-cover w-full h-full"
                            src="../assets/media/nosotros_interior.jpg"
                            alt="nosotros_interior"
                        />
                    </div>
                    <div
                        class="flex-1/4 rounded-xl overflow-hidden duration-300 ease-in-out hover:brightness-90"
                    >
                        <img
                            class="object-cover w-full h-full"
                            src="../assets/media/nosotros_exterior.jpg"
                            alt="nosotros_exterior"
                        />
                    </div>
                    <div
                        class="flex-1/4 rounded-xl overflow-hidden duration-300 ease-in-out hover:brightness-90"
                    >
                        <img
                            class="object-cover w-full h-full"
                            src="../assets/media/nosotros_puer.jpg"
                            alt="nosotros_puerta"
                        />
                    </div>
                </div>
            </div>
        </div>
        <!-- Convierte realidad-->
        <div class="flex justify-center py-5 lg:py-10 bg-[#fcfcfc]">
            <div
                class="w-full px-5 gap-5 lg:max-w-[1150px] flex flex-col lg:gap-2 lg:px-0 lg:flex-row"
            >
                <div class="flex flex-col gap-2 lg:flex-1/2 lg:gap-10 lg:mt-10">
                    <h2
                        class="text-center leading-none text-[1.7rem] font-light italic tracking-wider lg:text-left lg:text-[2.5rem]"
                    >
                        Convierte tus sueños en realidad
                    </h2>
                    <p class="text-base text-justify lg:text-left">
                        ¡Prueba nuestra asesoria creativa de IA y encuentra la pieza ideal para tu proyecto!
                    </p>
                </div>
                <div class="flex gap-3 lg:gap-10 lg:flex-1/2">
                    <div class="flex flex-col justify-center items-center flex-1 gap-y-5">
                        <div class="w-[60%]">
                            <img
                                class="w-full aspect-square object-cover rounded-2xl"
                                src="../assets/media/Conversación.jpg"
                                alt="Conversacion"
                            />
                        </div>
                        <div
                            class="flex flex-col justify-center items-center lg:justify-start lg:items-start gap-5"
                        >
                            <a
                                class="bg-[#ee7465] w-fit text-white text-sm p-3 lg:text-base lg:p-3 rounded-xl transition-normal duration-300 ease-in-out hover:-translate-y-[10px] hover:shadow-xl"
                                href="https://web.whatsapp.com/send?phone=525534634662&text=Hola"
                                target="_blank"
                            >
                                Configurar mi puerta/ventana
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div
            v-if="false"
            class="mt-[4vh] mb-[4vh] pt-[4vh] pb-[4vh] flex justify-center bg-white"
        >
            <div
                class="flex flex-col gap-5 w-full px-5 items-center lg:gap-5 md:gap-5 md:max-w-[1000px] lg:max-w-[1150px] lg:flex-row"
            >
                <div class="flex-1/2 h-90 lg:py-5 lg:px-8">
                    <div class="w-full h-full overflow-hidden rounded-xl">
                        <img
                            :src="'/media/presentar2.jpg'"
                            alt=""
                            class="w-full h-full object-cover"
                        />
                    </div>
                </div>
                <div class="flex-1/2 flex flex-col gap-1">
                    <h2
                        class="lg:w-[450px] lg:leading-12 text-3xl font-light text-[#657d88] lg:text-5xl lg:flex-2/5"
                    >
                        Simulando el Confort de Productos Aventa
                    </h2>
                    <p class="mt-3 max-w-[460px] wrap-normal">
                        ¡Vive la experiencia virtual!
                    </p>
                    <p class="max-w-[460px]">
                        Al abrir y cerrar la puerta, descubrirás cómo el ruido
                        del exterior se desvanece y cómo la tranquilidad
                        transforma el espacio.
                    </p>
                    <p class="mt-3 max-w-[460px]">
                        Es control acústico, eficiencia térmica y bienestar en
                        cada detalle. Simula el cambio. Escucha la diferencia.
                    </p>

                    <button
                        class="flex cursor-pointer items-center py-4 justify-center mt-5 lg:w-60 bg-[#ee7465] text-white text-xl w-full rounded-xl transition-normal duration-300 hover:translate-y-[-15px] hover:text-[1.35rem] lg:h-[62px] lg:py-0"
                        @click="openModalD"
                    >
                        Explorar
                    </button>
                </div>
            </div>
        </div>

        <div v-if="false" class="mt-[4vh] mb-[4vh] bg-white flex justify-center pt-2 py-2">
            <div
                class="flex flex-col w-full px-2 items-center lg:gap-5 md:gap-5 md:max-w-[1000px] lg:max-w-[1150px] lg:flex-row"
            >
                <h2
                    class="text-[1.7rem] italic text-[#657d88] tracking-wider lg:text-[2.5rem] lg:flex-2/5"
                >
                    Nuestras Membresías:
                </h2>
                <div class="flex gap-5 lg:flex-3/5 lg:gap-15 md:w-[100%]">
                    <div class="flex-1/4 flex items-center justify-end">
                        <img
                            class="object-contain w-20 lg:w-[210px]"
                            src="../assets/media/amevec.png"
                            alt="amevec"
                            title="AMEVEC"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div
            class="mt-[4vh] mb-[4vh] pt-[4vh] pb-[4vh] flex justify-center bg-white"
        >
            <div
                class="flex flex-col gap-5 w-full px-5 items-center lg:gap-5 md:gap-5 md:max-w-[1000px] lg:max-w-[1150px] lg:flex-row"
            >
                <div class="flex-1/2 h-90 lg:py-5 lg:px-8">
                    <div class="w-full h-full overflow-hidden rounded-xl">
                        <img
                            :src="'/media/Stock4pros.png'"
                            alt=""
                            class="w-full h-full object-cover"
                        />
                    </div>
                </div>
                <div class="flex-1/2 flex flex-col gap-1">
                    <h2
                        class="lg:w-[450px] lg:leading-12 text-3xl font-light text-[#657d88] lg:text-5xl lg:flex-2/5"
                    >
                        Conoce a detalle nuestros productos
                    </h2>
                    <p class="mt-3 lg:mt-5 max-w-[460px] wrap-normal">
                        Desde el diseño hasta la instalación, en AVENTA creamos productos que combinan belleza, funcionalidad y desempeño para transformar cualquier espacio.
                        Accede a recursos, especificaciones y herramientas exclusivas.
                    </p>

                    <router-link
                        class="flex cursor-pointer items-center py-4 justify-center mt-5 lg:w-60 bg-[#ee7465] text-white text-xl w-full rounded-xl transition-normal duration-300 hover:translate-y-[-15px] hover:text-[1.35rem] lg:h-[62px] lg:py-0"
                        to="/recursos-profesionales"
                    >
                        Explorar
                    </router-link>
                </div>
            </div>
        </div>

        <instalaciones-section class="bg-[whitesmoke]" />

        <div
            id="contactanos"
            class="flex justify-center relative bg-contacto bg-cover bg-center bg-fixed p-5 lg:px-0"
        >
            <div class="absolute inset-0 bg-white opacity-80"></div>

            <div
                class="flex flex-col relative w-full gap-5 lg:flex-row lg:max-w-[1150px] lg:pt-8 lg:pb-8 lg:gap-x-5"
            >
                <div class="flex-1/2 relative lg:pt-8 flex flex-col gap-4">
                    <p
                        class="text-[2.5rem] leading-none text-[#657d88] font-light italic text-center lg:text-[3rem] lg:text-left"
                    >
                        {{ $t("ini_sub7") }}
                    </p>
                    <h4
                        class="text-[1.7rem] text-center font-light italic tracking-wider leading-none lg:text-left lg:text-[2.2rem]"
                    >
                        {{ $t("ini_p19") }}
                    </h4>
                    <h4
                        class="text-[1.7rem] text-center font-light italic tracking-wider leading-none lg:text-left lg:text-[2.2rem]"
                    >
                        {{ $t("ini_p20") }}
                    </h4>
                </div>
                <div
                    class="flex-1/2 relative flex bg-white rounded-xl w-full h-auto p-4 lg:p-[2vw] shadow-lg border-1 border-[#657d88]"
                >
                    <form class="flex flex-col w-full gap-5" action="">
                        <div class="grid grid-cols-2 gap-5">
                            <input
                                name="firstname"
                                class="pt-2 pb-2 pl-4 pr-4 rounded-xl bg-[#EBEDEE]"
                                placeholder="Nombre (s)"
                                required
                            />
                            <input
                                name="lastname"
                                class="pt-2 pb-2 pl-4 pr-4 rounded-xl bg-[#EBEDEE]"
                                placeholder="Apellidos"
                                required
                            />
                        </div>
                        <input
                            name="phone"
                            class="pt-2 pb-2 pl-4 pr-4 rounded-xl bg-[#EBEDEE] rounded-borders"
                            :placeholder="$t('f_numero')"
                            required
                        />
                        <input
                            name="email"
                            class="pt-2 pb-2 pl-4 pr-4 rounded-xl bg-[#EBEDEE] rounded-borders"
                            :placeholder="$t('f_correo')"
                            required
                        />
                        <textarea
                            class="pt-2 pb-2 pl-4 pr-4 rounded-xl bg-[#EBEDEE] rounded-borders min-h-[120px]"
                            :placeholder="$t('f_msg')"
                            required
                        ></textarea>
                        <div>
                            <label
                                class="text-[#757575] flex gap-2 cursor-pointer"
                            >
                                <input name="quiere_llamada" type="checkbox" />
                                ¿Quiero que me contacten por llamada?
                            </label>
                        </div>
                        <div class="flex justify-start">
                            <button
                                class="bg-[#ee7465] text-white rounded-lg py-1.5 px-5 lg:pl-[4vw] lg:pr-[4vw] lg:pt-1 lg:pb-1 cursor-pointer transition-colors duration-300 hover:text-white hover:bg-[#568a64]"
                            >
                                {{ $t("f_enviar") }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!--Modal Detalles-->
        <div
            v-if="activeModal === 'normal'"
            class="fixed z-50 inset-0 bg-[rgba(0,0,0,0.2)] overflow-y-auto flex justify-center px-2 py-8 lg:px-0"
            @click.self="closeM"
        >
            <div
                class="w-full h-max lg:max-w-[1150px] lg:p-8 bg-white rounded-xl flex flex-col gap-3 lg:gap-10 shadow-xl"
            >
                <div class="w-full flex justify-end p-4 lg:p-0">
                    <button
                        @click="closeM"
                        class="border rounded-lg py-1 px-2 text-[#cccccc] leading-none cursor-pointer transition-colors duration-300 hover:text-[#657d88] lg:text-[1.5rem]"
                    >
                        X
                    </button>
                </div>

                <div class="w-full px-5 lg:px-10 flex flex-col gap-8 lg:gap-15">
                    <div
                        class="w-full flex flex-col gap-3 lg:flex-row lg:gap-10"
                    >
                        <div
                            class="flex-1/2 flex flex-col border-b-2 lg:border-b-0 lg:border-e-2 border-[#657d88]"
                        >
                            <h2
                                class="text-[1.7rem] font-light text-[#657d88] lg:text-[3.8rem]"
                            >
                                {{ itemModal[0].titulo }}
                            </h2>
                            <p class="italic lg:text-lg">
                                {{ itemModal[0].ubi }}
                            </p>
                        </div>
                        <div class="flex-1/2 flex justify-center items-center">
                            <p
                                class="italic tracking-wider text-[#657d88] lg:text-[1.5rem]"
                            >
                                {{ itemModal[0].subt }}
                            </p>
                        </div>
                    </div>

                    <div class="w-full flex flex-col lg:flex-row lg:gap-10">
                        <div
                            class="flex-1/2 w-full rounded-xl overflow-hidden lg:h-[280px]"
                        >
                            <img
                                class="w-full h-full object-cover"
                                :src="u_media + itemModal[0].img_p"
                                :alt="itemModal[0].img_p"
                            />
                        </div>
                        <div
                            class="flex-1/2 flex flex-col gap-2 items-center justify-center"
                        >
                            <p
                                class="italic tracking-wider text-[#657d88] lg:text-[1.2rem]"
                            >
                                {{ itemModal[0].details_t }}
                            </p>
                            <p class="whitespace-pre-line text-sm">
                                {{ itemModal[0].details_p }}
                            </p>
                        </div>
                    </div>

                    <div
                        class="w-full flex flex-col gap-5 lg:flex-row lg:h-[400px] group"
                    >
                        <div
                            v-for="index in itemModal[0].imgs"
                            :key="index"
                            class="flex-1 overflow-hidden rounded-xl transition-all duration-500 ease-in-out"
                            :class="{
                                'lg:flex-[3]': hoveredImg === index,
                                'lg:flex-[1]':
                                    hoveredImg && hoveredImg !== index,
                                'lg:flex-[2]': !hoveredImg,
                            }"
                            @mouseenter="hoveredImg = index"
                            @mouseleave="hoveredImg = null"
                        >
                            <img
                                class="w-full h-[150px] object-cover transition-transform duration-500 lg:h-full"
                                :src="u_media + index"
                                :alt="index"
                            />
                        </div>
                    </div>

                    <div class="w-full">
                        <p class="whitespace-pre-line lg:text-sm">
                            {{ itemModal[0].details_p2 }}
                        </p>
                    </div>

                    <div
                        v-if="itemModalId === 4"
                        class="w-full border mb-5 p-5 rounded-xl border-[#657d88] flex flex-col gap-5 lg:gap-10 lg:flex-row lg:m-0"
                    >
                        <div class="flex-3/4">
                            <p
                                class="text-center text-[#657d88] lg:text-left lg:text-[1.5rem]"
                            >
                                {{ $t("ini_p5") }}
                            </p>
                            <p
                                class="text-justify italic lg:text-left lg:text-[1.5rem]"
                            >
                                {{ $t("ini_p6") }}
                            </p>
                        </div>
                        <div
                            class="flex-1/4 flex justify-center items-center lg:pr-15"
                        >
                            <button
                                class="font-bold w-full p-2 bg-[#ee7465] text-center text-white rounded-full transition-normal duration-300 hover:translate-y-[-8px] lg:py-4 lg:px-5 cursor-pointer"
                                @click="openProyectsForm"
                            >
                                {{ $t("ini_btn3") }}
                            </button>
                        </div>
                    </div>

                    <div
                        v-else
                        class="w-full border mb-5 p-5 rounded-xl border-[#657d88] flex flex-col gap-5 lg:gap-10 lg:flex-row lg:m-0"
                    >
                        <div class="flex-3/4">
                            <p class="text-[#657d88] lg:text-[1.5rem]">
                                {{ $t("ini_p3") }}
                            </p>
                            <p class="italic lg:text-[1.5rem]">
                                {{ $t("ini_p4") }}
                            </p>
                        </div>
                        <div
                            class="flex-1/4 flex justify-center items-center lg:pr-15"
                        >
                            <button
                                class="font-bold w-full text-center p-2 bg-[#ee7465] text-white rounded-full transition-normal duration-300 hover:translate-y-[-8px] lg:py-4 lg:px-5 cursor-pointer"
                                @click="openProyectsForm"
                            >
                                {{ $t("ini_btn3") }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--Modal Maderas-->
        <div
            v-if="activeModal === 'woods'"
            class="fixed z-50 inset-0 bg-[rgba(0,0,0,0.2)] overflow-y-auto flex justify-center items-center px-2 py-8 lg:px-0"
            @click.self="closeM"
        >
            <div
                class="w-full h-max lg:max-w-[1150px] p-8 bg-white rounded-xl flex flex-col gap-10 shadow-xl"
            >
                <div class="w-full flex justify-end items-center">
                    <h2
                        class="flex-1 text-[#757575] text-[1.7rem] lg:text-[2.5rem]"
                    >
                        {{ $t("ini_accesorios") }}
                    </h2>
                    <button
                        @click="closeM"
                        class="border rounded-lg py-1 px-2 text-[#cccccc] leading-none cursor-pointer transition-colors duration-300 hover:text-[#657d88] lg:text-[1.5rem]"
                    >
                        X
                    </button>
                </div>

                <div class="w-full lg:px-10 flex justify-center lg:gap-15">
                    <swiper
                        class="h-[400px] w-full relative rounded flex justify-center items-center"
                        :modules="[
                            Navigation,
                            Pagination,
                            Scrollbar,
                            A11y,
                            Zoom,
                        ]"
                        :pagination="{ clickable: true }"
                        :scrollbar="{ draggable: true }"
                        :slides-per-view="1"
                        :zoom="true"
                        navigation
                    >
                        <swiper-slide v-for="i in maderas" :key="i.id">
                            <div class="w-full h-full flex justify-center">
                                <div class="w-210 h-90 flex gap-10">
                                    <img
                                        :src="u_madera + i.img"
                                        :alt="`Slide ${i.id}`"
                                        class="flex-1/2 object-cover rounded-xl"
                                    />
                                    <div
                                        class="flex-1/2 flex flex-col justify-center"
                                    >
                                        <h4
                                            class="text-[#657d88] text-[3rem] font-light leading-none"
                                        >
                                            {{ i.name }}
                                        </h4>
                                        <div
                                            class="bg-[#657d88] w-full h-1 rounded-xl mt-2"
                                        ></div>
                                        <p class="mt-5 h-35 lg:text-[1.3rem]">
                                            {{ i.des }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </swiper-slide>
                    </swiper>
                </div>
            </div>
        </div>

        <div
            v-if="openForm"
            class="fixed z-50 inset-0 bg-[rgba(0,0,0,0.2)] overflow-y-auto flex justify-center px-2 py-8 lg:px-0"
            @click.self="openRequest"
        >
            <div
                class="w-full h-max lg:max-w-[1000px] lg:p-8 bg-white rounded-xl flex flex-col gap-3 lg:gap-5 shadow-xl"
            >
                <div class="w-full flex justify-end p-4 lg:p-0">
                    <button
                        @click="openForm = false"
                        class="border rounded-lg py-1 px-2 text-[#cccccc] leading-none cursor-pointer transition-colors duration-300 hover:text-[#657d88] lg:text-[1.5rem]"
                    >
                        X
                    </button>
                </div>

                <div class="w-full px-5 lg:px-10 flex flex-col gap-8 lg:gap-15">
                    <form-grande></form-grande>
                </div>
            </div>
        </div>

        <vs-modal @click="openModalD" :show="showModal3d" />

        <!--##568a64 Color botones secundarios hover  -->
    </main-layout>
</template>

<style scoped>
.etiqueta-flotante {
    position: absolute;
    bottom: 1.2vh;
    left: 1vw;
    color: white;
    font-size: 2.2rem;
}

.seleccionado {
    background-color: #e6e9ee;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
    color: #ee7465;
    z-index: 10;
}

:deep(.swiper-pagination-bullet-active) {
    background-color: #ee7465;
}
</style>
