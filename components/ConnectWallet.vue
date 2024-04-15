<template>
  <button
    v-if="true"
    class="button"
    @click="connectWallet()"
  >
    Connect Wallet
  </button>
</template>

<script setup lang="ts">
const { connectWallet } = useEffectClient();
</script>
