<template>
  <div class="fullwidth">
    <TheHeader />
    <ModalsContainer />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ModalsContainer } from "vue-final-modal";
</script>

<style>
.fullwidth .container {
  width: 100%;
  max-width: 100%;
  padding: 0;
}
</style>
