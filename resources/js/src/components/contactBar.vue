<script setup>
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import SocialMedias from "../components/SocialMedias.vue";

const { locale } = useI18n();
const currentLang = ref(locale.value);

function setLenguaje(lang) {
    localStorage.setItem('lang', lang);
    location.reload();
}

</script>

<template>
    <div class="flex justify-center pt-1 pb-1 px-3 lg:px-0 bg-[#657d88] text-white">
        <div class="flex w-full items-center max-w-[1150px] justify-end gap-[2vw]">
            <social-medias tam="xs" gap="3" color="blanco"/>
            <div class="flex gap-2 font-bold">
                <button class="cursor-pointer" @click="setLenguaje('es')"
                    :class="{ 'underline underline-offset-2': currentLang === 'es' }">ES</button>
                <p>|</p>
                <button class="cursor-pointer" @click="setLenguaje('en')"
                    :class="{ 'underline underline-offset-2': currentLang === 'en' }">EN</button>
            </div>
        </div>
    </div>
</template>
<style scoped></style>
