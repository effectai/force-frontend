<template>
  <section class="section">
    <div class="container">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <h1 class="title has-text-weight-bold">
              <span v-if="categoryFilter" class="is-capitalized">{{ categoryFilter }}</span> Tasks
            </h1>
          </div>
          <div class="switch-button mt-1 ml-3" :class="{'unmoderated': unmoderated}">
            <input v-model="unmoderated" class="switch-button-checkbox" type="checkbox">
            <label class="switch-button-label" for=""><span class="switch-button-label-span">Approved</span></label>
            <div class="has-tooltip-arrow" data-tooltip="Use at your own risk!">
              <!-- <img src="@/assets/img/icons/info.svg"> -->
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.4" d="M5 0C7.757 0 10 2.24303 10 5.00003C10 7.75703 7.757 10 5 10C2.243 10 0 7.75703 0 5.00003C0 2.24303 2.243 0 5 0ZM5 9.09091C7.25576 9.09091 9.09091 7.25576 9.09091 5.00003C9.09091 2.7443 7.25576 0.909091 5 0.909091C2.74424 0.909091 0.909091 2.7443 0.909091 5.00003C0.909091 7.25576 2.74427 9.09091 5 9.09091Z" fill="#565E76" />
                <path opacity="0.4" d="M4.99953 2.12122C5.33365 2.12122 5.60547 2.39322 5.60547 2.72755C5.60547 3.06158 5.33365 3.33334 4.99953 3.33334C4.66541 3.33334 4.39359 3.06158 4.39359 2.72755C4.39359 2.39322 4.66541 2.12122 4.99953 2.12122Z" fill="#565E76" />
                <path opacity="0.4" d="M4.99858 4.24243C5.24961 4.24243 5.45312 4.44595 5.45312 4.69698V7.42425C5.45312 7.67528 5.24961 7.8788 4.99858 7.8788C4.74755 7.8788 4.54403 7.67528 4.54403 7.42425V4.69698C4.54403 4.44595 4.74755 4.24243 4.99858 4.24243Z" fill="#565E76" />
              </svg>
            </div>
          </div>
        </div>
        <div class="level-right">
          <!-- <div class="level-item">
            <a class="button is-small is-light" :class="{'is-danger': approved, 'is-success': !approved}" @click="approved = !approved">
              View <template v-if="approved">unmoderated</template><template v-else>approved</template> tasks
            </a>
          </div> -->
          <div class="level-item">
            <nuxt-link class="button is-primary is-small" to="/campaigns/templates">
              <span class="icon">+</span>
              <span>Create Task</span>
            </nuxt-link>
          </div>
        </div>
      </div>
      <joinable-filters :filter="joinableFilter" :campaigns="filteredCampaigns" @joinableFilter="onJoinableFilter" />
      <category-filters :filter="categoryFilter" class="category-filters" @categoryFilter="onCategoryFilter" />
      <campaign-list :campaigns="filteredCampaigns" :grid-toggle="true" />
    </div>
  </section>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import _ from 'lodash'
import CategoryFilters from '@/components/CategoryFilters'
import JoinableFilters from '@/components/JoinableFilters'
import approvedCampaigns from '@/approvedCampaigns.json'
import CampaignList from '@/components/CampaignList'

