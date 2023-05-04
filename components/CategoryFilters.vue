<template>
  <div class="column is-flex pl-0 is-align-items-center">
    <div class="select is-normal">
      <select :value="filter" @change="onFilter">
        <option value="" selected>
          All Categories
        </option>
        <option v-for="dapp in effect_dapps" :key="dapp" :value="dapp" class="column">
          {{ dapp }}<span v-if="dapp === 'qualifier'">s</span>
        </option>
      </select>
    </div>
    <!-- <div>
      <div v-if="filter" class="tags has-addons ml-5">
        <span
          class="tag is-capitalized"
          :class="['is-'+filter]"
        >{{ filter }}</span>
        <a class="tag is-delete" @click="$emit('categoryFilter')" />
      </div>
    </div> -->
  </div>
</template>
<script>
export default {
  name: 'CategoryFilters',
  components: {
  },
  props: ['filter'],
  data () {
    return {
      effect_dapps: ['annotations', 'socials', 'Query Trainer']
    }
  },
  methods: {
    onFilter (e) {
      this.$emit('categoryFilter', e.target.value)
    }
  }
}
</script>
<style lang="scss" scoped>
select {
  width: 200px;
  text-transform: capitalize !important;
}
</style>
