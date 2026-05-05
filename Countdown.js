/**
 * Foundation Events - Countdown Timer
 * Displays countdown to event with dynamic color transition
 */

/**
 * Parses the countdown date from the element.
 * @returns {number|null} - The parsed date in milliseconds or null if invalid.
 */
function getCountdownDate() {
	const dateElementSelector = CONFIG.countdown.dateElements.join(', ');
	const dateElement = document.querySelector(dateElementSelector);
	if (dateElement) {
		const rawDate = dateElement.getAttribute("datetime") || dateElement.textContent.trim();
		const date = Date.parse(rawDate);
		if (!isNaN(date)) {
			return date;
		}
	}
	console.error("Invalid or missing countdown date.");
	return null;
}

/**
 * Hides the countdown section if the date is invalid.
 */
function hideCountdownElements() {
	const dateSection = document.getElementById("date");
	if (dateSection) {
		dateSection.style.display = "none";
	}
}

/**
 * Calculates progress color between two RGB colors
 * @param {number} distance - Milliseconds until countdown date
 * @returns {string} - RGB color string
 */
function getProgressColor(distance) {
	const config = CONFIG.countdown;
	const { colorScaleWindowMs, startColor, endColor } = config;

	const clampedDistance = Math.min(Math.max(distance, 0), colorScaleWindowMs);
	const progress = 1 - (clampedDistance / colorScaleWindowMs);
	const clampedProgress = Math.min(1, Math.max(0, progress));

	const r = Math.round(startColor.r + (endColor.r - startColor.r) * clampedProgress);
	const g = Math.round(startColor.g + (endColor.g - startColor.g) * clampedProgress);
	const b = Math.round(startColor.b + (endColor.b - startColor.b) * clampedProgress);

	return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Starts the countdown timer and updates the display
 * @param {number} countDownDate - The target date in milliseconds
 */
function startCountdown(countDownDate) {
	const countdownElement = document.getElementById("countdown");
	if (!countdownElement) {
		console.error("Countdown element not found.");
		return;
	}

	countdownElement.style.whiteSpace = "nowrap";
	countdownElement.style.transition = "color 0.9s linear";

	const updateCountdown = () => {
		const now = Date.now();
		const distance = countDownDate - now;

		if (distance < 0) {
			clearInterval(intervalId);
			countdownElement.textContent = "EXPIRED";
			const expiredColor = CONFIG.countdown.endColor;
			countdownElement.style.color = `rgb(${expiredColor.r}, ${expiredColor.g}, ${expiredColor.b})`;
			return;
		}

		const days = Math.floor(distance / (1000 * 60 * 60 * 24));
		const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((distance % (1000 * 60)) / 1000);

		countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
		countdownElement.style.color = getProgressColor(distance);
	};

	const intervalId = setInterval(updateCountdown, CONFIG.countdown.updateIntervalMs);
	updateCountdown();
}

// Main logic
document.addEventListener('DOMContentLoaded', function () {
	const countDownDate = getCountdownDate();
	if (countDownDate !== null) {
		startCountdown(countDownDate);
	} else {
		hideCountdownElements();
	}
});