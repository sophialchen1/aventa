<script setup>
import MainLayout from "../layouts/MainLayout.vue";
import {useI18n} from "vue-i18n";
import {ref} from "vue";

const { locale } = useI18n();
const currentLang = ref(locale.value);

</script>

<template>
    <main-layout>
        <iframe class="w-full h-dvh" :src="'https://aventa-proj-frontend-631509657635.us-central1.run.app/?lang=' + currentLang"/>
    </main-layout>
</template>

<style scoped>
</style>
