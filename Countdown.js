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

	const intervalId = setInterval(() => {
		const now = Date.now();
		const distance = countDownDate - now;

		if (distance < 0) {
			clearInterval(intervalId);
			countdownElement.textContent = "EXPIRED";
			return;
		}

		const days = Math.floor(distance / (1000 * 60 * 60 * 24));
		const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((distance % (1000 * 60)) / 1000);

		countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
	}, 1000);
}

// Main logic
const countDownDate = getCountdownDate();
if (countDownDate) {
	startCountdown(countDownDate);
} else {
	hideCountdownElements();
}