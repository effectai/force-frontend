import {
    Client,
    type VAccount,
    type Campaign,
    type Reservation,
} from "@effectai/effect-js";
import { useQuery } from "@tanstack/vue-query";
import { Session } from "@wharfkit/session";

export const useEffectClient = () => {
    /* --------- SESSION LOGIC --------- */
    const { sessionKit } = useSessionKit();

    sessionKit.restore().then((restoreSession) => {
        if (restoreSession) {
            connectWallet(restoreSession).catch(console.error);
        }
    });

    const { fetch } = sessionKit;

    /* --------- CLIENT --------- */

    const effectClient = reactive(new Client("jungle4", { fetch }));

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
                return await effectClient.tasks.getAllCampaigns();
            },
        });
    };

    const useReservations = () => {
        const query = useQuery({
            queryKey: ["reservations"],
            queryFn: async () => {
                return await effectClient.tasks.getAllMyReservations();
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
                await effectClient.loginWithSession(session);
            } else {
                const { session: newSession } = await sessionKit.login();
                await effectClient.loginWithSession(newSession);
                console.log("---------");
                console.log(effectClient.vaccountId);
            }

            // Retrieve user Data
            userAccount.value = await effectClient.vaccount.get();

            userName.value = effectClient?.session.actor.toString();
            userPermission.value =
                await effectClient?.session?.permission.toString();
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
        effectClient,

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
