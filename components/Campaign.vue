<template>
    <div class="container">
        <div v-if="campaign">
            <div class="card w-96 bg-base-100 shadow-xl mx-auto">
                <figure class="px-10 pt-10">
                    <img :src="imgurl" :alt="campaign.info?.title" class="rounded-xl" />
                </figure>
                <div class="card-body items-center">
                    <h1 class="card-title text-center">{{ campaign.info?.title }}</h1>
                    <div class="divider"></div>
                    <div class="stats stats-vertical lg:stats-horizontal">
                        <div class="stat">
                            <div class="stat-title">Task Reward</div>
                            <div class="stat-value">{{ campaign.reward.quantity }}</div>
                            <!-- TODO Retrieve efx dollar value here. -->
                            <div class="stat-desc">{{ `$123.23` }}</div>
                        </div>
                        <div class="stat">
                            <div class="stat-title">Est. Time</div>
                            <div class="stat-value">{{ campaign.max_task_time }}</div>
                            <div class="stat-desc">Seconds</div>
                        </div>
                    </div>
                    <strong>Task Description</strong>
                    <p v-if="campaign && campaign.info && campaign.info.description">{{ campaign.info?.description }}</p>
                    <p v-else>No description found.</p>
                    <div class="divider"></div>
                    <strong>Task instructions</strong>
                    <p v-if="campaign && campaign.info && campaign.info.instructions">{{ campaign.info?.instructions }}</p>
                    <p v-else>No instructions found.</p>
                    <div class="divider"></div>
                    <div class="card-actions">
                        <button @click="reserveTask" class="btn btn-primary">Start</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <p>Not found</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Campaign } from '@effectai/effect-js/dist/types'
const { allCampaigns, effectClient } = useEffectClient()
const route = useRouter()
const props = defineProps<{ campaignId: number; }>();

// const campaign = allCampaigns.value.find((c: Campaign) => c.id === props.campaignId);
const campaign: Ref<Campaign | undefined> = ref(await effectClient.tasks.getCampaign(props.campaignId))
// TODO Add a default image for campaigns without an image.
const imgurl: Ref<string> = computed(() => campaign.value?.info?.image || '/img/dapps/effect-force_h100.png')

    const reserveTask = async () => {
    const reserveResponse = await effectClient.tasks.reserveTask(props.campaignId)
    console.debug('reserveResponse', reserveResponse)
    // TODO user reserveResponse to determine if the task was reserved or not.
    route.push(`/campaign/${props.campaignId}/task/`)
}
</script>
