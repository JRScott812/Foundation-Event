/**
 * Foundation Events - Helper Functions
 * Handles image fallbacks and navigation highlighting
 */

import { CONFIG } from './config.js'

// Initialize image error handling
function initializeImageHandling () {
	const fallbackImage = CONFIG.fallbackImage
	const images = document.querySelectorAll('img')

	images.forEach(img => {
		// Set default image if src is empty or missing
		if (!img.getAttribute('src') || img.getAttribute('src').trim() === '') {
			img.setAttribute('src', fallbackImage)
		}

		// Error event listener to handle broken image links
		const onImageError = function () {
			// Prevent recursive error loops if the fallback image is missing
			if (img.getAttribute('src') === fallbackImage) {
				img.removeEventListener('error', onImageError)
				return
			}
			img.setAttribute('src', fallbackImage)
		}

		img.addEventListener('error', onImageError)
	})
}

// Initialize navigation highlighting
function initializeNavigation () {
	const currentPath = window.location.pathname
	const currentFileFromPath = currentPath.split('/').pop()
	const currentFile = currentFileFromPath === '' ? 'index.html' : currentFileFromPath
	const navLinks = document.querySelectorAll('header nav a')

	const safeDecode = function (value) {
		try {
			return decodeURIComponent(value)
		} catch (e) {
			return value
		}
	}

	const normalizedCurrentFile = safeDecode(currentFile)

	navLinks.forEach(link => {
		const linkHref = link.getAttribute('href')
		if (!linkHref) return

		const normalizedHref = safeDecode(linkHref)
		const hrefStem = normalizedHref.replace('.html', '')

		// Direct filename match (handles spaces and special characters)
		if (normalizedHref === normalizedCurrentFile) {
			link.classList.add(CONFIG.nav.activeClass)
			return
		}

		// Stem match (handles .html extension variations)
		const filePath = normalizedCurrentFile.replace('.html', '')
		if (hrefStem === filePath) {
			link.classList.add(CONFIG.nav.activeClass)
			return
		}

		// Fallback: check if current path contains the link name (excluding index.html)
		if (normalizedHref !== 'index.html' && currentPath.includes(hrefStem)) {
			link.classList.add(CONFIG.nav.activeClass)
		}
	})
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', function () {
		initializeImageHandling()
		initializeNavigation()
	})
} else {
	// If the DOM is already loaded, run immediately
	initializeImageHandling()
	initializeNavigation()
}
