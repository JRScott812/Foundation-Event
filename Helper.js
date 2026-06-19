/**
 * Foundation Events - Helper Functions
 * Handles image fallbacks and navigation highlighting
 */

import { CONFIG } from './config.js'

function initializeImageHandling () {
	const fallbackImage = CONFIG.fallbackImage
	const images = document.querySelectorAll('img')

	images.forEach(img => {
		if (!img.getAttribute('src') || img.getAttribute('src').trim() === '') {
			img.setAttribute('src', fallbackImage)
		}

		const onImageError = function () {
			if (img.getAttribute('src') === fallbackImage) {
				img.removeEventListener('error', onImageError)
				return
			}
			img.setAttribute('src', fallbackImage)
		}

		img.addEventListener('error', onImageError)
	})
}

function markActiveNavLink (link) {
	link.classList.add(CONFIG.nav.activeClass)
	link.setAttribute('aria-current', 'page')
}

function initializeNavigation () {
	const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'
	const navLinks = document.querySelectorAll('header nav a')

	const safeDecode = function (value) {
		try {
			return decodeURIComponent(value)
		} catch (e) {
			return value
		}
	}

	const normalizePath = function (href) {
		if (!href || href === '/') return '/'
		const decoded = safeDecode(href).replace(/\/+$/, '')
		return decoded.startsWith('/') ? decoded : `/${decoded}`
	}

	const currentNormalized = normalizePath(currentPath)

	navLinks.forEach(link => {
		const linkHref = link.getAttribute('href')
		if (!linkHref) return

		const linkNormalized = normalizePath(linkHref)

		if (linkNormalized === currentNormalized) {
			markActiveNavLink(link)
			return
		}

		if (linkNormalized === '/' && (currentNormalized === '/index.html' || currentNormalized === '')) {
			markActiveNavLink(link)
			return
		}

		const linkStem = linkNormalized.replace(/\.html$/, '').replace(/^\//, '')
		const currentStem = currentNormalized.replace(/\.html$/, '').replace(/^\//, '')

		if (linkStem && linkStem !== 'index.html' && currentStem === linkStem) {
			markActiveNavLink(link)
		}
	})
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', function () {
		initializeImageHandling()
		initializeNavigation()
	})
} else {
	initializeImageHandling()
	initializeNavigation()
}
