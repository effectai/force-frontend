<template>
  <div class="fullwidth">
    <TheHeader />
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style>
.fullwidth .container {
  width: 100%;
  max-width: 100%;
  padding: 0;
}
</style>
