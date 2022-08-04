import Vue from 'vue'
import { toast } from 'bulma-toast'

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
      // ...mapActions({
      //   addNotification: 'notification/addNotification'
      // }),
      // Global logout method
      async logout () {
        context.store.dispatch('qualification/clearAssignedQualifications')
        await context.$auth.logout()
      },
      addNotificationToastNewQualification (quali) {
        const rejected = quali.info.ishidden
        context.store.dispatch('notification/addNotification', {
          type: rejected ? 'QUALIFICATION_REJECTED' : 'QUALIFICATION_ACCEPTED',
          message: rejected ? 'Your qualification has been rejected.' : `Your qualification has been validated. You can now start working on campaigns that require the ${quali.info.name} qualification. You can find your qualification in the profile page.`,
          account_id: quali.account_id,
          taskGroupName: quali.info.name,
          qualification_id: quali.id,
          createdAt: new Date(),
          qualification_image: quali.info.image
        })

        toast({
          message: `Qualification ${quali.info.name} assigned to you.`,
          type: rejected ? 'is-danger' : 'is-success',
          // dismissible: true,
          // animate: { in: 'fadeIn', out: 'fadeOut' },
          position: 'bottom-center',
          closeOnClick: true,
          pauseOnHover: true,
          duration: 5000
        })
      }
    }
  })

  inject('utils', utils)
}
