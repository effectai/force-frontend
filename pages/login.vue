<template>
    <div class="mt-5">
        <button @click="connectWallet()" class="btn btn-primary btn-outline">
            Connect Wallet
        </button>
    </div>
</template>

<script setup lang="ts">
const { connectWallet, isWalletConnecting } = useEffectClient();
</script>

<style></style>
