<template>
  <div class="container mx-auto px-2">
    <div class="rounded" v-if="!loadingAllCampaigns">
      <table v-if="reservations && reservations.length && reservations.length > 0" class="table">
	<thead>
	  <tr>
	    <th></th>
	    <th>Dataset</th>
	    <th>Title</th>
	    <th>Reward</th>
	    <th></th>
	  </tr>
	</thead>
	<tbody>
	  <tr v-for="campaign in reservationCampaigns" :key="campaign.id">
	    <td>
	      <label>
	     </label>
	    </td>
	    <td>
	      <div class="">
		<div class="avatar">
		</div>
		<div>
		    <div class="font-bold">
			{{ campaign.owner.at(1) }}
		    </div>
		</div>
	      </div>
	    </td>
	    <td v-if="campaign && campaign.info" class="title">
	      {{ campaign?.info.title }}
	    </td>
	    <td v-else>
	      {{ 'No title' }}
	      <br>
	      <div class="text-sm opacity-50">{{ 'No description' }}</div>
	    </td>
	    <td class="quantity">{{ campaign.reward.quantity }}/tsk</td>
	    <td>
		<NuxtLink :to="`campaign/${campaign.id}`">continue</NuxtLink>

		<span aria-hidden="true" class="icon icon-caret-right"><svg viewBox="0 0 192 512" xmlns="http://www.w3.org/2000/svg"><path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path></svg></span>
	    </td>
	  </tr>
	</tbody>
      </table>
      <div v-else class="flex">
	<p class="text-center">There are no campaigns to work on.</p>
      </div>
    </div>
    <div v-else>
      <CampaignListSkeleton />
    </div>
  </div>
</template>

<script setup lang="ts">
const { reservations, campaignsMap, allCampaigns, loadingAllCampaigns } = useEffectClient()

const reservationCampaigns = computed(() => {
      return reservations.value.map((r) => campaignsMap.value.get(r.campaign_id))
})
</script>

<style>
  .icon { width: 0.5em; display: inline-block; vertical-align: -0.35em; padding-left: 0.25em; }
  .rounded {
    border-radius: var(--border-radius-sm);
    border: 1px solid var(--c-gray-1);
  }
  .quantity { text-align: right; }

  table {
  border-collapse: collapse;
    width: 100%;
    background-color: var(--c-gray-3);
    font-size: var(--font-size-sm);

    tr {
      border-bottom: 1px solid var(--c-gray-1);
    }
    td {
      padding: .9rem .9rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    td.title {
      max-width: 200px;
    }

    th {
      padding: 0.3rem 0;
      border: 0;
      border-style: hidden;
    }

    thead {
      background-color: var(--c-dark-silver);
      color: var(--fontColor-light);
      tr {      border-style: hidden;}
    }
    tbody {
      background-color: var(--c-gray-3);
    }
  }
</style>
