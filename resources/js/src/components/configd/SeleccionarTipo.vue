<script setup>
import {ref} from "vue";

const hover_p = ref(false);
const hover_v = ref(false);
const media_u = '/media/puertas_ventanas/'


</script>

<template>

    <div class="flex gap-10 p-10 h-[550px] bg-[#E0E2E4] rounded-xl shadow-md">
        <div class="flex-2/5">
            <h1 class="text-[#918164] italic font-bold tracking-wider lg:text-[2.5rem]">Configura tu diseño</h1>
            <p class="text-[#757575] lg:w-[450px] lg:text-xl">Tus puertas y ventanas ideales están en Aventa.<br>
                Selecciona una opción para comenzar a configurar tu Puerta o Ventana</p>
        </div>
        <div class="flex-3/5 flex gap-10">
            <div class="flex-1/2 relative flex flex-col p-2 bg-white cursor-pointer rounded-xl group" @click="$emit('seleccionarTipo','puerta')" @mouseenter="hover_p = true" @mouseleave="hover_p = false">
                <h2 class="text-[#918164] lg:text-[1.4rem]">Puertas</h2>
                <img class="w-full h-full object-contain" :src="hover_p ? media_u+'puertas_abiertas/puerta_vidrio.png' : media_u+'puertas/puerta_vidrio.png'" alt="puerta">
                <div class="absolute bottom-2 right-2 bg-[rgba(0,0,0,0.1)] z-10 p-1.5 rounded-full">
                    <img class="w-5 h-5 img-s rotate-[-45deg] transition-transform duration-400 ease-in-out group-hover:rotate-[0deg]" src="../../assets/media/icons/flecha-izq.png" alt="flecha">
                </div>
            </div>
            <div class="flex-1/2 relative flex flex-col p-2 bg-white cursor-pointer rounded-xl group" @click="$emit('seleccionarTipo', 'ventana')" @mouseenter="hover_v = true" @mouseleave="hover_v = false">
                <h2 class="text-[#918164] lg:text-[1.4rem]">Ventanas</h2>
                <img class="w-full h-full object-contain" :src="hover_v ? media_u+'ventanas_abiertas/ventana_cuadrada.png' : media_u+'ventanas/ventana_cuadrada.png'" alt="ventana">
                <div class="absolute bottom-2 right-2 bg-[rgba(0,0,0,0.1)] z-10 p-1.5 rounded-full">
                    <img class="w-5 h-5 img-s rotate-[-45deg] transition-transform duration-400 ease-in-out group-hover:rotate-[0deg]" src="../../assets/media/icons/flecha-izq.png" alt="flecha">
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>

</style>
