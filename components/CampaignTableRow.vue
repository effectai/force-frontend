<template>
	<tr @click="router.push(`/campaign/${campaign.id}`)">
		<td>
			<div class="campaign-user">
				<UserAvatar :id="campaign.owner.at(1)!" />
				<span>{{ campaign.owner.at(1) }}</span>
			</div>
		</td>
		<td class="campaign-title" v-if="campaign && campaign">
			<h4>{{ campaign.info?.title }}</h4>
			<span>{{ campaign.info?.description }}</span>
		</td>
		<td v-else>
			{{ "No title" }}
			<br>
			<div>
				{{ "No description" }}
			</div>
		</td>
		<td>
			<span v-if="campaign.campaignTasksAvailable === null">
				{{ campaign.total_tasks }} tasks
			</span>
			<span v-else>
				{{ campaign.campaignTasksAvailable }}/{{ campaign.total_tasks }} left
				<small v-if="campaign.campaignTasksAvailable > campaign.batchTaskAvailable">
					<br>
					<span v-if="campaign.batchTaskAvailable">
						{{ campaign.batchTaskAvailable }} tasks in current batch
					</span>
					<span v-else>
						Wait for current batch to finish
					</span>
				</small>
			</span>
		</td>
		<td class="campaign-quantity">
			<h4>{{ campaign.reward.quantity }}</h4>
			<span> 
				${{ (parseFloat(campaign.reward.quantity.split(' ')[0]) * efxPrice).toFixed(2)  }} per task
			</span>
		</td>
	</tr>
</template>

<script setup lang='ts'>
import { getPrice, type CampaignWithInfo } from "@effectai/sdk";

const efxPrice = await getPrice();

const props = defineProps<{
	campaign: CampaignWithInfo;
	accTaskIndex: number;
}>();

const router = useRouter();


</script>

<style scoped>
.campaign-user {
	display: flex;
	gap: 0.5rem;
	align-items: center;
}

h4 {
	margin: 3px 0px;
	font-size: 18px;
	font-weight: bold;
	color: black;
}
</style>