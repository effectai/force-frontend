import {
  type VAccount,
  type Campaign,
  type Reservation,
  type Client,
  type Payment,
  createClient,
  jungle4,
  watchAccount,
  watchSession,
  setSession,
  getCampaigns,
  reserveTask,
  submitTask,
  getPendingPayments,
  getCampaign,
  getReservationsForVAccount,
  getTaskDataByReservation,
  getReservationForCampaign,
  TaskIpfsError,
} from "@effectai/effect-js";

import {
  type UseMutationReturnType,
  type UseQueryReturnType,
  useMutation,
  useQuery,
} from "@tanstack/vue-query";

import type { NameType, Session } from "@wharfkit/session";
import { ClientNotInitializedError } from "~/errors/errors";

let effectClient: ClientStore | null;

export interface ClientStore {
  client: Ref<Client>;
  isLoggedIn: Ref<boolean>;
  isWalletConnecting: Ref<boolean>;

  userName: Ref<NameType | null>;
  permission: Ref<NameType | null>;
  vAccount: Ref<VAccount | null>;

  useCampaigns: () => UseQueryReturnType<Campaign[], any>;
  useCampaign: (campaignId: number) => UseQueryReturnType<Campaign, any>;

  useReservations: () => UseQueryReturnType<Reservation[], any> & {
    isReserved: (campaignId: number) => boolean;
  };

  useReservation: (
    campaignId: number,
  ) => UseQueryReturnType<Reservation | null, any>;

  useTaskData: (
    reservation: Ref<Reservation | null | undefined>,
  ) => UseQueryReturnType<any, any>;

  usePendingPayments: () => UseQueryReturnType<Payment[], any> & {
    totalEfxPending: Ref<number>;
  };

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
      ipfsCacheDurationInMs: 1000 * 60 * 5,
    }),
  );

  /* --------- REACTIVE DATA --------- */

  const vAccount: Ref<VAccount | null> = ref(null);
  const session: Ref<Session | null> = ref(null);

  const userName: Ref<NameType | null> = computed(
    () => session.value?.actor || null,
  );

  const permission: Ref<NameType | null> = computed(
    () => session.value?.permission || null,
  );

  /* --------- REACTIVE BOOLEANS --------- */

  const isWalletConnecting: Ref<boolean> = ref(false);
  const isLoggedIn = computed(() => !!session.value);

  /* --------- WATCHERS --------- */

  watchAccount(client.value, (account: VAccount | null) => {
    vAccount.value = account;
  });

  watchSession(client.value, (_session: Session | null) => {
    session.value = _session;
  });

  /* --------- MUTATIONS --------- */

  const useClaimEfx = () => {
    return useMutation({
      mutationFn: async () => {
        // payout();
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

  const usePendingPayments = () => {
    const query = useQuery({
      queryKey: [
        "pendingPayments",
        computed(() => userName.value),
        computed(() => vAccount.value?.id),
      ],
      enabled: computed(() => !!vAccount.value?.id),
      queryFn: async () => {
        const data = await getPendingPayments(client.value, vAccount.value!.id);
        return data.rows;
      },
    });

    const totalEfxPending = computed(
      () =>
        query.data.value?.reduce(
          (acc, p) =>
            parseFloat(p.pending.quantity.match(/[0-9.]+/)?.[0] || "0") || 0,
          0,
        ) || 0,
    );

    return { ...query, totalEfxPending };
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

  const useReservation = (campaignId: number) => {
    return useQuery({
      queryKey: ["reservation", computed(() => userName.value), campaignId],
      enabled: isLoggedIn,
      queryFn: async () => {
        return await getReservationForCampaign(
          client.value,
          campaignId,
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
          return await getTaskDataByReservation(
            client.value,
            reservation.value!,
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

  const connectWallet = async (session?: Session) => {
    try {
      isWalletConnecting.value = true;
      const sessionToUse = session || (await sessionKit.login()).session;
      await setSession(client.value, sessionToUse);
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
    useCampaigns,
    useCampaign,
    useReservation,
    useReservations,
    useTaskData,
    usePendingPayments,

    // mutations
    useReserveTask,
    useSubmitTask,

    // methods
    connectWallet,
    disconnectWallet,
  };
};
