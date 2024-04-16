import {
  type VAccount,
  type Campaign,
  type Reservation,
  type Client,
  type EffectSession,
  createClient,
  jungle4,
  setSession,
  getCampaigns,
  reserveTask,
  submitTask,
  getSubmissions,
  getPendingPayments,
  getCampaignById,
  getReservationsForVAccount,
  getTaskDataByReservation,
  getReservationForCampaign,
  TaskIpfsError,
  getPrice,
  getBalance,
  payout,
  getAccountById,
  getForceSettings,
  getAccTaskIdx,
} from "@effectai/effect-js";
import type { AccTaskIdx } from "@effectai/effect-js/dist/types/campaign";
import type { GetTableRowsResponse } from "@effectai/effect-js/dist/types/helpers";

import { experimental_createPersister } from "@tanstack/query-persist-client-core";

import {
  type UseMutationReturnType,
  type UseQueryReturnType,
  useMutation,
  useQuery,
  useQueryClient,
  type UseInfiniteQueryReturnType,
  type InfiniteData,
  useInfiniteQuery,
} from "@tanstack/vue-query";

import type { Name, Session } from "@wharfkit/session";
import { ClientNotInitializedError } from "~/errors/errors";

let effectClient: ClientStore | null;

export const persister = experimental_createPersister({
  storage: window?.localStorage ? localStorage : undefined,
});

export interface ClientStore {
  client: Ref<Client>;
  isLoggedIn: Ref<boolean>;
  isWalletConnecting: Ref<boolean>;

  userName: Ref<Name | null>;
  permission: Ref<Name | null>;
  vAccount: Ref<VAccount | null>;

  useForceSettings: () => UseQueryReturnType<ForceSettings, unknown>;

  useCampaigns: ({
    page,
    limit,
  }: {
    page?: Ref<number>;
    limit?: Ref<number>;
  }) => UseInfiniteQueryReturnType<
    InfiniteData<GetTableRowsResponse<unknown, Campaign>>,
    Error
  >;

  useCampaign: (
    campaignId: number,
    enabled: Ref<boolean | undefined>,
  ) => UseQueryReturnType<Campaign, any>;

  useGetAccountById: (accountId: number) => UseQueryReturnType<VAccount, any>;

  useEfxPrice: () => UseQueryReturnType<number, any>;

  useReservations: () => UseQueryReturnType<Reservation[], any> & {
    isReserved: (campaignId: number) => boolean;
  };

  useReservation: (
    campaignId: Ref<number>,
  ) => UseQueryReturnType<Reservation | null, any>;

  useAccTaskIdx: (
    accountId: Ref<number>,
    campaignId: Ref<number>,
  ) => UseQueryReturnType<AccTaskIdx | null, any>;

  useTaskData: (
    reservation: Ref<Reservation | null | undefined>,
  ) => UseQueryReturnType<any, any>;

  usePendingPayments: () => UseQueryReturnType<
    Awaited<ReturnType<typeof getPendingPayments>>,
    any
  >;

  useReserveTask: () => UseMutationReturnType<
    Reservation | null,
    Error,
    number,
    unknown
  >;

  useSubmitTask: () => UseMutationReturnType<
    any,
    Error,
    { reservation: Reservation; data: unknown },
    unknown
  >;

  useSubmissions: () => UseQueryReturnType<any, any>;

  useGetBalance: (account: Ref<Name | null>) => UseQueryReturnType<any, any>;

  usePayoutEfx: () => UseMutationReturnType<any, Error, void, unknown>;
  // useWithdrawEfx: () => UseMutationReturnType<any, Error, void, unknown>;

  connectWallet: (session?: Session) => Promise<void>;
  disconnectWallet: () => Promise<void>;
}

export const useEffectClient = () => {
  if (effectClient) return effectClient;
  throw new ClientNotInitializedError(
    "Client not initialized. Please use the `initClient` method to initialize the client.",
  );
};

export const initClient = (): void => {
  effectClient = createEffectClient();
};

export const createEffectClient = (): ClientStore => {
  const { notify } = useNotification();

  /* --------- SESSION LOGIC --------- */
  const { sessionKit } = useSessionKit();

  sessionKit.restore().then((restoreSession) => {
    if (restoreSession) {
      connectWallet(restoreSession).catch(console.error);
    }
  });

  const { fetch } = sessionKit;

  /* --------- CLIENT --------- */

  const client = shallowRef(
    createClient({
      network: jungle4,
      options: {
        fetchProviderOptions: {
          fetch,
        },
        ipfsCacheDurationInMs: 600000,
      },
    }),
  );

  /* --------- REACTIVE DATA --------- */

  const session: Ref<EffectSession | null> = ref(null);

  const userName: Ref<Name | null> = computed(
    () => session.value?.actor || null,
  );

  const permission: Ref<Name | null> = computed(
    () => session.value?.permission || null,
  );

  const vAccount: Ref<VAccount | null> = computed(
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
        const data = await getSubmissions({
          client: client.value,
          reverse: true,
        });
        return data.rows;
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
        return await getPendingPayments({
          client: client.value,
          vAccountId: vAccount.value!.id,
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
    page = ref(1),
    limit = 10,
  }: {
    page: Ref<number>;
    limit?: number;
  }) => {
    const config = useRuntimeConfig();

    return useInfiniteQuery({
      persister: experimental_createPersister({
        storage: window.localStorage,
      }),
      staleTime: config.public.CAMPAIGN_CACHE_DURATION,
      gcTime: config.public.CAMPAIGN_CACHE_DURATION,
      queryKey: ["campagnes"],
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage && lastPage.rows.length === 0) {
          return undefined;
        }
        return lastPageParam + 1;
      },
      getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
        if (firstPageParam <= 1) {
          return undefined;
        }
        return firstPageParam - 1;
      },
      queryFn: async ({ pageParam = 0 }) => {
        return getCampaigns({
          client: client.value,
          limit,
          page: pageParam,
        });
      },
    });
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

  const useAccTaskIdx = (accountId: Ref<number>, campaignId: Ref<number>) => {
    return useQuery({
      queryKey: [
        "acctaskidx",
        computed(() => accountId.value),
        computed(() => campaignId.value),
      ],
      queryFn: async () => {
        console.log("getting acctaskidx..");
        return await getAccTaskIdx({
          client: client.value,
          campaignId: campaignId.value,
          accountId: accountId.value,
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
        console.log("getting reservation..");
        return await getReservationForCampaign({
          client: client.value,
          campaignId: campaignId.value,
          vAccountId: vAccount.value!.id,
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
        return await getReservationsForVAccount({
          client: client.value,
          vAccountId: vAccount.value!.id,
        });
      },
    });

    /* Utility function to check if a campaign is reserved */
    const isReserved = (campaignId: number) => {
      if (query.data?.value?.length) {
        return query.data.value.some(
          (r: Reservation) => r.campaign_id === campaignId,
        );
      }

      return false;
    };

    return { ...query, isReserved };
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
    usePayoutEfx,

    useGetAccountById,
    useForceSettings,
    useGetBalance,
    useCampaigns,
    useCampaign,
    useSubmissions,
    useTaskData,
    useReservation,
    useReservations,
    usePendingPayments,
    useEfxPrice,
    useAccTaskIdx,

    // mutations
    useReserveTask,
    useSubmitTask,

    // methods
    connectWallet,
    disconnectWallet,
  };
};
