import { eventPages } from "./Event Pages.js";

/**
 * Hides or shows event links and the error message based on the active event.
 * @param {Array} eventPages - The list of event pages.
 * @param {Object|null} activeEvent - The active event object or null.
 */
function handleEventVisibility(eventPages, activeEvent) {
	const errorElement = document.getElementById("error");

	eventPages.forEach(event => {
		const linkElement = document.getElementById(event.id);
		if (linkElement) {
			linkElement.style.display = activeEvent && event.url === activeEvent.url ? "block" : "none";
		}
	});

	if (errorElement) {
		errorElement.style.display = activeEvent ? "none" : "block";
	}
}

// Main logic
(async function () {
	const activeEvent = eventPages.find(event => window.location.href.includes(event.url));
	handleEventVisibility(eventPages, activeEvent);
})();