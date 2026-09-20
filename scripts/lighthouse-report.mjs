// Runs a comprehensive local Lighthouse audit: Navigation + Snapshot mode,
// Mobile + Desktop, all default categories (performance, accessibility,
// best-practices, seo) -- for every URL listed in .github/lighthouserc.json.
//
// This exists because @lhci/cli (used by npm run lighthouse:ci and CI) can only
// drive a single Navigation-mode audit per config, on one device profile at a
// time. Getting Snapshot mode and both device profiles requires Lighthouse's
// "User Flow" API directly, which this script wraps.
//
// Prerequisite: a local Chrome/Chromium install. Set CHROME_PATH if it is not
// auto-detected (see TECHNICAL-GUIDE.md).

import { createServer } from 'node:http'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { extname, join } from 'node:path'
import puppeteer from 'puppeteer-core'
import { launch } from 'chrome-launcher'
import { startFlow, defaultConfig, desktopConfig } from 'lighthouse'

const CONFIG_PATH = new URL('../.github/lighthouserc.json', import.meta.url)
const SITE_DIR = '_site'
const OUTPUT_DIR = '.lighthouse-reports'

const CONTENT_TYPES = {
	'.html': 'text/html; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
	'.svg': 'image/svg+xml',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.gif': 'image/gif',
	'.webp': 'image/webp',
	'.ico': 'image/x-icon',
	'.xml': 'application/xml',
	'.txt': 'text/plain; charset=utf-8'
}

async function startStaticServer(rootDir) {
	const server = createServer(async (req, res) => {
		try {
			const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
			const filePath = join(rootDir, pathname)
			const data = await readFile(filePath)
			res.writeHead(200, { 'Content-Type': CONTENT_TYPES[extname(filePath).toLowerCase()] ?? 'application/octet-stream' })
			res.end(data)
		} catch {
			res.writeHead(404)
			res.end('Not found')
		}
	})

	await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
	return { server, port: server.address().port }
}

function labelFor(pathname) {
	const trimmed = pathname.replace(/^\/+/, '').replace(/\/index\.html$/, '').replace(/\.html$/, '')
	return trimmed === '' ? 'home' : trimmed
}

function formatScores(lhr) {
	return Object.values(lhr.categories)
		.map((category) => `${category.title}: ${category.score === null ? 'N/A' : Math.round(category.score * 100)}`)
		.join('  |  ')
}

async function main() {
	const config = JSON.parse(await readFile(CONFIG_PATH, 'utf8'))
	const pagePaths = config.ci.collect.url.map((url) => new URL(url).pathname)

	const { server, port } = await startStaticServer(SITE_DIR)
	const baseUrl = `http://127.0.0.1:${port}`

	let chrome
	try {
		chrome = await launch({ chromeFlags: ['--headless=new', '--disable-gpu', '--no-sandbox'] })
	} catch (error) {
		server.close()
		console.error('Could not launch Chrome. Install Chrome/Chromium locally, or set the CHROME_PATH environment variable to a Chrome executable, then rerun npm run lighthouse.')
		console.error(error.message)
		process.exit(1)
	}

	const browser = await puppeteer.connect({ browserURL: `http://127.0.0.1:${chrome.port}` })
	await mkdir(OUTPUT_DIR, { recursive: true })

	const devices = [
		{ name: 'mobile', config: defaultConfig },
		{ name: 'desktop', config: desktopConfig }
	]

	const summaryRows = []

	for (const pagePath of pagePaths) {
		const label = labelFor(pagePath)
		const url = `${baseUrl}${pagePath}`

		for (const device of devices) {
			const page = await browser.newPage()

			try {
				const flow = await startFlow(page, {
					name: `${label} (${device.name})`,
					config: device.config
				})

				await flow.navigate(url)
				await flow.snapshot()

				const report = await flow.generateReport()
				const flowResult = await flow.createFlowResult()

				const reportPath = join(OUTPUT_DIR, `${label.replace(/[\\/]/g, '-')}-${device.name}.html`)
				await writeFile(reportPath, report)

				for (const step of flowResult.steps) {
					summaryRows.push({
						page: label,
						device: device.name,
						step: step.name,
						scores: formatScores(step.lhr)
					})
				}
			} finally {
				await page.close()
			}
		}
	}

	await browser.disconnect()
	await chrome.kill()
	await new Promise((resolve) => server.close(resolve))

	console.log(`\nLighthouse HTML reports written to ${OUTPUT_DIR}/ (one per page per device, each containing both the Navigation and Snapshot steps).\n`)
	for (const row of summaryRows) {
		console.log(`${row.page.padEnd(24)} ${row.device.padEnd(8)} ${row.step.padEnd(40)} ${row.scores}`)
	}
	console.log('\nNote: Snapshot mode inspects a single point-in-time DOM state, so performance timing metrics (e.g. LCP, CLS, TBT) are not applicable/available on the Snapshot step -- this matches Chrome DevTools\' own Snapshot mode behavior. Use the Navigation step for performance scoring.')
}

main().catch((error) => {
	console.error(error)
	process.exit(1)
})
