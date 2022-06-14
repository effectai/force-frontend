<template>
  <section class="section">
    <div class="container">
      <div v-if="loading" class="loader-wrapper is-active">
        <img src="~/assets/img/loading.svg">
        <br>
        <span class="laoding-text">Waiting for the transaction to complete. </span>
      </div>
      <h1 class="title">
        New Qualification
      </h1>
      <div v-if="errors.length">
        <div v-for="error in errors" :key="toString(error)" class="notification is-danger is-light">
          {{ error }}
        </div>
      </div>
      <form @submit.prevent="createQualification">
        <div class="block basic-info-group">
          <div class="field">
            <label class="label">
              Name
              <span class="has-text-info">*</span>
            </label>
            <div class="control">
              <input v-model="qualificationIpfs.name" type="text" class="input" placeholder="Public name for your qualification" required>
            </div>
          </div>

          <div class="field">
            <label class="label">
              Description
              <span class="has-text-info" />
            </label>
            <div class="control">
              <vue-simplemde
                v-model="qualificationIpfs.description"
                :configs="{promptUrls: true, status: false, spellChecker: false, placeholder: 'Public description for your qualification'}"
              />
              <!-- <textarea class="textarea" rows="5" placeholder="Qualification Description"></textarea> -->
            </div>
          </div>

          <div class="field">
            <label class="label">
              Image
              <span class="has-text-info" />
            </label>
            <div class="control">
              <input v-model="qualificationIpfs.image" type="text" class="input" placeholder="Image Url">
            </div>
          </div>

          <div class="field">
            <label for="" class="label">
              Hidden
            </label>
            <label class="checkbox">
              <input v-model="qualificationIpfs.ishidden" type="checkbox" class="checkbox">
              Check if this qualifications needs to be hidden from the user.
            </label>
          </div>

          <div class="field is-grouped is-grouped-right">
            <div class="control">
              <nuxt-link class="button is-light" to="/manage">
                Cancel
              </nuxt-link>
            </div>
            <!-- TODO add disabled property when all input fields have not been filled in yet. -->
            <div class="control">
              <button class="button is-primary is-wide" type="submit" :class="{ 'is-loading' : loading }">
                Create Qualification
              </button>
            </div>
          </div>
        </div>
      </form>
      <success-modal v-if="successMessage" :message="successMessage" :title="successTitle" />
    </div>
  </section>
</template>

<script>
import VueSimplemde from 'vue-simplemde'
import SuccessModal from '~/components/SuccessModal.vue'

export default {
  components: {
    VueSimplemde,
    SuccessModal
  },

  middleware: ['auth'],
  data () {
    return {
      loading: false,
      successTitle: null,
      successMessage: null,
      errors: [],
      qualificationIpfs: {
        name: null,
        description: null,
        image: null,
        ishidden: false
      }
    }
  },
  methods: {
    async createQualification () {
      // TODO redirect to created qualification when succesfull
      // let createdQualification
      console.log('trying create quali')
      try {
        if (this.validateForm()) {
          this.errors = []
          this.loading = true
          const quali = {
            ...this.qualificationIpfs
          }
          const result = await this.$blockchain.createQualification(quali.name, quali.description, quali.type, quali.image, quali.ishidden)
          this.successTitle = 'Qualification created Succesfully.'
          this.successMessage = 'Waiting for transaction to complete before continuing'

          await this.$blockchain.waitForTransaction(result)
          this.$store.dispatch('transaction/addTransaction', result)

          Object.keys(this.qualificationIpfs).forEach((key) => {
            this.qualificationIpfs[key] = null
          })
          this.loading = false
          this.$router.push('/manage')
        }
      } catch (error) {
        console.error(error)
        this.loading = false
        this.errors.push(error)
      }
    },

    validateForm () {
      this.error = []
      if (this.qualificationIpfs.name != null) {
        return true
      } else {
        // TODO make sure that qualification type = "" is checked
        this.error.push('Name for qualification is required.')
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
