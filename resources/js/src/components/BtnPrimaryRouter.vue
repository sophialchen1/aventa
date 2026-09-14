<script setup lang="ts">
const props = defineProps({
    titulo: {
        type: String,
        default: "Titulo"
    },
    link: {
        type: String,
        default: "/"
    }
})
</script>
<template>
    <router-link class="bg-[#ee7465] text-white cursor-pointer rounded-xl py-2 text-center hover:bg-[#ee7465]/80" :to="props.link">
        {{props.titulo}}
    </router-link>
</template>

<style scoped>

</style>
