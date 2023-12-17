<template>
    <div class="container mx-auto my-10">
        <h3>Campaigns</h3>
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


<style ></style>
