<template>
    <div class="container">
        <div v-if="campaign && campaign.info && campaign.info.template">
            <Template :html="renderTask" />
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
</template>

<script setup lang="ts">
import { Template } from '@effectai/effect-js'

const router = useRouter()
const { effectClient, userAccount } = useEffectClient()

definePageMeta({ middleware: 'auth' })

const campaignId = Number(router.currentRoute.value.params.id)
const campaign = ref(await effectClient.tasks.getCampaign(campaignId))
const myReservation = ref(await effectClient.tasks.getMyReservation(campaignId))
const taskData = ref(await effectClient.tasks.getTaskData(myReservation.value))

const renderTask = (): string => {
    const task = {
        accountId: userAccount.value?.id,
        campaignId: myReservation.value.campaign_id,
        batchId: myReservation.value.batch_id,
        submissionId: myReservation.value.id,
    }
    return new Template(campaign.value?.info?.template, taskData, {}, task).render()
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

</script>
