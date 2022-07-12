<template>
  <section class="section is-max-widescreen">
    <div class="container">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li>
            <nuxt-link to="/">
              Tasks
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="`/campaigns/${campaignId}`">
              Task {{ campaignId }}
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
        <img src="~assets/img/loading.svg">
        <br><span v-if="waitingOnTransaction" class="loading-text subtitle">Waiting for the transaction to complete</span>
        <span v-else class="loading-text subtitle">Please sign the transaction</span>
      </div>
      <div v-if="!campaign" class="loading-text">
        Task loading
      </div>
      <div class="columns">
        <div class="column is-three-fifths">
          <div class="is-flex is-align-items-center mb-6">
            <p v-if="campaign" class="image has-radius mr-4" style="width: 52px; height: 52px">
              <img v-if="campaign.info && campaign.info.image" :src="campaign.info.image.Hash ? ipfsExplorer + '/ipfs/'+ campaign.info.image.Hash : campaign.info.image">
              <img v-else-if="campaign.info && campaign.info.category && categories.includes(campaign.info.category)" :src="require(`~/assets/img/dapps/effect-${campaign.info.category}-icon.png`)">
              <img v-else :src="require(`~/assets/img/dapps/effect-force-icon.png`)" alt="campaign title">
            </p>
            <div class="title has-text-weight-bold">
              <span v-if="batch">#{{ campaignId }}.{{ batch.id }}: </span>
              <span v-if="campaign && campaign.info">{{ campaign.info.title }}</span>
              <span v-else-if="!campaign || campaign.info !== null" class="loading-text">Loading</span>
              <span v-else class="has-text-danger-dark">Could not load campaign info</span>
            </div>
          </div>
          <div class="tabs campaign-tabs">
            <ul>
              <li :class="{'is-active': body === 'description'}">
                <a @click.prevent="body = 'description'">Description</a>
              </li>
              <li :class="{'is-active': body === 'instruction'}">
                <a @click.prevent="body = 'instruction'">Instructions</a>
              </li>
              <li :class="{'is-active': body === 'preview'}">
                <a @click.prevent="body = 'preview'">Preview</a>
              </li>
              <li v-if="campaign && campaign.owner[1] === $auth.user.accountName" :class="{'is-active': body === 'tasks'}">
                <a @click.prevent="body = 'tasks'">Tasks</a>
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
          </div>
          <div v-if="body === 'instruction'" class="block">
            <div v-if="campaign && campaign.info" class="content" v-html="$md.render(campaign.info.instructions)" />
            <p v-else>
              ...
            </p>
          </div>
          <div v-if="body === 'preview'" class="block">
            <template-media
              v-if="campaign && campaign.info"
              :html="renderTemplate(
                campaign.info.template || 'No template found..',
                campaign.info.example_task || {})"
              @submit="submitTask"
            />
          </div>

          <!-- Tasks -->
          <div v-if="body === 'tasks'">
            <div class="block columns" style="overflow-x:auto">
              <div class="column is-one-third task-tab" @click.prevent="taskTab = 'allTasks'">
                <div v-if="batch && batch.tasks" class="box" :class="{'is-active': taskTab === 'allTasks'}">
                  Tasks
                  <br>
                  <span class="">
                    <span><b>{{ batch.tasks.length }}</b></span>
                  </span>
                </div>
              </div>
              <div class="column is-one-third task-tab" @click.prevent="taskTab = 'submissions'">
                <div v-if="batch" class="box" :class="{'is-active': taskTab === 'submissions'}">
                  Tasks Completed
                  <br>
                  <b v-if="submissions">{{ submissions.length }}</b>
                  <b v-else>0</b>
                </div>
              </div>
              <div class="column is-one-third task-tab" @click.prevent="taskTab = 'reservations'">
                <div class="box" :class="{'is-active': taskTab === 'reservations'}">
                  Active Reservations
                  <br>
                  <b v-if="reservations">{{ reservations.length }}</b>
                  <b v-else>0</b>
                </div>
              </div>
            </div>

            <!-- Task tabs -->
            <div v-if="taskTab === 'allTasks'" style="overflow-x:auto">
              <div v-if="batch && batch.tasks && batch.tasks.length > 0">
                <table class="table" style="width: 100%">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Placeholders</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="task in paginatedTasks"
                      :key="task.id"
                    >
                      <td>{{ task.id }}</td>
                      <td>
                        <div v-for="(name, nIndex) in Object.keys(task)" :key="nIndex">
                          <span v-if="name !== 'id' && name !== 'link_id'">
                            <span>{{ name }}: {{ task[name] }}</span>
                            <br>
                          </span>
                        </div>
                      </td>
                      <td>
                        <div @click.prevent="viewTaskPreview(task)">
                          <img src="@/assets/img/icons/eye.svg">
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <pagination
                  v-if="batch && batch.tasks"
                  :items="batch.tasks.length"
                  :page="pageT"
                  :per-page="perPage"
                  @setPage="setPageT"
                />
              </div>
              <span v-else>No tasks found</span>
            </div>

            <div v-if="taskTab === 'submissions'" style="overflow-x:auto">
              <div v-if="submissions && submissions.length > 0">
                <table class="table" style="width: 100%">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Account ID</th>
                      <th>Data</th>
                      <th>Paid</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="sub in paginatedSubmissions"
                      :key="sub.id"
                    >
                      <td>{{ sub.id }}</td>
                      <td>{{ sub.account_id }}</td>
                      <td>{{ sub.data }}</td>
                      <td>{{ sub.paid ? "yes" : "no" }}</td>
                      <td>
                        <div style="width: 30px" @click.prevent="viewTask(sub)">
                          <img src="@/assets/img/icons/eye.svg">
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <pagination
                  v-if="submissions"
                  :items="submissions.length"
                  :page="page"
                  :per-page="perPage"
                  @setPage="setPage"
                />

                <button class="button is-primary" @click.prevent="downloadTaskResults()">
                  Download Results
                </button>
              </div>
              <span v-else>No submissions found</span>
            </div>

            <div v-if="taskTab === 'reservations'" style="overflow-x:auto">
              <div v-if="reservations && reservations.length > 0">
                <table class="table" style="width: 100%">
                  <thead>
                    <tr>
                      <th>Reservation ID</th>
                      <th>Account ID</th>
                      <th>Submitted on</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="sub in paginatedReservations"
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
                        <p>{{ sub.submitted_on }}</p>
                      </td>
                      <td>
                        <button v-if="sub.account_id !== null" class="button is-primary" @click.prevent="releaseTask(sub.id)">
                          Release Task
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <pagination
                  v-if="reservations"
                  :items="reservations.length"
                  :page="pageR"
                  :per-page="perPage"
                  @setPage="setPageR"
                />
              </div>
              <span v-else>No active reservations</span>
            </div>

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

            <nuxt-link :to="`/campaigns/${campaignId}`" class="mt-6 button is-primary is-light">
              &lt; Back to campaign
            </nuxt-link>
          </div>
        </div>

        <div class="column is-two-fifths">
          <div class="information-block">
            <div class="information-header has-text-centered">
              <h4 class="p-5 is-size-4">
                <b>Information</b>
              </h4>
            </div>
            <div class="p-5">
              <div class="block">
                <b>Tasks</b>
                <br>
                <template v-if="batch && batch.num_tasks - batch.real_tasks_done === 0">
                  <span>{{ batch.num_tasks }} Tasks done.</span>
                </template>
                <template v-else-if="batch && batch.num_tasks - batch.real_tasks_done > 0 && releasedReservations || (batch && batch.reservations && batch.reservations.length) && releasedReservations">
                  <span>{{ batch.num_tasks - (batch.real_tasks_done - releasedReservations.length) }}</span>
                  <span>/ {{ batch.num_tasks }} left</span>
                </template>
                <template v-else-if="(batch && batch.num_tasks - batch.real_tasks_done > 0) || (batch && batch.reservations && batch.reservations.length)">
                  <span>{{ batch.num_tasks - batch.real_tasks_done }}</span>
                  <span>/ {{ batch.num_tasks }} left</span>
                </template>
                <span v-else>...</span>
                <progress
                  class="progress"
                  :class="getProgressBatch(batch)"
                  :value="batch && releasedReservations ? ( batch.real_tasks_done - releasedReservations.length): undefined"
                  :max="batch ? batch.num_tasks : undefined"
                >
                  Left
                </progress>
              </div>

              <div class="columns">
                <div class="column is-half">
                  <div class="block">
                    <br>
                    <nuxt-link
                      v-if="campaign && campaign.info"
                      :to="'/?category=' + campaign.info.category"
                      class="tag is-info is-light is-medium"
                      :class="['is-'+campaign.info.category]"
                    >
                      {{ campaign.info.category }}
                    </nuxt-link>
                    <span v-else class="tag is-info is-light is-medium">...</span>
                  </div>
                  <div class="block">
                    Status
                    <br>
                    <span v-if="batch"><b>{{ batch.status }}</b></span>
                    <span v-else>...</span>
                  </div>
                  <div class="block">
                    Reward
                    <br>
                    <span v-if="campaign"><b>{{ campaign.reward.quantity }}</b></span>
                    <span v-else>...</span>
                  </div>
                  <div class="block">
                    Repititions
                    <br>
                    <span v-if="batch"><b>{{ batch.repetitions }}</b></span>
                    <span v-else>...</span>
                  </div>
                </div>
                <div class="column is-half">
                  <div class="block">
                    Requester
                    <br>
                    <div class="blockchain-address">
                      <nuxt-link v-if="campaign" :to="'/profile/' + campaign.owner[1]">
                        {{ campaign.owner[1] }}
                      </nuxt-link>
                      <span v-else>.....</span>
                    </div>
                  </div>
                  <div class="block">
                    IPFS
                    <br>
                    <div v-if="batch" class="blockchain-address">
                      <a target="_blank" :href="`${ipfsExplorer}/ipfs/${batch.content.field_1}`">{{ batch.content.field_1 }}</a>
                    </div>
                    <span v-else>.....</span>
                  </div>
                  <div class="block">
                    Blockchain
                    <br>
                    <a target="_blank" :href="`${$blockchain.eos.explorer}/account/${$blockchain.sdk.force.config.forceContract}?loadContract=true&tab=Tables&table=batch&account=${$blockchain.sdk.force.config.forceContract}&scope=${$blockchain.sdk.force.config.forceContract}&limit=1&lower_bound=${batchId}&upper_bound=${batchId}`">View Batch on Explorer</a>
                  </div>
                </div>
              </div>

              <div class="block is-vcentered">
                <template v-if="campaign && $auth.user.accountName === campaign.owner[1]">
                  <button v-if="batch && batch.status !== 'Completed'" class="button is-primary is-fullwidth is-light" @click.prevent="handleBatch">
                    <span v-if="batch.status === 'Active'">Pause Batch</span>
                    <span v-else-if="batch.status === 'Paused'">Resume Batch</span>
                  </button>
                  <br>
                </template>
                <button v-if="loading || userReservation === null || campaignLoading || !batch" class="button is-fullwidth is-primary is-loading">
                  Loading
                </button>
                <button
                  v-else-if="userJoined === false"
                  class="button is-fullwidth is-primary"
                  :class="{'is-loading': loading === true}"
                  :disabled="!canUserQualify"
                  @click.prevent="joinCampaignPopup = true"
                >
                  Qualify
                </button>
                <button
                  v-else-if="userReservation && batch.status === 'Active'"
                  class="button is-fullwidth is-accent has-text-weight-semibold"
                  :disabled="!canUserQualify"
                  @click.prevent="reserveTask"
                >
                  Resume Task
                </button>
                <button
                  v-else-if="batch.status === 'Active' && batch.num_tasks - batch.real_tasks_done !== 0 && !userReservation || releasedReservations.length > 0"
                  class="button is-fullwidth is-primary"
                  :disabled="!canUserQualify"
                  @click.prevent="reserveTask"
                >
                  Make Task Reservation
                </button>
                <template v-else>
                  <button v-if="userJoined" class="button is-fullwidth is-primary" :disabled="true">
                    Qualified for Task
                  </button>
                  <div class="has-text-centered">
                    <i>No active tasks currently</i>
                  </div>
                </template>
                <p v-if="!canUserQualify" class="mt-1 is-size-7 has-text-centered">
                  You are not qualified to participate in this task
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- SuccessModal -->
        <success-modal v-if="batch && batch.num_tasks - batch.real_tasks_done === 0 && batchCompleted && successMessage" :message="successMessage" :title="successTitle" />

        <!-- Reserve task -->
        <div v-if="loadingReservation" class="loader-wrapper is-active">
          <img src="~assets/img/loading.svg">
          <br><span class="loading-text">Making reservation</span>
        </div>

        <!-- Instructions modal -->
        <instructions-modal v-if="campaign && campaign.info" :campaign="campaign" :info="campaign.info" :show="joinCampaignPopup" @clicked="campaignModalChange" />
      </div>
    </div>
  </section>
