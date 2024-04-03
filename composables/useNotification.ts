type Notification = {
  message: string;
  type: "error" | "success" | "info" | "warning";

  duration: number;
  created: Date;
  icon?: string;
};

const notifications: Ref<Notification[]> = ref([]);

export const useNotification = () => {
  const removeNotification = (notification: Notification) => {
    const index = notifications.value.indexOf(notification);

    if (index !== -1) {
      notifications.value.splice(index, 1);
    }
  };

  const notify = ({
    message,
    type,
    duration = 5000,
  }: {
    message: string;
    type: Notification["type"];
    duration?: number;
  }) => {
    const notification: Notification = {
      message,
      type,
      duration,
      created: new Date(),
    };

    notifications.value.push(notification);

    setTimeout(() => {
      removeNotification(notification);
    }, duration);
  };

  return {
    removeNotification,
    notifications,
    notify,
  };
};
