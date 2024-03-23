<template>
    <div class="avatar">
        <img :src="`https://i.pravatar.cc/100?img=${props.id}`" alt="Rounded avatar" />
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
    border-radius: 50%;
}
</style>
