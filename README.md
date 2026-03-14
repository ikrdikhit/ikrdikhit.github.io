<div align="center">

# </> Developer Portfolio

**A fast, minimal, and fully themeable developer portfolio — configured from a single file.**

<br />

<a href="https://github.com/ikrdikhit/ikrdikhit.github.io/stargazers">
  <img src="https://img.shields.io/github/stars/ikrdikhit/ikrdikhit.github.io?style=for-the-badge&logo=starship&color=f3c94e&logoColor=f3c94e&labelColor=111111" alt="GitHub Stars" />
</a>
&nbsp;
<a href="https://github.com/ikrdikhit/ikrdikhit.github.io/forks">
  <img src="https://img.shields.io/github/forks/ikrdikhit/ikrdikhit.github.io?style=for-the-badge&logo=git&color=9A9A9A&logoColor=9A9A9A&labelColor=111111" alt="GitHub Forks" />
</a>
&nbsp;
<a href="https://github.com/ikrdikhit/ikrdikhit.github.io/issues">
  <img src="https://img.shields.io/github/issues/ikrdikhit/ikrdikhit.github.io?style=for-the-badge&logo=github&color=9A9A9A&logoColor=9A9A9A&labelColor=111111" alt="GitHub Issues" />
</a>
&nbsp;
<img src="https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=339933&labelColor=111111" alt="Node.js 18+" />
&nbsp;
<img src="https://img.shields.io/badge/license-MIT-9A9A9A?style=for-the-badge&labelColor=111111" alt="MIT License" />

<br /><br />

<a href="https://github.com/sponsors/ikrdikhit">
  <img src="https://img.shields.io/badge/Sponsor-EA4AAA?style=for-the-badge&logo=githubsponsors&logoColor=white&labelColor=111111" alt="Sponsor on GitHub" />
</a>
&nbsp;
<a href="https://buymeacoffee.com/dikhit">
  <img src="https://img.shields.io/badge/Buy_Me_a_Coffee-FBBF24?style=for-the-badge&logo=buymeacoffee&logoColor=111111&labelColor=111111" alt="Buy Me a Coffee" />
</a>

<br /><br />

<img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=61DAFB&labelColor=111111" />
&nbsp;
<img src="https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=646CFF&labelColor=111111" />
&nbsp;
<img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=3178C6&labelColor=111111" />
&nbsp;
<img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=06B6D4&labelColor=111111" />

<br /><br />

> 📖 **Complete configuration reference →** **[CONFIGURATION.md](./CONFIGURATION.md)**

<br />

</div>

---

