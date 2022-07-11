<template>
  <div>
    <client-only>
      <carousel :pagination-enabled="false" :per-page-custom="[[768, 3], [1024, 5]]" class="columns mb-5">
        <slide class="column py-3 is-2">
          <a href="#" class="box is-flat dapp-null" style="padding: 14px !important" @click.prevent="onFilter()">
            <div class="has-text-centered">
              <h4 class="is-size-5"><b>All Tasks</b></h4>
            </div>
          </a>
        </slide>
        <slide v-for="option in options" :key="option" class="column">
          <a
            href="#"
            :class="['option-' + option, filter === option ? 'is-active' : null]"
            class="box pt-1 pb-0"
            @click.prevent="onFilter(option)"
          >
            <div class="has-text-centered">
              <h4 class="is-size-5"><b>{{ option }}<span v-if="option === 'qualifier'">s</span></b></h4>
            </div>
          </a>
        </slide>
      </carousel>
    </client-only>
  </div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel'

export default {
  name: 'JoinableFilters',
  components: {
    Carousel,
    Slide
  },
  props: ['filter', 'campaigns'],
  data () {
    return {
      unmoderated: false,
      options: ['joinable', 'unjoinable', 'qualifier']
    }
  },
  methods: {
    onFilter (filter) {
      this.$emit('joinableFilter', filter)
    }
  }
}
</script>
<style lang="scss" scoped>
  a.box:hover, a.box.is-active {
    color: $text !important;
    &.option-joinable {
      color: $white !important;
      border-color: $annotations-color;
      background: $annotations-color;
    }
    &.option-unjoinable {
      color: $white !important;
      border-color: $captions-color;
      background:$captions-color;
    }
    &.option-qualifier {
      color: $white !important;
      background: $qualifier-color;
    }
  }
  a.box {
    transition: 0.2s;
    text-transform: capitalize;
    &.option-joinable {
      color:$annotations-color;
    }
    &.option-unjoinable {
      color:$captions-color;
    }
    &.option-qualifier {
      color: $qualifier-color;
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
