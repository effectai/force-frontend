<template>
  <div class="mt-5">
    <ConnectWallet />
  </div>
</template>

<script setup lang="ts">
const { connectWallet, isWalletConnecting } = useEffectClient();
</script>

<style></style>
