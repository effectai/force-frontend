<template>
  <section class="section">
    <div class="container">
      <h1 class="title mt-5">
        All Qualifications
      </h1>
      <qualification-list class="mb-5" :qualifications="allQualifications" />
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import QualificationList from '~/components/QualificationList.vue'

export default {
  components: { QualificationList },
  middleware: ['auth'],
  data () {
    return {
      loading: null
    }
  },
  computed: {
    ...mapState({
      qualifications: state => state.qualification.qualifications
    }),
    allQualifications () {
      if (!this.qualifications) { return }
      return this.qualifications
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style>

</style>
