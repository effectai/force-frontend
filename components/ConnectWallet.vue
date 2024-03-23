<template>
    <button v-if="true" @click="connectWallet()">Connect Wallet</button>
</template>

<script setup lang="ts">
const { connectWallet, isWalletConnecting } = useEffectClient();
</script>
