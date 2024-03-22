<template>
    <div class="avatar">
        <img
            class="w-10 h-10 rounded-full"
            :src="`https://i.pravatar.cc/100?img=${id}`"
            alt="Rounded avatar"
        />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{ id: string | number }>();
</script>

<style></style>
