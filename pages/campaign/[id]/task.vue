<template>
  <div class="template">
    <div v-if="error">
      {{ error }}
    </div>
    <div v-else-if="isLoadingTaskData || isReservingTask || isSubmittingTask">
      <div class="backdrop-loader">Loading Task Data</div>
    </div>
    <TaskTemplate v-else ref="templateRef" @submit="doSubmitTask" />
  </div>
</template>

<script setup lang="ts">
import { Template as EffectTemplate } from "@effectai/effect-js";
import type TaskTemplate from "~/components/TaskTemplate.vue";

definePageMeta({
  middleware: "auth",
});

const {
  userAccount,
  useCampaign,
  useReservation,
  useReserveTask,
  useSubmitTask,
  useTaskData,
} = useEffectClient();

const { notify } = useNotification();

const router = useRouter();
const campaignId = Number(router.currentRoute.value.params.id);

const templateRef: Ref<InstanceType<typeof TaskTemplate> | null> = ref(null);

const { data: campaign } = useCampaign(campaignId);
const {
  data: reservation,
  error: errorReservation,
  refetch: refetchReservation,
} = useReservation(campaignId);

const {
  data: taskData,
  error: errorTaskData,
  isLoading: isLoadingTaskData,
} = useTaskData(reservation);

const error = computed(() => errorReservation.value || errorTaskData.value);

const { mutateAsync: reserveTask, isPending: isReservingTask } =
  useReserveTask();

const { mutateAsync: submitTask, isPending: isSubmittingTask } =
  useSubmitTask();

const renderTask = async (): Promise<void> => {
  try {
    if (!reservation.value) {
      throw new Error("No reservation found");
    }

    console.log("rendering task!");

    const task = {
      accountId: userAccount.value?.id,
      campaignId: reservation.value?.campaign_id,
      batchId: reservation.value?.batch_id,
      submissionId: reservation.value?.id,
    };

    const template = new EffectTemplate(
      campaign.value?.info?.template!,
      { id: 1, annotations: [], ...taskData.value },
      {},
      task,
    );

    const html = template.render();

    if (!templateRef.value) {
      throw new Error("Template reference not found");
    }

    templateRef.value.setHtml(html);
  } catch (error) {
    console.error(error);
  }
};

const doSubmitTask = async (data: any): Promise<void> => {
  if (!reservation.value) {
    throw new Error("No reservation found");
  }

  try {
    // Submit the task.
    await submitTask({ data, reservation: reservation.value });

    // Try to reserve new task.
    try {
      // TODO:: update in cache for now just refetch
      const newReservation = await reserveTask(campaignId);
      refetchReservation();

      if (reservation.value === null) {
        notify({
          message: "No more tasks available",
          type: "warning",
        });

        return;
      }
    } catch (e) {
      console.error("error while getting next reservation", e);
    }
  } catch (error) {
    console.error(error);
  }
};

watchEffect(async () => {
  console.log("watchEFfect triggered!");
  if (!reservation.value || !taskData.value) return;
  if (error.value) return;
  await nextTick();
  renderTask();
});
</script>

<style>
.template {
  padding: 2rem 1rem;
}
</style>
