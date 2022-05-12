<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Qualification: {{ id }}</h1>
      <!-- TODO Render this properly -->
      <p>
        {{ singleQualification }}
      </p>
      <nuxt-link class="button" :to="`/qualifications/${id}/edit`">Edit</nuxt-link>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  middleware: ['auth'],
  data () {
    return {
      loading: false,
      id: parseInt(this.$route.params.id)
    }
  },
  created () {
    this.$store.dispatch('qualification/getQualifications')
  },
  computed: {
    ...mapState({
      qualifications: state => state.qualification.qualifications
    }),
    singleQualification () {
      if (!this.qualifications) { return }
      return this.qualifications.find(el => el.id === this.id)
    }
  },
  methods: {

  }

}
</script>

<style>

</style>
