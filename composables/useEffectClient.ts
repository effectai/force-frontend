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
  getCampaign,
  getReservationsForVAccount,
  getTaskDataByReservation,
  getReservationForCampaign,
  TaskIpfsError,
  getPrice,
  getBalance,
  payout,
  getAccountById,
  getForceSettings,
} from "@effectai/effect-js";

import {
  type UseMutationReturnType,
  type UseQueryReturnType,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/vue-query";

import type { Name, Session } from "@wharfkit/session";
import { ClientNotInitializedError } from "~/errors/errors";

let effectClient: ClientStore | null;

export interface ClientStore {
  client: Ref<Client>;
  isLoggedIn: Ref<boolean>;
  isWalletConnecting: Ref<boolean>;

  userName: Ref<Name | null>;
  permission: Ref<Name | null>;
  vAccount: Ref<VAccount | null>;

  useForceSettings: () => UseQueryReturnType<ForceSettings, unknown>;

  useCampaigns: () => UseQueryReturnType<Campaign[], any>;
  useCampaign: (campaignId: number) => UseQueryReturnType<Campaign, any>;

  useGetAccountById: (accountId: number) => UseQueryReturnType<VAccount, any>;

  useEfxPrice: () => UseQueryReturnType<number, any>;

  useReservations: () => UseQueryReturnType<Reservation[], any> & {
    isReserved: (campaignId: number) => boolean;
  };

  useReservation: (
    campaignId: Ref<number>,
  ) => UseQueryReturnType<Reservation | null, any>;

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
    createClient(jungle4, {
      fetchProviderOptions: {
        fetch,
      },
      ipfsCacheDurationInMs: 600000,
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

        return await payout(client.value, userName.value);
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
        return await reserveTask(client.value, campaignId);
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
        data: unknown;
      }) => {
        return await submitTask(client.value, reservation, data);
      },
    });
  };

  /* --------- HOOKS --------- */

  const useForceSettings = () => {
    return useQuery({
      queryKey: ["forceSettings"],
      queryFn: async () => {
        return await getForceSettings(client.value);
      },
    });
  };

  const useGetBalance = (account: Ref<Name | null>) => {
    return useQuery({
      queryKey: ["balance", computed(() => account.value)],
      enabled: !!account.value,
      queryFn: async () => {
        if (!account.value) throw new Error("Account not found");
        return await getBalance(client.value, account.value);
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
        return await getPendingPayments(client.value, vAccount.value!.id);
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

  const useCampaigns = () => {
    return useQuery({
      queryKey: ["campaigns"],
      queryFn: async () => {
        return await getCampaigns(client.value);
      },
    });
  };

  const useCampaign = (campaignId: number) => {
    return useQuery({
      queryKey: ["campaign", campaignId],
      queryFn: async () => {
        return await getCampaign(client.value, campaignId);
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
        return await getReservationForCampaign(
          client.value,
          campaignId.value,
          vAccount.value!.id,
        );
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
        return await getReservationsForVAccount(
          client.value,
          vAccount.value!.id,
        );
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

      await setSession(client.value, sessionToUse);
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
      await setSession(client.value, null);
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

    // mutations
    useReserveTask,
    useSubmitTask,

    // methods
    connectWallet,
    disconnectWallet,
  };
};