export default {
  components: {
    CampaignList,
    CategoryFilters,
    JoinableFilters
  },
  data () {
    return {
      approvedCampaigns: approvedCampaigns.campaigns,
      approvedRequesters: approvedCampaigns.requesters,
      unmoderated: false,
      categoryFilter: this.$route.query.category,
      joinableFilter: 'joinable'
    }
  },
  computed: {
    ...mapGetters({
      activeBatchesByCampaignId: 'campaign/activeBatchesByCampaignId',
      campaignsByCategory: 'campaign/campaignsByCategory',
      reservationsByAccountId: 'campaign/reservationsByAccountId',
      submissionsByBatchId: 'campaign/submissionsByBatchId'
    }),
    ...mapState({
      assignedQualifications: state => state.qualification.assignedQualifications
    }),
    reservations () {
      if (!this.$auth || !this.$auth.user || !this.$auth.user.vAccountRows) { return }
      let userReservations = this.reservationsByAccountId(this.$auth.user.vAccountRows[0].id)
      if (userReservations) {
        userReservations = userReservations.filter(r => parseInt(new Date(new Date(r.submitted_on) + 'UTC').getTime() / 1000) + parseInt(this.$blockchain.sdk.force.config.releaseTaskDelaySec.toFixed(0)) > parseInt((Date.now() / 1000).toFixed(0)))
      }
      return userReservations
    },
    filteredCampaigns () {
      let campaigns = this.campaignsByCategory(this.categoryFilter)
      if (this.joinableFilter === 'qualifier') {
        campaigns = this.campaignsByCategory(this.joinableFilter)
      }
      let filteredCampaigns
      if (campaigns) {
        filteredCampaigns = campaigns.map((c) => { return { ...c } })
        if (!this.unmoderated) {
          filteredCampaigns = filteredCampaigns.filter(c => this.approvedCampaigns.includes(c.id) || this.approvedRequesters.includes(c.owner[1]))
        } else {
          filteredCampaigns = filteredCampaigns.filter(c => !this.approvedCampaigns.includes(c.id) && !this.approvedRequesters.includes(c.owner[1]))
        }
        for (const i in filteredCampaigns) {
          const batches = this.activeBatchesByCampaignId(filteredCampaigns[i].id)

          // get the reservations of the user for this campaign
          const reservationsOfUser = _.intersectionBy(batches, this.reservations, 'batch_id')
          filteredCampaigns[i].userHasReservation = (reservationsOfUser.length)
          filteredCampaigns[i].batches = batches
          if (batches) {
            filteredCampaigns[i].num_tasks = batches.reduce(function (a, b) {
              return a + b.num_tasks
            }, 0)
            filteredCampaigns[i].tasks_done = batches.reduce((a, batch) => {
              const batchSubmissions = this.submissionsByBatchId(batch.batch_id)
              let realTasksDone = 0
              if (batch.repetitions > 1 && batchSubmissions && batch.tasks_done < batch.num_tasks * batch.repetitions) {
                const tasks = {}
                for (const batchSubmission of batchSubmissions) {
                  if (!tasks[batchSubmission.leaf_hash]) {
                    tasks[batchSubmission.leaf_hash] = 0
                  }
                  if (tasks[batchSubmission.leaf_hash] < batch.repetitions) {
                    if (this.$auth.user && this.$auth.user.vAccountRows && parseInt(batchSubmission.account_id) === parseInt(this.$auth.user.vAccountRows[0].id)) {
                      if (batchSubmission.submitted_on) {
                        // user already submitted this task
                        tasks[batchSubmission.leaf_hash] = batch.repetitions
                      }
                    } else {
                      tasks[batchSubmission.leaf_hash]++
                    }
                    if (tasks[batchSubmission.leaf_hash] >= batch.repetitions) {
                      realTasksDone++
                    }
                  }
                }
                // TODO: compare with real_tasks_done in store for this batch and update store if different
              } else {
                realTasksDone = batch.tasks_done
              }
              return a + realTasksDone
            }, 0)
          }
          filteredCampaigns[i].joinable = this.checkUserQualify(filteredCampaigns[i])
        }

        if (this.joinableFilter && this.joinableFilter !== 'qualifier') {
          filteredCampaigns = this.getJoinableCampaigns(filteredCampaigns, this.joinableFilter)
        }

        // filter active campaigns
        filteredCampaigns = filteredCampaigns.filter(c => c.num_tasks - c.tasks_done > 0 || c.userHasReservation)
        // show the campaigns where the user has a resevation first
        filteredCampaigns = _.orderBy(filteredCampaigns, ['userHasReservation', 'id'], ['desc', 'asc'])
      }

      return filteredCampaigns
    }
  },
  watch: {
    '$route.query.category' (category) {
      this.onCategoryFilter(category)
    }
  },
  created () {
    if (!this.$auth || !this.$auth.loggedIn) {
      this.$router.push('/welcome')
    }
  },
  methods: {
    onCategoryFilter (category) {
      if (!category && this.$route.query.category) {
        this.$router.replace('/')
      } else if (category !== this.$route.query.category) {
        this.$router.replace('/?category=' + category)
      }
      this.categoryFilter = category
    },
    onJoinableFilter (option) {
      this.joinableFilter = option
    },
    checkUserQualify (campaign) {
      if (campaign.qualis.length > 0) {
        for (const quali of campaign.qualis) {
          if (this.assignedQualifications === null) {
            return null
          }
          if ((quali.value === 0 && !this.assignedQualifications.find(uq => uq.id === quali.key)) || (quali.value === 1 && this.assignedQualifications.find(uq => uq.id === quali.key))) {
            // user doesnt have qualification that is required or user has qualification that is not allowed
            return false
          }
        }
      } else {
        return true
      }
      return true
    },
    getJoinableCampaigns (campaigns, option) {
      const joinableCampaigns = []
      const unjoinableCampaigns = []
      for (const c of campaigns) {
        if (c.joinable) {
          joinableCampaigns.push(c)
        } else {
          unjoinableCampaigns.push(c)
        }
      }
      return option === 'joinable' ? joinableCampaigns : unjoinableCampaigns
    }
  }
}
</script>

<style lang="scss" scoped>
.switch-button {
  width: 220px;
  background: #F7F9FB;
  border: 1px solid #E8EEFF;
  border-radius: 6px;
  text-align: center;
  font-size: .75rem;
  font-weight: 600;
  letter-spacing: 1px;
  color: $text;
  position: relative;
  padding: 4px 135px 4px 20px;

  &:before {
    content: 'Unmoderated';
    position: absolute;
    top: 6px;
    right: 17px;
    width: auto;
    align-items: center;
    justify-content: center;
    z-index: 3;
    pointer-events: none;
  }

  .has-tooltip-arrow {
    display: block;
    position: absolute;
    top: 7px;
    height: 10px;
    width: 10px;
    right:5px;
    border-radius: 50%;
    z-index: 10;
    cursor: pointer;
    svg {
      display: block;
      height: 10px;
      width: 10px;
    }
    &::before {
      margin-top: -4px !important;
      border-radius: 8px;
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }

  &.unmoderated::before {
    color: #fff;
  }
  &.unmoderated {
    .has-tooltip-arrow path {
      fill: #fff;
      opacity: 1;
    }
    .switch-button-checkbox {
       & + .switch-button-label {

        &:before {
          width: 118px;
          left: 0px;
        }
      }
    }
  }

  &-checkbox {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 2;

    &:checked + .switch-button-label:before {
      transform: translateX(78px);
      transition: transform 300ms linear;
    }
    &:checked + .switch-button-label {
      color: $text;
    }

    & + .switch-button-label {
      color: #fff;
      position: relative;
      padding: 2px 0;
      display: block;
      user-select: none;
      pointer-events: none;

      &:before {
        content: "";
        padding: 1px 0;
        background: #101D56;
        height: 100%;
        width: 95px;
        position: absolute;
        left: -15px;
        top: 0;
        border-radius: 6px;
        transform: translateX(0);
        transition: transform 300ms;
      }

      .switch-button-label-span {
        position: relative;
      }
    }
  }
}

.category-filters {
  margin-bottom: -50px;
  @media screen and (max-width: $tablet) {
    margin-bottom: 0;
  }
}
</style>
