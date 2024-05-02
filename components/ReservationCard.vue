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
      <span class="owner">owner: {{ campaign?.owner[1] }}</span>
  </div>
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
import type { Campaign } from "@effectai/effect-js";
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
button {
  width: 100%;
  margin-top: auto;
}

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

.owner {
  font-size: 0.8em;
  font-style: italic;
  color: var(--text-color);
  opacity: 0.5;
}

.reservation {
  display: block;
  max-width: 300px;
  padding: 10px;
  color: black;
  text-decoration: none;
  background: #f0f0f0;
  border-radius: 10px;
}

.reservation:hover {
  background: #e0e0e0;
}
</style>
