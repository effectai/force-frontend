<template>
  <tr>
    <td>
      <a
        :href="`${config.public.BASE_EXPLORER_URL}/account/${account?.address[1]}`"
      >
        {{ account?.address[1] }}
      </a>
    </td>
    <td>{{ campaign?.info?.title }}</td>
    <td>{{ formatDateStringToTimeAgo(submittedOn) }}</td>
  </tr>
</template>

<script setup lang="ts">
const { useGetAccountById, useCampaign } = useEffectClient();

const config = useRuntimeConfig();

const props = defineProps<{
	id: number;
	submittedOn: string;
	accountId: number;
	campaignId: number;
}>();

const { data: account } = useGetAccountById(props.accountId);
const { data: campaign } = useCampaign(props.campaignId);
</script>

<style></style>
