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
          <li class="is-active">
            <nuxt-link :to="'/campaigns/' + id" aria-current="page">
              Campaign {{ id }}
            </nuxt-link>
          </li>
        </ul>
      </nav>
      <div v-if="campaignLoading">
        Campaign loading..
      </div>
      <div v-else-if="!campaign">
        Could not retrieve campaign
      </div>
      <div v-else class="columns">
        <div class="column is-two-thirds">
          <div class="title">
            <span>#{{ id }}: </span>
            <span v-if="campaign.info">{{ campaign.info.title }}</span>
            <span v-else>Campaign Title loading...</span>
          </div>
          <div class="block">
            <p v-if="campaign.info">
              {{ campaign.info.body }}. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque iste ipsa reiciendis laborum autem nesciunt assumenda? Debitis, mollitia nisi corrupti, amet id officiis nobis eaque magni, modi eligendi atque facilis?
              Vitae deleniti, iure modi cupiditate corporis quod asperiores. Quae minus quisquam facere amet exercitationem similique deleniti eum veritatis praesentium nisi eos sunt placeat enim tempora deserunt, laudantium numquam fugiat animi.
              Obcaecati accusamus maiores eveniet aut natus, nostrum reiciendis commodi enim cumque omnis dolores temporibus, aliquam similique autem. Tenetur dolor necessitatibus laudantium quam, provident reprehenderit libero, nam eligendi iure, eos inventore.
            </p>
            <p v-else>
              ...
            </p>
          </div>
          <pre>{{ campaign }}</pre>
        </div>
        <div class="column is-one-thirds">
          <div class="box">
            <h5 class="box-title">
              <b>Information</b>
            </h5>
            <div class="block">
              <b>Requester</b>
              <br>
              <a
                target="_blank"
                :href="`https://kylin.bloks.io/account/acckylin1111?loadContract=true&tab=Tables&table=account&account=acckylin1111&scope=acckylin1111&limit=1&lower_bound=${campaign.authorId}&upper_bound=${campaign.authorId}`"
              >
                {{ campaign.author }}
              </a>
            </div>
            <div class="block">
              <b>Tasks</b>
              <br>
              <span v-if="randomNumber !== undefined">{{ randomNumber }}</span>
              <span v-else>...</span>
              <span>/ 300 left</span>
              <progress class="progress is-secondary" :value="randomNumber" max="300">
                Left
              </progress>
            </div>
            <div class="block">
              <b>Reward</b>
              <br>
              <span>{{ campaign.pay[0].field_0.quantity }}</span>
            </div>
            <div class="block">
              <b>Content hash</b>
              <br>
              <a target="_blank" :href="'https://ipfs.effect.ai/ipfs/' + campaign.content_hash">{{ campaign.content_hash.substring(0, 22) }}...</a>
            </div>
            <div class="block">
              <b>Blockchain</b>
              <br>
              <a target="_blank" :href="`https://kylin.bloks.io/account/propsonkylin?loadContract=true&tab=Tables&table=proposal&account=propsonkylin&scope=propsonkylin&limit=1&lower_bound=${id}&upper_bound=${id}`">View on Explorer</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState } from 'vuex'

export default {
  middleware: ['auth'],
  data () {
    return {
      id: parseInt(this.$route.params.id),
      campaign: undefined,
      randomNumber: undefined
    }
  },
  computed: {
    ...mapState({
      campaigns: state => state.campaign.campaigns,
      campaignLoading: state => state.campaign.loading
    })
  },
  mounted () {
    setTimeout(() => {
      this.randomNumber = Math.ceil(Math.random() * 300)
    }, 3000)
  },
  created () {
    this.getCampaign()
  },
  methods: {
    async getCampaign () {
      await this.$store.dispatch('campaign/getCampaign', this.id)
      this.campaign = this.campaigns.find(c => c.id === this.id)
    }
  }
}
</script>
<style lang="scss" scoped>
.box-title {
  text-align: center;
  border-bottom: 2px solid #cdd4e6;
  padding-bottom: 20px;
  margin: 10px 0 15px 0;
}
.progress::-webkit-progress-value {
  transition: width 0.5s ease;
}

</style>
