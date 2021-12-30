<template>
  <section class="section is-max-widescreen">
    <div class="container">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li>
            <nuxt-link to="/">
              All Campaigns
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="`/campaigns/${campaignId}`">
              Campaign {{ campaignId }}
            </nuxt-link>
          </li>
          <li class="is-active">
            <a aria-current="page">
              New Batch
            </a>
          </li>
        </ul>
      </nav>
      <div v-if="campaignLoading">
        Campaign loading..
      </div>
      <div v-else-if="!campaign">
        Could not retrieve campaign
      </div>
      <div v-else>
        <div class="title">
          Tasks
        </div>
        <div>
          <div v-for="(task,index) in tasks" :key="index">
            #{{ index }}: {{ task }} <span class="has-text-danger-dark is-size-5 has-text-weight-bold" @click="tasks.splice(index, 1)">x</span>
          </div>
          <div v-if="!tasks.length">
            No tasks..
          </div>
        </div>
        <form @submit.prevent="createTask">
          <div class="field">
            <div v-for="placeholder in placeholders" :key="placeholder" class="task-placeholder-value">
              <label class="label">{{ placeholder }}</label>
              <div class="control">
                <input v-model="newTask[placeholder]" type="text" class="input">
              </div>
            </div>
            <div class="control">
              <button type="submit" class="button">
                Create Task
              </button>
            </div>
            <br>
            <h2 class="subtitle is-5 mb-3">
              Import tasks
            </h2>
            <div class="file has-name">
              <label class="file-label">
                <input class="file-input" type="file" name="csvtasks" @change="uploadFile">
                <span class="file-cta">
                  <span class="file-label">
                    Choose a .csv file…
                  </span>
                </span>
                <span v-if="file && file.name" class="file-name">
                  {{ file.name }}
                </span>
              </label>
            </div>
            <p v-if="error" class="has-text-danger">
              {{ error }}
            </p>
            <br>
            <div>
              <a id="downloadlink" ref="csvfiledownload" href="" :download="'tasks_example'+campaignId+'.csv'">download example csv</a>
            </div>
          </div>
        </form>
        <form @submit.prevent="uploadBatch">
          <!-- <div class="field">
            <label class="label">Repetitions</label>
            <div class="control">
              <input v-model="repetitions" class="input" type="number" min="0" required>
            </div>
          </div> -->
          <div class="field is-grouped">
            <div class="control">
              <button type="submit" class="button is-link" :disabled="!tasks.length">
                Submit
              </button>
            </div>
            <div class="control">
              <button class="button is-link is-light" @click.prevent="cancel">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

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
  middleware: ['auth'],
  data () {
    return {
      campaignId: parseInt(this.$route.params.id),
      repetitions: 1,
      newTask: {},
      tasks: [],
      placeholders: null,
      campaign: null,
      file: {
        name: null,
        content: null
      },
      error: null
    }
  },
  computed: {
    ...mapState({
      campaigns: state => state.campaign.campaigns,
      campaignLoading: state => state.campaign.loading
    }),
    ...mapGetters({
      batchByCampaignId: 'campaign/batchByCampaignId'
    })
  },
  mounted () {
    this.getCampaign()
  },
  methods: {
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
      this.tasks.push(this.newTask)
      this.newTask = this.getEmptyTask(this.placeholders)
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
        const content = {
          tasks: this.tasks
        }
        const result = await this.$blockchain.createBatch(this.campaignId, content, this.repetitions)
        this.$store.dispatch('transaction/addTransaction', result)
        this.$router.push('/campaigns/' + this.campaignId)
      } catch (e) {
        this.$blockchain.handleError(e)
      }
    },
    cancel () {
      this.$router.push('/campaigns/' + this.campaignId)
    },
    uploadFile (event) {
      this.file = {
        name: null,
        content: null
      }
      this.error = null
      console.log(event)
      if (event.target.files[0]) {
        this.file.name = event.target.files[0].name
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
        reader.readAsText(event.target.files[0])
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
</style>
