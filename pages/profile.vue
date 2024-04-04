<template>
  <div class="container">
    <div class="text-2xl title my-5">
      Profile
    </div>

    <div class="profile-stats">
      <div>
        <label>Name</label>
        <div class="text-lg">
          {{ userName }}
        </div>
      </div>

      <div>
        <label>Permission</label>
        <div class="text-lg">
          {{ permission }}
        </div>
      </div>
    </div>

    <div class="profile-toolbar">
      <button @click="withdraw">
        Withdraw
      </button>

      <button
        class="button"
        :disabled="totalEfxPending === 0"
        @click="claim"
      >
        Claim {{ totalEfxPending }} EFX
      </button>
      <button
        v-if="isLoggedIn"
        class="button"
        @click="logout"
      >
        Logout
      </button>
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
  usePayoutEfx,
  useWithdrawEfx,
  useEfxPrice,
} = useEffectClient();

const router = useRouter();

const { mutateAsync: claim } = usePayoutEfx();
const { mutateAsync: withdraw } = useWithdrawEfx();

const logout = () => {
  disconnectWallet();
  router.push("/");
};

const { totalEfxPending } = usePendingPayments();

const { data: price } = useEfxPrice();
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
