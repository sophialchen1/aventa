<script setup lang="ts">
import { onBeforeUnmount, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { irAGracias } from "../lib/track.js";

const HS_FORM_ID = "e6b36d11-6197-4aa2-815f-9b13fd86cd41";

const props = defineProps({
    show: {
        type: Boolean,
        default: false
    }
});
const emit = defineEmits<{
    (e: 'click'): void
}>();

// The form itself is a HubSpot embed, so we cannot see its submit. HubSpot
// announces a successful submission on window instead.
// https://developers.hubspot.com/docs/api-reference/latest/marketing/forms/global-form-events
//
// This component is mounted more than once on some pages (layout and
// Instalaciones), so only the open one reacts.
const route = useRoute();
const router = useRouter();

function onEnviado(e: Event) {
    const detail = (e as CustomEvent).detail || {};
    if (!props.show || detail.formId !== HS_FORM_ID) return;
    irAGracias(router, route, "whatsapp");
}

onMounted(() => window.addEventListener("hs-form-event:on-submission:success", onEnviado));
onBeforeUnmount(() => window.removeEventListener("hs-form-event:on-submission:success", onEnviado));
</script>

<template>
    <div v-if="props.show" class="fixed inset-0 z-20 bg-black/20 p-5 lg:p-15 flex items-center justify-center" @click.self="emit('click')">
        <div class="bg-white w-120 h-full rounded-xl flex flex-col gap-5 p-3 shadow-xl">
            <div class="w-full flex justify-end items-center">
                <h2 class="flex-1 text-[#757575] text-xl">{{ $t('f_write_modal') }}</h2>
                <button @click="emit('click')"
                        class="border rounded-lg py-1 px-2 text-[#cccccc] leading-none cursor-pointer transition-colors duration-300 hover:text-[#918164] lg:text-[1.5rem]">X</button>
            </div>
            <div class="overflow-auto">
                <div class="hs-form-frame" data-region="na1" :data-form-id="HS_FORM_ID" data-portal-id="24148893"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
