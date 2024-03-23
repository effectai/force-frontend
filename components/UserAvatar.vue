<template>
    <div class="avatar">
        <img class="" :src="`https://i.pravatar.cc/100?img=${props.id}`" alt="Rounded avatar" />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{ id: string | number }>();
</script>

<style>
.avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    overflow: hidden;
    background-color: var(--c-gray-1);
    border-radius: 50%;
}
</style>
