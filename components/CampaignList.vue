<template>
  <div>
    <div v-if="loading">
      <slot name="loading" />
    </div>
    <div v-else-if="campaigns && allCampaigns.length === 0">
      <slot name="empty" />
    </div>
    <div
      v-else-if="campaigns && allCampaigns.length > 0"
      class="table-container"
    >
      <table>
        <thead>
          <tr>
            <th>Dataset</th>
            <th>Title</th>
            <th>Tasks available</th>
            <th>Reward Per Task</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="campaign in allCampaigns"
            :key="campaign.id"
            @click="router.push(`/campaign/${campaign.id}`)"
          >
            <td>
              <div class="campaign-user">
                <UserAvatar :id="campaign.owner.at(1)!" />
                <span>{{ campaign.owner.at(1) }}</span>
              </div>
            </td>
            <td
              v-if="campaign && campaign.info"
              class=""
            >
              {{ campaign.info.title }}
            </td>
            <td v-else>
              {{ "No title" }}
              <br>
              <div>
                {{ "No description" }}
              </div>
            </td>
            <td>{{ campaign.total_tasks - campaign.tasks_done }}</td>
            <td class="quantity">
              {{ campaign.reward.quantity }}
            </td>
            <td>
              <div v-if="isReserved(campaign.id)">
                <NuxtLink :to="`campaign/${campaign.id}`">
                  continue
                  <IconsArrowRightBold />
                </NuxtLink>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="campaign-pagination">
        <button
          :disabled="!hasNextPage"
          class="button"
          @click="nextPage"
        >
          Load more
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Campaign } from "@effectai/effect-js";
import type { GetTableRowsResponse } from "@effectai/effect-js/dist/types/helpers";
import type { InfiniteData } from "@tanstack/vue-query";

const props = defineProps<{
  campaigns: InfiniteData<GetTableRowsResponse<any, Campaign>> | undefined;
  loading: boolean;
  hasNextPage?: boolean;
  currentPage?: number;
  more?: boolean;
}>();

const allCampaigns = computed(
  () => props.campaigns?.pages.flatMap((p) => p.rows) ?? [],
);

const router = useRouter();

const { useReservations } = useEffectClient();
const { isReserved } = useReservations();

const emits = defineEmits(["next-page"]);

const nextPage = () => {
  emits("next-page");
};
</script>

<style scoped>
.campaign-pagination {
  display: inline-flex;
  gap: 5px;
  margin-top: 20px;
}

.campaign-user {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
</style>
