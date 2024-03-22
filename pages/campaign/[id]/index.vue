<template>
    <div class="container">
        <div class="card px-5 py-2" v-if="campaign">
            <div class="card-body items-center">
                <h3 class="text-3xl title mb-3">{{ campaign.info?.title }}</h3>
                <div class="">
                    <div>
                        <label class="font-bold">Reward per task</label>
                        <p>{{ campaign.reward.quantity }}</p>
                    </div>
                    <div>
                        <label class="font-bold">Time per task</label>
                        <p>{{ campaign.max_task_time }}</p>
                    </div>
                    <p class="my-5">{{ campaign.info?.description }}</p>
                </div>

                <div class="my-5">
                    <button class="btn btn-primary" @click="reserveTask">
                        Start
                    </button>

                    <button
                        class="btn btn-secondary"
                        onclick="instruction_modal.showModal()"
                    >
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
                        class="modal p-5 rounded-xl shadow-lg"
                    >
                        <div class="modal-box w-11/12 max-w-5xl">
                            <h3 class="font-bold text-xl text-center my-5">
                                Instructions
                            </h3>
                            <div class="divider"></div>
                            <p v-html="campaign.info.instructions"></p>
                        </div>
                        <form method="dialog" class="modal-backdrop mt-5">
                            <button class="btn btn-secondary mt-5">
                                close
                            </button>
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

<style></style>

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

<style></style>
