<template>
  <section class="section is-max-widescreen">
    <div class="container">
      <div v-if="loading" class="loader-wrapper is-active">
        <img src="~assets/img/loading.svg">
      </div>
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li>
            <nuxt-link to="/">
              All Tasks
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="`/campaigns/${campaignId}`">
              Task {{ campaignId }}
            </nuxt-link>
          </li>
          <li class="is-active">
            <a aria-current="page">
              New Batch
            </a>
          </li>
        </ul>
      </nav>
      <div>
        <div>
          <div class="columns">
            <div class="column is-half">
              <div class="title has-text-weight-bold">
                Tasks
              </div>
            </div>
          </div>
        </div>
        <div class="tabs campaign-tabs">
          <ul>
            <li class="is-active">
              <a href="#">Batches</a>
            </li>
          </ul>
        </div>
        <form>
          <div class="field">
            <div class="box">
              <div v-if="!tasks.length" class="has-text-centered mb-4">
                <h1>
                  No tasks added in batch yet
                </h1>
              </div>
              <div style="background: #fff; border-radius: 8px" class="p-2">
                <table class="table mx-auto">
                  <thead>
                    <tr>
                      <th v-if="tasks.length">
                        Index
                      </th>
                      <th v-for="placeholder in placeholders" :key="placeholder" class="task-placeholder-value">
                        <!-- <input v-model="newTask[placeholder]" type="text" class="input"> -->
                        {{ placeholder }}
                      </th>
                      <th v-if="tasks.length">
                        Preview
                      </th>
                      <th v-if="tasks.length">
                        Remove
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(task, index) in paginatedTasks" :key="task.id">
                      <td>{{ task.id }}</td>
                      <td v-for="placeholder in placeholders" :key="placeholder" class="task-placeholder-value">
                        {{ task[placeholder] }}
                      </td>
                      <td>
                        <button class="button is-info is-outlined is-small is-rounded" @click.prevent="previewModal(index)">
                          <font-awesome-icon class="icon is-small" icon="fa-solid fa-magnifying-glass" />
                        </button>
                      </td>
                      <td>
                        <button class="button is-danger is-outlined is-small is-rounded" @click.prevent="tasks.splice(index, 1)">
                          <font-awesome-icon class="icon is-small" icon="fa-solid fa-trash-can" />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td v-if="tasks.length" />
                      <td v-for="(placeholder, placeindex) in placeholders" :key="placeholder" class="task-placeholder-value">
                        <input
                          :ref="`placeholder-${placeindex}`"
                          v-model="newTask[placeholder]"
                          type="text"
                          class="input is-info task-placeholder-value"
                          placeholder="Type here"
                          @keydown.enter.prevent="createTask"
                        >
                      </td>
                      <td v-if="tasks.length" />
                    </tr>
                  </tbody>
                </table>
                <pagination
                  v-if="tasks"
                  :items="tasks.length"
                  :page="page"
                  :per-page="perPage"
                  @setPage="setPage"
                />
              </div>
              <div class="control has-text-centered mt-5">
                <button class="button is-primary is-wide" @click.prevent="createTask">
                  Add Task
                </button>
              </div>
            </div>
            <div class="box">
              <div class="columns">
                <div class="column is-3 has-text-centered py-0">
                  <h2 class="subtitle is-6 has-text-weight-bold mb-3">
                    Upload tasks
                  </h2>
                  <div class="file is-boxed mt-3">
                    <label class="file-label">
                      <input class="file-input" type="file" name="csvtasks" @change="uploadFile">
                      <span class="file-cta" @dragover="dragover" @dragleave="dragleave" @drop="drop">
                        <span class="file-label has-text-grey is-size-7">
                          Drag and drop or browse to choose a CSV file
                        </span>
                        <button class="button is-light mt-2">
                          Choose a .csv file
                        </button>
                      </span>
                    </label>
                  </div>
                  <div>
                    <a ref="csvfiledownload" class="is-size-7" href="" :download="'tasks_example'+campaignId+'.csv'">Download example CSV</a>
                  </div>
                  <p v-if="file.name" class="has-text-success mt-2">
                    Imported file: {{ file.name }}
                  </p>
                  <p v-if="error" class="has-text-danger">
                    {{ error }}
                  </p>
                </div>

                <div class="column is-3 py-0">
                  <div class="field">
                    <label class="label">Repetitions</label>
                    <div class="control">
                      <input v-model="repetitions" class="input" type="number" min="0" required>
                    </div>
                  </div>
                </div>

                <div v-if="campaign && campaign.info" class="column is-6 py-0 columns batch-info">
                  <div class="column is-one-third">
                    <div class="box">
                      <h2>Total Cost</h2>
                      <strong :class="{'has-text-danger': (campaign.info.reward * tasks.length * repetitions) > efxAvailable}">{{ campaign.info.reward * tasks.length * repetitions }} EFX</strong>
                    </div>
                  </div>
                  <div class="column is-one-third">
                    <div class="box">
                      <h2>Available Balance</h2>
                      <p>
                        <strong>{{ efxAvailable }} | </strong>
                        <nuxt-link to="/deposit">
                          Deposit EFX
                        </nuxt-link>
                      </p>
                    </div>
                  </div>
                  <div class="column is-one-third">
                    <div class="box">
                      <h2>Max Tasks Possible</h2>
                      <strong>{{ maxAmountTask > efxAvailable ? efxAvailable : maxAmountTask }}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <form @submit.prevent="uploadBatch">
          <div class="field is-grouped is-justify-content-center mt-6">
            <div class="control">
              <button type="submit" :class="{'is-loading': loading}" class="button button is-primary is-wide mr-4" :disabled="!tasks.length || tasks.length > maxAmountTask">
                Add Tasks
              </button>
              <button class="button is-outlined is-primary is-wide" @click.prevent="cancel">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
      <div class="modal" :class="{'is-active': previewTask}">
        <div class="modal-background" @click="previewTask = false" />
        <div class="modal-content" style="background-color: #fff; padding: 10px;">
          <template-media
            v-if="campaign && campaign.info && previewTask"
            :html="renderTemplate(
              campaign.info.template || 'No template found..',
              previewTask)"
            @templateLoaded="postResults(previewTask.results)"
          />
        </div>
        <button class="modal-close is-large" aria-label="close" @click="previewTask = false" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { Template } from '@effectai/effect-js'
