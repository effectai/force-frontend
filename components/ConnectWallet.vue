<template>
    <button v-if="true" @click="connectWallet()" class="btn btn-primary">
        Connect Wallet
    </button>
</template>

<script setup lang="ts">
const { connectWallet, isWalletConnecting } = useEffectClient();
</script>
