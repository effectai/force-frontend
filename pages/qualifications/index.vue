<template>
  <section class="section">
    <div class="container">
      <h1 class="title mt-5">
        Qualifications
      </h1>
      <qualification-list :qualifications="allQualifications"></qualification-list>
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
      // What should be here? if anything the
    }),
    ...mapState({
      // TODO are there any other info that I need to pull into this page?
      qualifications: state => state.qualification.qualifications
    })
  },
  methods: {
    allQualifications () {
      if (!this.qualifications) { return }
      return this.qualifications
    }
  }
}
</script>

<style>

</style>
