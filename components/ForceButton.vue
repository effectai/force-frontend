<template>
  <button
    :disabled="isDisabled"
    :class="[{ 'inline-flex': isLoading }, attrs.class]"
    @click="attrs.onClick"
  >
    <slot />
    <div
      v-if="isLoading"
      class="lds-ring"
    >
      <div />
      <div />
      <div />
      <div />
    </div>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
	isLoading: boolean;
}>();

defineOptions({
	inheritAttrs: false,
});

const attrs = useAttrs();

const isDisabled = computed(() => !!attrs.disabled || props.isLoading);
</script>

<style></style>
