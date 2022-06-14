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
          <li class="is-active">
            <nuxt-link :to="`/qualifications/${id}`" aria-current="page">
              Qualification {{ id }}
            </nuxt-link>
          </li>
        </ul>
      </nav>

      <!-- Loading Transaction Modal -->
      <div v-if="loading" class="loader-wrapper is-active">
        <img src="~assets/img/loading.svg">
        <br>
        <span v-if="waitingOnTransaction" class="loading-text subtitle">Waiting for the transaction to complete</span>
        <span v-else class="loading-text subtitle">Please sign the transaction</span>
      </div>

      <!-- Loading Qualification Message -->
      <div v-if="!singleQualification" class="loading-text">
        Qualification loading
      </div>
      <div v-else class="columns">
        <!-- First column with information -->
        <div class="column is-three-fifths">
          <div class="is-flex is-align-items-center mb-6">
            <p v-if="singleQualification" class="image has-radius mr-4" style="width: 52px; height: 52px">
              <img v-if="singleQualification.info && singleQualification.info.image" :src="singleQualification.info.image">
              <img v-else :src="require(`~/assets/img/dapps/effect-force-icon.png`)" alt="qualification name">
            </p>
            <div class="title has-text-weight-bold">
              <span>#{{ id }}</span>
              <span v-if="singleQualification.info.name">{{ singleQualification.info.name }}</span>
              <span v-else-if="singleQualification.info.name == null" class="loading-text">Loading</span>
              <span v-else-if="singleQualification.info.name.length == 0">Untitled</span>
              <span v-else class="has-text-danger-dark">Could not load singleQualification info</span>
            </div>
          </div>

          <div class="block">
            <p v-if="singleQualification.info.description" class="content" v-html="$md.render(singleQualification.info.description)" />
            <p v-else>
              - No description -
            </p>
          </div>
        </div>

        <!-- Second column -->
        <div class="column is-two-fifths">
          <div class="information-block">
            <div class="information-header has-text-centered">
              <h4 class="p-5 is-size-4">
                <b>Information</b>
              </h4>
            </div>

            <div class="p-5">
              <div class="columns ">
                <div class="column is-full">
                  <div class="block">
                    Requester
                    <br>
                    <div v-if="vaccount" class="blockchain-address">
                      <nuxt-link :to="'/profile/' + vaccount[0].address[1]">
                        {{ vaccount[0].address[1] }}
                      </nuxt-link>
                    </div>
                    <div v-else>
                      ...
                    </div>
                  </div>
                  <div class="block">
                    IPFS
                    <br>
                    <div class="blockchain-address">
                      <a target="_blank" :href="`${ipfsExplorer}/ipfs/${singleQualification.content.field_1}`">{{ singleQualification.content.field_1 }}</a>
                    </div>
                  </div>
                  <div class="block">
                    Blockchain
                    <br>
                    <a target="_blank" :href="`${$blockchain.eos.explorer}/account/${$blockchain.sdk.force.config.forceContract}?loadContract=true&tab=Tables&table=quali&account=${$blockchain.sdk.force.config.forceContract}&scope=${$blockchain.sdk.force.config.forceContract}&limit=1&lower_bound=${id}&upper_bound=${id}`">View in Explorer</a>
                  </div>

                  <div class="block is-vcentered ">
                    <div v-if="$auth.user.vAccountRows && $auth.user.vAccountRows[0].id === singleQualification.account_id">
                      <nuxt-link :to="`/qualifications/${id}/edit`" class="button is-fullwidth is-primary is-light has-margin-bottom-mobile">
                        Edit
                      </nuxt-link>
                    </div>
                  </div>
                </div>
              </div>
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
      loading: false,
      id: parseInt(this.$route.params.id),
      ipfsExplorer: this.$blockchain.sdk.config.ipfsNode,
      vaccount: null
    }
  },
  computed: {
    ...mapState({
      qualifications: state => state.qualification.qualifications
    }),
    singleQualification () {
      if (!this.qualifications) { return }
      return this.qualifications.find(el => el.id === this.id)
    }
  },
  created () {
    this.$store.dispatch('qualification/getQualifications')
    this.getAccountById(this.id)
  },
  methods: {
    async getAccountById (id) {
      const quali = await this.$blockchain.getQualification(id)
      this.vaccount = await this.$blockchain.getVAccountById(quali.account_id).catch(console.error)
    }
  }

}
</script>

<style lang="scss" scoped>
.information-block {
  border: 1px solid #E8EEFF;
  border-radius: 8px;
  .block {
    margin-bottom: 10px
  }

  .information-header {
    background: #F7FBFF;
  }
}
</style>
