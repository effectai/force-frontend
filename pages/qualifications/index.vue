<template>
  <section class="section">
    <div class="container">
      <h1 class="title mt-5">
        Qualifications
      </h1>
      <qualification-list class="mb-5" :qualifications="allQualifications" />
    </div>
  </section>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import QualificationList from '~/components/QualificationList.vue'

export default {
  components: { QualificationList },
  data () {
    return {
      loading: null
    }
  },
  created () {
  },
  computed: {
    ...mapGetters({
    }),
    ...mapState({
      qualifications: state => state.qualification.qualifications
    }),
    allQualifications () {
      if (!this.qualifications) { return }
      return this.qualifications
    }
  },
  methods: {
    async getQualifications () {
      if (!this.allQualificationsLoaded) {
        await this.$store.dispatch('qualification/getQualifications')
      }
    }
  }
}
</script>

<style>

</style>
