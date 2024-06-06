<template>
	<tr @click="router.push(`/campaign/${campaign.id}`)">
		<td>
			<div class="campaign-user">
				<UserAvatar :id="campaign.owner.at(1)!" />
				<span>{{ campaign.owner.at(1) }}</span>
			</div>
		</td>
		<td class="campaign-title" v-if="campaign && campaign">
			<h4>{{ campaign.info?.title }}</h4>
			<span>{{ campaign.info?.description }}</span>
		</td>
		<td v-else>
			{{ "No title" }}
			<br>
			<div>
				{{ "No description" }}
			</div>
		</td>
		<td>
			<span v-if="tasksAvailable.campaignTasksAvailable === null">
				{{ campaign.total_tasks }} tasks
			</span>
			<span v-else>
				{{ tasksAvailable.campaignTasksAvailable }}/{{ campaign.total_tasks }} left
				<small v-if="tasksAvailable.campaignTasksAvailable > tasksAvailable.batchTaskAvailable">
					<br>
					<span v-if="tasksAvailable.batchTaskAvailable">
						{{ tasksAvailable.batchTaskAvailable }} tasks in current batch
					</span>
					<span v-else>
						Wait for current batch to finish
					</span>
				</small>
			</span>
		</td>
		<td class="campaign-quantity">
			<h4>{{ campaign.reward.quantity }}</h4>
			<span> 
				${{ (parseFloat(campaign.reward.quantity.split(' ')[0]) * efxPrice).toFixed(2)  }} per task
			</span>
		</td>
	</tr>
</template>

<script setup lang='ts'>
import { getPrice, type CampaignWithInfo } from "@effectai/sdk";

const {
	useReservations,
	useReservationsCampaign,
	isLoggedIn,
	useBatch,
	vAccount,
} = useEffectClient();
const { isReserved } = useReservations();
const emit = defineEmits(['tasks-counted']);

const efxPrice = await getPrice();

const props = defineProps<{
	campaign: CampaignWithInfo;
	accTaskIndex: number;
}>();

const fetchBatch = ref(false);
const { data: batch } = useBatch(props.campaign.active_batch, fetchBatch);

const { data: campaignReservations } = useReservationsCampaign(
	ref(props.campaign.id),
);

const router = useRouter();

const tasksAvailable = computed(() => {
	let campaignTasksAvailable =
		props.campaign.total_tasks - props.campaign.reservations_done;
	let batchTaskAvailable = campaignTasksAvailable;
	let current_task_idx = props.campaign.reservations_done - 1;
	const batch_reservations = campaignReservations.value?.filter(
		(r) => r.batch_id == props.campaign.active_batch,
	);
	if (isLoggedIn.value) {
		if (campaignTasksAvailable || batch_reservations?.length) {
			fetchBatch.value = true;
			if (!batch.value)
				return { campaignTasksAvailable: null, batchTaskAvailable: null };

			const user_did_tasks_in_batch =
				props.accTaskIndex >= batch.value.start_task_idx;
			if (user_did_tasks_in_batch) {
				// User already did tasks in active batch
				if (props.accTaskIndex > current_task_idx) {
					// Update current_task_idx if we are further than the completed tasks `
					current_task_idx = props.accTaskIndex;
				}
			}
			batchTaskAvailable =
				batch.value.start_task_idx +
				batch.value.num_tasks -
				1 -
				current_task_idx;
			if (user_did_tasks_in_batch) {
				// Also lower the campaign available tasks if user already did tasks in active batch that are not completed yet
				campaignTasksAvailable -=
					current_task_idx - (props.campaign.reservations_done - 1);
			}
		}
	}
	if (batch_reservations) {
		for (const reservation of batch_reservations) {
			if (
				Date.now() > reservation.reserved_on + props.campaign.max_task_time ||
				reservation.account_id == vAccount.value?.id
			) {
				// Reservation expired or your own reservation
				if (reservation.task_idx <= current_task_idx) {
					// TODO: Check if we need <= instead of <
					// Only bump batch/campaign task_available if we were already passed the task_idx
					batchTaskAvailable++;
					campaignTasksAvailable++;
				}
			}
		}
	}
	return {
		campaignTasksAvailable,
		batchTaskAvailable,
	};
});

emit('tasks-counted', tasksAvailable.value.campaignTasksAvailable);

</script>

<style scoped>
.campaign-user {
	display: flex;
	gap: 0.5rem;
	align-items: center;
}

h4 {
	margin: 3px 0px;
	font-size: 18px;
	font-weight: bold;
	color: black;
}
</style>