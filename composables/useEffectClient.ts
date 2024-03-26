import {
  Client,
  type VAccount,
  type Campaign,
  type Reservation,
} from "@effectai/effect-js";
import {
  useMutation,
  useQuery,
  type UseMutationReturnType,
  type UseQueryReturnType,
} from "@tanstack/vue-query";
import { Session } from "@wharfkit/session";
import { ClientNotInitializedError } from "~/errors/errors";

let effectClient: ClientStore | null;

export interface ClientStore {
  client: Ref<Client>;
  isLoggedIn: Ref<boolean>;
  isWalletConnecting: Ref<boolean>;

  userName: Ref<string | null>;
  userPermission: Ref<string | null>;
  userAccount: Ref<VAccount | null>;

  efxPrice: Ref<number>;
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

  const client = shallowRef(new Client("jungle4", { fetch }));

  /* --------- REACTIVE DATA --------- */

  const userAccount: Ref<VAccount | null> = ref(null);
  const userName: Ref<string | null> = ref(null);
  const userPermission: Ref<string | null> = ref(null);
  const efxPrice: Ref<number> = ref(0);

  /* --------- REACTIVE BOOLEANS --------- */

  const isLoggedIn: Ref<boolean> = ref(false);
  const isWalletConnecting: Ref<boolean> = ref(false);

  /* --------- MUTATIONS --------- */

  const useReserveTask = () => {
    return useMutation({
      mutationFn: async (campaignId: number) => {
        return await client.value.tasks.reserveTask(campaignId);
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
        return await client.value.tasks.submitTask(reservation, data);
      },
    });
  };

  /* --------- HOOKS --------- */

  const useCampaigns = () => {
    return useQuery({
      queryKey: ["campaigns"],
      queryFn: async () => {
        return await client.value.tasks.getAllCampaigns();
      },
    });
  };

  const useCampaign = (campaignId: number) => {
    return useQuery({
      queryKey: ["campaign", campaignId],
      queryFn: async () => {
        return await client.value.tasks.getCampaign(campaignId);
      },
    });
  };

  const useReservation = (campaignId: number) => {
    return useQuery({
      queryKey: ["reservation", computed(() => userName.value), campaignId],
      enabled: isLoggedIn,
      queryFn: async () => {
        return await client.value.tasks.getMyReservation(campaignId);
      },
    });
  };

  const useTaskData = (reservation: Ref<Reservation | null | undefined>) => {
    return useQuery({
      queryKey: ["taskData", computed(() => reservation.value)],
      enabled: computed(() => !!reservation.value),
      queryFn: async () => {
        return await client.value.tasks.getTaskData(reservation.value!);
      },
    });
  };

  const useReservations = () => {
    const query = useQuery({
      queryKey: ["reservations", computed(() => userName.value)],
      enabled: isLoggedIn,
      queryFn: async () => {
        return await client.value.tasks.getAllMyReservations();
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
      await client.value.loginWithSession(sessionToUse);

      const { actor, permission } = client.value.useSession();
      userName.value = actor.toString();
      userPermission.value = permission.toString();

      isLoggedIn.value = true;
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
      userAccount.value = null;
      userName.value = null;
      userPermission.value = null;
      isLoggedIn.value = false;
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
    userPermission,
    userAccount,
    efxPrice,

    // hooks
    useCampaigns,
    useCampaign,
    useReservation,
    useReservations,
    useTaskData,

    // mutations
    useReserveTask,
    useSubmitTask,

    // methods
    connectWallet,
    disconnectWallet,
  };
};
