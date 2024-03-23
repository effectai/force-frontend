<template>
    <nav>
        <div class="container">
            <NuxtLink to="/" class="logo">
                <img src="/img/effect-logo-black.png" />
                <span>Effect AI</span>
            </NuxtLink>

            <div v-if="!isLoggedIn">
                <button class="button" to="/" @click="connectWallet()">
                    connect
                </button>
            </div>

            <div v-else class="">
                <NuxtLink to="/" class="" @click="disconnectWallet()">
                    logout
                </NuxtLink>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
const {
    connectWallet,
    disconnectWallet,
    isLoggedIn,
    isWalletConnecting,
    userName,
    userAccount,
} = useEffectClient();
</script>

<style scoped>

nav {
    background-color: var(--white-color);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

nav .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 1rem;
}

/* Logo styling */

nav .logo {
    display: flex;
    align-items: center;
}

nav .logo img {
    width: 32px;
    margin-right: 10px;
}

nav a.logo {
    font-size: var(--font-size-lg);
    font-weight: bold;
    color: var(--color-main);
    text-decoration: none;
}
</style>
