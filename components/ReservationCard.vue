<template>
  <nuxt-link
    v-if="campaign"
    :to="`/campaign/${campaign.id}`"
    class="card reservation"
  >
    <div class="reservation-container">
      <div>
        <span class="started-on">
          started {{ formatDateStringToTimeAgo(props.reservedOn) }}</span>
        <h2 class="card-title">
          <span>{{ campaign.info?.title }}</span>
        </h2>
        <p>{{ campaign.info?.description }}</p>
      </div>
      <ProgressBar
        :reverse="false"
        :progress="getProgress(campaign)"
      />
      <ForceButton
        :is-loading="loading"
        class="button"
        @click.prevent="mutate(campaignId)"
      >
        Continue to earn {{ campaign.reward.quantity }}
      </ForceButton>
    </div>
  </nuxt-link>
</template>

<script setup lang="ts">
import type { Campaign } from "@effectai/sdk";
import { useQueryClient } from "@tanstack/vue-query";

const props = defineProps<{
	id: number;
	campaignId: number;
	reservedOn: string;
	taskIdx: number;
}>();

const { useCampaign } = useEffectClient();
const { mutate, loading } = useReserveTask();

const enabled = ref(false);
const cachedCampaign = ref<Campaign | null>(null);
const { data: fetchedCampaign } = useCampaign(props.campaignId, enabled);
const campaign = computed(() => cachedCampaign.value ?? fetchedCampaign.value);
const query = useQueryClient();

const loadFromCache = async () => {
	const cache = query.getQueriesData({
		queryKey: ["campaigns"],
	});

	if (cache) {
		const campaigns = cache[0][1] as Campaign[];

		//find the campaign in the cache
		const found = campaigns.find((c) => c.id === props.campaignId);

		return found ? (cachedCampaign.value = found) : null;
	}
};

//this is temporary until the logic is added to "useCampaigns"
const getProgress = (campaign) => {
  if (((campaign.reservations_done) / campaign.total_tasks) > 1) {
    return 100
  }
  return (campaign.reservations_done / campaign.total_tasks)*100
}

onMounted(async () => {
	// try to load the corresponding campaign from the cache
	const cachedCampaign = loadFromCache();
	if (!cachedCampaign) {
		// if not found, enable the fetching of the campaign
		enabled.value = true;
	}
});
</script>

<style scoped>
.card-title {
  margin: 10px 0 5px 0;
  font-size: 1.2em;
  font-weight: bold;
}

.reservation .started-on {
  font-size: 0.8em;
  color: var(--text-color);
  opacity: 0.5;
}

.reservation-container{
  display:flex;
  flex-direction:column;
  height:100%;
}

.reservation {
  display: block;
  min-width:auto;
  max-width: 300px;
  padding: 20px;
  color: black;
  text-decoration: none;
  background: #f0f0f0;
  background:white;
  border-radius: 4px;
}

.reservation:hover {
  background: #e0e0e0;
}
</style>
