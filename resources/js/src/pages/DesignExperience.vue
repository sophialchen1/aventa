<script setup>
import MainLayout from "../layouts/MainLayout.vue";
import {useI18n} from "vue-i18n";
import {ref} from "vue";
import Navbar from "@/src/components/navbar.vue";
import ContactBar from "@/src/components/contactBar.vue";

const { locale } = useI18n();
const currentLang = ref(locale.value);

</script>

<template>
    <contact-bar/>
    <navbar/>
    <iframe
        class="w-full h-[86.2dvh]"
        :src="'https://aventa-v2.3kit.com/?lang=' + currentLang"
    />
</template>

<style scoped>
</style>
