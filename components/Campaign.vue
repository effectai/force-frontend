<template>
    <div>
        <h1>{{ props.campaign.info?.title }}</h1>
        <p>{{ props.campaign.info?.description }}</p>
    </div>
</template>

<script setup lang="ts">
import { Campaign } from '@effectai/effect-js/dist/types';

const props = defineProps<{
  campaign: Campaign;
}>();

</script>