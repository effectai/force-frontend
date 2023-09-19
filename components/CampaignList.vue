<template>
<div class="overflow-x-auto">
  <table class="table">
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
      <tr v-for="campaign in campaignList" :key="campaign.id">
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
        <td>
          {{ campaign.ipfsContent.title }}
          <br/>
          <div class="text-sm opacity-50">{{ campaign.ipfsContent.description }}</div>
        </td>
        <td>{{ campaign.reward.quantity }}</td>
        <th>
          <button class="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
    </tbody>
    <!-- foot -->
    <!-- <tfoot> -->
      <!-- <tr> -->
        <!-- <th></th> -->
        <!-- <th>Name</th> -->
        <!-- <th>Job</th> -->
        <!-- <th>Favorite Color</th> -->
        <!-- <th></th> -->
      <!-- </tr> -->
    <!-- </tfoot> -->
    
  </table>
</div>
</template>

<script setup lang="ts">
const {
    campaignList,
} = useEffectClient()
</script>

<style>
</style>