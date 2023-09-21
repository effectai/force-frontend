<template>
    <Campaign :campaign="campaign"/>
</template>

<script setup lang="ts">
// import { Campaign } from '@effectai/effect-js/dist/types';

const route = useRouter()
const {
    allCampaigns
} = useEffectClient()

console.log(allCampaigns)

const campaign = allCampaigns.value.find((c) => 0 === 0)
</script>
