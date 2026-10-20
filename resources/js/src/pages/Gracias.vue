<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import { track } from "../lib/track.js";

// Thank-you page every site form lands on after it validates. It exists so
// GTM, Google Ads and Meta have one URL (/gracias) to count a lead against,
// instead of a modal that leaves no trace in the URL.
//
// The form passes ?form=<type> so Ian can split conversions by form, and
// ?from=<path> so the visitor goes back to where they were. The route skips
// the site loader (meta.sinLoader), so the full 8 seconds are visible.

const DURACION_MS = 8000;

const route = useRoute();
const router = useRouter();

const formType = String(route.query.form || "desconocido");

// Only same-site paths. Anything else ("//evil.com", "https://...") would make
// this page an open redirect, so it falls back to the homepage.
function destino() {
    const from = String(route.query.from || "");
    return from.startsWith("/") && !from.startsWith("//") && !from.startsWith("/gracias")
        ? from
        : "/";
}

let timer = null;

onMounted(() => {
    // Opened directly (typed, bookmarked, refreshed) rather than reached from a
    // form: no lead happened, so nothing is tracked.
    if (!window.history.state?.desdeFormulario) {
        router.replace("/");
        return;
    }

    track("form_thankyou_view", { form_type: formType });

    timer = setTimeout(() => router.replace(destino()), DURACION_MS);
});

onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
    <main-layout>
        <div class="flex justify-center items-center min-h-[60vh] px-5 py-16">
            <div class="bg-white p-8 lg:p-12 rounded-xl shadow-xl text-center max-w-lg w-full">
                <h1 class="text-2xl lg:text-3xl font-bold text-[#657d88] mb-4">
                    {{ $t("gracias_title") }}
                </h1>
                <p>{{ $t("gracias_body") }}</p>
            </div>
        </div>
    </main-layout>
</template>
