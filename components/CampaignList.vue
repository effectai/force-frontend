<template>
  <div class="container mx-auto px-2">
    <div class="" v-if="!loadingAllCampaigns">
      <div v-if="allCampaigns && allCampaigns.length && allCampaigns.length > 0" class="table">
        <div class="space box" v-for="campaign in allCampaigns" :key="campaign.id">
	  <div class="content">
            <div>
              <div class="">
                <div class="cols campaign">
                  <div>{{ campaign.owner.at(1) }}</div>
                  <div class="quant">{{ campaign.reward.quantity }}/tsk</div>
                </div>
	      </div>
            </div>
            <div v-if="campaign && campaign.info" class="title">
              <span class="title">{{ campaign?.info.title }}</span>
            </div>
            <div v-else>
              {{ 'No title' }}
              <br>
              <div class="text-sm opacity-50">{{ 'No description' }}</div>
            </div>
	    <div class="small-space"></div>
            <div class="">
		<NuxtLink :to="`campaign/${campaign.id}`" class="btn">
		    details
		</NuxtLink>
            </div>
          </div>
	  </div>
      </div>
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
const { effectClient, allCampaigns, loadingAllCampaigns } = useEffectClient()
</script>

<style>
  .rounded {
    border-radius: var(--border-radius-sm);
    border: 1px solid var(--c-gray-1);
  }

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
  .campaign .quant {
      margin-left: auto;

  }
  .cols.campaign {
      font-size: var(--font-size-sm);
  }
</style>
