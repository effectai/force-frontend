<template>
    <div class="container">
        <div v-if="campaign && campaign.info && campaign.info.template">
            <Template :html="campaign?.info?.template" />
            <div class="divider"></div>
            <div class="container mx-auto text-center">
                <div class="join join-horizontal">
                    <button class="btn join-item">Stop</button>
                    <button class="btn btn-primary join-item">Submit</button>
                    <button class="btn join-item">Report</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Campaign } from '@effectai/effect-js/dist/types'
const router = useRouter()
const { effectClient } = useEffectClient()
definePageMeta({ middleware: 'auth' })

const campaignId = Number(router.currentRoute.value.params.id)
const campaign: Ref<Campaign | undefined> = ref(await effectClient.tasks.getCampaign(campaignId))
</script>