> [!WARNING]
> **The built-in `light` theme is currently broken** and produces incorrect colours across several components. Use `dark` or `catppuccin`. If you need a light theme, defining a custom one takes about 30 seconds — see [Adding a New Theme](./CONFIGURATION.md#adding-a-new-theme).

---

## Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#%EF%B8%8F-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [⚙️ Configuration](#%EF%B8%8F-configuration)
- [📝 Adding Content](#-adding-content)
  - [Blog Post](#adding-a-blog-post)
  - [Project](#adding-a-project)
  - [Writing Markdown](#writing-markdown)
- [🗂️ Pages Reference](#%EF%B8%8F-pages-reference)
- [🏗️ Architecture](#%EF%B8%8F-architecture)
- [🚢 Build & Deployment](#-build--deployment)
- [🎨 Customisation Tips](#-customisation-tips)
- [❓ FAQ](#-faq)

---

## ✨ Features

<table>
<tr>
<td width="50%" valign="top">

**🎨 &nbsp;Theming**

- Zero-flash theme switching via inline `<script>` + CSS variables — no flicker on any reload
- Ships with `dark` and `catppuccin` themes
- Add a new theme with one config object, no component changes
- User preference persisted to `localStorage`

**📝 &nbsp;Blog & Projects**

- Runtime markdown fetching — no content bundled into JS
- Full GitHub Flavored Markdown (tables, strikethrough, task lists)
- Syntax-highlighted code blocks via Prism
- Special `poem` fence for literary / poetic formatting
- Reading-time estimate on every article
- Hover prefetching — content is cached before the user clicks

</td>
<td width="50%" valign="top">

**🔍 &nbsp;SEO**

- Per-page `<title>`, Open Graph, Twitter Cards
- JSON-LD structured data: `Person`, `WebSite`, `BlogPosting`
- Auto-generated `sitemap.xml` and `robots.txt` at build time
- Canonical URLs on every page
- Firefox Reader Mode compatible

**⚡ &nbsp;Performance & Accessibility**

- Font-aware splash screen — no FOUT (flash of unstyled text), ever
- Lazy-loaded routes with instant navigation loading indicator
- Accessible by default: focus traps, ARIA labels, skip-to-content, `prefers-reduced-motion`
- Animated, collapsible Table of Contents with scroll-aware active dot
- Single-file configuration (`src/data/config.ts`)

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

![Tech Stack](https://skillicons.dev/icons?i=react,vite,ts,tailwind,md&theme=dark)

</div>

<br />

| Layer            | Technology                                                                                                                            | Notes                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| **UI Framework** | ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) React 19                            | Concurrent features, lazy routes                   |
| **Build Tool**   | ![Vite](https://img.shields.io/badge/Vite-1a1a2e?style=flat-square&logo=vite&logoColor=646CFF) Vite 6                                 | 5 custom plugins, manual chunk splitting           |
| **Language**     | ![TypeScript](https://img.shields.io/badge/TypeScript-1a1a2e?style=flat-square&logo=typescript&logoColor=3178C6) TypeScript 5.8       | Strict mode throughout                             |
| **Styling**      | ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-1a1a2e?style=flat-square&logo=tailwindcss&logoColor=06B6D4) Tailwind CSS v4     | CSS-first `@theme` config, no `tailwind.config.js` |
| **Routing**      | ![React Router](https://img.shields.io/badge/React_Router-1a1a2e?style=flat-square&logo=reactrouter&logoColor=CA4245) React Router v7 | Lazy-loaded pages, conditional routes              |
| **Animation**    | ![Framer](https://img.shields.io/badge/Motion-1a1a2e?style=flat-square&logo=framer&logoColor=white) Motion v12                        | Scroll-driven, spring physics                      |
| **Markdown**     | `react-markdown` + `remark-gfm`                                                                                                       | Runtime fetch, GFM + custom renderers              |
| **Highlighting** | `react-syntax-highlighter` (Prism)                                                                                                    | PrismLight tree-shakeable bundle                   |
| **SEO**          | `react-helmet-async`                                                                                                                  | JSON-LD, OG, Twitter Cards                         |
| **Icons**        | `react-icons` — Phosphor set                                                                                                          | Tree-shakeable per icon                            |
| **Sitemap**      | Custom `tsx` prebuild script                                                                                                          | Type-safe, direct TS imports                       |

---

## 📁 Project Structure

```
.
├── public/
│   ├── blogs/               ← Markdown files for blog posts
│   ├── projects/            ← Markdown files for projects
│   ├── img/                 ← Card images (WebP recommended)
│   ├── fonts/               ← Self-hosted woff2 font files
│   ├── pfp.webp             ← Profile picture  (LCP element — keep < 200 KB)
│   └── favicon.*
│
├── src/
│   ├── components/
│   │   ├── ArticleLayout.tsx    ← Shared blog/project layout + syntax highlighting
│   │   ├── BasePopup.tsx        ← Accessible modal (focus trap, Escape, focus restore)
│   │   ├── BlogCard.tsx         ← Blog list card with hover-prefetch
│   │   ├── ContactPopup.tsx     ← Contact details modal
│   │   ├── ErrorBoundary.tsx    ← Top-level error boundary
│   │   ├── Loading.tsx          ← Route-transition loading dots
│   │   ├── ProjectCard.tsx      ← Project grid / text-list card
│   │   ├── ProjectPopup.tsx     ← Project preview modal
│   │   ├── SearchPage.tsx       ← Generic searchable + filterable list page
│   │   ├── SEO.tsx              ← Per-page Helmet SEO + JSON-LD structured data
│   │   ├── TableOfContents.tsx  ← Scroll-aware collapsible TOC sidebar
│   │   └── ThemeSwitcher.tsx    ← Theme picker popup
│   │
│   ├── context/
│   │   └── ThemeContext.tsx     ← Theme state, CSS var injection, localStorage
│   │
│   ├── data/
│   │   ├── config.ts            ← ★  PRIMARY CONFIG — start here
│   │   ├── blogs.ts             ← Blog post metadata array
│   │   └── projects.ts          ← Project metadata array
│   │
│   ├── pages/
│   │   ├── Home.tsx · AboutMe.tsx · BlogList.tsx · BlogPost.tsx
│   │   └── ProjectCatalogue.tsx · Project.tsx · Links.tsx · NotFound.tsx
│   │
│   ├── App.tsx          ← Router setup, lazy loading, navigation loader
│   ├── main.tsx         ← React root, providers, font-loader signal
│   ├── index.css        ← Tailwind @theme tokens + global markdown styles
│   └── vite-env.d.ts
│
├── scripts/
│   └── generate-sitemap.ts   ← Prebuild script → writes public/sitemap.xml
│
├── index.html           ← Font-loader splash + zero-flash theme prevention script
├── vite.config.ts       ← Custom Vite plugins: HTML transform, robots, webmanifest, theme
└── package.json
```

---

## 🚀 Getting Started

**Prerequisites:** Node.js 18+.

```bash
# 1. Clone
git clone https://github.com/ikrdikhit/ikrdikhit.github.io.git your_preferred_name
cd your_preferred_name

# 2. Install
npm install

# 3. Run — opens at http://localhost:3000
npm run dev
```

### All Scripts

| Command             | What it does                                                   |
| ------------------- | -------------------------------------------------------------- |
| `npm run dev`       | Start dev server with HMR on port 3000                         |
| `npm run build`     | Generate sitemap → typecheck → Vite production build → `dist/` |
| `npm run preview`   | Serve the production build locally                             |
| `npm run typecheck` | `tsc --noEmit` without building                                |
| `npm run lint`      | ESLint over all `.ts` / `.tsx` files                           |
| `npm run format`    | Prettier over the whole project                                |
| `npm run clean`     | `rm -rf dist/`                                                 |

> `npm run build` automatically runs `scripts/generate-sitemap.ts` via the `prebuild` npm hook, so `public/sitemap.xml` is always up to date before every deployment.

---

## ⚙️ Configuration

All personalisation lives in **`src/data/config.ts`** — name, bio, themes, social links, feature flags, skills, experience. You should rarely need to touch a component for routine changes.

> ### 📖 [Full field-by-field reference → CONFIGURATION.md](./CONFIGURATION.md)

Here is a quick map of what lives where:

| File                               | Controls                                                           |
| ---------------------------------- | ------------------------------------------------------------------ |
| `src/data/config.ts`               | Name, bio, hero, links, themes, flags, skills, experience, stats   |
| `src/data/blogs.ts`                | Blog post metadata: slug, title, date, tags, featured              |
| `src/data/projects.ts`             | Project metadata: slug, title, URLs, type, display style           |
| `src/components/ArticleLayout.tsx` | Syntax highlighting languages + code block colour theme            |
| `src/index.css`                    | Markdown visual styles, `@theme` CSS variable tokens, font faces   |
| `vite.config.ts`                   | Bundle splitting, Vite plugins (robots, webmanifest, theme script) |

---

## 📝 Adding Content

### Adding a Blog Post

**1.** Write your post at `public/blogs/your-post-slug.md`.

**2.** Register it in `src/data/blogs.ts`:

```ts
{
  slug: 'your-post-slug',           // → URL: /blogs/your-post-slug
  title: 'Your Post Title',
  description: 'One-sentence summary for cards and meta tags.',
  image: 'card-image.webp',         // filename only — lives in public/img/
  markdownFile: 'your-post-slug.md',
  date: '2024-06-15',               // YYYY-MM-DD — used for sorting and SEO dates
  tags: ['tech', 'guide'],          // first 2 shown on the card; all usable as filters
  featured: true,                   // true → also shown on the homepage
}
```

**3.** Drop `card-image.webp` into `public/img/` — 16:9 at ~800×450 px WebP is ideal.

The post will appear in the blog list, on the homepage (if `featured: true`), and will receive a sitemap entry on the next build automatically.

---

### Adding a Project

**1.** Write `public/projects/your-project-slug.md`.

**2.** Register it in `src/data/projects.ts`:

```ts
{
  slug: 'your-project-slug',        // → URL: /projects/your-project-slug
  title: 'My Project',
  description: 'What it does and why it matters.',
  image: 'my-project.webp',         // filename only — lives in public/img/
  markdownFile: 'your-project-slug.md',
  previewUrl: 'https://live-demo.com',
  sourceUrl: 'https://github.com/you/repo',
  type: 'project',                  // freeform label: 'tool', 'showcase', 'experiment', …
  tags: ['react', 'typescript'],
  featured: true,
  displayStyle: 'image',            // 'image' = thumbnail card · 'text' = minimal row
}
```

---

### Writing Markdown

The renderer supports full **GitHub Flavored Markdown** — tables, strikethrough, task lists — plus two custom behaviours:

**Syntax-highlighted code fences** use the language name as the fence identifier (e.g. ` ```typescript `). If a block renders without colour, the language isn't registered yet — see [CONFIGURATION.md → Syntax Highlighting](./CONFIGURATION.md#syntax-highlighting) for the full language list and how to add more.

**Poem blocks** use the special identifier `poem`. The content renders as a styled italic serif blockquote with a decorative pen icon instead of a code block:

````md
```poem
Two roads diverged in a yellow wood,
And sorry I could not travel both.
```
````

**Heading levels** are remapped automatically: markdown `#` and `##` both produce `<h2>` in the DOM, since the article title already occupies the page's one `<h1>`. This keeps accessibility and SEO correct without any extra effort on your part.

---

## 🗂️ Pages Reference

| Route           | Component              | Description                                                |
| --------------- | ---------------------- | ---------------------------------------------------------- |
| `/`             | `Home.tsx`             | Hero, info strip, featured projects, featured writings     |
| `/about`        | `AboutMe.tsx`          | Story, skills grid, experience timeline, know-more section |
| `/projects`     | `ProjectCatalogue.tsx` | Searchable + filterable project grid with popup preview    |
| `/projects/:id` | `Project.tsx`          | Full project article with live preview + source buttons    |
| `/blogs`        | `BlogList.tsx`         | Searchable + filterable blog list, sorted newest-first     |
| `/blogs/:id`    | `BlogPost.tsx`         | Full blog post with scroll progress bar + floating TOC     |
| `/links`        | `Links.tsx`            | Linktree-style social links page                           |
| `*`             | `NotFound.tsx`         | 404 — `noindex`                                            |

Pages are added and removed based on `showBlog`, `showProjects`, and `showLinks` in `PERSONAL_INFO`. Setting `showBlog: false` removes both `/blogs` and `/blogs/:id` from the router entirely — they don't just hide, they cease to exist as routes.

---

## 🏗️ Architecture

### 🎨 Theme System — zero flash, guaranteed

The system is built around one hard constraint: no colour flash, ever, even on hard refresh.

**1 — Build time:** `vite.config.ts`'s `themeScriptPlugin` serialises the entire `THEMES` map into a minimal inline `<script>` and injects it at `<head-prepend>`, before any stylesheet or React bundle.

**2 — Before first paint:** that script reads `localStorage.getItem('theme')`, finds the matching CSS variable map, and calls `document.documentElement.style.setProperty()` for all tokens synchronously. The browser applies these before drawing a single pixel.

**3 — After React mounts:** `ThemeProvider` reads the same key and calls `applyTheme()` on change. Since the DOM already has the correct values, this is a no-op on first load and a seamless transition on user action.

**4 — CSS consumption:** `src/index.css` declares an `@theme` block mapping Tailwind utilities (`bg-base`, `text-t-primary`, `border-border`, …) to CSS variables. No component ever hardcodes a colour.

### 🔍 SEO System

`SEO.tsx` wraps `react-helmet-async` and injects a complete set of meta tags per page in a single call: `<title>`, description, keywords, canonical link, full Open Graph tags, Twitter Card tags, article publication dates, and three JSON-LD blocks (`Person`, `WebSite`, and `BlogPosting` for articles). `vite.config.ts` emits `robots.txt` and `sitemap.xml` automatically on every production build.

### 🔤 Font Loading — no FOUT

DM Sans and Playfair Display are self-hosted as `.woff2` files with `<link rel="preload">` hints in `index.html`, so they download at maximum network priority before the CSS is parsed. The splash screen (`#font-loader`) uses a **two-gate** system:

```
Gate 1 → document.fonts.ready       (fonts downloaded and parsed)
Gate 2 → window.__onAppMounted()    (React has fully rendered)
```

Both must open before the overlay fades. A 4-second safety timeout ensures it always clears regardless of network conditions.

### 📄 Article Layout

`ArticleLayout.tsx` is the shared engine for both `BlogPost` and `Project` pages. It fetches the markdown file at navigation time (keeping it out of the JS bundle), computes a reading-time estimate at 200 wpm, extracts headings outside fenced blocks to build the TOC, drives the scroll-progress bar via `useScroll` + `useSpring`, and fires `history.replaceState` after content loads so Firefox Reader Mode correctly detects the article body.

### 📑 Table of Contents

`TableOfContents.tsx` tracks the active heading via `getBoundingClientRect().top` on scroll, renders a collapsible heading hierarchy with animated carets, moves a floating accent-coloured dot to the active item with smooth CSS transitions, auto-scrolls the TOC panel to keep the active entry in view, and persists sidebar open/closed state to `localStorage`. Desktop gets a fixed left sidebar; mobile gets a floating button that opens a modal overlay.

---

## 🚢 Build & Deployment

```bash
npm run build
# prebuild → scripts/generate-sitemap.ts runs first
# then → tsc + vite build → dist/
```

The only deployment requirement is a **SPA fallback** — the host must serve `index.html` for all paths, otherwise direct navigation to `/blogs/my-post` will return a server-level 404.

<br />

| Platform                                                                                                                                   | Setup                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| ![Vercel](https://img.shields.io/badge/Vercel-000?style=flat-square&logo=vercel&logoColor=white) **Vercel**                                | Zero config — Vite is auto-detected                       |
| ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white) **Netlify**                         | Add `public/_redirects` containing `/* /index.html 200`   |
| ![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-181717?style=flat-square&logo=github&logoColor=white) **GitHub Pages**           | Use `vite-plugin-gh-pages` or a GitHub Actions workflow   |
| ![Cloudflare](https://img.shields.io/badge/Cloudflare_Pages-F38020?style=flat-square&logo=cloudflare&logoColor=white) **Cloudflare Pages** | Build command: `npm run build` · Output directory: `dist` |

---

## 🎨 Customisation Tips

**Changing fonts** — Replace the `.woff2` files in `public/fonts/`, update the `@font-face` rules in `src/index.css`, and update the `<link rel="preload">` hints in `index.html`. Full procedure in [CONFIGURATION.md → Fonts](./CONFIGURATION.md#fonts).

**Changing the profile picture** — Replace `public/pfp.webp`, or update `profilePicture` in `PERSONAL_INFO` and the preload hint in `index.html`. Size and format guidance in [CONFIGURATION.md → Profile Picture](./CONFIGURATION.md#profile-picture).

**Adding or changing a theme** — Add a new object to `THEMES` in `config.ts` and set `ACTIVE_THEME` to its key. What each of the 11 tokens controls is explained token-by-token in [CONFIGURATION.md → Themes In Depth](./CONFIGURATION.md#themes-in-depth). The built-in `light` theme is currently broken — define a new one instead.

**Adding syntax highlighting for a new language** — If a code fence renders without colour, the language isn't registered. Import it and call `SyntaxHighlighter.registerLanguage()` in `ArticleLayout.tsx`. Full step-by-step guide, complete list of registered languages, and instructions for swapping the colour theme at [CONFIGURATION.md → Syntax Highlighting](./CONFIGURATION.md#syntax-highlighting).

**Scroll progress bar colour** — Currently reads from `THEME.accent`, which is a static snapshot of the default theme. To make it react to the user's active theme, replace `THEME.accent` with `useTheme().theme.accent` in `ArticleLayout.tsx`.

---

## ❓ FAQ

<details>
<summary><strong>Why are markdown files fetched at runtime instead of bundled?</strong></summary>
<br />

Bundling markdown into JS would bloat the initial chunk with content the user may never read. Fetching at navigation time means each article only loads when visited, and the browser HTTP cache handles everything after the first load. Cards also pre-fetch their markdown on hover, so in practice the file is already cached by the time the user clicks.

</details>

<details>
<summary><strong>Why does the sitemap script use <code>tsx</code> instead of compiling first?</strong></summary>
<br />

`tsx` executes TypeScript directly, which lets the script import `blogs.ts` and `projects.ts` with full type safety using the exact same data the app uses. This rules out a whole class of bugs (a regex failing silently on a multi-line object, for instance) and means the sitemap is always a perfect, current reflection of the app's content.

</details>

<details>
<summary><strong>How do I add a completely custom page?</strong></summary>
<br />

Create `src/pages/Gallery.tsx`, add a lazy import in `App.tsx` (`const Gallery = lazy(() => import('./pages/Gallery'))`), add a `<Route path="/gallery" element={<Gallery />} />` inside the `<Routes>` block, and optionally add the path to `STATIC_ROUTES` in `scripts/generate-sitemap.ts` so it gets a sitemap entry.

</details>

<details>
<summary><strong>The TOC isn't showing on my blog post. Why?</strong></summary>
<br />

The TOC only renders when the markdown contains at least one `h1`, `h2`, or `h3`. Also check that your headings aren't inside a fenced code block — the heading extractor in `ArticleLayout.tsx` explicitly strips content inside fences before scanning.

</details>

<details>
<summary><strong>A code block is rendering without syntax highlighting. Why?</strong></summary>
<br />

The language identifier in your fence hasn't been registered with `SyntaxHighlighter`. Only languages that are explicitly imported and registered in `ArticleLayout.tsx` will highlight — all others render as plain text silently. See [CONFIGURATION.md → Syntax Highlighting](./CONFIGURATION.md#syntax-highlighting) for the complete list of registered languages and how to add more.

</details>

<details>
<summary><strong>How do I disable the loading splash screen?</strong></summary>
<br />

Remove the `#font-loader` `<div>` and its accompanying inline `<script>` from `index.html`. The app continues to work — you just lose the guarantee of correct fonts on the very first paint.

</details>

---

<div align="center">

<br />

Made with ♥ by **[Dikhit Das](https://github.com/ikrdikhit)**

<br />

_If this saved you time, a ⭐ goes a long way — it genuinely helps others find it._

<br />

</div>
