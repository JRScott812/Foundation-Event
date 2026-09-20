import { spawnSync } from 'node:child_process'

const command = process.platform === 'win32' ? 'lychee.exe' : 'lychee'
const result = spawnSync(command, [
	'--root-dir',
	'_site',
	'--verbose',
	'--no-progress',
	'_site/**/*.html'
], { stdio: 'inherit', shell: false })

if (result.error?.code === 'ENOENT') {
	console.error('Lychee is required for built-site link checks. Install it from https://github.com/lycheeverse/lychee#installation, then rerun npm run link-check.')
	process.exit(1)
}

if (result.error) {
	throw result.error
}

process.exit(result.status ?? 1)
