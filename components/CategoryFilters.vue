<template>
  <div class="columns">
    <div class="column">
      <a href="#" class="card is-flat is-hoverable dapp-dao" @mouseover="effect_dapps.dao.hover = true" @mouseleave="effect_dapps.dao.hover = false" @click.prevent="onClick('translation')">
        <div class="card-image has-text-centered">
          <img class="dapp-logo block mt-2" :src="effect_dapps.dao.hover ? effect_dapps.dao.whiteUrl : effect_dapps.dao.normalUrl" alt="Image">
        </div>
      </a>
    </div>
    <div class="column">
      <a href="#" class="card is-flat is-hoverable dapp-socials" @mouseover="effect_dapps.socials.hover = true" @mouseleave="effect_dapps.socials.hover = false" @click.prevent="onClick('image_classification')">
        <div class="card-image has-text-centered">
          <img class="dapp-logo block mt-2" :src="effect_dapps.socials.hover ? effect_dapps.socials.whiteUrl : effect_dapps.socials.normalUrl" alt="Image">
        </div>
      </a>
    </div>
    <div class="column">
      <a href="#" class="card is-flat is-hoverable dapp-captions" @mouseover="effect_dapps.captions.hover = true" @mouseleave="effect_dapps.captions.hover = false" @click.prevent="onClick('text_classification')">
        <div class="card-image has-text-centered">
          <img class="dapp-logo block mt-2" :src="effect_dapps.captions.hover ? effect_dapps.captions.whiteUrl : effect_dapps.captions.normalUrl" alt="Image">
        </div>
      </a>
    </div>
    <div class="column">
      <a href="#" class="card is-flat is-hoverable dapp-translate" @mouseover="effect_dapps.translate.hover = true" @mouseleave="effect_dapps.translate.hover = false" @click.prevent="onClick('video_classification')">
        <div class="card-image has-text-centered">
          <img class="dapp-logo block mt-2" :src="effect_dapps.translate.hover ? effect_dapps.translate.whiteUrl : effect_dapps.translate.normalUrl" alt="Image">
        </div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CategoryFilters',
  data () {
    return {
      effect_dapps: {
        dao: {
          hover: false,
          normalUrl: 'https://effect.network/_nuxt/img/effect-dao_h100.62b6528.png',
          whiteUrl: 'https://effect.network/_nuxt/img/effect-dao_white_h100.8128b59.png'
        },
        socials: {
          hover: false,
          normalUrl: 'https://effect.network/_nuxt/img/effect-socials_h100.4f0f9f8.png',
          whiteUrl: 'https://effect.network/_nuxt/img/effect-socials_white_h100.aaa70fd.png'
        },
        translate: {
          hover: false,
          normalUrl: 'https://effect.network/_nuxt/img/effect-translate_h100.61861ae.png',
          whiteUrl: 'https://effect.network/_nuxt/img/effect-translate_white_h100.d698b51.png'
        },
        captions: {
          hover: false,
          normalUrl: 'https://effect.network/_nuxt/img/effect-captions_h100.2b22d0c.png',
          whiteUrl: 'https://effect.network/_nuxt/img/effect-captions_white_h100.d746459.png'
        }
      }
    }
  },
  methods: {
    onClick (category) {
      this.$emit('clicked', category)
    }
  }
}
</script>
<style lang="scss" scoped>
  a.card:hover {
    &.dapp-dao div.card-image {
      background: #d7ac00;
    }
    &.dapp-socials div.card-image {
      background:#06c6c6;
    }
    &.dapp-captions div.card-image {
      background: #e06375;
    }
    &.dapp-translate div.card-image {
      background: #00c165;
    }
  }
  .dapp-logo {
    max-height: 70px
  }
</style>
