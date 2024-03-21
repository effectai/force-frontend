import { Client, VAccount, Campaign, Reservation } from "@effectai/effect-js";
import { Session } from "@wharfkit/session";

const { sessionKit } = useSessionKit()
const { fetch } = sessionKit

const effectClient = reactive(new Client("jungle4", { fetch }));

const userLoggedIn    : Ref<boolean>            = ref(false)
const userAccount     : Ref<VAccount | null>    = ref(null)
const userName        : Ref<string>             = ref('')
const userPermission  : Ref<string>             = ref('')
const efxPrice        : Ref<number>             = ref(0)
const reservation     : Ref<Reservation | null> = ref(null)
const allCampaigns    : Ref<Campaign[]>         = ref([])
const campaignsMap    : Ref<Map>                 = ref(new Map())
const reservations    : Ref<Reservation[]>      = ref([])
const loadingAllCampaigns : Ref<boolean>        = ref(false)

const walletConnecting = ref(false)

const loadData = async () => {
    allCampaigns.value = await effectClient.tasks.getAllCampaigns()
    reservations.value = await effectClient.tasks.getAllMyReservations();
    for (var c in allCampaigns.value) {
	const camp = allCampaigns.value[c]
	campaignsMap.value.set(camp.id, camp);
    };
}

const connectWallet = async (session?: Session) => {
    walletConnecting.value = true
    try {
        // Login
        if (session) {
            await effectClient.loginWithSession(session)
        } else {
            const { session: newSession } = await sessionKit.login()
            await effectClient.loginWithSession(newSession)
	    console.log('---------')
	    console.log(effectClient.vaccountId)
        }
        
        // Retrieve Campaigns
        loadingAllCampaigns.value = true
        allCampaigns.value = await effectClient.tasks.getAllCampaigns()
        loadingAllCampaigns.value = false

        // Retrieve user Data
        // efxPrice.value = await effectClient.efx.getEfxPrice()
        userAccount.value = await effectClient.vaccount.get()
        userName.value = effectClient?.session.actor.toString()
        userPermission.value = await effectClient?.session?.permission.toString()
        userLoggedIn.value = true
        walletConnecting.value = false
    } catch (error) {
        console.error(error)
        walletConnecting.value = false
    }
}

const disconnectWallet = async (): Promise<void> => {
    await sessionKit.logout()
    userLoggedIn.value = false
    useRouter().push('/')// Go home after logout
}

// Persist session
sessionKit.restore().then((restoreSession) => {
    if (restoreSession) {
        connectWallet(restoreSession).catch(console.error)
    }
})

export const useEffectClient = () => ({
    effectClient,
    connectWallet,
    disconnectWallet,
    userLoggedIn,
    walletConnecting,
    userName,
    userPermission,
    userAccount,
    efxPrice,
    reservation,
    allCampaigns,
    reservations,
    campaignsMap,
    loadingAllCampaigns,
    loadData,
 })
