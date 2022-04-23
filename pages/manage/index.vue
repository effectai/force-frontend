<template>
  <section class="section">
    <div class="container">
      <div class="text-center">
        <h1 class="title is-spaced has-text-weight-bold">
          <!-- Effect Account (ID: {{ $auth.user.vAccountRows[0].id }}) -->
          Manage | {{ $auth.user.provider }}@{{ $auth.user.blockchain }}
        </h1>
        <p>
          Manage your tasks, qualifications here.
        </p>

        <hr>

        <div class="is-flex is-justify-content-space-between mt-6 is-align-items-center">
          <h2 class="title is-4">
            Tasks
          </h2>
          <div class="is-pulled-right no-float-mobile has-margin-bottom-mobile">
            <nuxt-link class="button is-primary" to="/campaigns/templates">
              <span class="icon">
                +
              </span>
              <span>Create Task</span>
            </nuxt-link>
          </div>
        </div>

        <campaign-list class="mb-5" :campaigns="myCampaigns" />

        <qualification-list class="mb-5" :qualifications="myQualificaitons"></qualification-list>

        <div class="is-flex is-justify-content-space-between mt-6 is-align-items-center">
          <h2 class="title is-4">
            Qualifiers
          </h2>
          <div class="is-pulled-right no-float-mobile has-margin-bottom-mobile">
            <nuxt-link class="button is-primary" to="/qualifications/new">
              <span class="icon">
                +
              </span>
              <span>Create Qualifier</span>
            </nuxt-link>
          </div>
        </div>

        <qualification-list class="mb-5" :qualifications="myQualifications"></qualification-list>

        <hr>
        <button class="button is-white" exact-active-class="is-active" @click="logout">
          <span class="icon">
            <img src="~assets/img/icons/logout.svg" style="height: 24px">
          </span>
          <span>Logout</span>
        </button>
        <br><br>
      </div>
      <success-modal v-if="successMessage" :message="successMessage" :title="successTitle" />
    </div>
  </section>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { CampaignList } from '@/components/CampaignList.vue'
import QualificationList from '@/components/QualificationList'
import SuccessModal from '@/components/SuccessModal'

export default {
  components: { CampaignList, QualificationList, SuccessModal },
  filters: {
  },
  middleware: ['auth'],
  data () {
    return {
      loading: null,
      page: 1,
      perPage: 10,
      showPK: false,
      pages: [],
      pendingPayouts: [],
      showPayoutDetails: false,
      successMessage: null,
      successTitle: null
    }
  },
  computed: {
    ...mapGetters({
      transactionsByUser: 'transaction/transactionsByUser',
      getPendingPayouts: 'pendingPayout/getPendingPayouts',
      campaignById: 'campaign/campaignById',
      activeBatchesByCampaignId: 'campaign/activeBatchesByCampaignId'
    }),
    ...mapState({
      campaigns: state => state.campaign.campaigns,
      qualifications: state => state.qualifications.qualifications
    }),
    myCampaigns () {
      if (!this.campaigns) { return }
      const filteredCampaigns = this.campaigns.filter(c => c.owner[1] === this.$auth.user.accountName).map((c) => { return { ...c } })

      for (const i in filteredCampaigns) {
        const batches = this.activeBatchesByCampaignId(filteredCampaigns[i].id)
        filteredCampaigns[i].batches = batches
        if (batches) {
          filteredCampaigns[i].num_tasks = batches.reduce(function (a, b) {
            return a + b.num_tasks
          }, 0)
          filteredCampaigns[i].tasks_done = batches.reduce(function (a, b) {
            return a + b.real_tasks_done
          }, 0)
        }
      }
      return filteredCampaigns
    },
    myQualifications () {
      if (!this.qualifications) { return }
      console.log(this.qualifications)
      const filteredQualifications = this.qualifications.filter(c => c.owner[1] === this.$auth.user.accountName).map((c) => { return { ...c } })
      return filteredQualifications
    },
    transactions () {
      return this.transactionsByUser(this.$auth.user.vAccountRows[0].id)
    },
    paginatedTransactions () {
      const start = (this.page - 1) * this.perPage
      if (this.transactions) {
        return this.transactions.slice(start, start + this.perPage)
      }
      return []
    }
  },
  mounted () {
    console.log('mounted')
    this.$store.dispatch('pendingPayout/loadPendingPayouts')
    // console.debug(this.$auth)
  },
  methods: {
    async logout () {
      await this.$auth.logout()
    },
    setPage (newPage) {
      this.page = newPage
    },
    transform (props) {
      Object.entries(props).forEach(([key, value]) => {
        const digits = value < 10 ? `0${value}` : value // Add leading zero
        props[key] = digits
      })
      return props.minutes > 0 && props.seconds ? `${props.minutes}:${props.seconds}` : ' ✔' // there is a space before the checkmark
    }
  }
}
</script>

<style lang="scss" scoped>
button.button.is-small.is-info {
  border-radius: 8px;
}
.payout-detail {
  cursor: pointer;
  span {
    color: $link;
    &:hover {
      text-decoration: underline;
    }
  }
}

.payout-table {
  transition: all .5s ease-in-out;
  tfoot tr:last-child th {
    border-style: dashed;
  }
}

@media screen and (max-width: $tablet) {
  .is-pulled-right {
    float: none !important;
    margin-bottom: 25px;
  }
}
</style>
