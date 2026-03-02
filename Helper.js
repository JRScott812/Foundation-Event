const defaultImageSrc = 'Assets/Foundation/Foundation Image Not Found.svg';
const images = document.querySelectorAll('img');

images.forEach(img => {
	// Set default image if src is empty or missing
	if (!img.getAttribute('src') || img.getAttribute('src').trim() === '') {
		img.setAttribute('src', defaultImageSrc);
	}

	// error event listener to handle broken image links
	img.addEventListener('error', function () {
		img.setAttribute('src', defaultImageSrc);
	});
});

document.addEventListener('DOMContentLoaded', function () {
	const currentPath = window.location.pathname;
	const currentFileFromPath = currentPath.split('/').pop();
	const currentFile = currentFileFromPath === '' ? 'index.html' : currentFileFromPath;
	const navLinks = document.querySelectorAll('nav a');

	navLinks.forEach(link => {
		const linkHref = link.getAttribute('href');

		// Direct filename match (handles spaces and special characters)
		if (linkHref === currentFile) {
			link.classList.add('current-page');
		}
		// Handle URL-encoded spaces (%20)
		else if (decodeURIComponent(linkHref) === decodeURIComponent(currentFile)) {
			link.classList.add('current-page');
		}
		// Fallback: check if current path contains the link name (excluding index.html)
		else if (linkHref !== 'index.html' && currentPath.includes(linkHref.replace('.html', ''))) {
			link.classList.add('current-page');
		}
	});
});