/**
 * Extracts the emoji from the first two characters of the page's title.
 * @returns {string|null} - The extracted emoji or null if no title exists.
 */
function getEmojiFromTitle() {
	const titleElement = document.querySelector("title");
	if (titleElement) {
		return titleElement.textContent.trim().substring(0, 2);
	}
	console.error("Title element not found.");
	return null;
}

/**
 * Updates all <emojiIcon> elements with the extracted emoji.
 * @param {string} emoji - The emoji to insert into <emojiIcon> elements.
 */
function updateEmojiIcons(emoji) {
	const emojiTags = document.querySelectorAll("emojiIcon");
	emojiTags.forEach(tag => {
		tag.textContent = emoji;
	});
}

// Main logic
const emoji = getEmojiFromTitle();
if (emoji) {
	updateEmojiIcons(emoji);
}