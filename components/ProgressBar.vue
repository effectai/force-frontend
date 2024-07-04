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
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.bar {
  width: 0;
  height: 10px;
  background-color: #4caf50;
  /* height: 100%; */
  border-radius: 10px;
  transition: 0.5s
}
</style>
