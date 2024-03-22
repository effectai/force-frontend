<template>
    <nav
        class="w-full flex-col block bg-gray-100 py-4 border-1 border-bottom-1"
    >
        <div
            class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-3"
        >
            <NuxtLink to="/" class="flex gap-1 items-center">
                <img src="/img/effect-logo-black.png" style="height: 35px" />
                <h1>Effect AI</h1>
            </NuxtLink>

            <div v-if="!isLoggedIn">
                <NuxtLink
                    class="btn btn-primary"
                    to="/"
                    @click="connectWallet()"
                >
                    connect
                </NuxtLink>
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
    isWalletConnecting,
    isLoggedIn,

    userName,
    userAccount,
} = useEffectClient();

// retrieve ref of ul
const dropDownElement = ref(null);
</script>

<style></style>
