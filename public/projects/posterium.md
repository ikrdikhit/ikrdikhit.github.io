If you've ever managed a Plex or Jellyfin library, you know the itch: the default posters are fine, but what if each poster could show you the IMDb score, the Rotten Tomatoes rating, and the Metacritic critic consensus right in the artwork itself? No more opening a side panel. No more switching apps. The rating is just _there_, part of the poster, every time you scroll your library.

That's the itch [Posterium](https://posters.spicydevs.xyz) was built to scratch. And because it's fully open-source and free — no account, no API key, no rate limits — I want to walk through how it works, how to get the most out of it, and how to self-host the entire stack if that's your thing.

---

## What Posterium Actually Is

Posterium is two things at once: a **visual drag-and-drop editor** and a **single-URL image API**. The magic is that these two things are deeply connected.

When you open the editor, search for a movie, drag rating badges around the canvas, and adjust the glassmorphism effects, the editor is continuously building a URL in the top bar. That URL isn't a link to a settings page or a saved configuration — it _is_ the image. Paste it anywhere an image URL is accepted and you get back a fully rendered poster with live ratings baked in.

The underlying API runs on Cloudflare Workers, which means it executes at the network edge — the server physically closest to whoever is requesting the image — so response times are fast regardless of where your Plex server or Discord bot is hosted.

---

## The Editor: A Quick Tour

When you land on the editor at `/build`, the interface is split into three panels plus a central canvas.

**The left panel** is where you set up the source. You search for a movie or TV show by name, and the editor pulls poster options and live rating data from TMDB. You can switch the poster source to Fanart.tv, Metahub, or IMDb, enable the "textless" option to get artwork without the title burned in, and choose how the poster is selected when multiple options exist (top-ranked, Bayesian best, or random for variety).

**The canvas** in the center is where you actually design. Badges representing each rating source float over the poster. You drag them to position, click to select, shift-click to select multiple, and use Delete to remove them. The canvas supports zoom (Ctrl+scroll or pinch), pan (scroll or drag), and remembers your view between sessions. There's also a full undo/redo stack — Ctrl+Z works exactly as you'd expect.

**The right panel** (Inspector) has two modes. When nothing is selected, it shows global controls: badge layout presets, flow direction (column vs. row), poster blur, grayscale toggle, and default glass settings (blur, opacity, corner radius, shadow, border). When you select one or more badges, it switches to per-badge overrides — so you can make your IMDb badge slightly larger than the others, or give Rotten Tomatoes a different background tint, without affecting the rest.

The **Layers panel** (the other left panel tab) shows all available badges as a list. You toggle visibility, reorder by dragging the grip handles, and see which ones have live data for the current title. The ordering in the Layers panel determines the stacking order on the canvas.

---

## The API: One URL Does Everything

The URL format is straightforward once you've seen it once:

```
https://api.spicydevs.xyz/{type}/{id}.{format}
```

The `type` is `movie`, `tv`, or `anime`. The `id` is the TMDB or IMDb ID. The `format` is `svg`, `png`, `jpg`, or `webp`. Everything else is a query parameter.

To add rating badges, you pass `r=imdb,rt,meta` (a comma-separated list of badge IDs) and then position each one with `{id}_x` and `{id}_y` pixel coordinates on the 500×750 canvas. The glass styling is controlled globally with `blur`, `alpha` (opacity 0–1), `rad` (corner radius), and `sh` (drop shadow). You can override any of these per badge with `{id}_blur`, `{id}_alpha`, and so on.

SVG is the recommended format for most use cases because it's vector-based (perfect at any display size), returned directly from the Worker without rasterization, and loads quickly. PNG or WebP are better choices when you need guaranteed raster output — for Discord embeds that don't render SVG, for example.

---

## Use Cases Worth Knowing

**Plex and Jellyfin** are the most common. In either app, you can set a custom poster for any item by providing an image URL. Paste your Posterium URL there. The media server will cache the image, so it doesn't hit the API on every scroll — but when the cache expires or you refresh the metadata, it fetches again and picks up any rating changes.

**Discord bots** work because the URL is just an image URL. In a rich embed, set `image.url` to your Posterium URL. The bot doesn't need to download or store anything — Discord fetches and caches the image on its CDN automatically.

**Notion databases** are great for watchlists. Add an Image block with the URL, or use a Files & Media property pointing to the API URL, and your movie database gets live poster thumbnails with ratings alongside whatever other columns you track.

**Make (formerly Integromat), Zapier, and n8n** can all use the URL in automation workflows. A common pattern is: when a new row is added to an Airtable or Notion database, construct a Posterium URL from the TMDB ID column and write it back as the poster image field.

---

## Self-Hosting: The Full Walkthrough

