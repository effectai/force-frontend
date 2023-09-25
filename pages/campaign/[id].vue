<template>
    <Campaign :campaign="campaign"/>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const route = useRouter()
const {
    allCampaigns
} = useEffectClient()

console.log(allCampaigns)

const campaign = allCampaigns.value.find((c) => 0 === 0)
</script>
