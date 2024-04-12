<template>
  <div>
    <div v-if="error">
      error: {{ error }}
    </div>

    <div v-else-if="isTemplateLoading">
      <div class="backdrop-loader">
        <div class="backdrop-loading-container">
          <img src="/img/logo.svg">
          <p class="flex-center">
            Loading Task Data
          </p>
          <div class="lds-ellipsis">
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      </div>
    </div>

    <TaskTemplate
      v-if="!error"
      v-show="!isTemplateLoading"
      ref="templateRef"
      @submit="doSubmitTask"
      @ready="isTemplateReady = true"
    />
  </div>
</template>

<script setup lang="ts">
import { Template as EffectTemplate } from "@effectai/effect-js";
import type TaskTemplate from "~/components/TaskTemplate.vue";

definePageMeta({
  middleware: "auth",
  layout: "template",
});

const {
  vAccount,
  useCampaign,
  useReservation,
  useReserveTask,
  useSubmitTask,
  useTaskData,
} = useEffectClient();

const router = useRouter();
const campaignId = computed(() => Number(router.currentRoute.value.params.id));
const isTemplateReady = ref(false);

const templateRef: Ref<InstanceType<typeof TaskTemplate> | null> = ref(null);

const { data: campaign } = useCampaign(campaignId.value);
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

const isTemplateLoading = computed(
  () =>
    isLoadingTaskData.value ||
    isReservingTask.value ||
    isSubmittingTask.value ||
    !isTemplateReady.value,
);

const { mutateAsync: reserveTask, isPending: isReservingTask } =
  useReserveTask();

const { mutateAsync: submitTask, isPending: isSubmittingTask } =
  useSubmitTask();

const renderTask = async (): Promise<void> => {
  try {
    if (!reservation.value) {
      throw new Error("No reservation found");
    }

    const task = {
      accountId: vAccount.value?.id,
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

    //wait for Ref template to be ready
    await nextTick();
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

    try {
      // Try to reserve new task.
      // TODO:: update reservation in cache; for now just refetch.
      const newReservation = await reserveTask(campaignId.value);
      await refetchReservation();
    } catch (e) {
      console.error("error while getting next reservation", e);
    }
  } catch (error) {
    // something went wrong with the task submission
    // let the user retry ?
    console.error(error);
  }
};

watchEffect(async () => {
  if (!reservation.value || !taskData.value) return;
  if (error.value) return;
  isTemplateReady.value = false;
  await nextTick();
  renderTask();
});
</script>

<style>
.template {
  padding: 2rem 1rem;
}
</style>
