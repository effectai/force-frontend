<template>
  <div class="container">

    <!-- <TasksAvailableBanner/> -->

    <div v-if="isLoggedIn">
      <h2 class="title mb-0">
        Your active Datasets ({{ reservations?.length }})
      </h2>

      <ReservationsList
        v-if="campaigns"
        :max="3"
        :loading="isLoadingReservations"
        :reservations="reservations"
      />
      
    </div>

    <div>
      <!-- <h2 class="title mb-0">
        All Datasets
      </h2> -->
   
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
const { useCampaigns, useReservations, isLoggedIn } = useEffectClient();
const { data: campaigns, isLoading: isLoadingCampaigns } = useCampaigns();

const { data: reservations, isLoading: isLoadingReservations } =
	useReservations();
</script>

<style></style>
