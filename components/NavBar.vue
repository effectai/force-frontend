<template>
    <div class="navbar bg-base-100">
        <div class="navbar-start">
            <!-- <nuxt-img src="@/img/dapps/effect-force-icon.png" /> -->
            <a href="/" class="text-lg font-bold">Effect Network</a>
        </div>
        <div class="navbar-end">
            <button class="btn btn-primary" @click="login()">Connect Wallet</button>
        </div>
    </div>
</template>

<script setup lang="ts">
const login = async () => {
    const { $sessionKit } = useNuxtApp()
    await $sessionKit.login()
}
</script>


<style>
header {
    background-color: #f8f8f8;
    padding: 1rem;
}

nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
}

nav li {
    margin-right: 1rem;
}

nav a {
    color: #333;
    text-decoration: none;
}
</style>
