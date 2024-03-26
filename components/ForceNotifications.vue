<template>
  <div class="notification-container">
    <div
      v-for="notification in notifications"
      @click="doRemoveNotification(notification.created)"
      class="notification"
      :class="notification.type"
    >
      {{ notification.message }}
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
  padding: 1rem;
  margin-top: 1rem;
  color: #fff;
  cursor: pointer;
  background-color: #333;
  border-radius: 0.5rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
}

.notification.error {
  background-color: #ff4136;
}
</style>
