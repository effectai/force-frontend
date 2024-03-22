<template>
    <div class="my-10">
        <h2 class="text-3xl my-2 title">
            Reserved Datasets ({{ reservedCampaigns.length }})
        </h2>
        <p class="mb-5">
            These are the tasks you have started working on or that you have a
            reservation for.
        </p>
        <CampaignList :campaigns="reservedCampaigns">
            <template #empty>
                <div>No datasets found.</div>
            </template>
            <template #loading>
                <div>Loading...</div>
            </template>
        </CampaignList>
    </div>

    <div class="my-10">
        <h2 class="title text-3xl my-2">
            All datasets ({{ campaigns.length }})
        </h2>
        <p class="my-3">
            These are all the tasks on the platform, you might need to qualify
            first.
        </p>
        <CampaignList :campaigns="campaigns">
            <template #empty>
                <div>No datasets found.</div>
            </template>
            <template #loading>
                <div>Loading...</div>
            </template>
        </CampaignList>
    </div>
</template>

<script setup lang="ts">
const { useCampaigns, useReservations } = useEffectClient();

const { campaigns } = useCampaigns();
const { reservations } = useReservations();

const reservedCampaigns = computed(() => {
    return campaigns.value.filter((c) => {
        return reservations.value.some((r) => r.campaign_id === c.id);
    });
});
</script>

<style>
p {
    font-size: var(--font-size-sm);
}
</style>
