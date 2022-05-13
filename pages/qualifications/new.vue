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
              <span class="has-text-info">*</span>
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
              <span class="has-text-info">*</span>
            </label>
            <div class="control">
              <input v-model="qualificationIpfs.image" type="text" class="input" placeholder="Image Url" required>
            </div>
          </div>

          <div class="field">
            <label class="label">
              Qualification Type
              <span class="has-text-info">*</span>
            </label>
            <div class="select is-medium">
              <select v-model="qualificationIpfs.type" class="select" required>
                <option :value="selectNull" selected="selectType">
                  {{ selectType }}
                </option>
                <option value="0">
                  Required
                </option>
                <option value="1">
                  Exclude
                </option>
              </select>
            </div>
          </div>

          <div class="field is-grouped is-grouped-right">
            <div class="control">
              <nuxt-link class="button is-light" to="/">
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
    </div>
  </section>
</template>

<script>
import VueSimplemde from 'vue-simplemde'

export default {
  components: {
    VueSimplemde
  },

  beforeRouteLeave (to, from, next) {
    if (this.checkClose()) {
      next()
    }
  },

  middleware: ['auth'],
  data () {
    return {
      success: false,
      loading: false,
      preview: false,
      successTitle: null,
      successMessage: null,
      errors: [],
      cachedFormData: null,
      qualification: null,
      qualificationIpfs: {
        name: null,
        description: null,
        image: null,
        type: null
      },
      selectType: 'Choose Type',
      selectNull: null
    }
  },

  computed: {
    hasChanged () {
      return this.cachedFormData !== this.formDataForComparison()
    }
  },

  created () {

  },

  destroyed () {

  },

  beforeDestroy () {

  },

  methods: {
    async createQualification () {
      // TODO redirect to created qualification when succesfull
      // let createdQualification
      try {
        if (this.checkForm()) {
          this.loading = true
          const quali = { ...this.qualificationIpfs }
          const result = await this.$blockchain.createQualification(quali.name, quali.description, quali.type, quali.image)
          this.successTitle = 'Qualification created Succesfully.'
          this.successMessage = 'Waiting for transaction to complete before continuing'

          await this.$blockchain.waitForTransaction(result)
          this.$store.dispatch('transaction/addTransaction', result)

          Object.keys(this.qualificationIpfs).forEach((key) => { this.qualificationIpfs[key] = null })
          this.loading = false
          this.submitted = true
          this.$router.push('/profile')
        }
      } catch (error) {
        console.error(error)
        this.loading = false
        this.errors.push(error)
      }
    },

    checkForm () {
      this.error = []
      const keys = Object.keys(this.qualificationIpfs)
      if (keys.every((val, indx) => val !== null)) {
        return true
      } else {
        // TODO make sure that qualification type = "" is checked
        this.error = keys.map((val, indx) => `${val} is required.`)
        return false
      }
    },

    cacheFormData () {
      const qualification = window.localStorage.getItem('cached_qualification')
      const qualificationIpfs = window.localStorage.getItem('cached_qaulificationIpfs')

      if (qualification) {
        this.qualification = JSON.parse(qualification)
      }

      if (qualificationIpfs) {
        this.qualificationIpfs = JSON.parse(qualificationIpfs)
      }

      window.addEventListener('beforeunload', this.checkClose)
    },

    formDataForComparison () {
      return JSON.stringify({ qualification: this.qualification, qualificationIpfs: this.qualificationIpfs })
    },

    checkClose (event) {
      if (this.hasChanged && !this.loading && !this.submitted) {
        const warningMessage = 'You have unsaved changes. Are you sure you wish to leave?'
        if (!confirm(warningMessage)) {
          event.preventDefault()
          event.returnValue = warningMessage
          return false
        } else {
          return true
        }
      } else {
        return false
      }
    }

  }

}
</script>

<style lang="scss" scoped>

</style>
