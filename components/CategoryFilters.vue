<template>
  <div>
    <!-- <client-only>
      <carousel :pagination-enabled="false" :per-page-custom="[[768, 3], [1024, 5]]" class="columns mb-5">
        <slide v-for="(dapp, index) in effect_dapps" :key="dapp.value" class="column">
          <a
            href="#"
            :class="['dapp-' + index, filter === dapp.value ? 'is-active' : null]"
            class="box pt-1 pb-0"
            @mouseover="dapp.hover = true"
            @mouseleave="dapp.hover = false"
            @click.prevent="onClick(dapp.value)"
          >
            <div class="card-image has-text-centered">
              <img class="dapp-logo block" :src="dapp.hover || filter === dapp.value ? dapp.whiteUrl : dapp.normalUrl" alt="Image">
            </div>
          </a>
        </slide>
        <slide class="column py-3 is-2">
          <a href="#" class="box is-flat dapp-null" style="padding: 14px !important" @click.prevent="onClick()">
            <div class="card-image has-text-centered">
              <h4 class="is-size-5"><b>Show All</b></h4>
            </div>
          </a>
        </slide>
      </carousel>
    </client-only> -->
    <div class="is-pulled-left pt-4">
      <div v-if="filter" class="tags has-addons">
        <span
          class="tag is-capitalized"
          :class="{'is-dao': filter === 'dao', 'is-dao': filter === 'dao', 'is-socials': filter === 'socials', 'is-translate': filter === 'translate', 'is-captions': filter === 'captions'}"
        >{{ filter }}</span>
        <a class="tag is-delete" @click="$emit('categoryFilter')" />
      </div>
    </div>
  </div>
</template>
<script>
// import { Carousel, Slide } from 'vue-carousel'

export default {
  name: 'CategoryFilters',
  components: {
    // Carousel,
    // Slide
  },
  props: ['filter'],
  data () {
    return {
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
      this.$emit('categoryFilter', category)
    }
  }
}
</script>
<style lang="scss" scoped>
  a.box:hover, a.box.is-active {
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
  a.box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

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
