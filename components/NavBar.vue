<template>
    <div class="navbar bg-base-100">
        <div class="flex-1">
            <NuxtLink to="/" class="btn btn-ghost normal-case text-xl">
                <span>
                    <img src="/img/dapps/effect-force_h100.png" style="height: 40px;" />
                </span>
            </NuxtLink>
        </div>

        <div v-if="!userLoggedIn" class="flex-none">
            <button class="btn btn-ghost btn-outline" @click="connectWallet()">Connect Wallet</button>
        </div>
        <div v-else class="flex-none">
            <div class="dropdown dropdown-end m-6">
                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img src="/img/dapps/effect-force-icon.png" />
                    </div>
                    {{ userName }}
                </label>
                <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                        <NuxtLink to="/profile" class="btn btn-ghost justify-center content-center">Profile</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/settings" class="btn btn-ghost justify-center content-center">Settings</NuxtLink>
                    </li>
                    <li>
                        <button @click="disconnectWallet()" class="btn btn-ghost justify-center content-center">Logout</button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const {
    connectWallet,
    disconnectWallet,
    userName,
    userLoggedIn,
    userAccount,
} = useEffectClient()
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
