This is the GitHub repo for https://FoundationEvent.com.  It advertises the upcoming events on the floor.

# How to maintain the events
	- Write the _fancy_ date & time in the `<h3>` tag
	- Write the **ugly** date & time format in the `<countdownDate>` tag
# Foundation Event Website
- Update the event's info.
This is the GitHub repository for [foundationevent.com](https://foundationevent.com), advertising upcoming Foundation events.

## 🚀 Getting Started

### Prerequisites
- Ruby 2.7+ (for local Jekyll development)
- Bundler: `gem install bundler`

### Local Development

1. **Clone the repository:**
	```bash
	git clone https://github.com/yourusername/Foundation-Event.git
	cd Foundation-Event
	```

2. **Install dependencies:**
	```bash
	bundle install
	```

3. **Build and serve locally:**
	```bash
	bundle exec jekyll serve
	```
	Visit `http://localhost:4000` in your browser.

4. **Build for production:**
	```bash
	bundle exec jekyll build
	```
	Output will be in the `_site/` directory.

## 📁 Project Structure

```text
.
├── _config.yml              # Jekyll configuration
├── _layouts/
│   └── default.html         # Master page template
├── _includes/               # Reusable template partials
│   ├── head.html           # Meta tags, stylesheets
│   ├── nav.html            # Navigation menu
│   ├── footer.html         # Site footer
│   ├── scripts.html        # Script loading
│   └── skip-link.html      # Accessibility skip link
├── _data/
│   └── events.yml          # Centralized event configuration
├── Assets/                  # Event-specific images and media
├── general.css             # Single consolidated stylesheet
├── config.js               # Centralized JavaScript configuration
├── Helper.js               # Image fallbacks & nav highlighting
├── Countdown.js            # Event countdown timer
├── index.html              # Homepage
├── 5K.html                 # 5K Run event page
├── Haunted House.html      # Haunted House event page
├── Parade.html             # Thanksgiving Parade event page
├── Contact Us.html         # Contact page
├── About Us.html           # About page
├── Privacy Policy.html     # Privacy policy
└── Terms & Conditions.html # Terms page
```

## 🔧 How to Maintain Events

### Update Event Information

Event details are managed in two places:

1. **Event Pages** (HTML files like `5K.html`, `Haunted House.html`):
	- Update the YAML frontmatter with page-specific metadata
	- Modify event descriptions and details
	- Set `include_countdown: true` if the event needs a countdown timer

2. **Centralized Configuration** (`_data/events.yml`):
	- Update event name, date, slug, description, and countdown date
	- Modify contact information and social media links
	- Add or remove events from the events array

### Update Countdown Date

In your event page's YAML frontmatter, update the countdown date:
```yaml
---
layout: default
title: "🎃 Haunted House"
include_countdown: true
---
```

The actual countdown date is calculated by `Countdown.js` based on the duration defined in `config.js`:
```javascript
// config.js
countdown: {
  colorScaleWindowMs: 30 * 24 * 60 * 60 * 1000, // 30 days
  startColor: { r: 34, g: 197, b: 94 },    // Green
  endColor: { r: 239, g: 68, b: 68 }        // Red
}
```

### Add Event Poster Image

1. Create a folder in `Assets/` for your event
2. Add poster images: `2025 EventName.png`, `2024 EventName.png`, etc.
3. Update the `<img>` tags in the event's HTML file with proper alt text:
	```html
	<img src="/Assets/5K/2025 5K.png" alt="2025 5K Event Poster" loading="lazy">
	```

### Add a New Event

1. **Create from template:**
   Copy [Event Template.html](Event%20Template.html) and rename it (e.g., `New Event.html`)

2. **Add YAML frontmatter:**
   ```yaml
   ---
   layout: default
   title: "emoji Event Name"
   description: "Short description"
   od_image: "/Assets/EventFolder/2025 EventName.png"
   data_page: "event-slug"
   include_countdown: true
   ---
   ```

3. **Update _data/events.yml:**
	```yaml
	events:
	  - name: "Event Name"
		 slug: "event-slug"
		 emoji: "🎉"
		 page: "/EventName.html"
		 description: "Event description"
		 countdown_date: "2025-XX-XXT00:00:00Z"
	```

4. **Add to navigation:**
	Update `_includes/nav.html` to include your event link

5. **Create Assets folder:**
	Create `Assets/EventFolder/` and add your event's images

## 🎨 Customization

### CSS Variables

Edit `general.css` to customize colors, fonts, and spacing using CSS custom properties:
```css
:root {
  --color-primary: #222222;
  --color-secondary: #666666;
  --color-accent: #dc2626;
  --font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  --spacing-unit: 1rem;
}
```

### JavaScript Configuration

Modify `config.js` to adjust countdown colors, timing, and behavior:
```javascript
const CONFIG = {
  fallbackImage: "/Assets/Foundation/Foundation Image Not Found.svg",
  countdown: {
	 colorScaleWindowMs: 30 * 24 * 60 * 60 * 1000,
	 startColor: { r: 34, g: 197, b: 94 },
	 endColor: { r: 239, g: 68, b: 68 }
  },
  nav: {
	 activeClass: "current-page"
  }
};
```

## 🔍 SEO & Accessibility

- **JSON-LD Schema:** Event pages include structured data for search engines
- **robots.txt:** Search engine crawling rules
- **sitemap.xml:** Auto-generated site map
- **ARIA Labels:** Countdown timer and dynamic content have proper accessibility labels
- **Alt Text:** All images have descriptive alt text
- **Prefers Reduced Motion:** Respects user motion preferences

## 🚦 GitHub Actions CI/CD

The repository includes automated workflows:

1. **HTML Validation** (`.github/workflows/validate.yml`)
	- Validates all HTML5 files on push/PR
	- Runs on: `main` branch changes

2. **Link Checking** (`.github/workflows/link-check.yml`)
	- Checks for broken links
	- Runs weekly and on every push/PR

3. **Lighthouse CI** (`.github/workflows/lighthouse.yml`)
	- Measures performance, accessibility, and SEO
	- Generates detailed reports on pull requests

## 📦 Deployment

This site is deployed automatically via **GitHub Pages**:
- Push to `main` branch triggers automatic Jekyll build
- GitHub Pages serves the generated `_site/` directory
- CNAME file points to foundationevent.com

No manual build steps are required—Jekyll runs automatically on GitHub's servers.

## 🛠️ Technologies

- **Jekyll:** Static site generator with templating
- **Vanilla HTML5/CSS3/JavaScript:** No frameworks or build tools needed
- **YAML:** Configuration and data management
- **GitHub Actions:** Automated testing and deployment
- **GitHub Pages:** Free web hosting with Jekyll integration

## 📝 License

This project is open source. See [LICENSE](LICENSE) for details.

## 📧 Support

For questions or issues, please open a GitHub issue or contact the maintainers.
- Put the poster in the empty `<img>` tag
- Forms for registration can be embedded on the proper page

# Adding a new event
- Use the [Event Template.html](<Event Template.html>) and copy it, and rename it to whatever the event will be.
  - Edit the default details in the file.
  - Name, Date, Time, Details, etc...
- Create a new folder in the [Assets](Assets/) folder for the event's images.
