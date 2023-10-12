<template>
    <button v-if="true" @click="connectWallet()" class="btn btn-primary">
        Connect Wallet
    </button>
    <!-- <button v-else class="btn btn-outline btn-disabled">
        <span :class="{ 'loading': walletConnecting, 'loading-spinner': walletConnecting}"></span>
        <span class="loading loading-spinner"></span>
        Connecting
    </button> -->
</template>

<script setup lang="ts">
const {
    connectWallet,
    walletConnecting,
} = useEffectClient()
</script>