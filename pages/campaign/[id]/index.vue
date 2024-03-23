<template>
    <div class="container">
        <div v-if="campaign">
            <div>
                <h3>{{ campaign.info?.title }}</h3>
                <div class="campaign-details">
                    <div class="campaign-info">
                        <label>Reward per task</label>
                        <span>{{ campaign.reward.quantity }}</span>
                    </div>
                    <div class="campaign-info">
                        <label>Time per task</label>
                        <span>{{ campaign.max_task_time }}</span>
                    </div>
                    <p class="campaign-description">{{ campaign.info?.description }}</p>
                </div>

                <div class="campaign-toolbar">
                    <button class="button" @click="reserveTask"> Start </button>
                    <button class="button" onclick="instruction_modal.showModal()">
                        Show Instructions
                    </button>
                </div>

                <div
                    v-if="
                        campaign && campaign.info && campaign.info.instructions
                    "
                >
                    <!-- Open the modal using ID.showModal() method -->

                    <dialog
                        ref="modal"
                        id="instruction_modal"
                        class="modal"
                    >
                        <div class="modal-box">
                            <h3>
                                Instructions
                            </h3>
                            <div class="divider"></div>
                            <p v-html="campaign.info.instructions"></p>
                        </div>
                        <form method="dialog">
                            <button class="button"> close </button>
                        </form>
                    </dialog>
                </div>
                <p v-else>No instructions found.</p>
                <div class="divider"></div>
                <div class="card-actions"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { client, useCampaign } = useEffectClient();

const route = useRoute();
const router = useRouter();
const modal = ref(null);

const campaignId = Number(route.params.id);
const { data: campaign } = useCampaign(campaignId);

const reserveTask = async () => {
    const reserveResponse = await client.value.tasks.reserveTask(campaignId);
    console.debug("reserveResponse", reserveResponse);
    // TODO user reserveResponse to determine if the task was reserved or not.
    router.push(`/campaign/${campaignId}/task/`);
};
</script>

<style scoped>
.campaign-toolbar {
    display: flex;
    gap: 10px;
    margin-top: 20px;
}

.campaign-info {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
}

.campaign-info label{
    font-weight: bold;
}
</style>
