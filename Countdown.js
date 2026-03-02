/**
 * Parses the countdown date from the <countdownDate> element.
 * @returns {number|null} - The parsed date in milliseconds or null if invalid.
 */
function getCountdownDate() {
	const dateElement = document.querySelector("countdownDate");
	if (dateElement) {
		const date = Date.parse(dateElement.textContent.trim());
		if (!isNaN(date)) {
			return date;
		}
	}
	console.error("Invalid or missing countdown date.");
	return null;
}

/**
 * Hides the countdown section and event poster if the date is invalid.
 */
function hideCountdownElements() {
	const dateSection = document.getElementById("date");
	if (dateSection) {
		dateSection.querySelectorAll("*").forEach(child => {
			child.style.display = "none";
		});
	}
	const posterElement = document.getElementById("current-event-poster");
	if (posterElement) {
		posterElement.style.display = "none";
	}
}

/**
 * Starts the countdown timer and updates the countdown display.
 * @param {number} countDownDate - The target date in milliseconds.
 */
function startCountdown(countDownDate) {
	const countdownElement = document.getElementById("countdown");
	if (!countdownElement) {
		console.error("Countdown element not found.");
		return;
	}

	countdownElement.style.whiteSpace = "nowrap";
	countdownElement.style.transition = "color 0.9s linear";

	const colorScaleWindowMs = 30 * 24 * 60 * 60 * 1000;
	const startColor = { r: 34, g: 197, b: 94 };
	const endColor = { r: 239, g: 68, b: 68 };

	const getProgressColor = (distance) => {
		const clampedDistance = Math.min(Math.max(distance, 0), colorScaleWindowMs);
		const progress = 1 - (clampedDistance / colorScaleWindowMs);
		const clampedProgress = Math.min(1, Math.max(0, progress));

		const r = Math.round(startColor.r + (endColor.r - startColor.r) * clampedProgress);
		const g = Math.round(startColor.g + (endColor.g - startColor.g) * clampedProgress);
		const b = Math.round(startColor.b + (endColor.b - startColor.b) * clampedProgress);

		return `rgb(${r}, ${g}, ${b})`;
	};

	const updateCountdown = () => {
		const now = Date.now();
		const distance = countDownDate - now;

		if (distance < 0) {
			clearInterval(intervalId);
			countdownElement.textContent = "EXPIRED";
			countdownElement.style.color = `rgb(${endColor.r}, ${endColor.g}, ${endColor.b})`;
			return;
		}

		const days = Math.floor(distance / (1000 * 60 * 60 * 24));
		const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((distance % (1000 * 60)) / 1000);

		countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
		countdownElement.style.color = getProgressColor(distance);
	};

	const intervalId = setInterval(updateCountdown, 1000);
	updateCountdown();
}

// Main logic
const countDownDate = getCountdownDate();
if (countDownDate) {
	startCountdown(countDownDate);
} else {
	hideCountdownElements();
}