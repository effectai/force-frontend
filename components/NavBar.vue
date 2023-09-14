<template>
    <div class="navbar bg-base-100">
        <div class="navbar-start">
            <!-- <nuxt-img 
                src="/img/dapps/effect-force-icon.png"  
                height="60"
                fit="iniside"
            /> -->
            <img src="/img/dapps/effect-force-icon.png" style="height: 60px;"/>
            <a href="/" class="text-lg font-bold">Effect Network</a>
        </div>
        <div class="navbar-end">
            <button v-if="userLoggedIn" class="btn btn-primary" @click="login()">Connect Wallet</button>
            <button v-else class="btn btn-primary">{{ userName }}</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import SessionKit from '@wharfkit/session';
import { Client } from '@effectai/effect-js'
import { reactiveComputed } from '@vueuse/core';

const $sessionKit: SessionKit = useNuxtApp().$sessionKit
const $effectClient: Client = useNuxtApp().$effectClient
console.log($effectClient)


const userLoggedIn = ref(() => $effectClient?.isLoggedIn())
const userName = async () => {
    const vaccount = await $effectClient.vaccount.get()
    const [ , name ] = vaccount.address
    console.log(name)
    return name
}
const login = async () => {
    const { session } = await $sessionKit.login()
    console.debug('session', session)
    console.debug($effectClient)
    // NOTE: Here its not available anymore.
    $effectClient.loginWithSession(session)
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
