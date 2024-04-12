<template>
  <div class="container">
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
          <ForceButton
            :is-loading="loading"
            :disabled="!isLoggedIn"
            class="button"
            @click="doReserveTask"
          >
            Start
          </ForceButton>
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
              <ContentRenderer :value="parsedInstructions" />
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
import markdownParser from "@nuxt/content/transformers/markdown";

const { useCampaign, useReserveTask, isLoggedIn } = useEffectClient();

const { notify } = useNotification();

const route = useRoute();
const router = useRouter();
const modal = ref(null);

const campaignId = Number(route.params.id);
const { data: campaign } = useCampaign(campaignId);

const parsedInstructions = computedAsync(() => {
  if (campaign && campaign.value?.info && campaign.value.info.instructions) {
    return markdownParser.parse!(
      campaign.value.id.toString(),
      campaign.value.info.instructions,
      {},
    );
  }
  return "";
});

/* Reserving task logic */

const { mutateAsync: reserveTask } = useReserveTask();
const loading = ref(false);
const doReserveTask = async () => {
  try {
    loading.value = true;
    const reservation = await reserveTask(campaignId, {
      onError: (error) => {
        notify({
          type: "error",
          message: "Failed to reserve task",
        });
      },
    });

    if (reservation && reservation.id) {
      await router.push(`/campaign/${campaignId}/task/`);
    }
  } catch (e) {
    notify({
      type: "error",
      message: "Failed to reserve task",
    });
  } finally {
    loading.value = false;
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
