import { Client, } from "@effectai/effect-js/dist/";
import { VAccount, Campaign, Reservation } from "@effectai/effect-js/dist/types/index";
import { Session } from "@wharfkit/session";

const { sessionKit } = useSessionKit()
const { fetch } = sessionKit

const effectClient = reactive(new Client("jungle4", { fetch }));

const userLoggedIn   : Ref<boolean>            = ref(false)
const userAccount    : Ref<VAccount | null>    = ref(null)
const userName       : Ref<string>             = ref('')
const userPermission : Ref<string>             = ref('')
const efxPrice       : Ref<number>             = ref(0)
const reservation    : Ref<Reservation | null> = ref(null)
// const campaigns      : Ref<Campaign[]>         = ref([])
const campaignList  : Ref<Campaign[]>         = ref([])

const connectWallet = async (session?: Session) => {
    // Login
    if (session) {
        effectClient.loginWithSession(session)
    } else {
        const { session: newSession } = await sessionKit.login()
        effectClient.loginWithSession(newSession)
    }
    
    // Retrieve Campaigns
    const allCampaigns = await effectClient.tasks.getAllCampaigns()
    campaignList.value = await Promise.all(allCampaigns.map(getCampaignContent))

    // Retrieve user Data
    // efxPrice.value = await effectClient.efx.getEfxPrice()
    userAccount.value = await effectClient.vaccount.get()
    userName.value = effectClient?.session.actor.toString()
    userPermission.value = await effectClient?.session?.permission.toString()
    userLoggedIn.value = true
}

const getCampaignContent = async (campaign: Campaign) => {
    const ipfsContent = await effectClient.ipfs.fetch(campaign.content.field_1)
    return {
        ...campaign,
        ipfsContent,
    }
}

const disconnectWallet = async () => {
    console.debug('disconnectWallet')
    await sessionKit.logout()
    userLoggedIn.value = false
    // effectClient.logout() // TODO: Should we add this to the effect-js library?
}

// Uncomment to persist session
const restoreSession = await sessionKit.restore()
if (restoreSession) {
    await connectWallet(restoreSession)
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
    campaignList,
 })
