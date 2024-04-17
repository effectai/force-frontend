<template>
         <tr @click="router.push(`/campaign/${campaign.id}`)">
            <td>
              <div class="campaign-user">
                <UserAvatar :id="campaign.owner.at(1)!" />
                <span>{{ campaign.owner.at(1) }}</span>
              </div>
            </td>
            <td
              v-if="campaign && campaign.info"
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
            <td>{{ tasksAvailable }}/{{ campaign.total_tasks }} left</td>
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
</template>
    
<script setup lang='ts'>
import type { Campaign } from "@effectai/effect-js";
const { useReservations, useAccTaskIdx } = useEffectClient();
const { isReserved } = useReservations();

const props = defineProps<{
	campaign: Campaign;
}>();

const router = useRouter();

const { data: accTaskIdx, isLoading: isLoadingAccTaskIdx } = useAccTaskIdx(
	ref(props.campaign.id),
);

// TODO:: @Laurens add accTaskidx data.
const tasksAvailable = computed(() => {
	return props.campaign.total_tasks - props.campaign.reservations_done;
});
</script>
    
<style scoped>
    .campaign-user {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
</style>