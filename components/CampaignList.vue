<template>
  <div>
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
            <th>Tasks available</th>
            <th>Reward Per Task</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="campaign in campaigns"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Campaign } from "@effectai/effect-js";

const props = defineProps<{
  campaigns: Campaign[] | undefined;
  loading: boolean;
}>();

const router = useRouter();

const { useReservations } = useEffectClient();
const { isReserved } = useReservations();
</script>

<style scoped>
.campaign-user {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
</style>