You might want to self-host for a few reasons: you want your own domain on the editor, you want to integrate your own TMDB API key so it never hits rate limits on a shared key, or you just prefer owning the full stack. All of these are valid, and the architecture makes it straightforward.

### Understanding the Two Parts

The frontend editor (this repository) is a completely static site — after running `npm run build`, you have a folder of HTML, CSS, and JavaScript files with no server-side logic. It can live on Vercel, Netlify, Cloudflare Pages, an S3 bucket behind CloudFront, a Raspberry Pi running Nginx, or literally any web server.

The backend API is a Cloudflare Worker — a serverless function that runs at the edge. It handles image fetching, rating aggregation, SVG composition, and image encoding. You need a Cloudflare account to deploy it (the free tier is more than sufficient for personal use).

### Running the Frontend Locally

Clone the repository and install dependencies:

```bash
git clone https://github.com/xdaayush/freeposterapi.git
cd freeposterapi
npm install
npm run dev
```

The dev server starts at `http://localhost:5173` and points at the public API by default. If you want to use your own Worker instead, create a `.env.local` file with:

```env
VITE_API_URL=https://your-worker.workers.dev
```

Vite reads this automatically on startup. The `.env.local` file is gitignored, so it won't be committed if you fork the repo.

### Building and Deploying the Frontend

```bash
npm run build
```

This produces a `dist/` folder. The critical thing to know when deploying this folder is that Posterium uses client-side routing — the dashboard is at `/` and the editor is at `/build`. Your static host needs to serve `index.html` for any path that doesn't match a real file. This is usually called "history API fallback" or "SPA mode" in hosting provider documentation.

On **Vercel**, this is automatic — just connect your GitHub fork and Vercel detects the Vite framework and handles routing correctly. On **Netlify**, add a `public/_redirects` file containing `/* /index.html 200` before building. On **Cloudflare Pages**, SPA routing is handled by default. On **Nginx**, add `try_files $uri $uri/ /index.html;` to your location block.

### Deploying Your Own API Worker

Install the Wrangler CLI, which is Cloudflare's toolchain for deploying Workers:

```bash
npm install -g wrangler
wrangler login
```

The login command opens a browser window and authenticates with your Cloudflare account. Once that's done, clone the Worker repository (link in the main README), navigate into it, and deploy:

```bash
# Set your TMDB API key as a secret — Cloudflare encrypts and stores it
wrangler secret put TMDB_API_KEY
# Optionally add a Fanart.tv key for better textless poster support
wrangler secret put FANART_API_KEY

wrangler deploy
```

The `deploy` command bundles and uploads the Worker to Cloudflare's global network. You get a `*.workers.dev` URL immediately, and you can optionally add a custom domain through the Cloudflare dashboard — useful if you want something like `api.yourdomain.com`.

### Connecting the Pieces

Once your Worker is deployed, update the frontend's `.env.local` with the Worker URL and rebuild. Every URL the editor generates will now point at your own API. Ratings are still fetched from the same public sources (IMDb, RT, TMDB, etc.) — you're just controlling the Worker that aggregates them.

---

## A Few Design Details Worth Appreciating

The canvas preview in the editor is intentionally separate from the API. The editor renders badges as React DOM elements with real CSS glassmorphism effects, overlaid on an `<img>` tag that loads the SVG poster. It does not render through the API at edit time. This means dragging is instant — there's no round-trip to the server as you position badges. Only the final URL, which encodes all the positions and settings, goes to the API when you paste it somewhere.

The history system is a pure in-memory stack of immutable config snapshots. Every meaningful change pushes a new snapshot. Undo and redo simply move a pointer through the stack. This is the same pattern used in serious creative tools — it's simple, robust, and correctly handles branching history when you undo and then make a new change.

Config persistence is handled via `localStorage` under a versioned key (`posterium_config_v2`). If you close the editor tab and come back, your last configuration is restored automatically. This is completely local — nothing is ever sent to a server.

---

## Wrapping Up

Posterium is the kind of tool We built because I wanted it myself and couldn't find anything that did exactly this — free, no login, no fluff, just a URL that produces a beautiful poster with fresh ratings. If you build something with it, I'd genuinely love to see it.

If it saves you time, a coffee or a GitHub star goes a long way toward keeping the API running and the project active:

- ☕ [buymeacoffee.com/dikhit](https://buymeacoffee.com/dikhit)
- 💖 [github.com/sponsors/ikrdikhit](https://github.com/sponsors/ikrdikhit)
- ⭐ [Star the repo](https://github.com/xdaayush/freeposterapi)

The full self-hosting documentation lives in [`SELFHOST.md`](https://github.com/xdaayush/freeposterapi/blob/main/SELFHOST.md) in the repository. Open issues on GitHub if something isn't working — and pull requests are always welcome.
