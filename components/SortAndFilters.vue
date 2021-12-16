<template>
  <div class="columns is-align-items-center is-justify-content-space-between">
    <!-- Filters -->
    <div>
      <input class="input" type="text" @keydown="onSearch()" v-model="search" placeholder="Search campaign...">
      <div class="select is-normal">
        <select v-model="selectSort" @change="onSort(selectSort)">
          <option v-for="(sort) in sort_options" :key="sort.name" :value="sort" class="column">
            {{ sort.name }}
          </option>
        </select>
      </div>
    </div>

    <!-- Sort -->
    <div>
      <span>Sort</span><br>
      <div class="select is-normal">
        <select v-model="selectSort" @change="onSort(selectSort)">
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
      }
    }
  },
  methods: {
    onSort (type) {
      this.$emit('sorted', type)
    },
    onSearch () {
      this.$emit('search', this.search)
    }
  }
}
</script>
