<template>
    <button @click="connectWallet()" class="btn btn-primary">
        <span :class="{ 'loading': walletConnecting, 'loading-spinner': walletConnecting}"></span>
        Connect Wallet
    </button>
</template>

<script setup lang="ts">
const {
    connectWallet,
    walletConnecting,
} = useEffectClient()
</script>