<template>
  <div class="campaign-list">
    <div v-if="loading">
      <slot name="loading" />
    </div>
    <div v-else-if="campaigns && campaigns.length === 0">
      <slot name="empty" />
    </div>
    <div
      v-else-if="campaigns && campaigns.length > 0"
      class="table-container"
    >
      <table>
        <thead>
          <tr>
            <th>Dataset</th>
            <th>Title</th>
            <th>Tasks</th>
            <th>Reward Per Task</th>
          </tr>
        </thead>
        <tbody>
          <CampaignTableRow 
            v-for="campaign in campaigns"
            :key="campaign.id"
            :campaign="campaign"
            :accTaskIndex="accTaskIdx?.find(ati => ati.campaign_id === campaign.id)?.value"
            @tasks-counted="updateTotalTasks"
            />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Campaign } from "@effectai/sdk";
import TasksAvailableBanner from "./TasksAvailableBanner.vue";
const { useAccTaskIdx } = useEffectClient();

const { data: accTaskIdx, isLoading: isLoadingAccTaskIdx } = useAccTaskIdx();

const props = defineProps<{
	campaigns: Campaign[] | undefined;
	loading: boolean;
}>();

const totalTasks = ref(0)
const updateTotalTasks = (tasks: number) => {
      totalTasks.value += tasks;
    };
</script>

<style scoped>

.campaign-pagination {
  display: inline-flex;
  gap: 5px;
  margin-top: 20px;
}

.campaign-list {
  margin-top: var(--spacing-4);
}

</style>
