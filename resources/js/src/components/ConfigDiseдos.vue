<script setup>
import { defineAsyncComponent, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

const props = defineProps({
    p_actual: String
})

const { t } = useI18n();
const route = useRoute();

const seleccionarTipo = defineAsyncComponent(() => import("../components/configd/SeleccionarTipo.vue"));
const vistaTipo = defineAsyncComponent(() => import("../components/configd/VistaTipo.vue"));
const detallesTipo = defineAsyncComponent(() => import("../components/configd/DetalleTipo.vue"));

const u_media = '/media/puertas_ventanas/';

const p_actual = ref('seleccion');
const t_selected = ref(null);
const i_selected = ref(null);
const i_anterior = ref(null);
const it_selected = ref(null);

const puertas = [
    {
        id: 1,
        name: "Practicable",
        name_img: "puerta_solida.png",
    },
    {
        id: 2,
        name: "Plegable",
        name_img: "puerta_vidrio.png",
    },
    {
        id: 3,
        name: "Corrediza elevable",
        name_img: "puerta_combinada.png",
    },
    {
        id: 4,
        name: "Pivotante",
        name_img: "puerta_combinada.png",
    }
];

const ventanas = [
    {
        id: 1,
        name: "fija",
        name_img: "ventana_fija.png",
    },
    {
        id: 2,
        name: t('ini_ab'),
        name_img: "ventana_fija.png",
    },
    {
        id: 3,
        name: t('ini_osc'),
        name_img: "ventana_fija.png",
    },
    {
        id: 4,
        name: "Corrediza",
        name_img: "ventana_fija.png",
    },
    {
        id: 5,
        name: "Plegable",
        name_img: "ventana_fija.png",
    },
    {
        id: 6,
        name: t('ini_pro'),
        name_img: "ventana_fija.png",
    },
    {
        id: 7,
        name: t('ini_gui'),
        name_img: "ventana_fija.png",
    }
]

function selectTipo(tipo) {
    t_selected.value = tipo;
    p_actual.value = tipo
    i_selected.value = tipo === 'puerta' ? puertas : ventanas;
}

function selectItem({ value, item }) {
    i_anterior.value = value === 'puerta' ? 'puerta' : 'ventana';
    it_selected.value = [item];
    p_actual.value = 'detalles'
}

onMounted(() => {
    const tipo = route.query.tipo;
    if (tipo === 'puerta' || tipo === 'ventana') selectTipo(tipo);
})

</script>
<template>
    <suspense>
        <template #default>
            <div class="flex justify-center">
                <div class="w-full flex flex-col py-8 lg:max-w-[1150px]">

                    <seleccionarTipo v-show="p_actual === 'seleccion'" @seleccionarTipo="selectTipo"></seleccionarTipo>
                    <vistaTipo v-if="(p_actual === 'puerta' || p_actual === 'ventana')" :tipo="t_selected"
                        :arreglo="i_selected" @vistaTipo="selectItem" @volver="p_actual = 'seleccion'"></vistaTipo>
                    <detallesTipo v-if="p_actual === 'detalles'" :tipo="t_selected" :item="it_selected"
                        @volver="p_actual = i_anterior">
                    </detallesTipo>
                </div>
            </div>
        </template>
        <template #fallback>
            <div class="flex justify-center w-max h-max">
                <div class="loader">
                    <div class="justify-content-center jimu-primary-loading"></div>
                </div>
            </div>
        </template>
    </suspense>
</template>
<style scoped></style>
