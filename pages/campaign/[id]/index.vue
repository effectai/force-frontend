<template>
    <Campaign :campaignId="campaignId"/>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const route = useRouter()
const campaignId = Number(route.currentRoute.value.params.id)
console.debug('campaignId', campaignId)
</script>
