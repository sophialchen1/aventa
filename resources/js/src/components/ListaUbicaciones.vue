<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{
    title: string
    items: Array<{ id: number|string; name_o: string; name_a: string }>
    tipo?: string // 'mad' para café, lo demás negro
}>()

// Soporta v-model:selected
const selected = defineModel<{ id: number|string; name_o: string; name_a: string }>('selected')

const isMad = computed(() => props.tipo === 'mad')
const isSelected = (item: any) => selected.value && selected.value.name_a === item.name_a

function pick(item: any) {
    selected.value = item
}
</script>

<template>
    <div class="flex flex-col gap-2">
        <div>
            <h3 class="font-bold text-lg" :class="isMad ? 'text-[#918164]' : ''">{{ title }}</h3>
            <div class="h-1 w-full" :class="isMad ? 'bg-[#918164]' : 'bg-black'"></div>
        </div>

        <div class="flex lg:flex-col gap-2 w-full">
            <div v-for="j in items" :key="j.id" @click="pick(j)" class="w-full flex items-center gap-3 px-2 py-2 cursor-pointer" :class="[isMad ? 'hover:bg-gray-300 rounded-full lg:rounded-l-full lg:rounded-r-none' : 'hover:bg-white',isSelected(j) ? (isMad ? 'bg-gray-300 rounded-full lg:rounded-l-full lg:rounded-r-none' : 'bg-white') : '']">
                <div class="w-2.5 h-2.5"
                     :class="isSelected(j) ? (isMad ? 'bg-[#918164] rounded-full' : 'bg-black') : ''"></div>
                <p class="">{{ j.name_o }}</p>
            </div>
        </div>
    </div>
</template>
