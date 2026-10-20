<script setup>
import { useRoute, useRouter } from "vue-router";
import { irAGracias } from "../lib/track.js";

// Short contact form, on the homepage and on Contacto. HubSpot picks the
// submission up from the page on its own (it lands as "Contact" in HubSpot)
// and maps these exact fields, so leave their markup alone. This only stops
// the browser's default submit, which reloaded the page and put the visitor's
// name, email and phone in the URL. The browser has already checked the
// required fields before submit fires.
const route = useRoute();
const router = useRouter();

function enviar() {
    irAGracias(router, route, "contacto");
}
</script>

<template>
    <form class="flex flex-col w-full gap-5" @submit.prevent="enviar">
        <div class="grid grid-cols-2 gap-5">
            <input
                name="firstname"
                class="pt-2 pb-2 pl-4 pr-4 rounded-xl bg-[#EBEDEE]"
                :placeholder="$t('f_name')"
                required
            />
            <input
                name="lastname"
                class="pt-2 pb-2 pl-4 pr-4 rounded-xl bg-[#EBEDEE]"
                :placeholder="$t('f_lastname')"
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
                {{ $t("ini_quick_callback") }}
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
</template>
