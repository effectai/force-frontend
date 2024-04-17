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

			if (reservation && reservation.id) {
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
