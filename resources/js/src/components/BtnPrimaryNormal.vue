<script setup lang="ts">
const props = defineProps({
    titulo: String,
})

const emit = defineEmits<{
    (e: 'click'): void
}>();

</script>

<template>
    <button class="bg-[#275A50] text-white cursor-pointer rounded-xl py-2 hover:bg-[#568a64]" @click="emit('click')">
        {{props.titulo}}
    </button>
</template>

<style scoped>

</style>
