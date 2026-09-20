import { readdirSync } from 'node:fs'
import { join, relative } from 'node:path'
import { spawnSync } from 'node:child_process'

const ignoredDirectories = new Set(['.git', '.jekyll-cache', '_site', 'node_modules'])
const markdownFiles = []

function collectMarkdownFiles (directory) {
	for (const entry of readdirSync(directory, { withFileTypes: true })) {
		if (entry.isDirectory()) {
			if (!ignoredDirectories.has(entry.name)) {
				collectMarkdownFiles(join(directory, entry.name))
			}
			continue
		}

		if (entry.isFile() && entry.name.endsWith('.md')) {
			markdownFiles.push(relative('.', join(directory, entry.name)))
		}
	}
}

collectMarkdownFiles('.')

for (const file of markdownFiles) {
	const result = spawnSync(process.execPath, [
		'node_modules/markdown-link-check/markdown-link-check',
		'--config',
		'.github/markdown-link-check-config.json',
		file
	], { stdio: 'inherit' })

	if (result.error) {
		throw result.error
	}

	if (result.status !== 0) {
		process.exit(result.status ?? 1)
	}
}
