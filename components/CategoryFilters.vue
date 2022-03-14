<template>
  <div>
    <carousel :pagination-enabled="false" :per-page-custom="[[768, 3], [1024, 5]]" class="columns">
      <slide v-for="(dapp, index) in effect_dapps" :key="dapp.value" class="column">
        <a
          href="#"
          :class="['dapp-' + index, filter === dapp.value ? 'is-active' : null]"
          class="card is-flat"
          @mouseover="dapp.hover = true"
          @mouseleave="dapp.hover = false"
          @click.prevent="onClick(dapp.value)"
        >
          <div class="card-image has-text-centered">
            <img class="dapp-logo block" :src="dapp.hover || filter === dapp.value ? dapp.whiteUrl : dapp.normalUrl" alt="Image">
          </div>
        </a>
      </slide>
      <slide class="column is-2">
        <a href="#" class="card is-flat dapp-null" @click.prevent="onClick(null)">
          <div class="card-image has-text-centered">
            <h4 class="is-size-5"><b>Show All</b></h4>
          </div>
        </a>
      </slide>
    </carousel>
  </div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel'

export default {
  name: 'CategoryFilters',
  components: {
    Carousel,
    Slide
  },
  data () {
    return {
      filter: null,
      selectSort: null,
      effect_dapps: {
        dao: {
          hover: false,
          value: 'dao',
          normalUrl: 'https://effect.network/_nuxt/img/effect-dao_h100.62b6528.png',
          whiteUrl: 'https://effect.network/_nuxt/img/effect-dao_white_h100.8128b59.png'
        },
        socials: {
          hover: false,
          value: 'socials',
          normalUrl: 'https://effect.network/_nuxt/img/effect-socials_h100.4f0f9f8.png',
          whiteUrl: 'https://effect.network/_nuxt/img/effect-socials_white_h100.aaa70fd.png'
        },
        translate: {
          hover: false,
          value: 'translate',
          normalUrl: 'https://effect.network/_nuxt/img/effect-translate_h100.61861ae.png',
          whiteUrl: 'https://effect.network/_nuxt/img/effect-translate_white_h100.d698b51.png'
        },
        captions: {
          hover: false,
          value: 'captions',
          normalUrl: 'https://effect.network/_nuxt/img/effect-captions_h100.2b22d0c.png',
          whiteUrl: 'https://effect.network/_nuxt/img/effect-captions_white_h100.d746459.png'
        }
      }
    }
  },
  methods: {
    onClick (category) {
      this.filter = category
      this.$emit('clicked', this.filter)
    }
  }
}
</script>
<style lang="scss" scoped>
  a.card:hover, a.card.is-active {
    &.dapp-dao {
      background: $dao-color;
    }
    &.dapp-socials {
      background:$socials-color;
    }
    &.dapp-captions {
      background: $captions-color;
    }
    &.dapp-translate {
      background: $translate-color;
    }

  }
  a.card {
    display: flex;
    justify-content: center;
    align-items: center;

    &.dapp-null {
      min-height: 70px
    }
    .card-image {
      padding: 5px;

      .dapp-logo {
        max-height: 50px;
      }
    }
  }
</style>
