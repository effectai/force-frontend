<template>
    <div>
        <div v-if="loading">
            <slot name="loading"></slot>
        </div>
        <div v-else-if="campaigns.length === 0">
            <slot name="empty"></slot>
        </div>
        <div v-else-if="campaigns && campaigns.length > 0">
            <table
                class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
            >
                <thead
                    class="text-xs uppercase bg-primary text-white dark:bg-gray-700 dark:text-gray-400"
                >
                    <tr>
                        <th class="px-6 py-3">Dataset</th>
                        <th>Title</th>
                        <th>Reward</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(campaign, index) in campaigns"
                        @click="router.push(`/campaign/${campaign.id}`)"
                        :key="campaign.id"
                        class="cursor-pointer hover:bg-gray-100 bg-white border-b"
                    >
                        <td class="px-6 py-4">
                            <div class="flex items-center gap-5">
                                <UserAvatar :id="campaign.owner.at(1)" />
                                <div>
                                    <div class="font-bold">
                                        {{ campaign.owner.at(1) }}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td v-if="campaign && campaign.info" class="">
                            {{ campaign?.info.title }}
                        </td>
                        <td v-else>
                            {{ "No title" }}
                            <br />
                            <div class="text-sm opacity-50">
                                {{ "No description" }}
                            </div>
                        </td>
                        <td class="quantity">
                            {{ campaign.reward.quantity }}/tsk
                        </td>
                        <td v-if="isCampaignReserved(campaign.id)">
                            <NuxtLink :to="`campaign/${campaign.id}`"
                                >continue</NuxtLink
                            >

                            <span
                                aria-hidden="true"
                                class="icon icon-caret-right"
                            ></span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Campaign } from "@effectai/effect-js";

const props = defineProps<{ campaigns: Campaign[]; loading: boolean }>();
const router = useRouter();

const { useReservations } = useEffectClient();
const { isReserved } = useReservations();

const isCampaignReserved = (campaignId: number) => {
    return isReserved(campaignId);
};
</script>

<style></style>
