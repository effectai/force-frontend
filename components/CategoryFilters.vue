<template>
  <div class="columns">
    <div v-for="(dapp, index) in effect_dapps" :key="dapp.value" class="column">
      <a
        href="#"
        :class="['dapp-' + index, filter === dapp.value ? 'is-active' : null]"
        class="card is-flat is-hoverable"
        @mouseover="dapp.hover = true"
        @mouseleave="dapp.hover = false"
        @click.prevent="onClick(dapp.value)"
      >
        <div class="card-image has-text-centered">
          <img class="dapp-logo block mt-2" :src="dapp.hover || filter === dapp.value ? dapp.whiteUrl : dapp.normalUrl" alt="Image">
        </div>
      </a>
    </div>
    <div class="column is-2">
      <a href="#" class="card is-flat is-hoverable" @click.prevent="onClick(null)">
        <div class="card-content has-text-centered">
          <h4 class="is-size-5"><b>Show All</b></h4>
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
      filter: null,
      effect_dapps: {
        dao: {
          hover: false,
          value: 'translation',
          normalUrl: 'https://effect.network/_nuxt/img/effect-dao_h100.62b6528.png',
          whiteUrl: 'https://effect.network/_nuxt/img/effect-dao_white_h100.8128b59.png'
        },
        socials: {
          hover: false,
          value: 'image_classification',
          normalUrl: 'https://effect.network/_nuxt/img/effect-socials_h100.4f0f9f8.png',
          whiteUrl: 'https://effect.network/_nuxt/img/effect-socials_white_h100.aaa70fd.png'
        },
        translate: {
          hover: false,
          value: 'video_classification',
          normalUrl: 'https://effect.network/_nuxt/img/effect-translate_h100.61861ae.png',
          whiteUrl: 'https://effect.network/_nuxt/img/effect-translate_white_h100.d698b51.png'
        },
        captions: {
          hover: false,
          value: 'text_classification',
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
