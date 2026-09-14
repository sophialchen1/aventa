<script setup lang="ts">

import Navbar from "../components/navbar.vue";
import ContactBar from "../components/contactBar.vue";
import Bottombar from "../components/bottombar.vue";
import {onMounted, ref} from "vue";
import FormWhatsapp from "../components/FormWhatsapp.vue";
import VsModal from "../layouts/VsModal.vue";
import { useGlbPreload } from '../composables/useGlbPreload.js';
import IconCustom from "../components/IconCustom.vue";
import {useRoute} from "vue-router";

const {preload , status} = useGlbPreload('/models/house_aventa.glb');

const openForm = ref(false);
const opend = ref(false);
const router = useRoute();

function openModalD(){
    opend.value = !opend.value;
    document.body.style.overflow = opend.value ? 'hidden' : '';
}

function openFormW(){
    openForm.value = !openForm.value;
    document.body.style.overflow = openForm.value ? 'hidden' : '';
}

onMounted(() => {
    if (status.value !== 'loaded') preload();

    const a = document.getElementById('aventa-wa-fab');
    if (!a) return;

    const phone = '525534634662';
    const text = encodeURIComponent('Hola');

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    a.setAttribute(
        'href',
        isMobile
            ? `whatsapp://send?phone=${phone}&text=${text}`
            : `https://web.whatsapp.com/send?phone=${phone}&text=${text}`
    );


})
</script>

<template>
    <contact-bar/>
    <navbar/>
    <div class="w-full h-full">
        <slot/>
    </div>
    <bottombar/>


    <!-- Aventa WhatsApp floating button -->
    <a data-v-7eae6667=""
       id="aventa-wa-fab"
       href="https://web.whatsapp.com/send?phone=525534634662&amp;text=Hola"
       target="_blank"
       rel="noopener noreferrer"
       aria-label="Chatear con Aventa por WhatsApp"
       title="Chatear con Aventa por WhatsApp"
       onclick="gtag('event', 'conversion', {'send_to': 'AW-16750250703/-bajCOm9mOEZEM-VkrM-'});">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.465 3.488"/>
        </svg>
    </a>


    <form-whatsapp @click="openFormW" :show="openForm"/>
    <vs-modal @click="openModalD" :show="opend"/>



</template>

<style scoped>
#aventa-wa-fab {
    position: fixed;
    right: clamp(16px, 3vw, 28px);
    bottom: clamp(16px, 3vw, 28px);
    z-index: 9999;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: #25d366;
    color: #ffffff;
    text-decoration: none;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.18), 0 2px 4px rgba(0, 0, 0, 0.12);
    transition: transform 180ms ease, box-shadow 180ms ease, background-color 180ms ease;
    -webkit-tap-highlight-color: transparent;
}
#aventa-wa-fab:hover,
#aventa-wa-fab:focus-visible {
    background-color: #1ebe57;
    transform: translateY(-2px) scale(1.04);
    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.22), 0 3px 6px rgba(0, 0, 0, 0.14);
    outline: none;
}
#aventa-wa-fab:active { transform: translateY(0) scale(0.98); }
#aventa-wa-fab:focus-visible {
    outline: 3px solid rgba(37, 211, 102, 0.45);
    outline-offset: 3px;
}
#aventa-wa-fab svg { width: 32px; height: 32px; display: block; }
@media (max-width: 480px) {
    #aventa-wa-fab { width: 52px; height: 52px; }
    #aventa-wa-fab svg { width: 30px; height: 30px; }
}
@media (prefers-reduced-motion: reduce) {
    #aventa-wa-fab, #aventa-wa-fab:hover, #aventa-wa-fab:focus-visible, #aventa-wa-fab:active {
        transition: none; transform: none;
    }
}
</style>
