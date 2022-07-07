<template>
  <div>
    <!-- Filter category -->
    <div class="column">
      <span>Joinable/Unjoinable</span><br>
      <div class="switch-button mt-1 ml-3" :class="{'unmoderated': unmoderated}">
        <input v-model="unmoderated" class="switch-button-checkbox" type="checkbox">
        <label class="switch-button-label" for=""><span class="switch-button-label-span">Joinable</span></label>
      </div>
      <div class="select is-normal">
        <select @change="onFilter">
          <option value="" selected>
            -
          </option>
          <option key="joinable" value="joinable" class="column">
            Joinable
          </option>
          <option key="unjoinable" value="unjoinable" class="column">
            Unjoinable
          </option>
        </select>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'JoinableFilters',
  components: {
  },
  props: ['filter', 'campaigns'],
  data () {
    return {
      unmoderated: false
    }
  },
  methods: {
    onFilter (e) {
      this.$emit('joinableFilter', e.target.value)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
