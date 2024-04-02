<template>
  <div class="container">
    <div class="text-2xl title my-5">Profile</div>

    vaccount: {{ vAccount }}

    <div class="profile-stats">
      <div>
        <label>Name</label>
        <div class="text-lg">{{ userName }}</div>
      </div>

      <div>
        <label>Permission</label>
        <div class="text-lg">{{ permission }}</div>
      </div>
    </div>

    <div class="profile-toolbar">
      <button class="button">Claim {{ totalEfxPending }} EFX</button>
      <button v-if="isLoggedIn" @click="logout" class="button">Logout</button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth" });

const {
  usePendingPayments,
  disconnectWallet,
  permission,
  isLoggedIn,
  userName,
  vAccount,
} = useEffectClient();

const router = useRouter();

const logout = () => {
  disconnectWallet();
  router.push("/");
};

const { totalEfxPending } = usePendingPayments();
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

.profile-toolbar {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}
</style>
