<template>
  <section class="section is-max-widescreen">
    <div class="container">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li>
            <nuxt-link to="/">
              Campaigns
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="`/campaigns/${campaignId}`">
              Campaign {{ campaignId }}
            </nuxt-link>
          </li>
          <li class="is-active">
            <nuxt-link v-if="batch" :to="`/campaigns/${campaignId}/${batchId}`" aria-current="page">
              Batch {{ batch.id }}
            </nuxt-link>
          </li>
        </ul>
      </nav>
      <div v-if="loading" class="loader-wrapper is-active">
        <div class="loader is-loading" />
        <br>Waiting for the transaction to complete...
      </div>
      <div v-if="campaignLoading || batchLoading">
        Campaign loading..
      </div>
      <div v-else-if="!campaign || !batch">
        Could not retrieve campaign
      </div>
      <div class="columns">
        <div class="column is-two-thirds">
          <div class="title">
            <span v-if="batch">#{{ campaignId }}.{{ batch.id }}: </span>
            <span v-if="campaign && campaign.info">{{ campaign.info.title }}</span>
            <span v-else-if="!campaign || campaign.info !== null">Loading..</span>
            <span v-else class="has-text-danger-dark">Could not load campaign info</span>
          </div>
          <div class="tabs">
            <ul>
              <li :class="{'is-active': body === 'description'}">
                <a @click.prevent="body = 'description'">Description</a>
              </li>
              <li :class="{'is-active': body === 'instruction'}">
                <a @click.prevent="body = 'instruction'">Instructions</a>
              </li>
              <li v-if="campaign && campaign.owner[1] === $auth.user.accountName" :class="{'is-active': body === 'reservations'}">
                <a @click.prevent="body = 'reservations'">Active Reservations</a>
              </li>
              <li v-if="campaign && campaign.owner[1] === $auth.user.accountName" :class="{'is-active': body === 'results'}">
                <a @click.prevent="body = 'results'">Task Results</a>
              </li>
            </ul>
          </div>
          <div v-if="body === 'description'" class="block">
            <p v-if="campaign && campaign.info">
              {{ campaign.info.description }}
            </p>
            <p v-else>
              ...
            </p>
            <h2 class="subtitle mt-5">
              Task Preview
            </h2>
            <template-media
              v-if="campaign && campaign.info"
              :html="renderTemplate(
                campaign.info.template || 'No template found..',
                campaign.info.example_task || {})"
              @submit="submitTask"
            />
          </div>
          <div v-if="body === 'instruction'" class="block">
            <div v-if="campaign && campaign.info" class="content" v-html="$md.render(campaign.info.instructions)" />
            <p v-else>
              ...
            </p>
          </div>

          <!-- Current Task Reservations  -->
          <div v-if="body === 'reservations'" class="block">
            <div v-if="campaign && campaign.info" class="content">
              <div v-if="reservations.length">
                <table class="table" style="width: 100%">
                  <thead>
                    <tr>
                      <th>Reservation ID</th>
                      <th>Account ID</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="sub in displayedReservations"
                      :key="sub.id"
                    >
                      <td>{{ sub.id }}</td>
                      <td>
                        <p v-if="sub.account_id">
                          {{ sub.account_id }}
                        </p>
                        <p v-else />
                      </td>
                      <td>
                        <button v-if="sub.account_id !== null" class="button is-primary" @click.prevent="releaseTask(sub.id)">Release Task</button>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <nav class="pagination" role="navigation" aria-label="pagination">
                  <a v-if="pageR != 1" class="pagination-previous" @click="pageR--">Previous</a>
                  <a v-if="pageR < pagesR.length" class="pagination-next" @click="pageR++">Next page</a>
                  <ul class="pagination-list">
                    <li v-for="pageNumber in pagesR" :key="pageNumber">
                      <a class="pagination-link" :class="{'is-current': pageR === pageNumber}" @click="pageR = pageNumber">{{ pageNumber }}</a>
                    </li>
                  </ul>
                </nav>
              </div>
              <span v-else>No active reservations</span>
            </div>
          </div>

          <!-- Task results -->
          <div v-if="body === 'results'" class="block">
            <div v-if="campaign && campaign.info" class="content">
              <div v-if="submissions.length">
                <table class="table" style="width: 100%">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Account ID</th>
                      <th>Data</th>
                      <th>Paid</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="sub in displayedSubmissions"
                      :key="sub.id"
                    >
                      <td>{{ sub.id }}</td>
                      <td>{{ sub.account_id }}</td>
                      <td>{{ sub.data }}</td>
                      <td>{{ sub.paid ? "yes" : "no" }}</td>
                      <td>
                        <button class="button" @click.prevent="viewTask(sub)">
                          View
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <nav class="pagination" role="navigation" aria-label="pagination">
                  <a v-if="page != 1" class="pagination-previous" @click="page--">Previous</a>
                  <a v-if="page < pages.length" class="pagination-next" @click="page++">Next page</a>
                  <ul class="pagination-list">
                    <li v-for="pageNumber in pages" :key="pageNumber">
                      <a class="pagination-link" :class="{'is-current': page === pageNumber}" @click="page = pageNumber">{{ pageNumber }}</a>
                    </li>
                  </ul>
                </nav>

                <button class="button is-primary" @click.prevent="downloadTaskResults()">
                  Download Results
                </button>
              </div>
              <span v-else>No submissions found</span>
              <div class="modal" :class="{'is-active': viewTaskResult}">
                <div class="modal-background" @click="viewTaskResult = false" />
                <div class="modal-content" style="background-color: #fff; padding: 10px;">
                  <template-media
                    v-if="campaign && campaign.info && viewTaskResult"
                    :html="renderTemplate(
                      campaign.info.template || 'No template found..',
                      viewTaskResult.placeholders)"
                    @templateLoaded="postResults(viewTaskResult.results)"
                  />
                </div>
                <button class="modal-close is-large" aria-label="close" @click="viewTaskResult = false" />
              </div>
            </div>
          </div>
        </div>
        <div class="column is-one-third">
          <div class="box">
            <h4 class="box-title is-size-4">
              <b>Information</b>
            </h4>
            <div class="block">
              <b>Requester</b>
              <br>
              <div class="blockchain-address">
                <nuxt-link v-if="campaign" :to="'/profile/' + campaign.owner[1]">
                  {{ campaign.owner[1] }}
                </nuxt-link>
                <span v-else>.....</span>
              </div>
            </div>
            <div class="block">
              <b>Reward</b>
              <br>
              <span v-if="campaign">{{ campaign.reward.quantity }}</span>
              <span v-else>.....</span>
            </div>
            <div class="block">
              <b>Tasks</b>
              <br>
              <template v-if="batch && batch.num_tasks - batch.tasks_done === 0 && !batch.reservations.length">
                <span>{{ batch.num_tasks }} Tasks done.</span>
              </template>
              <template v-if="batch && batch.num_tasks - batch.tasks_done > 0 && releasedReservations || (batch && batch.reservations.length) && releasedReservations">
                <span>{{ batch.num_tasks - (batch.tasks_done - releasedReservations.length) }}</span>
                <span>/ {{ batch.num_tasks }} left</span>
              </template>
              <template v-else-if="(batch && batch.num_tasks - batch.tasks_done > 0) || (batch && batch.reservations.length)">
                <span>{{ batch.num_tasks - batch.tasks_done }}</span>
                <span>/ {{ batch.num_tasks }} left</span>
              </template>
              <span v-else>...</span>
              <progress class="progress" :class="{'is-success': batch ? batch.tasks_done === batch.num_tasks && !batch.reservations.length : false, 'is-secondary': batch ? batch.tasks_done < batch.num_tasks || batch.reservations.length: false}" :value="batch && releasedReservations ? ( batch.tasks_done - releasedReservations.length): undefined" :max="batch ? batch.num_tasks : undefined">
                Left
              </progress>
            </div>
            <div class="block">
              <b>Category</b>
              <br>
              <span v-if="campaign && campaign.info" class="tag is-info is-light is-medium">{{ campaign.info.category }}</span>
              <span v-else class="tag is-info is-light is-medium">...</span>
            </div>
            <div class="block">
              <b>IPFS</b>
              <br>
              <div v-if="batch" class="blockchain-address">
                <a target="_blank" :href="`${ipfsExplorer}/ipfs/${batch.content.field_1}`">{{ batch.content.field_1 }}</a>
              </div>
              <span v-else>.....</span>
            </div>

            <div class="block">
              <b>Blockchain</b>
              <br>
              <a target="_blank" :href="`${$blockchain.eos.explorer}/account/${$blockchain.sdk.force.config.force_contract}?loadContract=true&tab=Tables&table=batch&account=${$blockchain.sdk.force.config.force_contract}&scope=${$blockchain.sdk.force.config.force_contract}&limit=1&lower_bound=${batchId}&upper_bound=${batchId}`">View Batch on Explorer</a>
            </div>
            <div class="block">
              <button v-if="loading || userReservation === null || campaignLoading || batchLoading || !batch" class="button is-primary is-loading">
                Loading
              </button>
              <button v-else-if="!userJoined" class="button is-primary" :class="{'is-loading': loading === true}" @click.prevent="joinCampaignPopup = true">
                Join Campaign
              </button>
              <button v-else-if="userReservation" class="button is-accent has-text-weight-semibold" @click.prevent="reserveTask = true">
                Resume Task
              </button>
              <button v-else-if="batch.num_tasks - batch.tasks_done !== 0 && !userReservation || releasedReservations" class="button is-primary" @click.prevent="reserveTask = true">
                Make Task Reservation
              </button>
              <template v-else>
                <button v-if="userJoined" class="button is-primary" :disabled="true">
                  Joined Campaign
                </button>
                <p>No active tasks currently</p>
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- SuccessModal -->
      <success-modal v-if="batch && batch.num_tasks - batch.tasks_done === 0 && batchCompleted && successMessage" :message="successMessage" :title="successTitle" />

      <!-- Reserve task -->
      <reserve-task v-if="reserveTask" :batch="batch" />

      <!-- Instructions modal -->
      <instructions-modal v-if="campaign && campaign.info" :campaign="campaign" :info="campaign.info" :show="joinCampaignPopup" @clicked="campaignModalChange" />
    </div>
  </section>
