/**
 * Foundation Events - JavaScript Configuration
 * Centralized configuration for site-wide settings
 */

export const CONFIG = {
	fallbackImage: '/Assets/Foundation/Foundation%20Image%20Not%20Found.svg',

	countdown: {
		colorScaleWindowMs: 30 * 24 * 60 * 60 * 1000,
		startColor: { r: 34, g: 197, b: 94 },
		endColor: { r: 239, g: 68, b: 68 },
		updateIntervalMs: 1000,
		dateElements: ['#countdown-date']
	},

	nav: {
		activeClass: 'current-page'
	}
}
