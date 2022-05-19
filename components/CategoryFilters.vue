<template>
  <div>
    <client-only>
      <carousel :pagination-enabled="false" :per-page-custom="[[768, 3], [1024, 5]]" class="columns mb-5">
        <slide class="column py-3 is-2">
          <a href="#" class="box is-flat dapp-null" style="padding: 14px !important" @click.prevent="onClick()">
            <div class="has-text-centered">
              <h4 class="is-size-5"><b>All Tasks</b></h4>
            </div>
          </a>
        </slide>
        <slide v-for="dapp in effect_dapps" :key="dapp" class="column">
          <a
            href="#"
            :class="['dapp-' + dapp, filter === dapp ? 'is-active' : null]"
            class="box pt-1 pb-0"
            @click.prevent="onClick(dapp)"
          >
            <div class="has-text-centered">
              <h4 class="is-size-5"><b>{{ dapp }}<span v-if="dapp === 'qualifier'">s</span></b></h4>
            </div>
          </a>
        </slide>
      </carousel>
    </client-only>
    <div class="is-pulled-left pt-4">
      <div v-if="filter" class="tags has-addons">
        <span
          class="tag is-capitalized"
          :class="['is-'+filter]"
        >{{ filter }}</span>
        <a class="tag is-delete" @click="$emit('categoryFilter')" />
      </div>
    </div>
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
  props: ['filter'],
  data () {
    return {
      effect_dapps: ['qualifier', 'annotations', 'socials']
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
    color: $text !important;
    &.dapp-qualifier {
      background: $qualifier-color;
    }
    &.dapp-socials {
      background:$socials-color;
    }
    &.dapp-annotations {
      background: $annotations-color;
    }
  }
  a.box {
    transition: 0.2s;
    text-transform: capitalize;
    &.dapp-qualifier {
      color: $qualifier-color;
    }
    &.dapp-socials {
      color:$socials-color;
    }
    &.dapp-annotations {
      color: $annotations-color;
    }
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    &.dapp-null {
      min-height: 70px
    }
  }
</style>
