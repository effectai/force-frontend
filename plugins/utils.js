import Vue from 'vue'

export default (context, inject) => {
  const utils = new Vue({
    data () {
      return {
        stuffHere: null
      }
    },
    computed: {
    },
    methods: {
    }
  })

  inject('utils', utils)
}
