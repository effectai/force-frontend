<template>
    <div class="container">
        <div v-if="!loading">
            <div v-if="campaign && campaign.info && campaign.info.template && templateHtml">
                <Template :html="templateHtml" />
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

import { Template } from '@effectai/effect-js'

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
        console.debug('myReservation', myReservation)
        // TODO TaskData should be an object. Now it is only a string.
        // In this is example it returns, taskData What did you have for dinner yesterday?
        // It should be an object with a key of the question and a value of the answer.
        // { placeholderName: 'What did you have for dinner yesterday?' }
        console.debug('taskData', taskData)
        console.debug('task', task)
        const template = new Template(campaign.value?.info?.template, taskData, {}, task)
        templateHtml.value = template.render()
        loading.value = false
        console.debug('templateHtml', templateHtml.value)
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
