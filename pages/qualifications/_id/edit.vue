<template>
<!-- TODO FIX this to actually edit quali's -->
 <section class="section">
   <div class="container">
    <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
        <li>
          <nuxt-link to="/manage">
            All Qualifications
          </nuxt-link>
        </li>
        <li>
          <nuxt-link :to="`/qualifications/${id}`" aria-current="page">
          Qualification {{ id }}
          </nuxt-link>
        </li>
      </ul>
    </nav>
    <div v-if="qualificationLoading" class="loading-text">
      Qualification Loading
    </div>
    <div v-else-if="!qualification">
      Could not retrieve qualification
    </div>
    <h1 class="title mt-5">
      Edit Qualification
    </h1>
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
            <span class="has-text-info"></span>
          </label>
          <div class="control">
            <vue-simplemde
            v-model="qualificationIpfs.description"
            :configs="{promptUrls: true, status: false, spellChecker: false, placeholder: 'Public description for your qualification'}" />
            <!-- <textarea class="textarea" rows="5" placeholder="Qualification Description"></textarea> -->
          </div>
        </div>

        <div class="field">
          <label class="label">
            Image
            <span class="has-text-info"></span>
          </label>
          <div class="control">
            <input v-model="qualificationIpfs.image" type="text" class="input" placeholder="Image Url">
          </div>
        </div>

        <div class="field is-grouped is-grouped-right">
          <div class="control">
            <nuxt-link class="button is-light" to="/">Cancel</nuxt-link>
          </div>
          <!-- TODO add disabled property when all input fields have not been filled in yet. -->
          <div class="control">
            <button class="button is-primary is-wide" type="submit" :class="{ 'is-loading' : loading }" >
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
import _ from 'lodash'
import VueSimplemde from 'vue-simplemde'
import { mapState } from 'vuex'
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
      qualificationLoading: false,
      qualification: null,
      successMessage: null,
      successTitle: null,
      error: null,
      id: parseInt(this.$route.params.id),
      selectNull: null,
      selectType: 'Choose Type',
      qualificationIpfs: {
        name: null,
        description: null,
        image: null,
        type: null
      }
    }
  },
  computed: {
    ...mapState({
      allQualificationsLoaded: state => state.qualification.allQualificationsLoaded,
      qualifications: state => state.qualification.qualifications
    }),
    allQualifications () {
      if (!this.qualifications) { return }
      return this.qualifications
    },
    hasChanged () {
      return this.qualification && !_.isEqual(this.qualification, this.qualificationIpfs)
    }
  },
  created () {
    this.getQualifications()
    // this.qualification = this.qualifications[this.id]
    console.log(this.qualification)
  },

  beforeDestroy () {
    window.removeEventListener('beforeunload', this.checkClose)
  },

  methods: {
    async getQualifications () {
      if (!this.allQualificationsLoaded) {
        await this.$store.dispatch('qualification/getQualifications')
      }
    },
    async editQualification () {
      // this.loading = true
      // try {
      //   // const hash = await this.$blockchain.uploadCampaign(this.campaignIpfs)
      //   // const result = await this.$blockchain.editCampaign(this.id, hash, this.campaignIpfs.reward, qualis)

      //   // Wait for transaction and reload campaigns
      //   this.successTitle = 'Campaign submitted successfully!'
      //   this.successMessage = 'Waiting for transaction to complete before continuing'
      //   await this.$blockchain.waitForTransaction(result)
      //   await this.$store.dispatch('campaign/getCampaign', this.id)

      //   this.$store.dispatch('transaction/addTransaction', result)
      //   this.success = true
      //   this.loading = false
      //   this.submitted = true
      //   this.$router.push('/campaigns/' + this.id)
      // } catch (error) {
      //   this.loading = false
      //   this.errors.push(error)
      // }
    },
    checkForm () {
      this.error = []
      if (this.qualificationIpfs.name != null) {
        return true
      } else {
        // TODO make sure that qualification type = "" is checked
        this.error.push('Name is required.')
        return false
      }
    },
    checkClose (event) {
      if (this.hasChanged && !this.loading && !this.success) {
        const warningMessage = 'You have unsaved changes. Are you sure you wish to leave?'
        if (!confirm(warningMessage)) {
          event.preventDefault()
          event.returnValue = warningMessage
          return false
        }
        return true
      }
      return true
    }
  }

}
</script>

<style>

</style>
