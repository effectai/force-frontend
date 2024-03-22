import {
    Client,
    type VAccount,
    type Campaign,
    type Reservation,
} from "@effectai/effect-js";
import { Query, useQuery, type UseQueryReturnType } from "@tanstack/vue-query";
import { Session } from "@wharfkit/session";
import { ClientNotInitializedError } from "~/errors/errors";

let effectClient: ClientStore | null;

export interface ClientStore {
    client: Ref<Client>;
    isLoggedIn: Ref<boolean>;
    isWalletConnecting: Ref<boolean>;
    userName: Ref<string>;
    userPermission: Ref<string>;
    userAccount: Ref<VAccount | null>;
    efxPrice: Ref<number>;
    useCampaigns: () => UseQueryReturnType<Campaign[], any>;
    useReservations: () => UseQueryReturnType<Reservation[], any> & {
        isReserved: (campaignId: number) => boolean;
    };
    connectWallet: (session?: Session) => Promise<void>;
    disconnectWallet: () => Promise<void>;
}

export const useEffectClient = () => {
    if (effectClient) return effectClient;
    throw new ClientNotInitializedError(
        "Client not initialized. Please use the `initClient` method to initialize the client."
    );
};

export const initClient = (): void => {
    effectClient = createEffectClient();
};

export const createEffectClient = (): ClientStore => {
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
    const userName: Ref<string> = ref("");
    const userPermission: Ref<string> = ref("");
    const efxPrice: Ref<number> = ref(0);

    /* --------- REACTIVE BOOLEANS --------- */

    const isLoggedIn: Ref<boolean> = ref(false);
    const isWalletConnecting: Ref<boolean> = ref(false);

    /* --------- HOOKS --------- */

    const useCampaigns = () => {
        return useQuery({
            queryKey: ["campaigns"],
            queryFn: async () => {
                return await client.value.tasks.getAllCampaigns();
            },
        });
    };

    const useReservations = () => {
        const query = useQuery({
            queryKey: ["reservations"],
            queryFn: async () => {
                return await client.value.tasks.getAllMyReservations();
            },
        });

        const isReserved = (campaignId: number) => {
            if (query.data?.value?.length) {
                return query.data.value.some(
                    (r) => r.campaign_id === campaignId
                );
            }

            return false;
        };

        return { ...query, isReserved };
    };

    /* --------- METHODS ------- */

    const connectWallet = async (session?: Session) => {
        isWalletConnecting.value = true;
        try {
            // Login
            if (session) {
                await client.value.loginWithSession(session);
            } else {
                const { session: newSession } = await sessionKit.login();
                await client.value.loginWithSession(newSession);
                console.log("---------");
                console.log(client.value.vaccountId);
            }

            // Retrieve user Data
            userAccount.value = await client.value.vaccount.get();

            userName.value = client?.value.session.actor.toString();
            userPermission.value =
                await client?.value.session?.permission.toString();
            isLoggedIn.value = true;
            isWalletConnecting.value = false;
        } catch (error) {
            console.error(error);
            isWalletConnecting.value = false;
        }
    };

    const disconnectWallet = async (): Promise<void> => {
        await sessionKit.logout();
        isLoggedIn.value = false;
        useRouter().push("/"); // Go home after logout
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
        useReservations,

        // methods
        connectWallet,
        disconnectWallet,
    };
};
