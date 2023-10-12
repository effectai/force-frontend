<template>
  <div class="container mx-auto px-2">
    <div v-if="!loadingAllCampaigns">
      <table v-if="allCampaigns && allCampaigns.length && allCampaigns.length > 0" class="table">
        <!-- head -->
        <thead>
          <tr>
            <th>
              <label>
                <!-- <input type="checkbox" class="checkbox" /> -->
              </label>
            </th>
            <th>Name</th>
            <th>Job</th>
            <th>EFX / Task</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="campaign in allCampaigns" :key="campaign.id">
            <th>
              <label>
                <!-- <input type="checkbox" class="checkbox" /> -->
                {{ campaign.id }}
              </label>
            </th>
            <td>
              <div class="flex items-center space-x-3">
                <div class="avatar">
                  <div class="mask mask-squircle w-12 h-12">
                    <img src="/badges/data_master.svg" alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <div class="font-bold">{{ campaign.owner.at(1) }}</div>
                  <div class="text-sm opacity-50 badge badge-ghost badge-sm">{{ 'NL' }}</div>
                </div>
              </div>
            </td>
            <td v-if="campaign && campaign.info">
              {{ campaign?.info.title }}
              <br />
              <div class="text-sm opacity-50">{{ campaign?.info.description }}</div>
            </td>
            <td v-else>
              {{ 'No title' }}
              <br>
              <div class="text-sm opacity-50">{{ 'No description' }}</div>
            </td>
            <td>{{ campaign.reward.quantity }}</td>
            <th>
              <NuxtLink :to="`campaign/${campaign.id}`" class="btn btn-ghost btn-xs">Details</NuxtLink>
            </th>
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

<style></style>