# Assets

Static images for the site. Missing files fall back to `Assets/Foundation/Foundation Image Not Found.svg` via `Helper.js`.

## Layout

```
Assets/
├── Foundation/          # Site logos and fallback image (in repo)
├── 5K/                  # 5K posters and sponsor logos
├── Parade/              # Parade posters
└── Haunted House/       # Haunted House posters
```

## Event posters

Add poster images under the matching folder and reference them in each event page's front matter (`og_image`, `previous_events`, `sponsors`). Filenames should match the paths in the markdown files exactly (spaces are OK in paths; use `%20` in URLs when linking manually).

Poster files for past years are not required in git for the site to build — pages will show the fallback image until assets are added.
