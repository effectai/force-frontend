<template>
  <div class="avatar">
    <img
      :src="`/img/default-avatar.webp`"
      alt="Rounded avatar"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ id: string | number }>();
</script>

<style>

.avatar img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}

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
