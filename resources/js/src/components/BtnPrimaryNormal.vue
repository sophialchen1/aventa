<script setup lang="ts">
const props = defineProps({
    titulo: String,
})

const emit = defineEmits<{
    (e: 'click'): void
}>();

</script>

<template>
    <button class="bg-[#ee7465] text-white cursor-pointer rounded-xl py-2 hover:bg-[#ee7465]/80" @click="emit('click')">
        {{props.titulo}}
    </button>
</template>

<style scoped>

</style>
