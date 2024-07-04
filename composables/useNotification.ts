type Notification = {
	message: string;
	type: "error" | "success" | "info" | "warning";

	duration: number;
	created: Date;
	progress: number;

	icon?: Component;
};

const notifications: Ref<Notification[]> = ref([]);

export const useNotification = () => {
	const removeNotification = (notification: Notification) => {
		const index = notifications.value.indexOf(notification);

		if (index !== -1) {
			notifications.value.splice(index, 1);
		}
	};

	const calculateNotificationProgress = (notification: Notification) => {
		const now = new Date();
		const elapsed = now.getTime() - notification.created.getTime();
		const progress = (elapsed / notification.duration) * 100;

		return progress;
	};

	const notify = ({
		message,
		type,
		duration = 5000,
		icon,
	}: {
		message: string;
		type: Notification["type"];
		duration?: number;
		icon?: Component;
	}) => {
		const notification: Notification = shallowReactive({
			message,
			type,
			duration,
			progress: 0,
			created: new Date(),
			icon,
		});

		const interval = setInterval(() => {
			notification.progress = calculateNotificationProgress(notification);
		}, 100);

		notifications.value.push(notification);

		setTimeout(() => {
			clearInterval(interval);
			removeNotification(notification);
		}, duration);
	};

	return {
		calculateNotificationProgress,
		removeNotification,
		notifications,
		notify,
	};
};
