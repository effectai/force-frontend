import {
	type Account,
	type Client,
	type EffectSession,
	type TaskIpfsError,
	type Settings,
	type Reservation,
	type Session,
	type Name,
	createClient,
	jungle4,
	eos,
	setSession,
	reserveTask,
	submitTask,
	getSubmissions,
	getPendingPayments,
	getCampaignById,
	getReservationsForVAccount,
	getTaskDataByReservation,
	getReservationForCampaign,
	getReservationsForCampaign,
	getPrice,
	getBalance,
	payout,
	getAccountById,
	getForceSettings,
	getAccTaskIdx,
	getAccountAssets,
	getAllCampaigns,
	getBatchById,
	type CampaignWithInfo,
	type Campaign,
	type NameType,
} from "@effectai/sdk";

import {
	type UseMutationReturnType,
	type UseQueryReturnType,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/vue-query";
import { experimental_createPersister } from "@tanstack/query-persist-client-core";

let effectClient: ClientStore | null;

export const persister = experimental_createPersister({
	storage: window?.localStorage ? localStorage : undefined,
});

export interface CampaignWithTasks extends Campaign {
	campaignTasksAvailable?: number | null;
	batchTaskAvailable?: number | null;
}

export interface ClientStore {
	client: Ref<Client>;
	isLoggedIn: Ref<boolean>;
	isWalletConnecting: Ref<boolean>;

	userName: Ref<NameType | null>;
	permission: Ref<NameType | null>;
	vAccount: Ref<Account | null>;

	useForceSettings: () => UseQueryReturnType<Settings, Error>;

	useCampaigns: ({
		calculateAvailableTasks,
	}: {
		calculateAvailableTasks: boolean
	}) => UseQueryReturnType<
		Awaited<ReturnType<typeof getAllCampaigns> | CampaignWithTasks>,
		Error
	> & {
		totalTasksAvailable: Ref<number | false | undefined>;
	}

	useCampaign: (
		campaignId: number,
		enabled: Ref<boolean | undefined>,
	) => UseQueryReturnType<Awaited<ReturnType<typeof getCampaignById>>, Error>;

	useBatch: (
		batchId: number,
		enabled: Ref<boolean | undefined>,
	) => UseQueryReturnType<Awaited<ReturnType<typeof getBatchById>>, Error>;

	useGetAccountById: (accountId: number) => UseQueryReturnType<Account, Error>;

	useEfxPrice: () => UseQueryReturnType<number, Error>;

	useReservations: () => UseQueryReturnType<
		Awaited<ReturnType<typeof getReservationsForVAccount>>,
		Error
	> & {
		isReserved: (campaignId: number) => boolean;
	};

	useReservation: (
		campaignId: Ref<number>,
	) => UseQueryReturnType<
		Awaited<ReturnType<typeof getReservationForCampaign>>,
		Error
	>;

	useReservationsCampaign: (
		campaignId: Ref<number>,
	) => UseQueryReturnType<
		Awaited<ReturnType<typeof getReservationsForCampaign>>,
		Error
	>;

	useAccTaskIdx: (
		campaignId?: Ref<number>,
	) => UseQueryReturnType<Awaited<ReturnType<typeof getAccTaskIdx>>, Error>;

	useTaskData: (
		reservation: Ref<Reservation | null | undefined>,
	) => UseQueryReturnType<
		Awaited<ReturnType<typeof getTaskDataByReservation>>,
		Error
	>;

	usePendingPayments: () => UseQueryReturnType<
		Awaited<ReturnType<typeof getPendingPayments>>,
		Error
	>;

	useAccountAssets: () => UseQueryReturnType<
		Awaited<ReturnType<typeof getAccountAssets>>,
		Error
	>;

	useReserveTask: () => UseMutationReturnType<
		Awaited<ReturnType<typeof reserveTask>>,
		Error,
		number,
		unknown
	>;

	useSubmitTask: () => UseMutationReturnType<
		Awaited<ReturnType<typeof submitTask>>,
		Error,
		Omit<Parameters<typeof submitTask>[0], "client">,
		unknown
	>;

	useSubmissions: () => UseQueryReturnType<
		Awaited<ReturnType<typeof getSubmissions>>,
		Error
	>;

	useGetBalance: (
		account: Ref<Name | null>,
	) => UseQueryReturnType<Awaited<ReturnType<typeof getBalance>>, Error>;

	usePayoutEfx: () => UseMutationReturnType<
		Awaited<ReturnType<typeof payout>>,
		Error,
		void,
		unknown
	>;
	// useWithdrawEfx: () => UseMutationReturnType<any, Error, void, unknown>;

	connectWallet: (session?: Session) => Promise<void>;
	disconnectWallet: () => Promise<void>;
}

export const useEffectClient = () => {
	if (effectClient) return effectClient;
	throw new Error(
		"Client not initialized. Please use the `initClient` method to initialize the client.",
	);
};

export const initClient = async (): Promise<void> => {
	effectClient = await createEffectClient();
};

export const createEffectClient = async (): Promise<ClientStore> => {
	const { notify } = useNotification();

	/* --------- SESSION KIT --------- */

	const { sessionKit } = useSessionKit();

	sessionKit.restore().then((restoreSession) => {
		if (restoreSession) {
			connectWallet(restoreSession).catch(console.error);
		}
	});

	/* --------- CLIENT --------- */

	const config = useRuntimeConfig();
	const netw = config.public.EOS_NETWORK == 'eos' ? eos : jungle4;
	const client = shallowRef(
		await createClient({
			network: netw,
			options: {
				ipfsCacheDurationInMs: 600000,
			},
		}
		));


	/* --------- REACTIVE DATA --------- */

	const session: Ref<EffectSession | null> = ref(null);

	const userName: Ref<NameType | null> = computed(
		() => session.value?.actor || null,
	);

	const permission: Ref<NameType | null> = computed(
		() => session.value?.permission || null,
	);

	const vAccount: Ref<Account | null> = computed(
		() => session.value?.vAccount || null,
	);

	/* --------- REACTIVE BOOLEANS --------- */

	const isWalletConnecting: Ref<boolean> = ref(false);
	const isLoggedIn = computed(() => !!session.value);

	/* --------- MUTATIONS --------- */

	const usePayoutEfx = () => {
		const queryClient = useQueryClient();

		return useMutation({
			mutationFn: async () => {
				if (!userName.value || !permission.value)
					throw new Error("User not logged in");

				return await payout({ client: client.value, actor: userName.value });
			},
			onSuccess() {
				notify({
					type: "success",
					message: "Payout successful",
				});

				//rerun balance query
				//TODO:: use optimistic updates
				queryClient.invalidateQueries({
					queryKey: ["balance", userName.value],
				});
			},
		});
	};

	const useReserveTask = () => {
		return useMutation({
			mutationFn: async (campaignId: number) => {
				return await reserveTask({ client: client.value, campaignId });
			},
		});
	};

	const useSubmitTask = () => {
		return useMutation({
			mutationFn: async ({
				reservation,
				data,
			}: {
				reservation: Reservation;
				data: Record<string, unknown>;
			}) => {
				return await submitTask({ client: client.value, reservation, data });
			},
		});
	};

	/* --------- HOOKS --------- */

	const useAccountAssets = () => {
		return useQuery({
			queryKey: ["accountAssets", computed(() => userName.value)],
			enabled: computed(() => !!userName.value),
			queryFn: async () => {
				if (!userName.value) throw new Error("User not logged in");

				return await getAccountAssets({
					client: client.value,
					account: userName.value,
				});
			},
		});
	};

	const useForceSettings = () => {
		return useQuery({
			queryKey: ["forceSettings"],
			queryFn: async () => {
				return await getForceSettings({ client: client.value });
			},
		});
	};

	const useGetBalance = (account: Ref<Name | null>) => {
		return useQuery({
			queryKey: ["balance", computed(() => account.value)],
			enabled: !!account.value,
			queryFn: async () => {
				if (!account.value) throw new Error("Account not found");
				return await getBalance({ client: client.value, actor: account.value });
			},
		});
	};

	const useGetAccountById = (accountId: number) => {
		return useQuery({
			queryKey: ["account", accountId],
			queryFn: async () => {
				return await getAccountById({ client: client.value, accountId });
			},
		});
	};

	const useSubmissions = () => {
		return useQuery({
			queryKey: ["tasks"],
			queryFn: async () => {
				return await getSubmissions({
					client: client.value,
					reverse: true,
				});
			},
		});
	};

	const usePendingPayments = () => {
		return useQuery({
			queryKey: [
				"pendingPayments",
				computed(() => userName.value),
				computed(() => vAccount.value?.id),
			],
			enabled: computed(() => !!vAccount.value?.id),
			queryFn: async () => {
				if (!vAccount.value) throw new Error("Account not found");

				return await getPendingPayments({
					client: client.value,
					vAccountId: vAccount.value.id,
				});
			},
		});
	};

	const useEfxPrice = () => {
		return useQuery({
			queryKey: ["efxPrice"],
			queryFn: async () => {
				return await getPrice();
			},
		});
	};
	
	const useCampaigns = ({
		calculateAvailableTasks,
	}: {
		calculateAvailableTasks: boolean
	} = {
		calculateAvailableTasks: false
	}) => {
		const config = useRuntimeConfig();

		const query = useQuery({
			staleTime: config.public.CAMPAIGN_CACHE_DURATION,
			gcTime: config.public.CAMPAIGN_CACHE_DURATION,
			queryKey: ["campaigns"],
			queryFn: async () => {
				const campaigns = await getAllCampaigns({
					client: client.value,
				}) as Campaign[];

				const config = useRuntimeConfig();
				const authorizedRequesters = config.public.AUTHORIZED_REQUESTERS;

				const filteredCampaigns = campaigns.filter((campaign) => {
					return authorizedRequesters.includes(campaign.owner[1]);
				});

				// add available tasks to the campaign
				if (calculateAvailableTasks) {
					for (const campaign of filteredCampaigns as CampaignWithTasks[]) {
						const availableTask = await getTaskAvailableForCampaign(client.value, campaign, vAccount.value);
						campaign.campaignTasksAvailable = availableTask.campaignTasksAvailable;
						campaign.batchTaskAvailable = availableTask.batchTaskAvailable;
					}
				}

				return filteredCampaigns;
			},
		});

		const totalTasksAvailable = computed(() => calculateAvailableTasks && query.data.value && query.data.value.reduce((acc, campaign) => {
			if(!campaign.campaignTasksAvailable) return false;
			return acc + campaign.campaignTasksAvailable;
		}, 0));

		return {
			...query,
			totalTasksAvailable,
		}
	};

	const useCampaign = (
		campaignId: number,
		enabled: Ref<boolean | undefined>,
	) => {
		return useQuery({
			queryKey: ["campaign", campaignId],
			enabled,
			queryFn: async () => {
				return await getCampaignById({ client: client.value, id: campaignId });
			},
		});
	};

	const useBatch = (batchId: number, enabled: Ref<boolean | undefined>) => {
		return useQuery({
			queryKey: ["batch", batchId],
			enabled,
			queryFn: async () => {
				return await getBatchById({ client: client.value, id: batchId });
			},
		});
	};

	const useAccTaskIdx = (campaignId?: Ref<number>) => {
		return useQuery({
			queryKey: [
				"acctaskidx",
				computed(() => vAccount.value?.id),
				computed(() => campaignId?.value),
			],
			queryFn: async () => {
				if (!vAccount.value) throw new Error("Account not found");

				return await getAccTaskIdx({
					client: client.value,
					campaignId: campaignId?.value,
					accountId: vAccount.value.id,
				});
			},
		});
	};

	const useReservation = (campaignId: Ref<number>) => {
		return useQuery({
			queryKey: [
				"reservation",
				computed(() => userName.value),
				computed(() => vAccount.value?.id),
				computed(() => campaignId.value),
			],
			enabled: computed(
				() =>
					(!!vAccount.value && !!campaignId.value) || campaignId.value === 0,
			),
			queryFn: async () => {
				if (!vAccount.value) throw new Error("Account not found");

				return await getReservationForCampaign({
					client: client.value,
					campaignId: campaignId.value,
					vAccountId: vAccount.value.id,
				});
			},
		});
	};

	const useTaskData = (reservation: Ref<Reservation | null | undefined>) => {
		return useQuery({
			queryKey: ["taskData", computed(() => reservation.value)],
			enabled: computed(() => !!reservation.value),
			retry: (failureCount, error: TaskIpfsError | Error) =>
				"retry" in error && failureCount < error.retry,
			queryFn: async () => {
				try {
					if (!reservation.value) throw new Error("Reservation not found");

					return await getTaskDataByReservation(
						client.value,
						reservation.value,
					);
				} catch (e) {
					notify({
						type: "error",
						message: "Failed to fetch task data",
					});
					throw e;
				}
			},
		});
	};

	const useReservations = () => {
		const query = useQuery({
			queryKey: ["reservations", computed(() => userName.value)],
			enabled: isLoggedIn,
			queryFn: async () => {
				if (!vAccount.value) throw new Error("Account not found");

				return await getReservationsForVAccount({
					client: client.value,
					vAccountId: vAccount.value.id,
				});
			},
		});

		/* Utility function to check if a campaign is reserved */
		const isReserved = (campaignId: number) => {
			if (query.data?.value?.length) {
				return query.data.value.some((r) => r.campaign_id === campaignId);
			}

			return false;
		};

		return { ...query, isReserved };
	};

	const useReservationsCampaign = (campaignId: Ref<number>) => {
		return useQuery({
			queryKey: ["reservation", computed(() => campaignId.value)],
			enabled: computed(() => !!campaignId.value || campaignId.value === 0),
			queryFn: async () => {
				return await getReservationsForCampaign({
					client: client.value,
					campaignId: campaignId.value,
				});
			},
		});
	};

	/* --------- METHODS ------- */

	const connectWallet = async (_session?: Session) => {
		try {
			isWalletConnecting.value = true;
			const sessionToUse = _session || (await sessionKit.login()).session;

			await setSession({ client: client.value, session: sessionToUse });
			session.value = client.value.session;
		} catch (error) {
			console.error(error);
			notify({
				type: "error",
				message: "Failed to connect wallet",
			});
		} finally {
			isWalletConnecting.value = false;
		}
	};

	const disconnectWallet = async (): Promise<void> => {
		try {
			await sessionKit.logout();
			await setSession({ client: client.value, session: null });
			session.value = null;
		} catch (e) {
			console.error(e);
		}
	};

	return {
		// client
		client,

		// booleans
		isLoggedIn,
		isWalletConnecting,

		// data
		userName,
		permission,
		vAccount,

		// hooks
		useAccountAssets,
		useGetAccountById,
		useForceSettings,
		useGetBalance,
		useCampaigns,
		useCampaign,
		useBatch,
		useSubmissions,
		useTaskData,
		useReservation,
		useReservations,
		useReservationsCampaign,
		usePendingPayments,
		useEfxPrice,
		useAccTaskIdx,

		// mutations
		useReserveTask,
		useSubmitTask,
		usePayoutEfx,

		// methods
		connectWallet,
		disconnectWallet,
	};
};
