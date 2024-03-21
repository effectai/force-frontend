<template>
    <div class="container">
        <div class="card w-96 bg-base-100 shadow-xl mx-auto">
            <div class="card-body items-center">
		
		<h3>{{ campaign.info?.title }}</h3>
		<div class="box">
		    <dl>
			<dt>Reward per task</dt>
			<dd>{{ campaign.reward.quantity }}</dd>
			<dd>{{ `$123.23` }}</dd>
			<dt>Time per task</dt>
			<dd>{{ campaign.max_task_time }}</dd>
		    </dl>

		    <p>{{ campaign.info?.description }}</p>
		</div>

		<div class="cols space">
                    <button class="btn" onclick="instruction_modal.showModal()">
			Show Instructions
		    </button>

                    <button @click="reserveTask" class="btn btn-primary">Start</button>
		</div>

                <div v-if="campaign && campaign.info && campaign.info.instructions">
                    <!-- Open the modal using ID.showModal() method -->

                    <dialog id="instruction_modal" class="modal">
                        <div class="modal-box w-11/12 max-w-5xl">
                            <h3 class="font-bold text-xl text-center">Instructions</h3>
                            <div class="divider"></div>
                            <p v-html="campaign.info.instructions"></p>
                        </div>
                        <form method="dialog" class="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
                <p v-else>No instructions found.</p>
                <div class="divider"></div>
                <div class="card-actions">
                </div>
            </div>
	</div>
    </div>
</template>

<style>
    .box {
        background-color: var(--c-gray-3);
        padding: 0 0.9rem;
        border-radius: var(--border-radius-sm);
        border: 1px solid var(--c-gray-1);
    }
    .box > .content { margin: 0.9rem 0; }
    .box .content > .title {
        font-size: 1.2em;
	margin: 0.5rem 0;
    }
</style>

<script setup lang="ts">
    import { Campaign } from '@effectai/effect-js'
    const { effectClient } = useEffectClient()
    const route = useRouter()
    const props = defineProps<{ campaignId: number; }>();

	// const campaign = allCampaigns.value.find((c: Campaign) => c.id === props.campaignId);
	const campaign: Ref<Campaign | undefined> = ref(await effectClient.tasks.getCampaign(props.campaignId, ))
	    // TODO Add a default image for campaigns without an image.
	    const imgurl: Ref<string> = computed(() => campaign.value?.info?.image || '/img/dapps/effect-force_h100.png')

		const reserveTask = async () => {
		const reserveResponse = await effectClient.tasks.reserveTask(props.campaignId)
		console.debug('reserveResponse', reserveResponse)
		// TODO user reserveResponse to determine if the task was reserved or not.
		route.push(`/campaign/${props.campaignId}/task/`)
		}
</script>