</template>
<script>
import { mapState } from 'vuex'
import { Template } from '@effectai/effect-js'
import TemplateMedia from '@/components/Template'
import ReserveTask from '@/components/ReserveTask'
import InstructionsModal from '@/components/InstructionsModal'
import SuccessModal from '@/components/SuccessModal'
const jsonexport = require('jsonexport/dist')

export default {
  components: {
    TemplateMedia,
    ReserveTask,
    InstructionsModal,
    SuccessModal
  },
  middleware: ['auth'],
  data () {
    return {
      ipfsExplorer: process.env.NUXT_ENV_IPFS_EXPLORER,
      campaignId: parseInt(this.$route.params.id),
      batchId: parseInt(this.$route.params.batch),
      batchCompleted: parseInt(this.$route.query.batchCompleted),
      campaign: undefined,
      batch: undefined,
      body: 'description',
      accountId: this.$auth.user.vAccountRows[0].id,
      userJoined: null,
      loading: false,
      joinCampaignPopup: false,
      reserveTask: false,
      submissions: null,
      page: 1,
      pageR: 1,
      perPage: 10,
      pages: [],
      pagesR: [],
      viewTaskResult: false,
      successMessage: null,
      successTitle: null,
      reservations: null,
      userReservation: null,
      releasedReservations: null
    }
  },
  computed: {
    ...mapState({
      batches: state => state.campaign.batches,
      campaigns: state => state.campaign.campaigns,
      campaignLoading: state => state.campaign.loading,
      batchLoading: state => state.campaign.loadingBatch
    }),
    displayedSubmissions () {
      return this.paginate(this.submissions)
    },
    displayedReservations () {
      return this.paginate(this.reservations.filter(x => x.account_id))
    }
  },
  watch: {
    submissions () {
      this.setPages()
    },
    reservations () {
      this.setPagesR()
    }
  },
  mounted () {
    if (this.batchCompleted) {
      this.successTitle = 'Batch is completed'
      this.successMessage = 'All the tasks in this batch are done'
    }
  },
  created () {
    this.checkUserCampaign()
    this.getBatch()
    this.getCampaign()
    this.setPages()
  },
  methods: {
    campaignModalChange (val) {
      this.joinCampaignPopup = val
    },
    async joinCampaign () {
      try {
        // function that makes the user join this campaign.
        const data = await this.$blockchain.joinCampaign(this.campaignId)
        this.$store.dispatch('transaction/addTransaction', data)
        if (data) {
          this.loading = true
          this.joinCampaignPopup = false
          await this.$blockchain.waitForTransaction(data)
          await this.checkUserCampaign()
          if (this.userJoined) {
            this.reserveTask = true
          }
        }
        this.joinCampaignPopup = false
      } catch (e) {
        this.$blockchain.handleError(e)
      }
    },
    async releaseTask (id) {
      const data = await this.$blockchain.releaseTask(id)
      await this.$blockchain.waitForTransaction(data)
      this.$store.dispatch('transaction/addTransaction', data)
      const allReservations = await this.$blockchain.getTaskReservationsForBatch(this.batchId)
      this.reservations = allReservations.filter(function (sub) {
        return sub.account_id
      })
    },
    async checkUserCampaign () {
      this.loading = true
      try {
        // checks if the user joined this campaign.
        const data = await this.$blockchain.getCampaignJoins(this.campaignId)
        this.userJoined = (data.rows.length > 0)
      } catch (e) {
        this.$blockchain.handleError(e)
      }
      this.loading = false
    },
    postResults (results) {
      const frame = document.getElementById('mediaFrame')
      if (frame) {
        frame.contentWindow.postMessage(
          { task: 'results', value: results },
          '*'
        )
      }
    },
    async viewTask (sub) {
      const taskIndex = await this.$blockchain.getTaskIndexFromLeaf(this.batch.campaign_id, this.batch.id, sub.leaf_hash, this.batch.tasks)
      this.viewTaskResult =
      {
        placeholders: this.batch.tasks[taskIndex],
        results: JSON.parse(sub.data)
      }
    },
    submitTask (values) {
      console.log('Task submitted!', values)
    },
    renderTemplate (template, placeholders = {}, options = {}) {
      return new Template(template, placeholders, options).render()
    },
    async getBatch () {
      await this.$store.dispatch('campaign/getBatch', { batchId: this.batchId })
      this.batch = this.batches.find(b => b.batch_id === this.batchId)
      const allSubmissions = await this.$blockchain.getSubmissionsAndReservationsForBatch(this.batchId)
      this.submissions = allSubmissions.filter(function (sub) {
        return sub.data
      })
      this.reservations = allSubmissions.filter(function (sub) {
        return !sub.data && sub.account_id
      })
      this.releasedReservations = this.reservations.filter(r => r.account_id === null)
      this.userReservation = this.reservations.find(r => r.account_id === this.$auth.user.vAccountRows[0].id)
    },
    async getCampaign () {
      await this.$store.dispatch('campaign/getCampaign', this.campaignId)
      this.campaign = this.campaigns.find(c => c.id === this.campaignId)
    },
    generateRandomNumber (maxNum) {
      return Math.ceil(Math.random() * maxNum)
    },
    async downloadTaskResults () {
      try {
        // add columns from data object to the submission object itself
        const parsedSubmissions = await Promise.all(this.submissions.map(async (x) => {
          const sub = {}
          sub.data = JSON.parse(x.data)

          // add answers as seperate columns
          for (const result of Object.keys(sub.data)) {
            x[result] = sub.data[result]
          }

          // add placeholders
          const taskIndex = await this.$blockchain.getTaskIndexFromLeaf(this.batch.campaign_id, this.batch.id, x.leaf_hash, this.batch.tasks)
          const task = this.batch.tasks[taskIndex]
          x.placeholders = JSON.stringify(task)

          for (const result of Object.keys(task)) {
            x[result] = task[result]
          }

          // remove unnecassary keys for csv
          delete x.content
          delete x.batch_id
          delete x.id
          delete x.leaf_hash

          // put these attributes first
          const columnOrder = {
            link_id: null,
            account_id: null
          }
          x = Object.assign(columnOrder, x)

          return x
        }))
        await jsonexport(parsedSubmissions, (err, csv) => {
          if (err) {
            return console.error(err)
          }
          const filename = `task_results_${this.batchId}.csv`
          const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
          if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename)
          } else {
            const link = document.createElement('a')
            if (link.download !== undefined) { // feature detection
              // Browsers that support HTML5 download attribute
              const url = URL.createObjectURL(blob)
              link.setAttribute('href', url)
              link.setAttribute('download', filename)
              link.style.visibility = 'hidden'
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
            }
          }
        })
      } catch (error) {
        console.error(error)
      }
    },
    setPages () {
      if (!this.submissions) { return }
      const numberOfPages = Math.ceil(this.submissions.length / this.perPage)
      for (let index = 1; index <= numberOfPages; index++) {
        if (this.pages.length < index) {
          this.pages.push(index)
        }
      }
    },
    setPagesR () {
      if (!this.reservations) { return }
      const numberOfPages = Math.ceil(this.reservations.length / this.perPage)
      for (let index = 1; index <= numberOfPages; index++) {
        if (this.pagesR.length < index) {
          this.pagesR.push(index)
        }
      }
    },
    paginate (submissions) {
      const from = (this.page * this.perPage) - this.perPage
      const to = (this.page * this.perPage)
      return submissions.slice(from, to)
    }
  }
}
</script>
<style lang="scss" scoped>
.box-title {
  text-align: center;
  border-bottom: 2px solid #cdd4e6;
  padding-bottom: 31px;
  margin: 10px 0 15px 0;
}
.progress::-webkit-progress-value {
  transition: width 0.5s ease;
}
</style>
