<template>
  <div ref="notifications" class="drawer-body">

    <!-- <div class="buttons is-centered"> -->
      <!-- <button class="button is-fullwidth is-primary mx-3 px-3" @click="createNotification"> -->
        <!-- Add notification -->
      <!-- </button> -->
    <!-- </div> -->
    <div v-if="notifications" class="notification-list">
      <div
        v-for="(notification, index) in notifications.slice().reverse()"
        :key="index"
        class="notification-card"
        :class="{'clickable': notification.submission_id}"
        @click="notificationAction(notification)"
      >
        <!-- <div>{{ index }}{{ notification }}</div> -->
        <div class="notification-type" :class="'notification-type-' + getNotificationTypeName(notification.type)">
          <span class="notification-icon" />
          <span v-if="notification.type === 'WORK_MESSAGE'">Comment on Task</span>
          <span v-else-if="notification.type === 'QUALIFICATION_ACCEPTED'">Accepted</span>
          <span v-else-if="notification.type === 'QUALIFICATION_REJECTED'">Rejected</span>
          <span v-else-if="notification.type === 'PUBLIC_SKILL_ASSIGNED'">Qualification received</span>
          <span v-else-if="notification.type === 'PUBLIC_QUALIFICATION_ASSIGNED'">Badge received</span>
          <span v-else>Notification</span>
        </div>
        <div class="has-text-grey-light is-size-7 is-pulled-right">
          {{ getTimeAgo(notification.createdAt) }}
        </div>
        <span class="is-clearfix" />
        <div v-if="notification.account_id" class="notification-requester is-size-7">
          <span>&nbsp;by</span>
          <nuxt-link :to="`/profile/${notification.account_id}`">
            {{ notification.account_id }}
          </nuxt-link>
        </div>
        <div v-if="notification.taskGroupName" class="notification-campaign is-size-7">
          <span>for</span>
          {{ notification.taskGroupName }}
        </div>
        <div
          v-if="notification.qualificationId && notification.qualificationType !== 'SKILL'"
          class="notification-qualification"
        >
          <img
            v-if="notification.qualification_image"
            :src="notification.qualification_image"
            class="badge-icon"
            onerror="this.onerror=null;this.src='@/assets/img/icons/info.svg'"
          >
          <img
            v-else
            :src="require(`~/assets/img/dapps/effect-force-icon.png`)"
            class="badge-icon"
          >
        </div>
        <div
          v-if="notification.type === 'PUBLIC_QUALIFICATION_ASSIGNED'"
          class="notification-message"
        >
          You have a new badge! Qualification: <b>{{ notification.qualificationName }}</b>. You can find your badges in your profile page
        </div>
        <div
          v-else-if="notification.type === 'PUBLIC_SKILL_ASSIGNED'"
          class="notification-message"
        >
          You have a new skill! Qualification: <b>{{ notification.qualificationName }}</b>. You can find your qualifications in your profile page
        </div>
        <div v-if="notification.message" class="notification-message">
          {{ notification.message }}
        </div>
      </div>
      <div class="buttons is-centered">
        <button class="button is-fullwidth is-danger m-3 p-3" @click="clearNotifications">
          Clear
        </button>
      </div>
    </div>
    <div v-else class="p-2 has-text-centered">
      No notifications ✔
    </div>
    <!-- <div v-if="loading" class="p-2 has-text-centered loading-text"> -->
      <!-- Loading -->
    <!-- </div> -->
    <!-- <div v-else-if="!notifications" class="p-2 has-text-centered"> -->
      <!-- Could not retrieve notifications -->
    <!-- </div> -->
    <!-- <div v-if="allNotificationsLoaded" class="has-text-centered p-2"> -->
      <!-- No more notifications -->
    <!-- </div> -->
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import kebabCase from 'lodash/kebabCase'

