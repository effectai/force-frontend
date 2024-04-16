<template>
  <div class="container">
    <div v-if="isLoadingAccTaskIdx">
      Loading account 21 task index for campaign 0..
    </div>
    <div v-else>
      {{ accTaskIdx }}
    </div>
    <div v-if="isLoggedIn">
      <h2 class="title mb-0">
        Your active Datasets ({{ reservations?.length }})
      </h2>
      <p>
        These are the tasks you have started working on or that you have a
        reservation for.
      </p>
      <ReservationsList
        v-if="campaigns"
        :loading="isLoadingReservations"
        :reservations="reservations"
      />
    </div>

    <div>
      <h2 class="title mb-0">
        All Datasets
      </h2>
      <p class="my-3">
        These are all the campaigns on the platform, you might need to qualify
        first.
      </p>
      <CampaignList
        :loading="isLoadingCampaigns"
        :campaigns="campaigns"
        :current-page="page"
        :has-next-page="hasNextPage"
        @next-page="fetchNextPage"
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
const { useCampaigns, useReservations, isLoggedIn, useAccTaskIdx } = useEffectClient();

const page = ref(1);

const {
  data: campaigns,
  isLoading: isLoadingCampaigns,
  fetchNextPage,
  hasNextPage,
} = useCampaigns({
  page,
});

const { data: accTaskIdx, isLoading: isLoadingAccTaskIdx } =
useAccTaskIdx(ref(21), ref(0));

const { data: reservations, isLoading: isLoadingReservations } =
  useReservations();
</script>

<style></style>
