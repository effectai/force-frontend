<template>
        <template v-if="!loading">
            <template v-if="campaign?.info?.template && templateHtml">
                <Template :html="templateHtml" @submit="submitTask"/>
	    </template>
        </template>
        <template v-else class="mx-auto flex">
            <TemplateSkeleton />
        </template>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
    layout: 'task'
})

// Template needs to be renamed to avoid naming conflict with Vue3's template variable.
import { Template as EffectTemplate } from '@effectai/effect-js'

const router = useRouter()
const { effectClient, userAccount } = useEffectClient()
const campaignId = Number(router.currentRoute.value.params.id)
const campaign = ref(await effectClient.tasks.getCampaign(campaignId))
const loading = ref(true)
const templateHtml = ref('')

const renderTask = async (): Promise<void> => {
    try {
        const myReservation = await effectClient.tasks.getMyReservation(campaignId)
        const taskData = await effectClient.tasks.getTaskData(myReservation)

        const task = {
            accountId: userAccount.value?.id,
            campaignId: myReservation.campaign_id,
            batchId: myReservation.batch_id,
            submissionId: myReservation.id,
        }

        console.debug('🔥🔥🔥-TaskPlaceHolder', taskData)
        // TODO remove these parameters from the template.
        const tempTaskData = { id: 1, annotations: [], ...taskData }

        const template = new EffectTemplate(campaign.value?.info?.template!, tempTaskData, {}, task)
        templateHtml.value = template.render()
        loading.value = false

    } catch (error) {
        console.error(error)
    }
}

// TODO: Implement drop reservation functionality in the contract and sdk.
const stopTask = async (): Promise<void> => {
    // const reservation = await effectClient.tasks.getMyReservation(campaignId)
    // const stopResponse = await effectClient.tasks.stopTask(reservation)
    // console.debug('stopResponse', stopResponse)
    router.push(`/campaign/${campaignId}`)
}

// TODO: This flow needs work
const submitTask = async (data: any): Promise<void> => {
    const allReservations = await effectClient.tasks.getAllReservations()
    const nextReservation = await effectClient.tasks.reserveTask(campaignId)
    const reservation = await effectClient.tasks.getMyReservation(campaignId).catch((error) => { throw error })
    const task = await effectClient.tasks.getTaskData(reservation).catch((error) => { throw error })
    const submitResponse = await effectClient.tasks.submitTask(reservation, data)
    const followingReservation = await effectClient.tasks.reserveTask(campaignId)
    await renderTask()
}

const reportTask = async (): Promise<void> => {
    // const reportResponse = await effectClient.tasks.reportTask(campaignId)
    // console.debug('reportResponse', reportResponse)
    window.open('https://discord.com/channels/519860537891487745/846388926234099763')

}

onMounted(async () => {
    console.debug('mounted')
    await renderTask()
})

</script>
