/**
 * Foundation Events - JavaScript Configuration
 * Centralized configuration for site-wide settings
 */

const CONFIG = {
	// Default fallback image
	fallbackImage: '/Assets/Foundation/Foundation Image Not Found.svg',

	// Countdown timer settings
	countdown: {
		colorScaleWindowMs: 30 * 24 * 60 * 60 * 1000, // 30 days
		startColor: { r: 34, g: 197, b: 94 }, // Green
		endColor: { r: 239, g: 68, b: 68 }, // Red
		updateIntervalMs: 1000,
	},

	// Date formats
	dateElements: [
		'#countdown-date',
		'countdownDate',
	],

	// Navigation settings
	nav: {
		activeClass: 'current-page',
	},
};

// Export for module systems if needed
if (typeof module !== 'undefined' && module.exports) {
	module.exports = CONFIG;
}