<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import { track } from "../lib/track.js";

// Thank-you page every site form lands on after it validates. It exists so
// GTM, Google Ads and Meta have one URL (/gracias) to count a lead against,
// instead of a modal that leaves no trace in the URL.
//
// The form passes ?form=<type> so Ian can split conversions by form, and
// ?from=<path> so the visitor goes back to where they were.

const SEGUNDOS = 8;
// app.vue covers every page change with a 2s loader plus a 0.5s fade. The
// countdown starts after it, so the visitor actually sees the full 8 seconds.
const ESPERA_LOADER_MS = 2500;

const route = useRoute();
const router = useRouter();

const formType = String(route.query.form || "desconocido");

// Only same-site paths. Anything else ("//evil.com", "https://...") would make
// this page an open redirect, so it falls back to the homepage.
const destino = computed(() => {
    const from = String(route.query.from || "");
    return from.startsWith("/") && !from.startsWith("//") && !from.startsWith("/gracias")
        ? from
        : "/";
});

const restante = ref(SEGUNDOS);
let timer = null;
let inicio = null;

function volver() {
    clearTimeout(inicio);
    clearInterval(timer);
    router.replace(destino.value);
}

onMounted(() => {
    // Opened directly (typed, bookmarked, refreshed) rather than reached from a
    // form: no lead happened, so nothing is tracked.
    if (!window.history.state?.desdeFormulario) {
        router.replace("/");
        return;
    }

    track("form_thankyou_view", { form_type: formType });

    inicio = setTimeout(() => {
        timer = setInterval(() => {
            restante.value -= 1;
            if (restante.value <= 0) volver();
        }, 1000);
    }, ESPERA_LOADER_MS);
});

onBeforeUnmount(() => {
    clearTimeout(inicio);
    clearInterval(timer);
});
</script>

<template>
    <main-layout>
        <div class="flex justify-center items-center min-h-[60vh] px-5 py-16">
            <div class="bg-white p-8 lg:p-12 rounded-xl shadow-xl text-center max-w-lg w-full">
                <h1 class="text-2xl lg:text-3xl font-bold text-[#657d88] mb-4">
                    {{ $t("gracias_title") }}
                </h1>
                <p class="mb-2">{{ $t("gracias_body") }}</p>
                <p class="mb-8 text-sm text-[#757575]">
                    {{ $t("gracias_redirect", { s: restante }) }}
                </p>
                <button
                    type="button"
                    @click="volver"
                    class="bg-[#657d88] text-white px-5 py-2 rounded-xl cursor-pointer hover:bg-[#64563c]"
                >
                    {{ destino === "/" ? $t("gracias_cta_home") : $t("gracias_cta_back") }}
                </button>
            </div>
        </div>
    </main-layout>
</template>
