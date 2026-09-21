<script setup>
import {onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n();
const hover_img = ref(null);


const props = defineProps({
    tipo:String,
    arreglo:Array,
});

const u_media = '/media/puertas_ventanas/'

onMounted(() => {
    console.log(props.arreglo)
    console.log(props.tipo)

});

</script>

<template>

    <div class="bg-[#E0E2E4] rounded-xl shadow-md flex p-10">
        <div class="w-full relative flex flex-col gap-10 justify-center">
            <a @click="$emit('volver')" class="absolute left-0 top-3 w-fit group flex items-center gap-2 pb-1 cursor-pointer bg-gradient-to-l from-[#918164] to-[#918164] bg-no-repeat bg-[length:0%_2px] bg-right-bottom hover:bg-[length:100%_2px] transition-all duration-300 ease-in-out group-hover:font-bold" >
                <div class="p-0.5 border-1 rounded-full border-[#918164] w-fit h-fit group-hover:border-2">
                    <img class="h-5 w-5" src="../../assets/media/icons/angulo-pequeno-izquierdo.png" alt="volver">
                </div>
                <p class="text-xl italic tracking-wide text-[#918164] group-hover:font-semibold">{{ $t('cfg_back') }}</p>
            </a>
            <h1 class="italic w-full text-center tracking-wider lg:text-[2rem] text-[#918164] font-semibold">{{ tipo === 'puerta' ? $t('cfg_door_title') : $t('cfg_window_title') }}</h1>


            <div class="grid grid-cols-3 gap-x-25 gap-y-10">
                <div v-for="i in arreglo" :key="i.id" @mouseenter="hover_img = i.id" @mouseleave="hover_img = null" @click="$emit('vistaTipo', {value: tipo, item: i})" class="bg-white rounded-xl p-4 flex flex-col justify-center items-center cursor-pointer shadow-md">
                    <img class="w-full h-[320px] object-contain" :src="hover_img === i.id ? u_media + tipo + 's_abiertas/' + i.name_img : u_media + tipo + 's/' + i.name_img"  alt="">
                    <p class="border-2 text-[#918164] w-[60%] rounded-2xl text-center pt-2 pb-2">{{ $t(i.nameKey) }}</p>
                </div>
            </div>

        </div>

    </div>

</template>

<style scoped>

</style>
