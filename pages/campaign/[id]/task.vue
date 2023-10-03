<template>
    <div class="container">
        <div v-if="!loading">
            <div v-if="campaign && campaign.info && campaign.info.template && templateHtml">
                <Template :html="templateHtml"/>
                <div class="divider"></div>
                <div class="container mx-auto text-center">
                    <div class="join join-horizontal">
                        <button @click="stopTask" class="btn join-item">Stop</button>
                        <button @click="submitTask" class="btn btn-primary join-item">Submit</button>
                        <button @click="reportTask" class="btn join-item">Report</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            Loading...
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

// Template needs to be renamed to avoid naming conflict with Vue3's template tag.
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
        const tempTaskData = { id: 1, annotations: [], ...taskData}

        const template = new EffectTemplate(campaign.value?.info?.template, tempTaskData, {}, task)
        templateHtml.value = template.render()
        loading.value = false

    } catch (error) {
        console.error(error)
    }
}

const stopTask = async (): Promise<void> => {
    // const stopResponse = await effectClient.tasks.stopTask(campaignId)
    // console.debug('stopResponse', stopResponse)
    // router.push(`/campaign/${campaignId}`)
}

const submitTask = async (): Promise<void> => {
    // const submitResponse = await effectClient.tasks.submitTask(campaignId)
    // console.debug('submitResponse', submitResponse)
    // router.push(`/campaign/${campaignId}`)
}

const reportTask = async (): Promise<void> => {
    // const reportResponse = await effectClient.tasks.reportTask(campaignId)
    // console.debug('reportResponse', reportResponse)
    // router.push(`/campaign/${campaignId}`)
}

onMounted(async () => {
    console.debug('mounted')
    await renderTask()
})

</script>
