<script setup>
import {ref, computed, onMounted, watch} from "vue";
import { useRoute, useRouter } from "vue-router";

import Loader from "./pages/Loader.vue";

const isLoading = ref(true);
const route = useRoute();
const router = useRouter();

const openForm = ref(false);


// Mostrar loader al inicio (primer render)
onMounted(() => {
    setTimeout(() => {
        isLoading.value = false;
    }, 2000);
});

// Mostrar loader en cada navegación
let timer = null;

router.beforeEach((to, from, next) => {
    isLoading.value = true;

    // No bloqueamos la navegación: deja que cargue el componente mientras mostramos loader
    next();
});

router.afterEach(() => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        isLoading.value = false;
    }, 2000);
});


</script>

<template>
    <!-- Loader con fade-out -->
    <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500"
        :class="{ 'opacity-0 pointer-events-none': !isLoading }"
    >
        <Loader />
    </div>

    <!-- Contenido con fade-in -->
    <div
        :class="[
        isLoading ? 'hidden' : 'block',
        'transition-opacity duration-700 opacity-100'
    ]"
    >
        <router-view/>
    </div>
</template>

<style scoped>
</style>

