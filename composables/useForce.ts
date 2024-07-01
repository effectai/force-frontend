import { type Client, getAccTaskIdx, getBatchById, type Account, type CampaignInfo, type CampaignWithInfo, type Reservation, type Campaign, getReservationForCampaign, getReservationsForCampaign } from "@effectai/sdk";
import { useEffectClient } from "./useEffectClient";

export const useReserveTask = () => {
	const { notify } = useNotification();
	const { useReserveTask } = useEffectClient();
	const { mutateAsync: reserveTask } = useReserveTask();

	const router = useRouter();
	const loading = ref(false);

	const mutate = async (campaignId: number) => {
		try {
			loading.value = true;
			const reservation = await reserveTask(campaignId);

			if (reservation?.id || reservation?.id === 0) {
				await router.push(`/campaign/${campaignId}/task/`);
			}
		} catch (e) {
			console.error(e);
			notify({
				type: "error",
				message: "Failed to reserve task",
			});
		} finally {
			loading.value = false;
		}
	};

	return {
		mutate,
		loading,
	};
};

export const getTaskAvailableForCampaign = async (
	client: Client,
	campaign: CampaignWithInfo | Campaign,
	vAccount: Account | null
) => {

	let campaignTasksAvailable = campaign.total_tasks - campaign.reservations_done;
	let batchTaskAvailable = campaignTasksAvailable;
	let current_task_idx = campaign.reservations_done - 1;

	const reservations = await getReservationsForCampaign({ client, campaignId: campaign.id });

	const batch_reservations = reservations.filter(
		(r) => r.batch_id === campaign.active_batch
	);

	if (vAccount) {
		if (campaignTasksAvailable || batch_reservations.length) {
			const batch = await getBatchById({ client, id: campaign.active_batch });

			if (!batch) {
				return { campaignTasksAvailable: null, batchTaskAvailable: null };
			}

			const accTaskidx = await getAccTaskIdx({
				client,
				accountId: vAccount.id,
				campaignId: campaign.id,
			})

			const userDidTaskInBatch = accTaskidx[0].value >= batch.start_task_idx;

			if (userDidTaskInBatch) {
				if (accTaskidx[0].value > current_task_idx) {
					current_task_idx = accTaskidx[0].value;
				}
			}

			batchTaskAvailable =
				batch.start_task_idx +
				batch.num_tasks -
				1 -
				current_task_idx;
			if (userDidTaskInBatch) {
				// Also lower the campaign available tasks if user already did tasks in active batch that are not completed yet
				campaignTasksAvailable -=
					current_task_idx - (campaign.reservations_done - 1);
			}
		}
	}

	if (batch_reservations) {
		for (const reservation of batch_reservations) {
			if (
				Date.now() > reservation.reserved_on + props.campaign.max_task_time ||
				reservation.account_id === vAccount?.id
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




	return { campaignTasksAvailable, batchTaskAvailable };

}