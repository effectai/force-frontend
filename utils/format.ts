export const formatDateStringToTimeAgo = (date: string): string => {
	const currentDate = new Date();
	const givenDate = new Date(date);

	const seconds = Math.floor((currentDate - givenDate) / 1000);
	let interval = Math.floor(seconds / 31536000);

	if (interval > 1) {
		return interval + " years ago";
	}

	interval = Math.floor(seconds / 2592000);
	if (interval > 1) {
		return interval + " months ago";
	}

	interval = Math.floor(seconds / 86400);
	if (interval > 1) {
		return interval + " days ago";
	}

	interval = Math.floor(seconds / 3600);
	if (interval > 1) {
		return interval + " hours ago";
	}

	interval = Math.floor(seconds / 60);
	if (interval > 1) {
		return interval + " minutes ago";
	}

	return Math.floor(seconds) + " seconds ago";
};

export const formatSecondsToTime = (seconds: number): string => {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const remainingSeconds = Math.floor(seconds % 60);

	return `${hours}h ${minutes}m ${remainingSeconds}s`;
};
