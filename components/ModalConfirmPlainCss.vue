<script setup lang="ts">
import { VueFinalModal } from "vue-final-modal";
const form = ref(null);

defineProps<{
	title?: string;
}>();

const name = ref("jeffrey");

const emit = defineEmits<{
	(e: "confirm"): void;
}>();

const confirm = () => {
	// emit("confirm");
	console.log(form.value);
};
</script>

<template>
  <VueFinalModal
    class="confirm-modal"
    content-class="confirm-modal-content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <h2 class="title">{{ title }}</h2>
    
    <slot name="form" />

</VueFinalModal>
</template>

<style>
.confirm-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
.confirm-modal-content {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: #fff;
  border-radius: 0.5rem;
}
.confirm-modal-content > * + *{
  margin: 0.5rem 0;
}
.confirm-modal-content h1 {
  font-size: 1.375rem;
}
.confirm-modal-content button {
  margin: 0.25rem 0 0 auto;
  border: 1px solid;
  border-radius: 0.5rem;
}
.dark .confirm-modal-content {
  background: #000;
}
</style>
