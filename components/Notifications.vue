<template>
  <aside class="drawer is-marginless">
    <header class="drawer-header">
      <p class="subtitle mb-0">Notifications</p>
      <span class="delete" @click="$parent.showNotifications = false" />
    </header>

    <div class="drawer-body" id="notifications">
      <div class="drawer-block">
        <div v-if="false" class="notification-list">
          <div
            v-for="(notification, index) in notifications"
            :key="index"
            class="notification-card"
            :class="{'clickable': notification.submission_id}"
            @click="notificationAction(notification)"
          >
            <div class="notification-type" :class="'notification-type-' + getNotificationTypeName(notification.type)">
              <span class="notification-icon" />
              {{ getNotificationTranslation('notifications.type.' + getNotificationTypeName(notification.type)) }}
            </div>
            <div class="notification-date">
              {{ getTimeAgo(notification.createdAt) }}
            </div>
            <span class="clearfix" />
            <div v-if="notification.requesterName" class="notification-requester">
              <span>by</span>
              {{ notification.requesterName }}
            </div>
            <div v-if="notification.taskGroupName" class="notification-campaign">
              <span>for</span>
              {{ notification.taskGroupName }}
            </div>
            <div
              v-if="notification.qualificationId && notification.qualificationType !== 'SKILL'"
              class="notification-qualification"
            >
              <img
                v-if="notification.qualificationImage"
                :src="notification.qualificationImage"
                class="badge-icon"
                onerror="this.onerror=null;this.src='/static/badges/default.svg'"
              >
              <img
                v-else
                src="/static/badges/default.svg"
                class="badge-icon"
              >
            </div>
            <div
              v-if="notification.type === 'PUBLIC_QUALIFICATION_ASSIGNED'"
              class="notification-message"
              v-html="'test'"
            />
            <div
              v-else-if="notification.type === 'PUBLIC_SKILL_ASSIGNED'"
              class="notification-message"
              v-html="'test2'"
            />
            <div v-if="notification.message" class="notification-message">
              {{ notification.message }}
            </div>
          </div>
        </div>
        <div v-if="loading">
          Loading..
        </div>
        <div v-if="allNotificationsLoaded" class="text-center no-more-tasks">
          No more notifications
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'Notifications',
  components: {},
  data () {
    return {
      notifications: [],
      loading: false,
      page: 0,
      allNotificationsLoaded: false,
      badgeBucket: process.env.BADGE_BUCKET
    }
  },
  created () {
    this.getNotifications()
  },
  mounted () {
    document.getElementById('notifications').addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    document.getElementById('notifications').removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    notificationAction (notification) {
      if (notification && notification.submission_id) {
        this.$router.push({
          name: 'submission-page',
          params: { campaignId: notification.task_group_id, submissionId: notification.submission_id }
        })
        this.$parent.toggleNotifications(false)
      }
    },
    getNotificationTranslation (type) {
      // for some reason this is not executioning:
      // this.$te(type) -- always returns false, even if key exists!
      // so we use the following hack:
      return this.$t(type) !== type
        ? this.$t(type)
        : this.$t('notifications.type.default')
    },
    getNotificationTypeName (type) {
      // return kebabCase(type)
      return type
    },
    isInfiniteLoadingAllowed () {
      return !this.allNotificationsLoaded && !this.loading
    },
    getTimeAgo (date) {
      return this.$moment(date).fromNow()
    },
    getNotifications () {
      this.loading = true
      this.$axios.get(window.API_BASE_URL + '/user/notifications?page=' + this.page)
        .then((response) => {
          const notifications = response.data.notifications
          if (!notifications || notifications.length === 0) {
            this.allNotificationsLoaded = true
          }
          this.notifications = this.notifications.concat(notifications)
          this.loading = false
        }, (error) => {
          console.error(error)
          this.loading = false
        })
      this.page++
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
.notification-title {
  padding-left: 36px;
  text-transform: uppercase;
  color: $blue;
  font-size: 14px;
  background: $white-ter;
  height: 28px;
  display: flex;
  letter-spacing: 1.1px;
  align-items: center;
  margin-bottom: 50px;
}

.notification-close {
  margin-left: auto;
  color: $black;
  background: $light;
  border-radius: 10px;
  width: 20px;
  height: 20px;
  float: right;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: $grey;
  }
}

.notification-card {
  position: relative;
  border-bottom: 1px solid $light;
  padding: 25px 36px 25px 68px;

  &.clickable:hover {
    background: $lightblue;
  }

  &:before {
    content: "";
    display: block;
    position: absolute;
    height: 100%;
    left: 43px;
    top: 0;
    border-left: 1px solid $light;
  }

  &:nth-child(1) {
    padding-top: 0;
  }

  .notification-type {
    position: relative;
    float: left;

    .notification-icon {
      $size: 15px;
      width: $size;
      height: $size;
      border: 1px solid $white-bis;
      box-shadow: -1px 1px 4px 0 rgba(55, 70, 95, 0.12);
      left: -25px - $size/2;
      top: 2px;
      position: absolute;
      border-radius: 10px;

      &:before {
        width: $size - 2;
        height: $size - 2;
        content: "";
        display: block;
        background: $light;
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

  .notification-date {
    float: right;
    color: $grey;
  }

  .notification-campaign, .notification-requester {
    color: $lightblue;

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
