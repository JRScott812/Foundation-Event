/**
 * Foundation Events - Countdown Timer
 * Displays countdown to event with dynamic color transition
 */

import { CONFIG } from './config.js'

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Parses the countdown date from the element (requires explicit datetime attribute).
 * @returns {number|null} - The parsed date in milliseconds or null if invalid.
 */
function getCountdownDate () {
	const dateElement = document.querySelector('#countdown-date')
	if (!dateElement) {
		return null
	}

	const rawDate = dateElement.getAttribute('datetime')
	if (!rawDate || !rawDate.trim()) {
		return null
	}

	const date = Date.parse(rawDate.trim())
	if (isNaN(date)) {
		return null
	}

	return date
}

/**
 * Calculates progress color between two RGB colors
 * @param {number} distance - Milliseconds until countdown date
 * @returns {string} - RGB color string
 */
function getProgressColor (distance) {
	const config = CONFIG.countdown
	const { colorScaleWindowMs, startColor, endColor } = config

	const clampedDistance = Math.min(Math.max(distance, 0), colorScaleWindowMs)
	const progress = 1 - (clampedDistance / colorScaleWindowMs)
	const clampedProgress = Math.min(1, Math.max(0, progress))

	const r = Math.round(startColor.r + (endColor.r - startColor.r) * clampedProgress)
	const g = Math.round(startColor.g + (endColor.g - startColor.g) * clampedProgress)
	const b = Math.round(startColor.b + (endColor.b - startColor.b) * clampedProgress)

	return `rgb(${r}, ${g}, ${b})`
}

/**
 * Starts the countdown timer and updates the display
 * @param {number} countDownDate - The target date in milliseconds
 */
function startCountdown (countDownDate) {
	const countdownElement = document.getElementById('countdown')
	if (!countdownElement) {
		return
	}

	countdownElement.style.whiteSpace = 'nowrap'
	if (!prefersReducedMotion) {
		countdownElement.style.transition = 'color 0.9s linear'
	}

	const updateIntervalMs = prefersReducedMotion
		? 60000
		: CONFIG.countdown.updateIntervalMs

	const updateCountdown = () => {
		const now = Date.now()
		const distance = countDownDate - now

		if (distance < 0) {
			clearInterval(intervalId)
			countdownElement.textContent = 'EXPIRED'
			const expiredColor = CONFIG.countdown.endColor
			countdownElement.style.color = `rgb(${expiredColor.r}, ${expiredColor.g}, ${expiredColor.b})`
			return
		}

		const days = Math.floor(distance / (1000 * 60 * 60 * 24))
		const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
		const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
		const seconds = Math.floor((distance % (1000 * 60)) / 1000)

		countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`
		if (!prefersReducedMotion) {
			countdownElement.style.color = getProgressColor(distance)
		}
	}

	const intervalId = setInterval(updateCountdown, updateIntervalMs)
	updateCountdown()
}

function initCountdown () {
	const countDownDate = getCountdownDate()
	if (countDownDate !== null) {
		startCountdown(countDownDate)
	}
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initCountdown)
} else {
	initCountdown()
}
