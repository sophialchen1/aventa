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
        nameKey: "nav_pu_prac",
        name_img: "puerta_solida.png",
    },
    {
        id: 2,
        nameKey: "ini_ple",
        name_img: "puerta_vidrio.png",
    },
    {
        id: 3,
        nameKey: "nav_pu_corel",
        name_img: "puerta_combinada.png",
    },
    {
        id: 4,
        nameKey: "cfg_pivot",
        name_img: "puerta_combinada.png",
    }
];

const ventanas = [
    {
        id: 1,
        nameKey: "ini_fij",
        name_img: "ventana_fija.png",
    },
    {
        id: 2,
        nameKey: "ini_ab",
        name_img: "ventana_fija.png",
    },
    {
        id: 3,
        nameKey: "ini_osc",
        name_img: "ventana_fija.png",
    },
    {
        id: 4,
        nameKey: "ini_cor",
        name_img: "ventana_fija.png",
    },
    {
        id: 5,
        nameKey: "ini_ple",
        name_img: "ventana_fija.png",
    },
    {
        id: 6,
        nameKey: "ini_pro",
        name_img: "ventana_fija.png",
    },
    {
        id: 7,
        nameKey: "ini_gui",
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