import Pagination from '@/components/Pagination.vue'
import TemplateMedia from '@/components/Template'
// import templatePreviewModal from '~/components/templatePreviewModal.vue'

function getMatches (string, regex, index) {
  index || (index = 1) // default to the first capturing group
  const matches = []
  let match
  while ((match = regex.exec(string))) {
    matches.push(match[index])
  }
  return matches
}

export default {
  components: {
    // templatePreviewModal
    Pagination,
    TemplateMedia
  },
  middleware: ['auth'],
  data () {
    return {
      campaignId: parseInt(this.$route.params.id),
      repetitions: 1,
      newTask: {},
      tasks: [],
      tempCounter: 0,
      taskModal: false,
      previewTask: false,
      placeholders: null,
      campaign: null,
      file: {
        name: null,
        content: null
      },
      error: null,
      loading: false,
      page: 1,
      perPage: 30
    }
  },
  computed: {
    ...mapState({
      campaigns: state => state.campaign.campaigns,
      campaignLoading: state => state.campaign.loading
    }),
    ...mapGetters({
      batchesByCampaignId: 'campaign/batchesByCampaignId'
    }),
    efxAvailable () {
      return this.$blockchain.vefxAvailable
    },
    maxAmountTask () {
      return Math.floor(this.$blockchain.vefxAvailable / this.campaign.info.reward / this.repetitions)
    },
    paginatedTasks () {
      const start = (this.page - 1) * this.perPage
      if (this.tasks) {
        return this.tasks.slice(start, start + this.perPage)
      }
      return []
    }
  },
  mounted () {
    this.getCampaign()
  },
  methods: {
    setPage (newPage) {
      this.page = newPage
    },
    dragover (event) {
      event.preventDefault()
      event.currentTarget.classList.add('dragover')
    },
    dragleave (event) {
      event.currentTarget.classList.remove('dragover')
    },
    onChange () {
      this.filelist = [...this.$refs.file.files]
    },
    drop (event) {
      event.preventDefault()
      this.uploadFile(event.dataTransfer.files ? event.dataTransfer.files : null, true)
      event.currentTarget.classList.remove('dragover')
    },
    generateCsvData (placeholders) {
      const link = this.$refs.csvfiledownload
      let csvContent = 'data:text/csv;charset=utf-8,'
      csvContent += [
        Object.values(placeholders).join(','),
        placeholders.map(item => item + '-value-task-1'),
        placeholders.map(item => item + '-value-task-2'),
        placeholders.map(item => item + '-value-task-3')
      ].join('\n')
        .replace(/(^\[)|(\]$)/gm, '')
      console.log('TEST', csvContent)
      link.href = encodeURI(csvContent)
    },
    createTask () {
      // An temp id is needed for :key=task.id
      this.newTask.id = this.tempCounter++
      this.tasks.push(this.newTask)
      this.newTask = this.getEmptyTask(this.placeholders)
      this.$nextTick(() => {
        this.$refs['placeholder-0'][0].focus()
      })
    },
    previewModal (index) {
      this.previewTask = true
      this.previewTask = this.tasks[index]
    },
    renderTemplate (template, placeholders = {}, options = {}) {
      return new Template(template, placeholders, options).render()
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
    getEmptyTask (placeholders) {
      const emptyTask = {}
      placeholders.forEach((placeholder) => {
        emptyTask[placeholder] = ''
      })
      return emptyTask
    },
    getPlaceholders (template) {
      const placeholders = getMatches(
        template,
        /\$\{\s?(\w+)\s?\|?\s?(\w*)\s?\}/g
      )
      const unique = [...new Set(placeholders)]
      this.placeholders = unique
    },
    async getCampaign () {
      await this.$store.dispatch('campaign/getCampaign', this.campaignId)
      this.campaign = this.campaigns.find(c => c.id === this.campaignId)
      this.getPlaceholders(this.campaign.info.template)
      this.$nextTick(() => {
        this.generateCsvData(this.placeholders)
      })
      this.newTask = this.getEmptyTask(this.placeholders)
    },
    async uploadBatch () {
      try {
        this.loading = true
        const content = {
          tasks: this.tasks
        }
        const result = await this.$blockchain.createBatch(this.campaignId, content, this.repetitions)
        this.$store.dispatch('transaction/addTransaction', result)
        this.$router.push('/campaigns/' + this.campaignId)
      } catch (e) {
        this.$blockchain.handleError(e)
      }
      this.loading = false
    },
    cancel () {
      this.$router.push('/campaigns/' + this.campaignId)
    },
    uploadFile (event, drop) {
      this.file = {
        name: null,
        content: null
      }
      this.error = null
      const file = drop ? event[0] : event.target.files[0]
      if (file) {
        this.file.name = file.name
        const reader = new FileReader()
        reader.onload = (e) => {
          this.file.content = this.csvToJson(e.target.result)
          this.file.content.forEach((element) => {
            this.newTask = element
            this.createTask()
            let containsPlaceholder = false
            this.placeholders.forEach((placeholder) => {
              if (element[placeholder]) {
                containsPlaceholder = true
              }
            })
            if (!containsPlaceholder) {
              this.error = 'Placeholder not found in CSV'
            }
          })
        }
        reader.readAsText(file)
      } else {
        this.error = 'Could not find file'
        this.file = null
      }
    },
    /**
     * From: https://stackoverflow.com/questions/59218548/what-is-the-best-way-to-convert-from-csv-to-json-when-commas-and-quotations-may/59219146#59219146
     * Takes a raw CSV string and converts it to a JavaScript object.
     */
    csvToJson (string, headers, quoteChar = '"', delimiter = ',') {
      const regex = new RegExp(`\\s*(${quoteChar})?(.*?)\\1\\s*(?:${delimiter}|$)`, 'gs')
      const match = string => [...string.matchAll(regex)].map(match => match[2])
        .filter((_, i, a) => i < a.length - 1) // cut off blank match at end

      const lines = string.split('\n')
      const heads = headers || match(lines.splice(0, 1)[0])

      return lines.map(line => match(line).reduce((acc, cur, i) => ({
        ...acc,
        [heads[i] || `extra_${i}`]: (cur.length > 0) ? (Number(cur) || cur) : null
      }), {}))
    }
  }
}
</script>

<style lang="scss" scoped>
.is-boxed {
  .file-cta {
    background: #fff;
    border: none;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23A9B1BD' stroke-width='4' stroke-dasharray='6%2c14' stroke-dashoffset='10' stroke-linecap='square'/%3e%3c/svg%3e");
  }
}
.dragover {
  background-color: #e7f3ff !important;
}
table {
  background: transparent;
  border-spacing: 10px;
  width: 100%;
  text-align: center;
  border-radius: 8px;
  td {
    border-top: 1px solid #E8EEFF;
  }
  th {
    border: none;
  }
}
div.box {
  background: #F7F9FB;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: none;
}

.button.is-wide {
  min-width: 220px;
}

.batch-info {
  padding-right: 0;
  .box {
    width: 100%;
    height: auto;
    padding: 1rem;
    background: #fff;
    button {
      font-size: .9rem;
    }
  }
}
</style>
