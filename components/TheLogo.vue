<template>
   <NuxtLink
        to="/"
        class="logo-container"
        >
        <img 
        class="logo"
        src="/img/effect-logo-black.png">
        <span>Effect AI</span>
    </NuxtLink>
</template>

<script setup lang="ts">

</script>

<style scoped>

.logo-container {
    display:flex;
    gap:5px;
    align-items: center;
    font-size:28px;
    color:black;
    text-decoration: none;
}

.logo {
    align-items: center;
    justify-content: space-between;
    width: 50px;
    background-color: #f0f0f0;
    border-radius: 10px;
}
</style>