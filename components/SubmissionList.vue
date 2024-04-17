<template>
  <div>
    <div v-if="loading">
      <slot name="loading" />
    </div>
    <div v-else-if="submissions && submissions.length === 0">
      <slot name="empty" />
    </div>
    <div
      v-else-if="submissions && submissions.length > 0"
      class="table-container"
    >
      <table>
        <thead>
          <tr>
            <th>By</th>
            <th>For</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          <SubmissionRow
            v-for="submission in submissionsToShow"
            :id="submission.id"
            :key="submission.id"
            :campaign-id="submission.campaign_id"
            :submitted-on="submission.submitted_on"
            :account-id="submission.account_id"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Submission } from "@effectai/effect-js";

const submissionsToShow = computed(() => {
	return props.submissions?.slice(0, props.limit);
});

const props = defineProps<{
	submissions: Submission[] | undefined;
	loading: boolean;
	limit: number;
}>();

const router = useRouter();
</script>

<style scoped></style>
