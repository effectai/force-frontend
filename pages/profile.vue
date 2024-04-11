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

      <div>
        <label>EFX</label>
        <div class="text-lg">
          {{ balance }}
        </div>
      </div>
    </div>

    <div class="payout-container">
      <label>Pending EFX</label>
      <div v-if="loadingPayments">
        Loading..
      </div>
      <div
        v-else
        class="text-lg"
      >
        <div
          v-for="payment in proccesedPayments"
          :key="payment.id"
        >
          {{ payment.batch_id }} - {{ payment.pending.quantity }}

          <span
            v-if="payment.claimableIn < 0"
            class="claimable"
          >Claimable</span>
          <span
            v-else
            class="pending"
          >
            Claimable in
            {{ formatSecondsToTime(payment.claimableIn) }} seconds
          </span>
        </div>
      </div>
    </div>

    <div class="profile-toolbar">
      <button
        class="button"
        :disabled="payments?.totalEfxClaimable === 0"
        @click="payout()"
      >
        Claim {{ payments?.totalEfxClaimable }} EFX
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
import { getTimeToClaim, type Payment } from "@effectai/effect-js";

definePageMeta({ middleware: "auth" });

const {
  usePendingPayments,
  disconnectWallet,
  permission,
  isLoggedIn,
  userName,
  usePayoutEfx,
  useGetBalance,
  useForceSettings,
} = useEffectClient();

const router = useRouter();

const { data: balance } = useGetBalance(userName);

const { data: forceSettings, isLoading: isLoadingForceSettings } =
  useForceSettings();

/**
 * Payments Logic
 */

const { data: payments, isLoading: isLoadingPayments } = usePendingPayments();

const loadingPayments = computed(
  () => isLoadingPayments.value || isLoadingForceSettings.value,
);

const proccesedPayments: Ref<
  | (Payment & {
      claimableIn: number;
    })[]
  | []
> = ref([]);

const processPayments = (payments: Payment[]) => {
  return payments.map((payment) => {
    return {
      ...payment,
      claimableIn: getTimeToClaim(payment, forceSettings.value),
    };
  });
};

/**
 * Refresh Payment interval logic
 */

const paymentInterval = setInterval(() => {
  if (payments.value) {
    proccesedPayments.value = processPayments(payments.value.pendingPayments);
  }
}, 1000);

const { mutateAsync: payout } = usePayoutEfx();

onUnmounted(() => {
  clearInterval(paymentInterval);
});

const logout = () => {
  disconnectWallet();
  router.push("/");
};
</script>

<style>
.profile-stats {
  display: flex;
  gap: 1.5rem;
  margin: 1rem 0;
}

label {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--color-main);
}

.profile-toolbar {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.claimable {
  color: green;
}

.pending {
  color: orange;
}
</style>
