<script setup lang="ts">
const props = defineProps({
    subtitulo: String,
})
</script>
<template>
    <h2 class="font-light italic tracking-wider text-2xl text-center lg:text-[2.5rem] lg:text-start" v-html="props.subtitulo"></h2>
</template>
