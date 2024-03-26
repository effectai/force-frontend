<template>
  <div class="container">
    <div class="text-2xl title my-5">Profile</div>

    <div class="profile-stats">
      <div>
        <label>Name</label>
        <div class="text-lg">{{ userName }}</div>
      </div>

      <div>
        <label>Permission</label>
        <div class="text-lg">{{ userPermission }}</div>
      </div>
    </div>

    <div v-if="isLoggedIn" class="">
      <button @click="disconnectWallet" class="button">Logout</button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth" });
const { disconnectWallet, isLoggedIn, userName, userPermission } =
  useEffectClient();
</script>

<style>
.profile-stats {
  display: flex;
  gap: 1.5rem;
  margin: 1rem 0;
}

.profile-stats label {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--color-main);
}
</style>
