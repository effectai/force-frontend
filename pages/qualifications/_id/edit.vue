<template>
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
      <form @submit.prevent="editQualification">
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
            <label for="" class="label">
              Qualifier Task
            </label>
            <multiselect
              v-model="qualificationIpfs.qualifier"
              :options="userCampaigns"
              label="label"
              placeholder="Select the qualifier associated with this qualification"
              :searchable="true"
              :close-on-select="true"
              :show-labels="true"
            >
              <template slot="singleLabel" slot-scope="{ }">
                {{ qualificationIpfs.qualifier.label }}
              </template>
            </multiselect>
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

          <!-- TODO: Use ipfs upload for images. -->
          <!-- <div class="field"> -->
            <!-- <label for="" class="label">Ipfs Image</label> -->
            <!-- <div class="control"> -->
              <!-- <upload-to-ipfs v-model="qualificationIpfs.image" /> -->
            <!-- </div> -->
          <!-- </div> -->

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
              Hidden / BlockList
            </label>
            <label class="checkbox">
              <input v-model="qualificationIpfs.ishidden" type="checkbox" class="checkbox">
              Check if this qualifications needs to be hidden from the user and or is a blocklist qualification.
            </label>
          </div>

          <div class="field is-grouped is-grouped-right">
            <div class="control">
              <nuxt-link class="button is-light" :to="/qualifications/ + id">
                Cancel
              </nuxt-link>
            </div>
            <!-- TODO add disabled property when all input fields have not been filled in yet. -->
            <div class="control">
              <button class="button is-primary is-wide" type="submit" :disabled="!hasChanged" :class="{ 'is-loading' : loading }">
                Save Qualification
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
import Multiselect from 'vue-multiselect'
import VueSimplemde from 'vue-simplemde'
import { mapState, mapGetters, mapActions } from 'vuex'
import SuccessModal from '~/components/SuccessModal.vue'
// import UploadToIpfs from '~/components/UploadToIpfs.vue'

export default {
  components: {
    VueSimplemde,
    SuccessModal,
    Multiselect
    // UploadToIpfs,
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
      errors: [],
      qualificationIpfs: {
        name: null,
        description: null,
        image: null,
        type: null,
        qualifier: null
      }
    }
  },
  computed: {
    ...mapState({
      allQualificationsLoaded: state => state.qualification.allQualificationsLoaded,
      qualifications: state => state.qualification.qualifications,
      allCampaignsLoaded: state => state.campaign.allCampaignsLoaded,
      campaigns: state => state.campaign.campaigns,
      advanced: state => state.view.advanced
    }),
    ...mapGetters({
      qualificationById: 'qualification/qualificationById'
    }),
    allQualifications () {
      if (!this.qualifications) { return }
      return this.qualifications
    },
    hasChanged () {
      return this.qualification && !_.isEqual(this.qualification.info, this.qualificationIpfs)
    },
    userCampaigns () {
      if (!this.campaigns) {
        return []
      } else {
        return (this.advanced ? this.campaigns : this.campaigns.filter(c => c.owner[1] === this.$auth.user.accountName))
          .map(c => ({ ...c }))
          .map(c => ({ id: c.id, label: `ID: ${c.id} - ${c.info?.title}` }))
      }
    }
  },

  created () {
    this.getQualification()
    this.getCampaigns()
  },

  beforeDestroy () {
    window.removeEventListener('beforeunload', this.checkClose)
  },

  methods: {
    ...mapActions({
      getCampaigns: 'campaign/getCampaigns'
    }),
    async getQualification () {
      this.qualificationLoading = true
      try {
        this.qualification = await this.$blockchain.getQualification(this.id)
        this.qualificationIpfs = { ...this.qualification.info }
      } catch (error) {
        console.error(error)
        this.$blockchain.handleError(error)
      }
      this.qualificationLoading = false
    },
    async editQualification () {
      this.loading = true
      try {
        // console.log(this.qualificationIpfs)
        const { name, description, image, ishidden, qualifier } = this.qualificationIpfs
        const result = await this.$blockchain.editQualification(this.id, name, description, 0, image, ishidden, qualifier)

        // Wait for transaction and reload campaigns
        await this.$blockchain.waitForTransaction(result)

        this.successTitle = 'Qualification submitted successfully!'
        this.successMessage = 'Waiting for transaction to complete before continuing'
        this.getQualification(this.id)

        this.$store.dispatch('transaction/addTransaction', result)
        this.success = true
        this.loading = false
        this.submitted = true
        this.$router.push('/qualifications/' + this.id)
      } catch (error) {
        this.loading = false
        console.error(error)
        this.errors.push(error)
        this.$blockchain.handleError(error)
      }
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
