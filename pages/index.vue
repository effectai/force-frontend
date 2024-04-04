<template>
  <div class="container">
    <h2 class="title">
      Recent Submissions on the platform
    </h2>
    <SubmissionList
      :limit="5"
      :submissions="submissions"
      :loading="isLoadingSubmissions"
    />

    <div>
      <h2 class="title">
        Your active Reservations ({{ reservedCampaigns.length }})
      </h2>
      <p>
        These are the tasks you have started working on or that you have a
        reservation for.
      </p>
      <CampaignList
        v-if="reservedCampaigns"
        :loading="isLoadingReservations"
        :campaigns="reservedCampaigns"
      >
        <template #empty>
          <div>No reservations found.</div>
        </template>
        <template #loading>
          <div>Loading reservations</div>
        </template>
      </CampaignList>
    </div>

    <div>
      <h2 class="title text-3xl my-2">
        All datasets ({{ (campaigns && campaigns.length) ?? 0 }})
      </h2>
      <p class="my-3">
        These are all the tasks on the platform, you might need to qualify
        first.
      </p>
      <CampaignList
        :loading="isLoadingCampaigns"
        :campaigns="campaigns"
      >
        <template #empty>
          <div>No campaigns found.</div>
        </template>
        <template #loading>
          <div>Loading campaigns</div>
        </template>
      </CampaignList>
    </div>
  </div>
</template>

<script setup lang="ts">
const { useCampaigns, useReservations, useSubmissions } = useEffectClient();

const { data: campaigns, isLoading: isLoadingCampaigns } = useCampaigns();
const { isReserved, isLoading: isLoadingReservations } = useReservations();
const { data: submissions, isLoading: isLoadingSubmissions } = useSubmissions();

const reservedCampaigns = computed(() => {
  return campaigns.value?.filter((c) => isReserved(c.id)) ?? [];
});
</script>

<style></style>
