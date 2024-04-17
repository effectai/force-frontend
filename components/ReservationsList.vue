<template>
  <div>
    <div v-if="loading">
      Loading..
    </div>
    <div v-else-if="reservations">
      <ReservationCard
        v-for="reservation in reservations"
        :id="reservation.id"
        :key="reservation.id"
        :task-idx="reservation.task_idx"
        :reserved-on="reservation.reserved_on"
        :campaign-id="reservation.campaign_id"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Reservation } from "@effectai/effect-js";

const props = defineProps<{
	loading: boolean;
	reservations?: Reservation[];
}>();
</script>

<style></style>
