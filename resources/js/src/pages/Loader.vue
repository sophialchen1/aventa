<script setup>

</script>

<template>
    <div class="flex justify-center items-center w-screen h-screen bg-transparent">
        <!-- Contenedor centrado horizontal con fondo -->
        <div class="flex items-center justify-center gap-10 p-6 rounded-xl">
            <!-- Logo -->
            <img
                class="w-40 lg:w-[180px] border-r-2 border-[#ee7465] pr-6"
                src="../assets/media/aventaLogo.png"
                alt="Aventa Logo"
            />
            <!-- Loader -->
            <div class="loader">
                <div class="jimu-primary-loading"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Loader personalizado */
.loader {
    position: relative;
    width: 60px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.jimu-primary-loading:before,
.jimu-primary-loading:after {
    position: absolute;
    top: 0;
    content: "";
}

.jimu-primary-loading:before {
    left: -19.992px;
}

.jimu-primary-loading:after {
    left: 19.992px;
    -webkit-animation-delay: 0.32s !important;
    animation-delay: 0.32s !important;
}

.jimu-primary-loading:before,
.jimu-primary-loading:after,
.jimu-primary-loading {
    background: #ee7465;
    -webkit-animation: loading-keys-app-loading 0.8s infinite ease-in-out;
    animation: loading-keys-app-loading 0.8s infinite ease-in-out;
    width: 13.6px;
    height: 32px;
}

.jimu-primary-loading {
    text-indent: -9999em;
    margin: auto;
    position: relative;
    -webkit-animation-delay: 0.16s !important;
    animation-delay: 0.16s !important;
}

@-webkit-keyframes loading-keys-app-loading {
    0%, 80%, 100% {
        opacity: 0.75;
        box-shadow: 0 0 #ee7465;
        height: 32px;
    }

    40% {
        opacity: 1;
        box-shadow: 0 -8px #ee7465;
        height: 40px;
    }
}

@keyframes loading-keys-app-loading {
    0%, 80%, 100% {
        opacity: 0.75;
        box-shadow: 0 0 #ee7465;
        height: 32px;
    }

    40% {
        opacity: 1;
        box-shadow: 0 -8px #ee7465;
        height: 40px;
    }
}
</style>
