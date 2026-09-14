<script setup>

import {computed, onMounted, onUnmounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {useI18n} from "vue-i18n";
import FormGrande from "../layouts/formGrande.vue";
import FormWhatsapp from "@/src/components/FormWhatsapp.vue";

const {t} = useI18n();

const ventanas = [
    {
        id: 0,
        name:"Fija",
        abierta: "/media/puertas_ventanas/ventana_fija.webp",
        cerrada: "/media/puertas_ventanas/ventana_fija.webp",
        des: "No se abre, solo da luz y vista.",
        tip: "/ventanas"
    },
    {
        id: 1,
        name: "Abatible",
        abierta: "/media/puertas_ventanas/ventana_abatible.png",
        cerrada: "/media/puertas_ventanas/ventana_abatible.gif",
        des:"Se abre hacia adentro o fuera ",
        tip: "/ventanas"
    },
    {
        id: 2,
        name: t('ini_osc'),
        abierta: "/media/puertas_ventanas/ventana_oscilobatible.png",
        cerrada: "/media/puertas_ventanas/ventana_oscilobatible.gif",
        des:"Se abre lateral o superiormente.",
        tip: "/ventanas"
    },
    {
        id: 3,
        name:"Corrediza",
        abierta: "/media/puertas_ventanas/ventana_corrediza.png",
        cerrada: "/media/puertas_ventanas/ventana_corrediza.gif",
        des:"Corre lateralmente, sin ocupar espacio.",
        tip: "/ventanas"
    },
    {
        id: 4,
        name:"Plegable",
        abierta: "/media/puertas_ventanas/ventana_plegable.png",
        cerrada: "/media/puertas_ventanas/ventana_plegable.gif",
        des: "Se abre en secciones hacia un lado.",
        tip: "/ventanas"
    },
    {
        id: 5,
        name: t('ini_pro'),
        abierta: "/media/puertas_ventanas/ventana_proyectable.png",
        cerrada: "/media/puertas_ventanas/ventana_proyectable.gif",
        des:"Se abre hacia afuera desde abajo.",
        tip: "/ventanas"
    },
    /*{
        id: 6,
        name: t('ini_gui'),
        abierta: "/media/puertas_ventanas/ventana_guillotina.png",
        cerrada: "/media/puertas_ventanas/ventana_guillotina.gif",
        des:"Se desliza verticalmente para abrir.",
        tip: "/ventanas"
    }*/
]
const puertas = [
    {
        id: 0,
        name: "Practicable",
        abierta: "/media/puertas_ventanas/puerta_practicable.png",
        cerrada: "/media/puertas_ventanas/puerta_practicable.gif",
        des: "Se abre como una puerta tradicional.",
        tip: "/puertas"
    },
    {
        id: 1,
        name: "Plegable",
        abierta: "/media/puertas_ventanas/puerta_plegable.png",
        cerrada: "/media/puertas_ventanas/puerta_plegable.gif",
        des:"Las hojas se doblan hacia un lado para abrir.",
        tip: "/puertas"
    },
    {
        id: 2,
        name: "Corrediza elevable",
        abierta: "/media/puertas_ventanas/puerta_corredizaelevable.png",
        cerrada: "/media/puertas_ventanas/puerta_corredizaelevable.gif",
        des:"Corre suave y sella herméticamente.",
        tip: "/puertas"
    },
    /*{
        id:3,
        name: "Pivotante",
        abierta: "/media/puertas_ventanas/puerta_pivotante.png",
        cerrada: "/media/puertas_ventanas/puerta_pivotante.gif",
        des: "Gira sobre un eje central moderno.",
        img: "/media/puertas_ventanas/puerta_pivotante.gif",
        tip: "/puertas"
    }*/
]


const c_comprar = [
    {
        img:"/media/aventa-verde.jpg",
        btn:"Ver Catálogo",
        link:"/catalogo"
    },
    {
        img:"/media/banner_home/banner_12.jpeg",
        btn:"Inspiración de Diseño",
        link:"/inspiracion"
    },
    {
        img:"/media/proyectos/valise1.jpeg",
        btn:"Planea tu Visita",
        link: "/planea-visita"
    }
]
const t_proyecto = [
    'Nuevo', 'Remodelacion'
]

const altButtons = computed(() => [
    {
        title: t('nav_cotiza'),
        href: "/cotizacion"
    },
    {
        title: t('nav_pres'),
        href: "/presupuesto"
    },
    {
        title: t('nav_pres'),
        href: "/presupuesto"
    }
])

const nav_bar = ref(null);
const isScrolled = ref(false);

const activeModal = ref(null);
const item_select =ref(null);
const img_select = ref(null);

const route = useRoute();
const showMBtns = ref(0);

const modalComprar = ref(false);

const openMenuMovil = ref(false);
const openRe = ref(false);

const openForm = ref(false);

const abrir_p = ref(false);
const abrir_v = ref(false);
const abrir_c = ref(false);


function openFormW(){
    openForm.value = !openForm.value;
    document.body.style.overflow = openForm.value ? 'hidden' : '';
}

function openRequest(){
    openRe.value = !openRe.value;
    document.body.style.overflow = openRe.value ? 'hidden' : '';
}

function openMovil(){
    openMenuMovil.value = !openMenuMovil.value;
    document.body.style.overflow = openMenuMovil.value ? 'hidden' : ''
}

function openComprarModal() {
    modalComprar.value = !modalComprar.value;
}

function closeComprarModal() {
    modalComprar.value = false;
}
function handleModal(action) {
   switch (action){
       case 'comprar':
           openComprarModal();
           closeM();
           break;
       case 'cerrar':
           closeComprarModal();
           closeM();
           break;
       default:
           openM(action);
           closeComprarModal();
           break;
   }
}


function openM(tipo) {
    if (activeModal.value === tipo) {
        // Si ya está abierto, ciérralo
        activeModal.value = null;
        item_select.value = null;
    } else {
        // Si es diferente, ábrelo y carga el contenido
        activeModal.value = tipo;
        item_select.value = tipo === 'puertas' ? puertas : ventanas;
    }
}
function closeM(){
    activeModal.value = null
}

function handleScroll () {
    isScrolled.value = window.scrollY > 0;
}
function rutasDinamicas () {
    switch (route.path) {
        case "/como-comprar":
            showMBtns.value = 1
            break
        case "/contacto":
            showMBtns.value = 2
            break
        default:
            showMBtns.value = 0
    }
    return showMBtns.value
}


watch( () => route.path, () => {
    rutasDinamicas();
});

onMounted(() => {
    rutasDinamicas();
    window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
});

</script>

<template>
    <div ref="nav_bar" :class="{'scrolled': isScrolled}" class="flex nav-bar flex-col w-full z-20 shadow-md lg:shadow-xl">
        <div :class="{'nav': isScrolled}"  class="nav-bar flex justify-center bg-[#FFFFFA]">
            <div class="flex justify-between items-center px-5 lg:px-0 lg:gap-[20px] w-full lg:max-w-[1150px] pt-2 pb-2">
                <router-link @click="handleModal('cerrar')" class="flex-none xl:ml-20" to="/"><img class="w-25 lg:w-[150px]" ref="logo"
                                                                 src="../assets/media/aventaLogo.png"></router-link>
                <div class="flex-1 hidden justify-end items-center gap-[3vw] xl:flex">
                    <router-link @click="handleModal('cerrar')" class="transition-all duration-300 hover:text-[#918164] cursor-pointer hover:translate-y-[-5px]" exact-active-class="active" to="/">
                        {{$t('nav_inicio')}} </router-link>

                    <button class="flex gap-1 justify-center items-center cursor-pointer transition-all duration-300 hover:text-[#918164] hover:translate-y-[-5px]" :class="{'active': activeModal === 'puertas'}"
                            @click="handleModal('puertas')">{{$t('nav_puertas')}} <p v-if="activeModal=== 'puertas'" class="rotate-270"> &lt; </p></button>


                    <button class="flex gap-1 cursor-pointer transition-all duration-300 hover:text-[#918164] hover:translate-y-[-5px]" :class="{'active': activeModal === 'ventanas'}"
                            @click="handleModal('ventanas')">{{$t('nav_ventanas')}} <p v-if="activeModal=== 'ventanas'" class="rotate-270"> &lt; </p></button>

                    <button
                        @click="handleModal('comprar')"
                        class="flex gap-1 cursor-pointer transition-all duration-300 hover:text-[#918164] hover:translate-y-[-5px]" :class="{'active': modalComprar}">{{$t('nav_cocomprar')}}
                        <p v-if="modalComprar" class="rotate-270"> &lt; </p>
                    </button>

                    <router-link  @click="handleModal('cerrar')" class="transition-all duration-300 hover:text-[#918164] cursor-pointer hover:translate-y-[-5px]" exact-active-class="active" to="/contacto">{{$t('nav_contact')}}</router-link>
                </div>
                <button
                    @click="openRequest"
                    class="hidden bg-[#275A50] h-fit w-[130px] cursor-pointer text-center text-white text-sm pt-3 pb-3 pl-7 pr-7 leading-none rounded-lg transition-all duration-400 ease-in-out xl:flex"
                    >{{ altButtons[showMBtns].title }}</button>

                <div class="p-1 border-1 border-[#918164] rounded-xl xl:hidden w-8 h-8" @click="openMovil">
                    <div class="flex flex-col w-full h-full items-center justify-center gap-1 relative">
                        <div class="bg-[#918164] h-1 rounded-full transition-all duration-300 ease-in-out"
                            :class="{'w-1':!openMenuMovil,'w-full rotate-45 absolute': openMenuMovil}" ></div>
                        <div class="bg-[#918164] h-1 rounded-full transition-all duration-300 ease-in-out"
                             :class="{'w-1':!openMenuMovil,'w-full rotate-135': openMenuMovil}"></div>
                        <div class="bg-[#918164] h-1 rounded-full"
                             :class="{'w-1':!openMenuMovil,'hidden': openMenuMovil}"></div>
                    </div>
                </div>

            </div>
        </div>
    </div>


    <transition name="fade">
        <div
            v-if="activeModal"
            class="fixed bg-[rgba(0,0,0,0.6)] top-16 left-0 right-0 bottom-0 z-11 flex items-start justify-center"
            @click.self="closeM"
        >
            <!-- Modal -->
            <transition name="slide-down">
                <div class="bg-white shadow-lg w-full h-max  flex" :class="isScrolled ? 'mt-5' : 'mt-13'">
                    <div class="flex-7/10 grid grid-cols-3 p-10 gap-x-10 gap-y-5 w-full h-max p-5">
                        <router-link
                            class="group bg-gray-200 flex items-center cursor-pointer overflow-hidden rounded-lg gap-3 shadow-sm p-2" v-for="i in item_select" :key="i.id"
                            @mouseenter="img_select = i.id"
                            @mouseleave="img_select = null"
                            @click="closeM"
                            :to="i.tip"
                        >
                            <div class="flex-1/4">
                                <img :class="{ 'rotate-270': i.name === 'Abatible' }" :src="img_select === i.id ? i.cerrada : i.abierta" :alt="i.name + '.gif'">
                            </div>
                            <div class="flex-3/4 flex flex-col w-full">
                                <p class=" lg:text-lg group-hover:text-[#918164]">{{ i.name }}</p>
                                <div v-if="img_select === i.id" >
                                    <p class="text-sm">{{i.des}}</p>
                                </div>
                            </div>
                        </router-link>
                    </div>
                    <div class="flex-3/10 flex flex-col gap-5 justify-center items-center bg-gray-200 p-10">
                        <p class=" font-bold lg:text-[1.4rem]">{{ $t('nav_p1') }}</p>
                        <div class="bg-[#918164] h-[2px] w-full"></div>
                        <div class="flex gap-5 items-center w-full">
                            <img class="w-10 h-10" src="../assets/media/icons/puerta_abierta_default.png" alt="">
                            <p class=" lg:text-lg">{{ $t('nav_p2') }}</p>
                        </div>
                        <div class="h-[20px]"></div>
                        <p class="font-bold lg:text-[1.4rem]">{{ $t('nav_p3') }}</p>
                        <div class="bg-[#918164] h-[2px] w-full"></div>
                        <div class="flex gap-5 items-center w-full">
                            <img class="w-10 h-10" src="../assets/media/icons/3d_default.png" alt="">
                            <p class="lg:text-lg">{{ $t('nav_p4') }}</p>
                        </div>
                    </div>
                </div>

            </transition>
        </div>
    </transition>

    <transition name="fade">
        <div v-if="modalComprar" class="fixed bg-[rgba(0,0,0,0.6)] top-16 left-0 right-0 bottom-0 z-11"
             @click.self="closeComprarModal">

            <transition name="slide-down">
                <div class="bg-white shadow-lg w-full h-max p-5 flex justify-center" :class="isScrolled ? 'mt-5' : 'mt-13'">
                    <div class="w-full max-w-[1150px] flex gap-x-5">
                        <div class="flex-2/5 w-full">
                            <h3 class="italic tracking-wider lg:text-[2rem]">Convierte tu visión en realidad</h3>
                            <p class="text-[#757575] lg:text-xl">Explora diseños, agenda tu consulta y vive la experiencia Aventa Windows.</p>
                        </div>

                        <router-link @click="handleModal('cerrar')" v-for="(i,index) in c_comprar" :key="index" :to="i.link" class="flex-1/5 w-full group">
                            <div class="overflow-hidden rounded-xl w-full h-[200px]">
                                <img class="w-full h-full object-cover"  :src="i.img" alt="">
                            </div>
                            <button class="w-fit text-[#757575] text-start italic cursor-pointer lg:text-[1.2rem] lg:mt-2 bg-gradient-to-r from-[#757575] to-[#757575] bg-no-repeat bg-[length:0%_2px] bg-left-bottom group-hover:bg-[length:100%_2px] transition-all duration-300 ease-in-out group-hover:font-bold">{{ i.btn }}</button>
                        </router-link>
                    </div>


                </div>
            </transition>

        </div>
    </transition>

    <transition
        name="slide"
        enter-active-class="transition-transform duration-300 ease-out"
        enter-from-class="translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition-transform duration-200 ease-in"
        leave-from-class="transalate-x-0"
        leave-to-class="translate-x-full"
    >
        <div v-if="openMenuMovil" class="fixed flex flex-col inset-0 z-19 bg-white" :class="{'top-16':isScrolled,'top-24':!isScrolled}">
            <div class="flex-1 flex flex-col text-[#918164] text-lg overflow-auto">
                <router-link class="flex justify-between p-3 font-bold" to="/" @click="openMovil">
                    <p>Inicio</p>
                    <img class="rotate-180 w-5 h-5" src="../assets/media/icons/angulo-pequeno-izquierdo.png" alt="">
                </router-link>
                <div @click="abrir_p = !abrir_p" class="flex justify-between p-3 font-bold" :class="{'border-b-1':abrir_p}">
                    <p>Puertas</p>
                    <img class="rotate-180 w-5 h-5 transform duration-300" :class="{'rotate-270':abrir_p}" src="../assets/media/icons/angulo-pequeno-izquierdo.png" alt="">
                </div>
                <transition
                    enter-active-class="transition-all duration-500 ease-in-out"
                    enter-from-class="max-h-0 opacity-0"
                    enter-to-class="max-h-96 opacity-100"
                    leave-active-class="transition-all duration-500 ease-in-out"
                    leave-from-class="max-h-96 opacity-100"
                    leave-to-class="max-h-0 opacity-0"
                >
                    <div v-if="abrir_p" class="w-full px-4 py-2 gap-3 grid grid-cols-1 md:grid-cols-2" >
                        <router-link v-for="i in puertas" class="flex bg-gray-200 items-center py-2 px-5 gap-5 rounded-xl shadow-md" :to="i.tip" @click="[openMovil(),abrir_p = false]">
                            <img class="w-15" :src="i.cerrada" alt="">
                            <div>
                                <p>{{i.name}}</p>
                                <p class="text-sm text-[grey] italic">{{i.des}}</p>
                            </div>
                        </router-link>
                    </div>
                </transition>
                <div @click="abrir_v = !abrir_v" class="flex justify-between p-3 font-bold" :class="{'border-b-1':abrir_v}">
                    <p>Ventanas</p>
                    <img class="rotate-180 w-5 h-5 transform duration-300" :class="{'rotate-270':abrir_v}" src="../assets/media/icons/angulo-pequeno-izquierdo.png" alt="">
                </div>
                <transition
                    enter-active-class="transition-all duration-500 ease-in-out"
                    enter-from-class="max-h-0 opacity-0"
                    enter-to-class="max-h-96 opacity-100"
                    leave-active-class="transition-all duration-500 ease-in-out"
                    leave-from-class="max-h-96 opacity-100"
                    leave-to-class="max-h-0 opacity-0"
                >
                    <div v-if="abrir_v" class="w-full px-4 py-2 gap-3 grid grid-cols-1 md:grid-cols-2" >
                        <router-link v-for="i in ventanas" class="flex bg-gray-200 items-center py-2 px-5 gap-5 rounded-xl shadow-md" :to="i.tip" @click="[openMovil(),abrir_v = false]">
                            <img class="w-15" :src="i.cerrada" alt="">
                            <div>
                                <p>{{i.name}}</p>
                                <p class="text-sm text-[grey] italic">{{i.des}}</p>
                            </div>
                        </router-link>
                    </div>
                </transition>
                <div @click="abrir_c = !abrir_c" class="flex justify-between p-3 font-bold" :class="{'border-b-1':abrir_c}">
                    <p>Cómo Comprar</p>
                    <img class="rotate-180 w-5 h-5 transform duration-300" :class="{'rotate-270':abrir_c}" src="../assets/media/icons/angulo-pequeno-izquierdo.png" alt="">
                </div>
                <transition
                    enter-active-class="transition-all duration-500 ease-in-out"
                    enter-from-class="max-h-0 opacity-0"
                    enter-to-class="max-h-96 opacity-100"
                    leave-active-class="transition-all duration-500 ease-in-out"
                    leave-from-class="max-h-96 opacity-100"
                    leave-to-class="max-h-0 opacity-0"
                >
                    <div v-if="abrir_c" class=" w-full px-4 py-2 gap-3 grid grid-cols-1 md:grid-cols-3" >
                        <router-link v-for="i in c_comprar" class="flex bg-gray-200 items-center py-2 px-5 gap-5 rounded-xl shadow-md" :to="i.link" @click="() => {openMovil();abrir_c = false}">
                            <div class="overflow-hidden rounded-xl w-15 h-15">
                                <img class="w-full h-full object-cover" :src="i.img" alt="">
                            </div>
                            <div>
                                <p>{{i.btn}}</p>
                            </div>
                        </router-link>
                    </div>
                </transition>
                <router-link class="flex justify-between p-3 font-bold" to="/contacto" @click="openMovil">
                    <p>Contacto</p>
                    <img class="rotate-180 w-5 h-5" src="../assets/media/icons/angulo-pequeno-izquierdo.png" alt="">
                </router-link>
                <div class="flex justify-center py-2 px-4">
                    <button @click="openRequest" class="bg-[#275A50] w-full py-3 rounded-xl text-white">Solicitar Cotización</button>
                </div>
                <div class="flex-1 flex flex-col h-full w-full items-baseline">
                    <div class="flex-1/2"></div>
                    <div class="flex-1/2 flex flex-col gap-2 w-full px-4 py-1 bg-gray-200  md:py-3">
                        <h2 class="text-base text-black font-bold border-b-2 border-[#918164]">¿No sabes por dónde empezar?</h2>
                        <div class="flex gap-2">
                            <img class="w-5 h-5" src="../assets/media/icons/puerta_abierta_default.png" alt="">
                            <p class="text-sm text-black">Haz el cuestionario y encuentra tu ventana perfecta</p>
                        </div>
                        <h2 class="text-base text-black font-bold border-b-2 border-[#918164]">Explora por tu cuenta</h2>
                        <div class="flex gap-2">
                            <img class="w-5 h-5" src="../assets/media/icons/3d_default.png" alt="">
                            <p class="text-sm text-black">Dirígete a la herramienta de renders</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </transition>


    <div v-if="openRe"
         class="fixed z-50 inset-0 bg-[rgba(0,0,0,0.2)] overflow-y-auto flex justify-center px-2 py-8 lg:px-0" @click.self="openRequest">
        <div class="w-full h-max lg:max-w-[1000px] lg:p-8 bg-white rounded-xl flex flex-col gap-3 lg:gap-5 shadow-xl">
            <div class="w-full flex justify-end p-4 lg:p-0">
                <button @click="openRequest"
                        class="border rounded-lg py-1 px-2 text-[#cccccc] leading-none cursor-pointer transition-colors duration-300 hover:text-[#918164] lg:text-[1.5rem]">X</button>
            </div>

            <div class="w-full px-5 lg:px-10 flex flex-col gap-8 lg:gap-15">
                <form-grande></form-grande>
            </div>
        </div>
    </div>


</template>

<style scoped>
.nav-bar {
    position: relative;
    width: 100%;
    transition: all 0.5s ease-in-out;
}

.nav-bar.scrolled {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 20;
}

.active {
    color: #918164;
    font-weight: bold;
}

input::file-selector-button {
    background-color: #918164;
    padding: 10px;
    border-radius: 10px;
    color: white;
    margin-right: 5px;
}

input::file-selector-button:hover {
    background-color: #64563c;
    cursor: pointer;
}

/* Fondo (desvanecimiento) */
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}

/* Modal (deslizar desde arriba) */
.slide-down-enter-active, .slide-down-leave-active {
    transition: all 0.4s ease;
}
.slide-down-enter-from {
    transform: translateY(-50px);
    opacity: 0;
}
.slide-down-leave-to {
    transform: translateY(-50px);
    opacity: 0;
}
</style>
