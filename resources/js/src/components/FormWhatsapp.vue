<script setup lang="ts">
const props = defineProps({
    show: {
        type: Boolean,
        default: false
    }
});
const emit = defineEmits<{
    (e: 'click'): void
}>();
</script>

<template>
    <div v-if="props.show" class="fixed inset-0 z-20 bg-black/20 p-5 lg:p-15 flex items-center justify-center" @click.self="emit('click')">
        <div class="bg-white w-120 h-full rounded-xl flex flex-col gap-5 p-3 shadow-xl">
            <div class="w-full flex justify-end items-center">
                <h2 class="flex-1 text-[#757575] text-xl">Escribe y nos pondremos en contacto</h2>
                <button @click="emit('click')"
                        class="border rounded-lg py-1 px-2 text-[#cccccc] leading-none cursor-pointer transition-colors duration-300 hover:text-[#918164] lg:text-[1.5rem]">X</button>
            </div>
            <div class="overflow-auto">
                <div class="hs-form-frame" data-region="na1" data-form-id="e6b36d11-6197-4aa2-815f-9b13fd86cd41" data-portal-id="24148893"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
