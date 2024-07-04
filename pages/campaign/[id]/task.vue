<template>
	<div>
		<div v-if="error" class="error">
			<div class="error-container flex-center flex-col">
				<IconsEmoticonDead class="icon" />
				<h3>Uh oh, something went wrong</h3>
				<p>{{ error }}</p>
				<div class="error-buttons">
					<button class="button mt-2" @click="router.push('/')">Go back</button>
					<button class="button mt-2" @click="notifyTeamName">Notify <u>{{ randomName }}</u></button>
				</div>
			</div>
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

		<TaskTemplate v-if="!error" v-show="!isTemplateLoading" ref="templateRef" @submit="doSubmitTask"
			@ready="isTemplateReady = true" />
	</div>
</template>

<script setup lang="ts">
import { Template as EffectTemplate } from "@effectai/sdk";
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

		if (!campaign.value?.info?.template) {
			throw new Error("No template found");
		}

		const task = {
			accountId: vAccount.value?.id,
			campaignId: reservation.value?.campaign_id,
			batchId: reservation.value?.batch_id,
			submissionId: reservation.value?.id,
		};

		console.log("Reservation", reservation.value)	
		console.log("Task", task)
		console.log("Task Data", taskData.value);

		const template = new EffectTemplate(
			campaign.value.info.template,
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

const doSubmitTask = async (data: Record<string, unknown>): Promise<void> => {
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

/* Feat: Notify Random Team Member */
const { notify } = useNotification();
const randomTeamName = ["Jeffrey", "Jesse", "Rochelle", "Laurens", "David"];
const randomName =
	randomTeamName[Math.floor(Math.random() * randomTeamName.length)];
const notifyTeamName = () => {
	notify({
		type: "success",
		message: `Notified ${randomName}`,
	});
};
/* End Feat */
</script>

<style>
.template {
	padding: 2rem 1rem;
}

.error .icon {
	margin: 1rem;
	font-size: 20rem;
}

.error-container {
	padding: 2rem;
	background-color: #f8f8f8;
	border-radius: 10px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.error-buttons {
	display: flex;
	gap: 10px;
	justify-content: center;
}
</style>
