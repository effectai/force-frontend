<template>
  <div class="container mx-auto px-2">
    <div class="rounded" v-if="!loadingAllCampaigns">
      <table v-if="allCampaigns && allCampaigns.length && allCampaigns.length > 0" class="table">
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
          <tr v-for="campaign in allCampaigns" :key="campaign.id">
            <td>
              <label> 
             </label>
            </td>
            <td>
              <div class="">
                <div class="avatar">
                </div>
                <div>
                  <div class="font-bold">{{ campaign.owner.at(1) }}</div>
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
            <td>{{ campaign.reward.quantity }}</td>
            <td>
              <NuxtLink :to="`campaign/${campaign.id}`" class="btn btn-ghost btn-xs">Details</NuxtLink>
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
const { allCampaigns, loadingAllCampaigns } = useEffectClient()

</script>

<style>
  .rounded {
    border-radius: 1rem;
    overflow: hidden;
  }

  table {
  border-collapse: collapse; 
    width: 100%;
    background-color: var(--c-gray-3);
    font-size: var(--font-size-sm);

    td {
      padding: 0.9rem;
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
