<template>
  <div class="notification-container">
    <div
      v-for="(notification, i) in notifications"
      :key="i"
      :class="[notification.type, { 'has-icon': notification.icon }]"
      class="notification"
      @click="doRemoveNotification(notification.created)"
    >
      <span>
        <component
          :is="notification.icon"
          v-if="notification.icon"
          class="icon"
        />
        {{ notification.message }}
      </span>
      <ProgressBar
        :reverse="true"
        :progress="notification.progress"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { notifications, removeNotification } = useNotification();

const doRemoveNotification = (created: Date) => {
	removeNotification(notifications.value.find((n) => n.created === created)!);
};
</script>

<style>
.notification-container {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
}

.notification {
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding: 0.9rem 1rem 0rem 1rem;
  margin-top: 1rem;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  background-color: #333;
  border-radius: 0.5rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
}

.notification .progress-bar {
  height: 2px;
  margin-top: 0.5rem;
}

.notification.has-icon {
  display: flex;
  align-items: center;
}

.notification.has-icon span {
  display: flex;
  align-items: center;
}

.notification .icon {
  margin-right: 0.5rem;
  font-size: 20px;
}

.notification.success {
  background-color: #2ecc40;
}

.notification.error {
  background-color: #ff4136;
}

.notification.error .progress-bar .bar {
  background-color: #ff4136;
}
</style>
