<script setup>
const props = defineProps({
    titulo: {
        type: String,
        default: "",
    }
})
</script>

<template>
    <h1 class="font-light leading-none text-white text-center text-2xl flex flex-col italic tracking-wide md:text-6xl lg:text-start"
    v-html="props.titulo"></h1>
</template>
