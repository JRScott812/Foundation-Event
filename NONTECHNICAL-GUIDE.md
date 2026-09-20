# Non-Technical Content Guide

This guide is for Foundation members who update website content using GitHub. You do **not** need to install software or write code for normal updates.

## Before you start

1. Sign in to GitHub and open the [Foundation-Event repository](https://github.com/JRScott812/Foundation-Event).
2. Choose the file you need from the table below.
3. Select the pencil icon (**Edit this file**).
4. Make one focused change, then select **Commit changes**.
5. Choose **Create a new branch for this commit and start a pull request**.
6. Give the pull request a short title, review the changes, and merge it after GitHub's checks succeed.

The published site normally updates automatically after a merged pull request. Open the site after a few minutes to confirm the change looks correct.

## Where to make common updates

| Task | File or folder |
|---|---|
| Change an event's wording, registration details, date, or old posters | `Events/` |
| Add an event to the main navigation and homepage | `_data/events.yml` |
| Change the organization address, phone, email, or social link | `_data/events.yml` |
| Upload a poster, logo, or sponsor image | `Assets/` |
| Update About Us, Contact Us, Privacy Policy, or Terms | The matching `.md` file |

Avoid editing `_includes/`, `_layouts/`, `general.css`, `nav.css`, `Helper.js`, `Countdown.js`, `config.js`, `.github/`, `Gemfile`, or `_config.yml` unless a developer is helping. Those files control the site's design, functionality, deployment, and automated checks.

## Update an existing event

Open the event's file in `Events/`:

- `5K.md`
- `Haunted House.md`
- `Parade.md`

The text **below** the second `---` line is ordinary page text. Update it like a document. Links use this format:

```markdown
[Visible link text](https://example.com)
```

The section between the first and second `---` line contains the event's settings. Keep the setting names and indentation exactly as they are.

### Announce an event date

Add or update these two lines in the event's settings:

```yaml
event_datetime: "2026-10-31T19:00:00-04:00"
countdown_label: "October 31, 2026 at 7:00 PM"
```

Use the correct date, time, and time-zone offset. This automatically adds the event countdown and helps search engines understand the event date. Remove both lines if the date is no longer confirmed.

### Change registration information

Update the text after `registration: |`. For example:

```yaml
registration: |
  Register in the Samuel Morris lobby by October 20.
```

Leave the two spaces before the registration sentence. You can use Markdown links and lists in this section.

### Add a new poster or sponsor image

1. Open the correct `Assets/` subfolder, or create one for the event.
2. Select **Add file** then **Upload files**.
3. Use a short, descriptive filename, such as `2026 5K Poster.jpg`.
4. Open the event's Markdown file and copy an existing image entry.
5. Change only the year, file path, and description. For example:

```yaml
  - year: "2026"
    src: "/Assets/5K/2026 5K Poster.jpg"
    alt: "2026 Foundation 5K event poster"
```

`alt` is the short text description read aloud to people using screen readers. Describe the image's purpose, not just its filename.

To change the image used in search/social previews, update `og_image` near the top of the event file:

```yaml
og_image: "/Assets/5K/2026 5K Poster.jpg"
```

## Add a new event

1. In `Events/`, open `Event Template.md`.
2. Use **Copy raw file** or copy its contents into a new file named after the event, for example `Spring Carnival.md`.
3. Update the settings in the new file:
   - `permalink` — use `/Events/Spring-Carnival/`; use hyphens, not spaces.
   - `emoji`, `title`, `description`, `og_title`, and `og_description`.
   - `data_page` — a short lowercase identifier such as `spring-carnival`.
   - `og_image` — the image path after uploading the poster.
   - `sitemap: false` — change this to `sitemap: true`. The template is hidden from search engines, but a real event should not be.
4. Replace the example registration and page text.
5. In `_data/events.yml`, add the event under `events:`. Copy an existing entry and update its name and page:

```yaml
  - name: "Spring Carnival"
    page: "/Events/Spring-Carnival"
```

6. Confirm the `page` path exactly matches the new `permalink` without the final `/`.

## Choose the featured event on the homepage

Open `_data/events.yml` and update `next_event`.

```yaml
next_event: "spring-carnival"
```

The value must exactly match that event's `data_page` value. Leave it as `""` to show every event equally.

## Change shared contact or social information

Open `_data/events.yml`. Update the values under `contact:` or `social:` only. Keep quotation marks and indentation.

```yaml
contact:
  phone: "+1 (765) 998-5706"
  phone_tel: "+17659985706"
  email: "FoundationHauntedHouse@gmail.com"
```

`phone` is the version people see. `phone_tel` contains only the country code and digits so phone links work correctly.

## Update a standard page

Edit the page directly:

| Page | File |
|---|---|
| About Us | `About Us.md` |
| Contact Us | `Contact Us.md` |
| Privacy Policy | `Legal/Privacy Policy.md` |
| Terms & Conditions | `Legal/Terms & Conditions.md` |

For a new standard page, copy `Page Template.md`, set a hyphenated `permalink`, and write the page text below the second `---` line.

## Safe publishing checklist

Before merging a pull request:

1. Use the **Files changed** tab to ensure only the intended content or image files changed.
2. Check that image paths use the exact uploaded filename, including spaces and capitalization.
3. Wait for all required GitHub checks to pass.
4. After merging, confirm the live page, navigation link, images, and any date/countdown.
5. If something looks wrong, revert the pull request in GitHub, then correct it in a new pull request.

## Getting help

Ask a developer for help if GitHub checks fail, a design or navigation change is needed, a setting above is unclear, or the update requires changing any file outside the safe locations listed in this guide.
