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
  created () {
    this.getInfo()
  },
  methods: {
    async onFilter (e) {
      await this.getQualifications()
      if (e.target.value === 'joinable') {
        this.$emit('joinableFilter', this.joinableCampaigns)
      } else {
        this.$emit('joinableFilter', this.unjoinableCampaigns)
      }
    },
    getInfo () {
      if (!this.allQualificationsLoaded) {
        this.$store.dispatch('qualification/getQualifications')
      }
    },
    checkUserQualify (campaign) {
      if (campaign.qualis.length > 0) {
        for (const quali of campaign.qualis) {
          if ((quali.value === 0 && !this.userQualis.find(uq => uq.id === quali.key)) || (quali.value === 1 && this.userQualis.find(uq => uq.id === quali.key))) {
            // user doesnt have qualification that is required or user has qualification that is not allowed
            return false
          }
        }
      } else {
        return true
      }
      return true
    },
    async getQualifications () {
      this.userQualis = await this.$blockchain.getAssignedQualifications(this.$auth.user.vAccountRows[0].id)
      for (const c of this.campaigns) {
        const joinable = this.checkUserQualify(c)
        if (joinable) {
          this.joinableCampaigns.push(c)
        } else {
          this.unjoinableCampaigns.push(c)
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
