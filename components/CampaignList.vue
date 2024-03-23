<template>
    <div class="overflow-x-auto">
        <div v-if="loading">
            <slot name="loading"></slot>
        </div>
        <div v-else-if="campaigns && campaigns.length === 0">
            <slot name="empty"></slot>
        </div>
        <div
            class="table-container"
            v-else-if="campaigns && campaigns.length > 0"
        >
            <table>
                <thead>
                    <tr>
                        <th>Dataset</th>
                        <th>Title</th>
                        <th>Reward</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="campaign in campaigns"
                        @click="router.push(`/campaign/${campaign.id}`)"
                        :key="campaign.id"
                    >
                        <td>
                            <div class="campaign-user">
                                <UserAvatar :id="campaign.owner.at(1)!" />
                                <span>{{ campaign.owner.at(1) }}</span>
                            </div>
                        </td>
                        <td v-if="campaign && campaign.info" class="">
                            {{ campaign.info.title }}
                        </td>
                        <td v-else>
                            {{ "No title" }}
                            <br />
                            <div>
                                {{ "No description" }}
                            </div>
                        </td>
                        <td class="quantity">
                            {{ campaign.reward.quantity }}/tsk
                        </td>
                        <td>
                            <div v-if="isReserved(campaign.id)">
                                <NuxtLink :to="`campaign/${campaign.id}`"
                                    >continue
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
tr:hover {
    cursor: pointer;
    background: var(--color-gray-200);
}

.campaign-user {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}
</style>