export default {
  name: 'Notifications',
  components: {},
  data () {
    return {
      // notifications: null,
      loading: false,
      page: 0,
      allNotificationsLoaded: false
    }
  },
  computed: {
    ...mapState({
      notifications: state => state.notification.notifications
    }),
    ...mapGetters({
      getAllNotifications: 'notification/getAllNotifications'
    })
  },
  created () {
    this.getNotifications()
  },
  mounted () {
    this.$refs.notifications.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    this.$refs.notifications.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    ...mapActions({
      addNotification: 'notification/addNotification',
      clearNotifications: 'notification/clearNotifications'
    }),
    createNotification () {
      // TODO Test method for creating notifications, to be removed later
      const notification = {
        type: 'QUALIFICATION_ACCEPTED',
        message: 'You QUALIFICATIONe been accepted to the task group',
        taskGroupName: 'Task Group Name',
        account_id: 'Requester Name',
        requesterId: 'Requester Id',
        taskGroupId: 'Task Group Id',
        submissionId: 'Submission Id'
      }
      this.$utils.addNotificationToastNewQualification(notification)
    },
    async notificationAction (notification) {
      if (notification && notification.submission_id) {
        this.$router.push({
          name: 'submission-page',
          params: { campaignId: notification.task_group_id, submissionId: notification.submission_id }
        })
        this.$parent.showNotifications = false
      } else if (notification && notification.account_id) {
        const vaccount = await this.$blockchain.getVAccountById(notification.account_id).catch((err) => {
          console.error(err)
        })
        console.log(vaccount)
        this.$router.push({
          path: `/profile/${vaccount[0].address[1]}`
        })
      }
    },
    getNotificationTypeName (type) {
      return kebabCase(type)
    },
    isInfiniteLoadingAllowed () {
      return !this.allNotificationsLoaded && !this.loading
    },
    getTimeAgo (date) {
      return this.$moment(date).fromNow()
    },
    getNotifications () {
      // alert('Notifications coming soon!')

      // try {
      //   this.loading = true
      //   const response = await this.$axios.$get(process.env.NUXT_ENV_BACKEND_URL + '/user/notifications?page=' + this.page)
      //   const notifications = response.notifications
      //   if (!notifications || notifications.length === 0) {
      //     this.allNotificationsLoaded = true
      //   }

      //   this.notifications = this.notifications ? this.notifications.concat(notifications) : notifications
      //   this.page++
      //   this.$emit('get-notifications')
      // } catch (error) {
      //   this.$blockchain.handleError(error)
      // }
      // this.loading = false
    },
    handleScroll () {
      // Trigger get new notifications when almost at the bottom of scrolling through the notifications
      if ((document.getElementById('notifications').scrollTop + document.getElementById('notifications').clientHeight + 100 >= document.getElementById('notifications').scrollHeight) && (this.isInfiniteLoadingAllowed())) {
        this.getNotifications()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.notification-card {
  position: relative;
  border-bottom: 1px solid $lightblue;
  padding: 25px 36px 25px 68px;

  &.clickable:hover {
    background: $light;
    cursor: pointer;
  }

  &:before {
    content: "";
    display: block;
    position: absolute;
    height: 100%;
    left: 43px;
    top: 0;
    border-left: 1px solid $lightblue;
  }

  .notification-type {
    position: relative;
    float: left;

    .notification-icon {
      $size: 16px;
      width: $size;
      height: $size;
      border: 1px solid $white-bis;
      box-shadow: -1px 1px 4px 0 rgba(55, 70, 95, 0.12);
      left: -24px - $size/2;
      top: 2px;
      position: absolute;
      border-radius: 10px;

      &:before {
        width: $size - 2;
        height: $size - 2;
        content: "";
        display: block;
        background: $grey-lighter;
        border-radius: 10px;
        border: 3px solid $white;
      }
    }

    &.notification-type-task-group-rejected .notification-icon:before {
      background: $red;
    }

    &.notification-type-task-group-accepted .notification-icon:before {
      background: $green;
    }

    &.notification-type-work-message .notification-icon:before {
      background: $blue;
    }

    &.notification-type-public-qualification-assigned .notification-icon:before {
      background: $green;
    }

    &.notification-type-public-skill-assigned .notification-icon:before {
      background: $green;
    }
  }

  .notification-campaign, .notification-requester {
    color: $primary;

    span {
      color: $grey;
      width: 20px;
      font-size: 13px;
      display: inline-block;
    }
  }

  .notification-message {
    background: $white-bis;
    padding: 6px 15px;
    margin-top: 10px;
  }
}

.badge-icon {
  height: 35px;
}
</style>
