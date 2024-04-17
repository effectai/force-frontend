<template>
  <div
    :class="{ 'is-reversed': reverse }"
    class="progress-bar"
  >
    <div
      class="bar"
      :style="`width: ${progress}%;`"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
	progress: number;
	reverse?: boolean;
}>();
</script>

<style scoped>
.is-reversed {
  transform: scaleX(-1);
}

.progress-bar {
  position: relative;
  width: 100%;
  background-color: #f1f1f1;
}

.bar {
  width: 0;
  height: 100%;
  background-color: #4caf50;
  transition: 0.5s;
}
</style>
