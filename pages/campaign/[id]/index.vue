<template>
  <div class="container">
    <div v-if="isReservingTask">
      <div class="backdrop-loader">
        Reserving task...
      </div>
    </div>
    <div v-if="campaign">
      <div>
        <h1 class="title">
          {{ campaign.info?.title }}
        </h1>
        <div class="campaign-details">
          <div class="campaign-info">
            <label>Reward per task</label>
            <span>{{ campaign.reward.quantity }}</span>
          </div>
          <div class="campaign-info">
            <label>Time per task</label>
            <span>{{ campaign.max_task_time }} seconds</span>
          </div>
          <p class="campaign-description">
            {{ campaign.info?.description }}
          </p>
        </div>

        <div class="campaign-toolbar">
          <button
            :disabled="!isLoggedIn"
            class="button"
            @click="doReserveTask"
          >
            Start
          </button>
          <button
            class="button"
            onclick="instruction_modal.showModal()"
          >
            Show Instructions
          </button>
        </div>

        <div v-if="campaign && campaign.info && campaign.info.instructions">
          <dialog
            id="instruction_modal"
            ref="modal"
            class="modal"
          >
            <div class="backdrop" />
            <div class="modal-box">
              <h3 class="title">
                Instructions
              </h3>
              <div class="divider" />
              <p v-html="campaign.info.instructions" />
            </div>
            <form method="dialog">
              <button class="button">
                close
              </button>
            </form>
          </dialog>
        </div>
        <p v-else>
          No instructions found.
        </p>
        <div class="divider" />
        <div class="card-actions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { useCampaign, useReserveTask, isLoggedIn } = useEffectClient();

const { notify } = useNotification();

const route = useRoute();
const router = useRouter();
const modal = ref(null);

const campaignId = Number(route.params.id);
const { data: campaign } = useCampaign(campaignId);

const { mutateAsync: reserveTask, isPending: isReservingTask } =
  useReserveTask();

const doReserveTask = async () => {
  const reservation = await reserveTask(campaignId, {
    onError: (error) => {
      notify({
        type: "error",
        message: "Failed to reserve task",
      });
    },
  });

  if (reservation && reservation.id) {
    router.push(`/campaign/${campaignId}/task/`);
  }
};
</script>

<style scoped>
.campaign-toolbar {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.campaign-info {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

.campaign-info label {
  font-weight: bold;
}
</style>
