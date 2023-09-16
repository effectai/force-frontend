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
            <button v-if="!userLoggedIn.valueOf()" class="btn btn-primary" @click="login()">Connect Wallet</button>
            <button v-else class="btn btn-primary">{{ userName }}</button>
        </div>
    </div>
</template>

<script setup lang="ts">
const effectClient = useEffectClient().effectClient
const sessionKit = useSessionKit().sessionKit

const userLoggedIn = ref(false)
const userName = ref('')

const login = async () => {
    const { session } = await sessionKit.login()
    effectClient.loginWithSession(session)
    userName.value = effectClient?.session.actor.toString()
    userLoggedIn.value = true
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
