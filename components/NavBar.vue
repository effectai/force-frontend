<template>
    <nav
        class="w-full flex-col block bg-gray-100 py-2 border-1 border-bottom-1"
    >
        <div
            class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto"
        >
            <NuxtLink to="/" class="logo">
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

const closeDropdown = () => {
    console.log("closeDropdown", dropDownElement.value);
    dropDownElement.value?.classList?.remove("dropdown-open");
};
</script>

<style>
nav {
    background-color: var(--c-gray-3);
    margin-bottom: var(--space-vert);
    border-bottom: 1px solid var(--c-border);
    display: flex;
}
nav .user {
    margin-left: auto;
    padding: 0 1.45rem;
    align-self: center;
    color: var(--fontColor);
    border-left: 1px solid var(--c-border);
    align-self: stretch;
    display: flex;
    align-items: center;
}
nav .user .connect {
    font-size: 1em;
}
nav .user .profile {
}
.logo h1 {
    padding: 0.75rem 0;
    color: var(--fontColor);
    text-decoration: none;
    font-weight: normal;
    font-size: 1em;
    margin: 0;
}
a.logo {
    text-decoration: none;
}

.logo img {
    margin: 0 0.45rem;
}
.logo {
    display: flex;
    align-items: center;
}
</style>
