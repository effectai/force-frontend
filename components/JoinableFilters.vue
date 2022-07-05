<template>
  <div>
    <!-- Filter category -->
    <div class="column">
      <span>Joinable/Unjoinable</span><br>
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
      effect_dapps: ['qualifier', 'annotations', 'socials'],
      userCampaignQualified: [],
      userQualis: [],
      joinableCampaigns: [],
      unjoinableCampaigns: []
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
