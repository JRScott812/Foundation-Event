const defaultImageSrc = 'Assets/Foundation/Foundation Image Not Found.svg';
const images = document.querySelectorAll('img');

images.forEach(img => {
	// Set default image if src is empty or missing
	if (!img.getAttribute('src') || img.getAttribute('src').trim() === '') {
		img.setAttribute('src', defaultImageSrc);
	}

	// error event listener to handle broken image links
	const onImageError = function () {
		// Prevent recursive error loops if the fallback image is missing.
		if (img.getAttribute('src') === defaultImageSrc) {
			img.removeEventListener('error', onImageError);
			return;
		}
		img.setAttribute('src', defaultImageSrc);
	};

	img.addEventListener('error', onImageError);
});

document.addEventListener('DOMContentLoaded', function () {
	const currentPath = window.location.pathname;
	const currentFileFromPath = currentPath.split('/').pop();
	const currentFile = currentFileFromPath === '' ? 'index.html' : currentFileFromPath;
	const navLinks = document.querySelectorAll('header nav a');

	const safeDecode = function (value) {
		try {
			return decodeURIComponent(value);
		} catch {
			return value;
		}
	};

	const normalizedCurrentFile = safeDecode(currentFile);

	navLinks.forEach(link => {
		const linkHref = link.getAttribute('href');
		if (!linkHref) {
			return;
		}

		const normalizedHref = safeDecode(linkHref);
		const hrefStem = normalizedHref.replace('.html', '');

		// Direct filename match (handles spaces and special characters)
		if (normalizedHref === normalizedCurrentFile) {
			link.classList.add('current-page');
		}
		// Fallback: check if current path contains the link name (excluding index.html)
		else if (normalizedHref !== 'index.html' && currentPath.includes(hrefStem)) {
			link.classList.add('current-page');
		}
	});
});