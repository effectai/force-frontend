<template>
    <div class="container mx-auto my-10">
	<h3>Your datasets (3)</h3>
	<p>These are the tasks you have started working on or that you have a reservation for</p>
	<ReservationList />
    </div>

    <div class="small-space">&nbsp;</div>

    <div class="container mx-auto my-10">
	<h3>All datasets (5)</h3>
	<p>These are all the tasks on the platform, you might need to qualify first.</p>
	<CampaignList />
    </div>
</template>

<script setup lang="ts">
const {
  userLoggedIn,
  loadData,
} = useEffectClient()
// TODO: load on better point
await loadData();
</script>


<style>
p {
    font-size: var(--font-size-sm);
}
</style>
