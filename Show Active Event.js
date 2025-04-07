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
			// Show the link if it matches the active event, otherwise hide it
			linkElement.style.display = activeEvent && event.url === activeEvent.url ? "block" : "none";
		}
	});

	if (errorElement) {
		// Show the error message if no active event exists
		errorElement.style.display = activeEvent ? "none" : "block";
		errorElement.textContent = activeEvent ? "" : "No active event found.";
	}
}

// Main logic
(async function () {
	// Find the active event based on the current URL
	const activeEvent = eventPages.find(event => window.location.href.includes(event.url));
	handleEventVisibility(eventPages, activeEvent);
})();