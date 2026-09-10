<script setup>

</script>
<template>
    <div class="min-h-screen flex flex-col items-center justify-center px-6" style="background-color: #222222">
        <h1 class="text-[120px] font-light leading-none tracking-wide text-white">404</h1>
        <h2 class="text-white font-semibold lg:text-[2.5rem]">{{ $t('found_p1') }}</h2>
        <p class="mt-4 text-center text-white max-w-md">
            {{ $t('found_p2') }}
        </p>
        <router-link
            to="/"
            class="mt-6 px-6 py-2 bg-[#2B5A51] text-white font-semibold rounded transition duration-300 hover:bg-[#224640]">
            {{ $t('found_p3') }}
        </router-link>
    </div>
</template>
<style scoped>

</style>
