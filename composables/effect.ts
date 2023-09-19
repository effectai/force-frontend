import { Client, } from "@effectai/effect-js/dist/";
import { VAccount, Campaign, Reservation } from "@effectai/effect-js/dist/types/index";

const { sessionKit } = useSessionKit()
const { fetch } = sessionKit

const effectClient = reactive(new Client("jungle4", { fetch }));

const userLoggedIn: Ref<boolean> = ref(false)
const userAccount: Ref<VAccount | null> = ref(null)
const userName: Ref<string> = ref('')
const userPermission: Ref<string> = ref('')
const efxPrice: Ref<number> = ref(0)
const reservation: Ref<Reservation | null> = ref(null)
const campaigns: Ref<Campaign[]> = ref([])

const connectWallet = async () => {
    // Login
    const { session } = await sessionKit.login()
    effectClient.loginWithSession(session)
    
    // Retrieve reservation
    campaigns.value = await effectClient.tasks.getAllCampaigns()

    // Retrieve user Data
    // efxPrice.value = await effectClient.efx.getEfxPrice()
    userAccount.value = await effectClient.vaccount.get()
    userName.value = effectClient?.session.actor.toString()
    userPermission.value = await effectClient?.session?.permission.toString()
    userLoggedIn.value = true
}

const disconnectWallet = async () => {
    console.debug('disconnectWallet')
    await sessionKit.logout()
    userLoggedIn.value = false
    // effectClient.logout() // TODO: Should we add this to the effect-js library?
}

export const useEffectClient = () => ({
    effectClient,
    connectWallet,
    disconnectWallet,
    userLoggedIn,
    userName,
    userPermission,
    userAccount,
    efxPrice,
    reservation,
    campaigns,
 })
