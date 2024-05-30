<template>
  <div class="reservation-list">
    <div v-if="loading">
      Loading..
    </div>
    <div v-else-if="reservations" class="reservation-container">
      <ReservationCard
        v-for="reservation in sortedReservations"
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
import type { Reservation } from "@effectai/sdk";

const props = defineProps<{
	loading: boolean;
	reservations?: Reservation[];
	max?: number;
}>();

const sortedReservations = computed(() => {
	return props.reservations
		?.toSorted(
			(a, b) =>
				new Date(b.reserved_on).getTime() - new Date(a.reserved_on).getTime(),
		)
		.slice(0, props.max);
});
</script>

<style>

.reservation-list{
  margin-top: var(--spacing-4);
}

.reservation-container{
  display:flex;
  flex-wrap:wrap;
  gap:1rem;
}
</style>
