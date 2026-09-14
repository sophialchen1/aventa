<script setup lang="ts">
import { computed } from 'vue'
import { medias } from '../data/medias.js'

const props = defineProps<{
    tam?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    gap?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10'
    color?: 'blanco' | 'negro'
}>()

const isWhite = computed(() => props.color === 'blanco')

// Mapas de clases TAILWIND estáticas (seguras)
const sizeClasses: Record<string, string> = {
    xs: 'w-4 h-4',
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
}

const gapClasses: Record<string, string> = {
    '0': 'gap-0',
    '1': 'gap-1',
    '2': 'gap-2',
    '3': 'gap-3',
    '4': 'gap-4',
    '5': 'gap-5',
    '6': 'gap-6',
    '8': 'gap-8',
    '10': 'gap-10',
}

const wrapperGapClass = computed(() => gapClasses[props.gap ?? '3'])
const imgSizeClass   = computed(() => sizeClasses[props.tam ?? 'md'])

function reportConversion(evento: String, url: String) {
    window.gtag_report_conversion(url, evento)
    return gtag_report_conversion(undefined, evento)
}

</script>

<template>
    <div class="flex" :class="wrapperGapClass">
        <a
            v-for="s in medias"
            :key="s.name"
            :href="s.url"
            :target="s.target"
            class="opacity-50 hover:opacity-100 cursor-pointer"
            @click="window.gtag_report_conversion(s.url,s.evento)"
            :onclick="`return gtag_report_conversion(${JSON.stringify(s.url)}, ${JSON.stringify(s.evento)})`"
        >
            <img
                :src="isWhite ? s.imagen.blanca : s.imagen.negra"
                :class="imgSizeClass"
                alt=""
            />
        </a>
    </div>
</template>


