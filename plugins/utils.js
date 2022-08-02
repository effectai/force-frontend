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
      /**
       * Global logout method
       */
      async logout () {
        context.store.dispatch('qualification/clearAssignedQualifications')
        await context.$auth.logout()
      }
    }
  })

  inject('utils', utils)
}
