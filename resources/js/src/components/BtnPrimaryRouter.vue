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
    <router-link class="bg-[#275A50] text-white cursor-pointer rounded-xl py-2 text-center hover:bg-[#568a64]" :to="props.link">
        {{props.titulo}}
    </router-link>
</template>

<style scoped>

</style>
