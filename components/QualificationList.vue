<template>
  <div>
    <div class="is-flex is-justify-content-space-between">
      <div />
      <div v-if="gridToggle" class="is-hidden-touch">
        <div class="switch-button mb-1">
          <input v-model="list" class="switch-button-checkbox" type="checkbox">
          <label class="switch-button-label" for=""><span class="switch-button-label-span"><img height="28px" src="@/assets/img/icons/border-all.svg"></span></label>
        </div>
      </div>
    </div>
    <hr class="mt-1">

    <div class="mb-6">
      <div class="table-container">
        <table class="table" style="width: 100%;">
          <thead>
            <tr>
              <th></th>
              <th>Qualification</th>
              <th>Requester</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="qualification in paginatedQualifications" :key="qualification.id">

                <th>
                  <figure class="image is-32x32 has-radius is-vcentered">
                    <img v-if="qualification.info && qualification.info.image" :src="qualification.info.image">
                    <img v-else :src="require(`~/assets/img/dapps/effect-force-icon.png`)" alt="qualification name">
                  </figure>
                </th>
                <td>
                  <nuxt-link :to="`/qualifications/${qualification.id}`">
                    <h2 class="subtitle is-6 has-text-weight-semibold mb-0">
                      <span v-if="qualification.info">
                        <span v-if="qualification.info.name">{{ qualification.info.name }}</span>
                        <i v-else>- Untitled -</i>
                      </span>
                      <span v-else-if="qualification.info !== null" class="loading-text">Loading</span>
                      <span v-else class="has-text-danger-dark">Could not load qualification info</span>
                    </h2>
                    <div v-if="qualification.info">
                      <div v-if="qualification.info.description" class="is-ellipsis is-clipped">
                        <div v-if="qualification.info.description.length > 50">
                          <span>{{ qualification.info.description.slice(0, 50) }}</span>
                          <span>&hellip;</span>
                        </div>
                        <div v-else>
                          {{ qualification.info.description }}
                        </div>
                      </div>
                      <i v-else>- no description -</i>
                    </div>
                    <div v-else-if="qualification.info !== null">
                      ........
                    </div>
                  </nuxt-link>
                </td>
                <td>
                  <h2 class="subtitle is-6 has-text-weight-semibold mb-0">
                    <nuxt-link :to="'/profile/' + qualification.account_id">
                      <span class="is-ellipsis">{{ qualification.account_id }}</span>
                    </nuxt-link>
                  </h2>
                </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <pagination
      v-if="qualifications"
      class="mt-2"
      :items="qualifications.length"
      :page="page"
      :per-page="perPage"
      @setPage="setPage"
    />
    <div v-if="!allQualificationsLoaded" class="subtitle loading-text">
      Qualifications loading
    </div>
    <div v-else-if="qualifications && !qualifications.length" class="subtitle">
      No tasks
    </div>
    <div v-else-if="!qualifications" class="subtitle has-text-danger">
      Could not retrieve qualifcations
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Pagination from './Pagination.vue'

export default {
  name: 'QualificationList',
  components: {
    Pagination
  },
  props: ['gridToggle', 'qualifications'],
  data () {
    return {
      page: this.$route.query.page || 1,
      perPage: 30,
      ipfsExplorer: this.$blockchain.sdk.config.ipfsNode
    }
  },
  computed: {
    ...mapGetters({
      qualificationById: 'qualification/qualificationById'
    }),
    ...mapState({
      allQualificationsLoaded: state => state.qualification.allQualificationsLoaded
    }),
    list: {
      get () {
        return this.$store.state.view.grid
      },
      set (value) {
        this.$store.commit('view/SET_GRID_LIST', value)
      }
    },
    grid () {
      return !this.list && this.gridToggle
    },
    paginatedQualifications () {
      const start = (this.page - 1) * this.perPage
      if (this.qualifications) {
        return this.qualifications.slice(start, start + this.perPage)
      }
      return []
    }
  },
  created () {
    this.getForceInfo()
  },
  methods: {
    setPage (newPage) {
      this.page = newPage
    },
    getForceInfo () {
      if (!this.qualifications) {
        this.$store.dispatch('qualification/getQualifications')
      }
    }
  }

}
</script>

<style lang="scss" scoped>
@import "bulma/sass/utilities/mixins";

.title-section {
  height: 100%;
}

.column {
  // display: inline-flex;
  // display: flex;
  flex-wrap: wrap;
  align-items: stretch;
}
.box {
  &.is-disabled {
    .column:not(:last-child) {
      opacity: 0.5;
    }
    background-color: rgba(#DEE0E6, 0.5);
  }
  // not sure about this stylingx`
  &.has-reservation {
    box-shadow: 0px 0px 14px 5px rgba(17,72,235,0.3);
  }
  .image {
    img {
      border: 1px solid #D2D9EB;
    }
  }
}
.card {
  .card-image {
    height: 75px !important;
    figure, p, img {
      height: 75px !important;
    }
    img {
      width: 100%;
      object-fit: contain;
      border-radius: 6px !important;
    }
  }
}

.switch-button {
  background: #D7DCEE;
  border-radius: 6px;
  overflow: hidden;
  width: 80px;
  text-align: center;
  font-size: 18px;
  letter-spacing: 1px;
  color: #155FFF;
  position: relative;
  padding: 4px 40px 4px 4px;
  position: relative;

  &:before {
    content: url('@/assets/img/icons/list-ul.svg');
    position: absolute;
    top: 9px;
    bottom: 0;
    right: 1px;
    width: 40px;
    align-items: center;
    justify-content: center;
    z-index: 3;
    pointer-events: none;
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
      transform: translateX(36px);
      transition: transform 300ms linear;
    }

    & + .switch-button-label {
      position: relative;
      padding: 1px 0;
      display: block;
      user-select: none;
      pointer-events: none;

      &:before {
        content: "";
        padding: 1px 0;
        background: #F6F7FF;
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        border-radius: 6px;
        transform: translateX(0);
        transition: transform 300ms;
      }

      .switch-button-label-span {
        position: relative;
        top: 5px
      }
    }
  }
}

.image {
  max-height: 90px;
}

@media screen and (min-width: 1024px) {
  .column.is-1-desktop {
      flex: none;
      width: 8.33333337%;
      max-width: 76px;
  }
}

.grid {
  text-align: center;
}
@include touch {
  .columns {
    text-align: center;
  }
}
</style>
