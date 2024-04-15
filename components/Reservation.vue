<template>
  <div
    v-if="campaign"
    class="card reservation"
  >
    <span class="started-on">
      started {{ formatDateStringToTimeAgo(props.reservedOn) }}</span>
    <h2 class="owner">
      {{ campaign?.owner[1] }}
    </h2>
    <p>{{ campaign.reward.quantity }}</p>

    <ForceButton
      :is-loading="loading"
      class="button"
      @click="mutate(campaignId)"
    >
      Start
    </ForceButton>
  </div>
</template>

<script setup lang="ts">
import type { Campaign } from "@effectai/effect-js";
import type { GetTableRowsResponse } from "@effectai/effect-js/dist/types/helpers";
import { useQueryClient, type InfiniteData } from "@tanstack/vue-query";

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
    queryKey: ["campagnes"],
  });

  if (cache) {
    const campaign = cache[0][1] as InfiniteData<
      GetTableRowsResponse<any, Campaign>
    >;

    //find the campaign in the cache
    const found = campaign.pages
      .flatMap((p) => p.rows)
      .find((c) => c.id === props.campaignId);

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
}

.reservation .started-on {
  font-size: 0.8em;
  color: #666;
  opacity: 0.5;
}

.reservation {
  max-width: 300px;
  padding: 10px;
  background: #f0f0f0;
  border-radius: 10px;
}
</style>
