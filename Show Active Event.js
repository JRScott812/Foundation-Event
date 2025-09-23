// Event pages with date (MM-DD, no year)
const eventPages = [
	{ id: "haunted-house-link", name: "Haunted House", url: "https://foundationevent.com/Haunted%20House.html", date: "10-31" },
	{ id: "parade-link", name: "Thanksgiving Parade", url: "https://foundationevent.com/Parade.html", date: "11-22" },
	{ id: "5k-link", name: "Foundation 5K", url: "https://foundationevent.com/5K.html", date: "04-17" }
];

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
			// Show the link if it matches the active event id, otherwise hide it
			linkElement.style.display = activeEvent && event.id === activeEvent.id ? "block" : "none";
		}
	});

	if (errorElement) {
		// Show the error message if no active event exists
		errorElement.style.display = activeEvent ? "none" : "block";
		errorElement.textContent = activeEvent ? "" : "No active event found.";
	}
}

// Main logic
(function () {
	// Get today's date in MM-DD format
	const today = new Date();
	const todayStr = (today.getMonth() + 1).toString().padStart(2, '0') + '-' + today.getDate().toString().padStart(2, '0');

	// Exclude home link from event selection
	const eventOnlyPages = eventPages.filter(event => event.id !== "home-link");

	// Find the next event (date >= today), sorted by soonest
	const upcomingEvents = eventOnlyPages
		.map(event => ({
			...event,
			eventDate: new Date(today.getFullYear(), parseInt(event.date.slice(0,2))-1, parseInt(event.date.slice(3,5)))
		}))
		.filter(event => {
			// If event date is today or later
			const eventMMDD = event.date;
			return eventMMDD >= todayStr;
		})
		.sort((a, b) => a.eventDate - b.eventDate);

		// If no upcoming events, show error (no active event)
		const activeEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : null;
		handleEventVisibility(eventPages, activeEvent);
})();