<template>
  <div class="has-text-centered">
    <h1 v-if="error.statusCode === 404" class="title has-text-danger-dark">
      Page not found
    </h1>
    <h1 v-else class="title has-text-danger-dark">
      An error occurred
    </h1>
    <a class="button" @click.prevent="forceHomepage">
      Home page
    </a>
  </div>
</template>

<script>

export default {
  layout: 'box',
  props: ['error'],
  data () {
    return {
    }
  },

  computed: {
  },

  methods: {
    forceHomepage () {
      window.location.href = '/'
    }
  }
}
</script>