</template>
<script>
import { mapState } from 'vuex'
import { Template } from '@effectai/effect-js'
import TemplateMedia from '@/components/Template'
import InstructionsModal from '@/components/InstructionsModal'
import SuccessModal from '@/components/SuccessModal'
import Pagination from '@/components/Pagination'
const jsonexport = require('jsonexport/dist')

export default {
  components: {
    TemplateMedia,
    InstructionsModal,
    SuccessModal,
    Pagination
  },
  middleware: ['auth'],
  data () {
    return {
      ipfsExplorer: this.$blockchain.sdk.config.ipfsNode,
      campaignId: parseInt(this.$route.params.id),
      batchId: parseInt(this.$route.params.batch),
      batchCompleted: parseInt(this.$route.query.batchCompleted),
      campaign: undefined,
      batch: undefined,
      body: 'description',
      accountId: this.$auth.user.vAccountRows[0].id,
      userJoined: null,
      loading: false,
      loadingReservation: false,
      joinCampaignPopup: false,
      submissions: null,
      pageR: 1,
      page: 1,
      pageT: 1,
      perPage: 20,
      pages: [],
      pagesR: [],
      pagesT: [],
      viewTaskResult: false,
      successMessage: null,
      successTitle: null,
      reservations: null,
      userReservation: null,
      releasedReservations: null,
      waitingOnTransaction: false,
      categories: ['translate', 'captions', 'socials', 'dao'],
      taskTab: 'allTasks',
      canUserQualify: false
    }
  },
  computed: {
    ...mapState({
      batches: state => state.campaign.batches,
      campaigns: state => state.campaign.campaigns,
      campaignLoading: state => state.campaign.loading && !state.campaign.allCampaignsLoaded,
      batchLoading: state => state.campaign.loadingBatch
    }),
    paginatedSubmissions () {
      const start = (this.page - 1) * this.perPage
      if (this.submissions) {
        return this.submissions.slice(start, start + this.perPage)
      }
      return []
    },
    paginatedReservations () {
      const start = (this.page - 1) * this.perPage
      if (this.reservations.filter(x => x.account_id)) {
        return this.reservations.filter(x => x.account_id).slice(start, start + this.perPage)
      }
      return []
    },
    paginatedTasks () {
      const start = (this.pageT - 1) * this.perPage
      if (this.batch && this.batch.tasks) {
        return this.batch.tasks.slice(start, start + this.perPage)
      }
      return []
    }
  },
  mounted () {
    if (this.batchCompleted) {
      this.successTitle = 'Batch is completed'
      this.successMessage = 'All the tasks in this batch are done'
    }
  },
  created () {
    this.getBatch()
    this.getCampaign()
  },
  methods: {
    campaignModalChange (val) {
      this.joinCampaignPopup = val
    },
    async handleBatch () {
      let data
      try {
        if (this.batch.status === 'Active') {
          data = await this.$blockchain.pauseBatch(this.batch)
        } else if (this.batch.status === 'Paused') {
          data = await this.$blockchain.resumeBatch(this.batch)
        }
        this.$store.dispatch('transaction/addTransaction', data)
        if (data) {
          this.loading = true
          this.joinCampaignPopup = false
          await this.$blockchain.waitForTransaction(data)
          this.$router.push(`/campaigns/${this.campaign.id}`)
        }
      } catch (e) {
        this.$blockchain.handleError(e)
      }
    },
    async reserveTask () {
      this.$store.commit('view/ADD_JOINED_CAMPAIGN', this.campaign.id)
      this.loadingReservation = true
      try {
        await this.$blockchain.makeReservation(this.batch)
      } catch (error) {
        this.$blockchain.handleError(error)
      }
      this.loadingReservation = false
    },
    async releaseTask (id) {
      const data = await this.$blockchain.releaseTask(id)
      await this.$blockchain.waitForTransaction(data)
      this.$store.dispatch('transaction/addTransaction', data)
      const allReservations = await this.$blockchain.getTaskReservationsForBatch(this.batchId)
      this.reservations = allReservations.filter(function (sub) {
        return sub.account_id
      })
      this.getBatch()
    },
    async checkUserCampaign () {
      this.loading = true
      try {
        // checks if the user joined this campaign.
        this.userJoined = this.$store.state.view.joinedCampaigns.includes(this.campaign.id)
      } catch (e) {
        await this.$blockchain.handleError(e)
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
    viewTaskPreview (task) {
      this.viewTaskResult =
      {
        placeholders: task,
        results: []
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
      this.releasedReservations = allSubmissions.filter(function (sub) {
        return !sub.data && !sub.account_id
      })
      this.userReservation = this.reservations.find(r => r.account_id === this.$auth.user.vAccountRows[0].id)
    },
    async getCampaign () {
      await this.$store.dispatch('campaign/getCampaign', this.campaignId)
      this.campaign = this.campaigns.find(c => c.id === this.campaignId)
      await this.checkUserCampaign()
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
    setPage (newPage) {
      this.page = newPage
    },
    setPageR (newPage) {
      this.pageR = newPage
    },
    setPageT (newPage) {
      this.pageT = newPage
    },
    getProgressBatch (batch) {
      console.log(`%c ${JSON.stringify(batch)}`, 'background: #222; color: #bada55')
      switch (batch?.status) {
        case 'Completed':
          return 'is-success'
        case 'Active':
          return 'is-info'
        case 'Paused':
          return 'is-warning'
        default:
          break
      }
    },
    async getQualifications () {
      if (!this.allQualificationsLoaded) {
        await this.$store.dispatch('qualification/getQualifications')
      }
      this.userQualis = [...this.assignedQualifications]

      for (const quali of this.campaign.qualis) {
        const q = this.qualificationById(quali.key)
        this.campaignQualis.push(q)

        // check if user has the qualification
        q.userHasQuali = (this.userQualis.some(uq => uq.id === quali.key))

        // put it in inclusive or exclusive array for display
        if (quali.value === 0) {
          this.inclusiveQualifications.push(q)
        } else if (quali.value === 1) {
          this.exclusiveQualifications.push(q)
        }
      }
      this.canUserQualify = this.checkUserQualify()
    },
    checkUserQualify () {
      if (this.campaign.qualis.length > 0) {
        for (const quali of this.campaign.qualis) {
          if ((quali.value === 0 && !this.userQualis.find(uq => uq.id === quali.key)) || (quali.value === 1 && this.userQualis.find(uq => uq.id === quali.key))) {
            // user doesnt have qualification that is required or user has qualification that is not allowed
            return false
          }
        }
      } else {
        return true
      }
      return true
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
.tabs {
  li {
    font-weight: 500;
    a {
      padding-left: 35px;
      padding-right: 35px;
    }
    &.is-active {
      a {
        border-bottom-width: 2px;
        border-bottom-color: #1977F3;
        color: #151A1F;
        font-weight: 600;
      }
    }
  }
}
.task-tab div.box {
  // background: $balance-box-color;
  padding: 1rem;
  border-radius: 8px;
  cursor:pointer;
  &:hover {
    background: $balance-box-color;
    border: 1px solid $link-hover;
  }
  &.is-active {
    border: 2px solid #1977F3;
  }
}
</style>
