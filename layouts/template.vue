<template>
  <div class="fullwidth">
    <div class="header">
      <TheLogo/>
      <div>
        {{ userName }}@{{ permission }}
      </div>
    </div>
    <ModalsContainer />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ModalsContainer } from "vue-final-modal";
const { connectWallet, isLoggedIn, userName, permission } = useEffectClient();

</script>

<style>
.fullwidth .container {
  width: 100%;
  max-width: 100%;
  padding: 0;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 1rem;
}

</style>
