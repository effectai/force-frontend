<template>
  <div class="columns is-align-items-center is-justify-content-space-between mt-3">
    <!-- Search bar -->
    <div class="column">
      Search
      <input class="input" type="text" placeholder="Search campaign..." @keyup="onSearch">
    </div>

    <!-- Filter category -->
    <div class="column">
      <span>Category</span><br>
      <div class="select is-normal">
        <select v-model="category" @change="onCategoryFilter(category.value)">
          <option value="" selected>-</option>
          <option v-for="(category) in effect_dapps" :key="category.value" :value="category" class="column">
            {{ category.name }}
          </option>
        </select>
      </div>
    </div>

    <!-- Filter status -->
    <div class="column">
      <span>Status</span><br>
      <div class="select is-normal">
        <select v-model="status" @change="onStatusFilter(status.value)">
          <option value="" selected>-</option>
          <option v-for="(status) in statuses" :key="status.value" :value="status" class="column">
            {{ status.name }}
          </option>
        </select>
      </div>
    </div>

    <!-- Sort -->
    <div class="column">
      <span>Sort</span><br>
      <div class="select is-normal">
        <select v-model="selectSort" @change="onSort(selectSort)">
          <option value="" selected>-</option>
          <option v-for="(sort) in sort_options" :key="sort.name" :value="sort" class="column">
            {{ sort.name }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SortAndFilters',
  data () {
    return {
      selectSort: null,
      search: null,
      status: null,
      category: null,
      effect_dapps: {
        dao: {
          value: 'dao',
          name: 'DAO'
        },
        socials: {
          value: 'socials',
          name: 'Socials'
        },
        translate: {
          value: 'translate',
          name: 'Translate'
        },
        captions: {
          value: 'captions',
          name: 'Image Labeling'
        }
      },
      sort_options: {
        tasks_desc: {
          value: 'num_tasks',
          name: 'Number of Tasks (descending)',
          order: 'desc'
        },
        tasks_asc: {
          value: 'num_tasks',
          name: 'Number of Tasks (ascending)',
          order: 'asc'
        },
        reward: {
          value: 'reward.quantity',
          name: 'EFX Reward',
          order: 'desc'
        },
        title_asc: {
          value: 'info.title',
          name: 'Title (ascending)',
          order: 'asc'
        },
        title_desc: {
          value: 'info.title',
          name: 'Title (descending)',
          order: 'desc'
        },
        id_asc: {
          value: 'id',
          name: 'ID (ascending)',
          order: 'asc'
        },
        id_desc: {
          value: 'id',
          name: 'ID (descending)',
          order: 'desc'
        }
      },
      statuses: {
        active: {
          value: 'active',
          name: 'Active'
        },
        ended: {
          value: 'ended',
          name: 'Ended'
        },
        notstarted: {
          value: 'notstarted',
          name: 'Not Started'
        }
      }
    }
  },
  methods: {
    onStatusFilter (status) {
      this.$emit('status', status)
    },
    onCategoryFilter (category) {
      this.$emit('category', category)
    },
    onSort (type) {
      this.$emit('sorted', type)
    },
    onSearch (event) {
      this.$emit('search', event.target.value)
    }
  }
}
</script>
<style lang="scss" scoped>
.select {
  width: 100%;
  select {
    width: 100%
  }
}
</style>
