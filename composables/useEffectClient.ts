import {
    Client,
    type VAccount,
    type Campaign,
    type Reservation,
} from "@effectai/effect-js";
import { useQuery } from "@tanstack/vue-query";
import { Session } from "@wharfkit/session";
import { ClientNotInitializedError } from "~/errors/errors";

let effectClient: Client | null = null;

export const useEffectClient = () => {
    if (effectClient) return effectClient;
    throw new ClientNotInitializedError(
        "Client not initialized. Please use the `initClient` method to initialize the client."
    );
};

export const initClient = (): void => {
    effectClient = createEffectClient();
};

export const createEffectClient = () => {
    console.log("creating client..");

    /* --------- SESSION LOGIC --------- */
    const { sessionKit } = useSessionKit();

    sessionKit.restore().then((restoreSession) => {
        if (restoreSession) {
            connectWallet(restoreSession).catch(console.error);
        }
    });

    const { fetch } = sessionKit;

    /* --------- CLIENT --------- */

    const client = reactive(new Client("jungle4", { fetch }));

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
                return await client.tasks.getAllCampaigns();
            },
        });
    };

    const useReservations = () => {
        const query = useQuery({
            queryKey: ["reservations"],
            queryFn: async () => {
                return await client.tasks.getAllMyReservations();
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
                await client.loginWithSession(session);
            } else {
                const { session: newSession } = await sessionKit.login();
                await client.loginWithSession(newSession);
                console.log("---------");
                console.log(client.vaccountId);
            }

            // Retrieve user Data
            userAccount.value = await client.vaccount.get();

            userName.value = client?.session.actor.toString();
            userPermission.value = await client?.session?.permission.toString();
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
