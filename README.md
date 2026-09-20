# Foundation Events Website

Static site for Foundation Events at Samuel Morris Hall (Taylor University), built with [Jekyll 4.4](https://jekyllrb.com/) and deployed to GitHub Pages at [foundationevent.com](https://foundationevent.com).

## Guides

Choose the guide that matches the person making the change:

- **[Non-Technical Content Guide](NONTECHNICAL-GUIDE.md)** — GitHub browser editing for event details, dates, registration, posters, contact information, and safe publishing.
- **[Technical Guide](TECHNICAL-GUIDE.md)** — local development, architecture, configuration, templates, JavaScript, validation, CI, deployment, and troubleshooting.

Routine editors using the non-technical guide normally only need these locations:

| Need to change | Edit this |
|---|---|
| Event wording, dates, registration, or old posters | A file in `Events/` |
| Event navigation or homepage order | `_data/events.yml` |
| Organization address, phone, email, or social profile | `_data/events.yml` |
| Add a poster or logo | The matching folder under `Assets/` |
| About, contact, privacy, or terms wording | The corresponding Markdown file |

Do not edit `_includes/`, `_layouts/`, `*.js`, `*.css`, `.github/`, `Gemfile`, or `_config.yml` for routine content changes. Those files control the site design, behavior, deployment, and checks.

## Local development

```bash
bundle install
$env:JEKYLL_ENV="production"; bundle exec jekyll serve
```

On Linux or macOS, set the environment variable inline:

```bash
JEKYLL_ENV=production bundle exec jekyll serve
```

Visit `http://localhost:4000`. Use `--url https://foundationevent.com` so sitemap, robots, Open Graph, and canonical URLs match production.

## Site structure

```text
├── _config.yml           # Jekyll config, plugins, page defaults
├── _data/events.yml      # Nav events + contact/social info
├── _includes/            # Reusable HTML partials
├── _layouts/             # default.html, page.html, event.html
├── Page Template.md      # Starter for general pages
├── Events/               # Event pages (under /Events/…)
├── Legal/                # Privacy Policy, Terms (under /Legal/…)
├── Assets/               # Images and SVGs
├── *.md                  # Site pages
├── general.css / nav.css # Stylesheets
├── config.js             # Shared JS settings
├── Helper.js             # Image fallbacks, nav highlighting
└── Countdown.js          # Opt-in event countdown
```

### Key includes

| Include | Purpose |
|---------|---------|
| `nav.html` | Main nav from `_data/events.yml` |
| `footer.html` | Site footer (nav links, address, contact, social) |
| `contact-links.html` | Phone and email with emoji icons |
| `social-links.html` | Instagram/social links from `_data/events.yml` |
| `countdown-section.html` | Countdown UI when `countdown_datetime` is set |
| `event-schema.html` | JSON-LD Event structured data |
| `image-gallery.html` | Poster grids for sponsors and previous events |
| `event-icon.html` | Event emoji from page frontmatter (nav, homepage) |
| `upcoming-events.html` | Homepage event links |

### Layouts

| Layout | Extends | Purpose |
|--------|---------|---------|
| `default` | — | HTML shell (head, nav, footer) |
| `page` | `default` | Standard page: emoji + title heading, SEO metadata, optional hero image |
| `event` | `page` | Event sections: countdown, registration, sponsors, previous events |

Shared front matter for any page: `emoji`, `title`, `description`, `keywords`, `og_*`, `data_page`. Optional: `heading` (longer h1), `hero_image`, `hero_alt`.

**URL convention:** lowercase, hyphenated slugs with no spaces — e.g. `/About-Us/`, `/Contact-Us/`, `/legal/privacy-policy/`, `/Events/Haunted-House/`. Set `permalink` in front matter; old spaced URLs redirect automatically.

## Adding or updating an event

1. Copy [`Events/Event Template.md`](Events/Event%20Template.md) to a new file in `Events/`.
2. Set shared page fields (`emoji`, `title`, `permalink`, `og_image`, etc.) plus event fields (`registration`, `previous_events`, etc.).
3. Add the event to `_data/events.yml` under `events:` (`name`, `page`) for nav order and homepage links.
4. Write event details in the markdown body (rendered inside `#details`).

For a non-event page, copy [`Page Template.md`](Page%20Template.md) instead.

### Countdown and event dates

Set **`event_datetime`** on an event page when the date is announced. This drives the countdown, JSON-LD `startDate`, and the homepage date line when the event is featured.

```yaml
# event_datetime: "2026-10-31T19:00:00-04:00"
# countdown_label: "October 31, 2026 at 7:00 PM"
```

`countdown_datetime` still works as a legacy alias. Leave the datetime unset until the date is confirmed — no countdown UI or timer script loads.

### Homepage featured event

In `_data/events.yml`, set `next_event` to an event page's `data_page` value (e.g. `"5k"`) to highlight one event on the homepage. Leave it empty (`""`) to list all events.

### Contact info

Update phone, email, and address once in `_data/events.yml` under `contact:`. Footer and Contact Us page read from there.

## SEO: sitemap and robots

- **`sitemap.xml`** — auto-generated on every build by the `jekyll-sitemap` plugin.
- **`robots.txt`** — generated from [`robots.txt`](robots.txt) (Jekyll page with Liquid front matter).
- **404** and **Events/Event Template** are excluded from the sitemap (`sitemap: false`).
- Old root and spaced URLs redirect to hyphenated paths via `jekyll-redirect-from` (e.g. `/About Us.html` → `/About-Us/`).

Always build with `JEKYLL_ENV=production` (or `bundle exec jekyll serve` only after setting that env var) so sitemap, robots, Open Graph, and canonical URLs use `https://foundationevent.com` from `_config.yml`. In development mode Jekyll defaults to `http://localhost:4000`.

## Security notes

- GitHub Pages does not support custom HTTP security headers (CSP, HSTS) natively. Options include a reverse proxy (e.g. Cloudflare) or accepting GH Pages defaults for this static brochure site.
- External links use `rel="noopener noreferrer"` where appropriate.
- Responsible disclosure: [/.well-known/security.txt](security.txt)
- Dependabot monitors `Gemfile` and GitHub Actions weekly.

## CI workflows

| Workflow | Purpose |
|----------|---------|
| `validate.yml` | Jekyll build → HTML5 validation on `_site/` |
| `link-check.yml` | Markdown + lychee link check on built HTML |
| `lint-format.yml` | Super-Linter |
| `lighthouse.yml` | Lighthouse performance/a11y/SEO |

## `_data/events.yml`

| Section | Used for |
|---------|----------|
| `events` | Nav order and homepage links (`name`, `page`); emoji from each event page |
| `next_event` | Optional `data_page` slug to feature one event on the homepage |
| `contact` | Footer, Contact Us, JSON-LD organizer |
| `social` | Footer and Contact Us social links (`icon`, `name`, `url`) |

Event details and dates live in each `Events/*.md` file. Add poster images under [`Assets/`](Assets/README.md) when available.

## License

All rights reserved © Foundation.
