import { eventPages } from "./Event Pages.js";

/**
 * Fetches the emoji from the <title> tag of a given HTML file.
 * @param {Object} file - The file object containing id and url.
 * @returns {Promise<Object>} - An object containing the id and emoji.
 */
async function getEmojiFromTitle(file) {
	try {
		const response = await fetch(file.url);
		const html = await response.text();
		const parser = new DOMParser();
		const doc = parser.parseFromString(html, "text/html");
		const title = doc.querySelector("title");
		if (title) {
			const emoji = title.textContent.trim().substring(0, 2);
			return { id: file.id, emoji };
		}
	} catch (error) {
		console.error(`Error fetching or parsing ${file.url}:`, error);
	}
	return { id: file.id, emoji: null };
}

/**
 * Updates the navigation bar with links for each event page.
 * @param {Array} eventPages - The list of event pages.
 */
function updateNavBar(eventPages) {
	const navList = document.querySelector("nav ul"); // Get the <ul> inside the <nav>
	if (!navList) {
		console.error("Navigation list not found.");
		return;
	}

	eventPages.forEach(file => {
		// Create a new <li> element
		const listItem = document.createElement("li");
		const link = document.createElement("a");
		link.href = file.url;
		link.textContent = `${file.name}`;
		listItem.appendChild(link);

		// Append the <li> to the <ul>
		navList.appendChild(listItem);
	});
}

// Call the function to update the navigation bar
updateNavBar(eventPages);