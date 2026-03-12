<div align="center">

# ⚙️ Configuration Reference

**A complete, field-by-field guide to every configurable aspect of the portfolio.**

<br />

<a href="./README.md">
  <img src="https://img.shields.io/badge/%E2%86%90_Back_to_README-111111?style=for-the-badge&logoColor=white" alt="Back to README" />
</a>
&nbsp;
<img src="https://img.shields.io/badge/Primary_Config-src%2Fdata%2Fconfig.ts-646CFF?style=for-the-badge&logo=typescript&logoColor=white&labelColor=111111" alt="Primary config file" />

<br /><br />

> Start with `src/data/config.ts` for the most common changes.
> Refer to the later sections for theming, fonts, syntax highlighting, and build behaviour.

<br />

</div>

---

> [!WARNING]
> **The built-in `light` theme is currently broken.** Do not set `ACTIVE_THEME = 'light'` or allow users to select it. See [Adding a New Theme](#adding-a-new-theme) to define a working light palette from scratch — it only requires one config object.

---

This document covers every configurable aspect of the portfolio, organised by area of concern.

---

## Table of Contents

- [Primary Config File (`config.ts`)](#primary-config-file-configts)
  - [PERSONAL_INFO](#personal_info)
  - [THEMES](#themes)
  - [ACTIVE_THEME](#active_theme)
  - [SKILLS](#skills)
  - [EXPERIENCE](#experience)
  - [STATS](#stats)
  - [SOCIAL_LINKS](#social_links)
  - [MISC_INFO](#misc_info)
- [Blog Posts (`blogs.ts`)](#blog-posts-blogsts)
- [Projects (`projects.ts`)](#projects-projectsts)
- [Themes In Depth](#themes-in-depth)
  - [All 11 Colour Tokens Explained](#all-11-colour-tokens-explained)
  - [Adding a New Theme](#adding-a-new-theme)
  - [Theme Switcher Visibility](#theme-switcher-visibility)
- [Syntax Highlighting](#syntax-highlighting)
  - [Languages Registered by Default](#languages-registered-by-default)
  - [Adding a New Language](#adding-a-new-language)
  - [Changing the Highlight Theme](#changing-the-highlight-theme)
- [Markdown Features](#markdown-features)
  - [Supported GFM Elements](#supported-gfm-elements)
  - [Poem Blocks](#poem-blocks)
  - [Heading Level Remapping](#heading-level-remapping)
  - [Markdown Visual Styles](#markdown-visual-styles)
- [Fonts](#fonts)
  - [Changing or Adding a Font](#changing-or-adding-a-font)
  - [Font Preload Hints](#font-preload-hints)
- [Hero Headline Syntax](#hero-headline-syntax)
- [Feature Flags](#feature-flags)
- [CSS Theme Tokens (`index.css`)](#css-theme-tokens-indexcss)
- [Table of Contents Component](#table-of-contents-component)
- [Sitemap Configuration](#sitemap-configuration)
- [Build & Bundle Configuration](#build--bundle-configuration)
- [Vite Plugins](#vite-plugins)
- [Profile Picture](#profile-picture)

---

## Primary Config File (`config.ts`)

**Location:** `src/data/config.ts`

This is the single file you should reach for first. It exports six named constants that feed the entire application. No other file should need editing for routine personalisation.

---

### PERSONAL_INFO

The most important object. Every field is described below with its type, where it renders, and what happens when you change it.

```ts
export const PERSONAL_INFO = {
  name: 'Dikhit Das',
```

**Type:** `string`. Used in page `<title>` tags (e.g. `"About Me | Dikhit Das"`), the JSON-LD `Person` schema, the Open Graph `site_name` meta tag, the footer, and the contact popup heading. Change this first.

```ts
  namealt: 'Dikhit',
```

**Type:** `string`. The short version of your name, used only in the hero section greeting: `"Hi, I'm Dikhit"`. Useful if your full name is long or formal.

```ts
  role: 'Developer',
```

**Type:** `string`. Used in the default SEO description (`"Portfolio of X, a Developer specialising in…"`), in the JSON-LD `Person.jobTitle` field, and in SEO component fallback text. It does not appear in any visible UI element by default.

```ts
  email: 'dikhitdas@outlook.com',
```

**Type:** `string`. Rendered as a clickable `mailto:` link inside the contact popup. Also used by the `SOCIAL_LINKS.email` field (they are separate; `PERSONAL_INFO.email` powers the popup, `SOCIAL_LINKS.email` powers the links page).

```ts
  location: 'India',
  remoteAvailable: true,
```

**Type:** `string` and `boolean`. Both render in the homepage info section and inside the contact popup. When `remoteAvailable` is `true`, the text `"(Remote Available)"` appears next to the location in the popup, and `"Remote Available"` appears as a secondary line under the location on the homepage.

```ts
  bio: 'Developer that\'s also interested in...',
```

**Type:** `string`. The short tagline shown under the hero headline on the homepage. Also used as the default `<meta name="description">` for pages that don't set their own description.

```ts
  about: 'I\'m Dikhit, a developer and designer...',
```

**Type:** `string`. The longer personal paragraph rendered under the "My Story" heading on the About Me page. This can be multiple sentences and is not length-limited.

```ts
  knowMore: [
    'First paragraph.',
    'Second paragraph.',
  ],
```

**Type:** `string[]`. Each string becomes a separate `<p>` in the "Know More" section at the bottom of the About Me page. Add as many strings as you like.

```ts
  profilePicture: '/pfp.webp',
```

**Type:** `string`. The path, relative to `public/`, of your profile picture. It renders in four places: the About Me page (desktop static + mobile animated), the Links page (circular avatar), the SEO fallback og:image, and the JSON-LD schema. See the [Profile Picture](#profile-picture) section for format and size guidance.

```ts
  baseUrl: 'https://ikrdikhit.is-a.dev',
```

**Type:** `string`. **No trailing slash.** Used to construct absolute URLs for canonical links, Open Graph `og:url`, sitemap entries, and the `robots.txt` sitemap reference. This must be your actual deployment domain for SEO to work correctly.

```ts
  twitterHandle: '@ikrdikhit',
```

**Type:** `string`. Used in `twitter:creator` and `twitter:site` meta tags. Must include the `@` symbol.

```ts
  resumeUrl: null as string | null,
```

**Type:** `string | null`. When set to a path like `'/resume.pdf'`, a download button appears next to the "Tech Stack & Skills" heading on the About Me page. When `null`, the button is hidden entirely. Drop your PDF into `public/` and reference it here.

```ts
  careerStartYear: 2020,
```

**Type:** `number`. Used to auto-calculate the "Years building" stat: `new Date().getFullYear() - careerStartYear`. Update this once and it stays accurate forever.

```ts
  showContactButton: true,
  contactButtonLabel: 'Hire Me',
  contactDescription: '...',
```

`showContactButton` (**`boolean`**) controls whether the contact CTA button appears on the homepage and the About Me page (where it has a scroll-hide behaviour). `contactButtonLabel` sets the button text. `contactDescription` is the subtitle paragraph inside the contact popup modal — it should be one or two sentences about your availability.

```ts
  showStatus: true,
  statusLabel: 'Open for freelance projects',
```

`showStatus` (**`boolean`**) controls a pulsing green availability badge inside the contact popup. When `true`, an animated green dot appears alongside a briefcase icon and the `statusLabel` text. Set to `false` when you're not taking work.

```ts
  heroHeadline: 'I like {breaking} stuff till I make something {worthy}.',
```

**Type:** `string`. The large headline on the homepage. Words and phrases wrapped in `{curly braces}` are rendered in Playfair Display italic. Everything outside braces uses DM Sans bold. See [Hero Headline Syntax](#hero-headline-syntax) for full details.

```ts
  footerText: 'Thank You for Visiting <3',
```

**Type:** `string`. Plain text rendered in the homepage footer. HTML is not escaped — do not put user-generated content here.

```ts
  showBlog: true,
  showProjects: true,
  showLinks: true,
```

**Type:** `boolean`. Feature flags covered in detail under [Feature Flags](#feature-flags).

---

### THEMES

```ts
export const THEMES: Record<string, Theme> = {
  dark: { ... },
  light: { ... },
  catppuccin: { ... },
};
```

A dictionary of all available themes. The key (e.g. `'dark'`) is the theme's identifier stored in `localStorage` and referenced by `ACTIVE_THEME`. The value is a `Theme` object with exactly 11 colour tokens. See [Themes In Depth](#themes-in-depth) for what each token controls and how to add your own.

---

### ACTIVE_THEME

```ts
export const ACTIVE_THEME = 'dark';
```

**Type:** `string`. Must match a key in `THEMES`. This controls two things simultaneously: the theme applied before React mounts (via the inline script in `index.html`, generated by `vite.config.ts`), and the fallback theme if a user has no preference stored in `localStorage`. Changing this line is all you need to do to switch the default.

> **⚠️ Known issue:** The built-in `light` theme is currently broken and will produce incorrect colours across several components. Do not set `ACTIVE_THEME = 'light'` or allow users to select it. If you need a light theme, define a new one from scratch using the guide in [Adding a New Theme](#adding-a-new-theme) — a working light palette will give you full control over the tokens anyway.

There is also a static snapshot exported for direct use in components that need a colour value outside of React's render cycle:

```ts
export const THEME = THEMES[ACTIVE_THEME];
```

`THEME.accent` is used directly in `ArticleLayout.tsx` for the scroll-progress bar colour and in `TableOfContents.tsx` for the floating active dot. Note that these values are read at module initialisation time, not reactively — they will always reflect the `ACTIVE_THEME` default, not the user's currently selected theme at runtime. If you want those elements to respond to theme changes, you would need to replace `THEME.accent` with `useTheme().theme.accent` in those components.

---

### SKILLS

```ts
export const SKILLS = {
  frontend: 'React, Next.js, TypeScript, Tailwind CSS, Bootstrap, HTML, CSS, JavaScript',
  backend: 'Node.js, Python, PHP, MongoDB, PostgreSQL',
  design: 'Figma, GIMP, Typography, UI/UX, Prototyping',
  other: 'Git, Vercel, Lua, Bash, Linux, Motion Graphics, Photo/Video Editing, Sprites',
};
```

Each value is a comma-separated string rendered as plain text. These four keys (`frontend`, `backend`, `design`, `other`) are hardcoded by name in `AboutMe.tsx` — if you rename a key here, you must also rename the corresponding destructured key in the `AboutMe.tsx` skills grid:

```tsx
// In AboutMe.tsx — update this array if you rename SKILLS keys
[
  { label: 'Frontend', value: SKILLS.frontend },
  { label: 'Design', value: SKILLS.design },
  { label: 'Backend', value: SKILLS.backend },
  { label: 'Other', value: SKILLS.other },
];
```

The label (e.g. `'Frontend'`) is the heading displayed above each skill string and is independent of the key name.

---

### EXPERIENCE

```ts
export const EXPERIENCE = [
  {
    role: 'Freelancing',
    company: 'Independent',
    period: 'Present',
    description: '...',
    isCurrent: true,
  },
];
```

An array of job objects rendered as a vertical timeline on the About Me page. The array renders in order from top to bottom, so put the most recent entry first. Each object has five fields:

`role` — the job title, displayed in a larger weight. `company` — shown in smaller uppercase tracking below the title. `period` — a freeform string (e.g. `'2022 – Present'` or `'Jan 2021 – Mar 2023'`), right-aligned in the timeline. `description` — a paragraph of plain text. `isCurrent` — controls the timeline dot: `true` gives a filled white dot, `false` gives a hollow dot in the border colour.

---

### STATS

```ts
export const STATS = [
  { label: 'Projects shipped', value: '10+' },
  {
    label: 'Years building',
    value: `${new Date().getFullYear() - PERSONAL_INFO.careerStartYear}+`,
  },
  { label: 'Clients worked with', value: '5+' },
];
```

Each object has a `label` (string) and `value` (string or `null`). Setting `value: null` hides that individual stat. The `STATS` array is exported but not currently rendered by any page component — it is ready to be imported and displayed wherever you need it (e.g. a stats row in the About Me page or homepage).

---

### SOCIAL_LINKS

```ts
export const SOCIAL_LINKS = {
  github: 'https://github.com/ikrdikhit',
  x: 'https://x.com/ikrdikhit',
  instagram: 'https://instagram.com/ikrdikhit',
  discord: null as string | null,
  discordServer: 'https://spicydevs.js.org/discord',
  discordServerTitle: 'Spicydevs',
  linkedin: null as string | null,
  buyMeACoffee: 'https://buymeacoffee.com/dikhit',
  email: 'mailto:dikhitdas@outlook.com',
};
```

Setting any value to `null` hides that link from the `/links` page. Note that `github` and `x` also appear as icon buttons in the homepage info section — setting them to `null` removes them there too. The `discordServerTitle` key controls the title text shown for the Discord server link on the `/links` page (e.g. `"Spicydevs Discord Server"`). There is no `discordServerTitle` fallback if you leave it blank, so always set it when `discordServer` is non-null.

The `email` field here uses `mailto:` syntax because it renders as an `<a href>` on the links page, unlike `PERSONAL_INFO.email` which is plain text assembled into a `mailto:` link in `ContactPopup.tsx`.

---

### MISC_INFO

```ts
export const MISC_INFO = {
  keywords: 'Developer, Designer, Portfolio, React, Next.js',
  googleAnalyticsId: null as string | null,
  defaultOgImage: '/pfp.webp',
  imagePath: '/img',
  tocExpandDepth: 1,
  showThemeSwitcher: false,
};
```

`keywords` — a comma-separated string appended to the `<meta name="keywords">` tag on every page, combined with the user's name.

`googleAnalyticsId` — set to your GA4 measurement ID (e.g. `'G-XXXXXXXXXX'`) to enable Google Analytics. When set, `SEO.tsx` injects the gtag script and config call into the `<head>` of every page.

`defaultOgImage` — the fallback `og:image` for pages that don't specify their own image. Defaults to the profile picture.

`imagePath` — the base path prepended to all image filenames in `blogs.ts` and `projects.ts`. The `.map()` at the bottom of both files uses this, so you only write the bare filename (e.g. `'my-image.webp'`) in the data arrays.

`tocExpandDepth` — controls auto-collapsing in the Table of Contents. It sets the minimum relative heading depth that gets collapsed by default. `1` means only the top-level headings are expanded; deeper nested headings start collapsed. Set to a very high number (e.g. `99`) to have everything expanded by default. See [Table of Contents Component](#table-of-contents-component) for more detail.

`showThemeSwitcher` — shows or hides the `PiPaintBrush` button in the bottom-left corner. Even when `false`, the theme system still works — users can change their theme via `localStorage` or by calling `useTheme().setTheme()` programmatically.

---

## Blog Posts (`blogs.ts`)

**Location:** `src/data/blogs.ts`

```ts
export const BLOG_POSTS: BlogPost[] = (
  [
    {
      slug: 'my-post-slug',
      title: 'My Post Title',
      description: 'One-sentence summary.',
      image: 'card-image.webp',
      markdownFile: 'my-post-slug.md',
      date: '2024-06-15',
      tags: ['tech', 'guide'],
      featured: true,
    },
  ] as BlogPost[]
).map((post) => ({
  ...post,
  image: `${MISC_INFO.imagePath}/${post.image}`,
}));
```

Every field in the `BlogPost` type is required. Here is what each one does:

`slug` — the URL segment for this post (`/blogs/my-post-slug`). Must be lowercase, hyphen-separated, and match the markdown filename without the `.md` extension. Also used as the sitemap entry path.

`title` — displayed as the `<h1>` on the article page, as the card title in the blog list, and in `<title>` and Open Graph tags.

`description` — shown as a subtitle on the article page, as the card excerpt in the blog list, and as the `<meta name="description">`.

`image` — the filename of the card image, stored in `public/img/`. The `.map()` at the bottom of the array automatically prepends `MISC_INFO.imagePath` (`/img`). Use a 16:9 WebP at around 800×450 px. This image also becomes the Open Graph `og:image` for the post.

`markdownFile` — the filename (including `.md`) of the markdown file in `public/blogs/`. Usually the same as the slug with `.md` appended, but doesn't have to be.

`date` — an ISO 8601 date string (`YYYY-MM-DD`). Used in the blog card date display, in the article's `<time>` element, in the `article:published_time` meta tag, in the JSON-LD `BlogPosting.datePublished`, and for sorting the blog list (newest first by default).

`tags` — an array of strings. The first two tags appear on the blog card. All tags are collected into the filter panel on the blog list page. They also populate the `p-category` microformat class on the article page.

`featured` — when `true`, the post appears in the "Featured Writings" section on the homepage in addition to the full blog list.

---

## Projects (`projects.ts`)

**Location:** `src/data/projects.ts`

```ts
export const PROJECTS: ShowcaseItem[] = (
  [
    {
      slug: 'my-project',
      title: 'My Project',
      description: 'What it does.',
      image: 'my-project.webp',
      markdownFile: 'my-project.md',
      previewUrl: 'https://live-demo.example.com',
      sourceUrl: 'https://github.com/you/repo',
      type: 'project',
      tags: ['react', 'typescript'],
      featured: true,
      displayStyle: 'image',
    },
  ] as ShowcaseItem[]
).map((post) => ({
  ...post,
  image: `${MISC_INFO.imagePath}/${post.image}`,
}));
```

Most fields mirror the blog post shape. The project-specific ones are:

`previewUrl` — the live demo URL, used in the "Preview" button inside the project popup (on the homepage) and the "Live Preview" button on the full project article page.

`sourceUrl` — the source code URL (typically GitHub), used in the "Source" button on the popup and the "View Source" button on the article page.

`type` — a freeform label shown in the project catalogue grid (e.g. `'project'`, `'tool'`, `'showcase'`, `'experiment'`). It's rendered in uppercase on the card and as a `<span>` in the article's left metadata area.

`displayStyle` — controls how the card renders in the project grid on the homepage and the Project Catalogue page. `'image'` (default) renders a thumbnail with an image, title, and type label. `'text'` renders a minimal full-width row with just the title and an arrow — useful for projects without a strong visual or when you want a more editorial list feel. Note that the `Project Catalogue` page (`ProjectCatalogue.tsx`) does not use `displayStyle` — it always renders the image card style. The `displayStyle` distinction only applies to `ProjectCard.tsx` which is used on the homepage.

---

## Themes In Depth

### All 11 Colour Tokens Explained

Every theme object must define exactly these 11 keys. Understanding what each one does makes it much easier to design a coherent theme:

```ts
{
  label: 'My Theme',     // The display name shown in the theme switcher popup
  bgBase: '#111111',     // The page background — used by <body> and full-screen wrappers
  bgRaised: '#1A1A1A',   // One step lighter — cards, inputs, code block headers, tag pills
  bgOverlay: '#161616',  // Modals (BasePopup), code block content areas, blockquotes
  bgHover: '#222222',    // Hover state background for interactive elements
  textPrimary: '#F3F3F3', // Main body text, headings, active states
  textMuted: '#9A9A9A',   // Secondary text — dates, descriptions, placeholders, captions
  border: '#333333',      // Primary borders — card outlines, dividers, timeline lines
  borderSubtle: '#222222',// Lighter borders — code block inner borders, subtle separators
  accent: '#F3F3F3',      // Scroll progress bar, active TOC dot, text selection highlight
  accentFg: '#111111',    // Text colour rendered on top of the accent — used for ::selection
}
```

The key relationships to keep in mind when designing a theme are: `bgBase` → `bgRaised` → `bgOverlay` should form a subtle gradient of lightness (or darkness) to create visual depth. `textPrimary` must have strong contrast against `bgBase`. `textMuted` sits between the two and should still be readable. `accent` should pop against `bgBase` — it's used sparingly but importantly (the scrollbar, the TOC dot, and text selection).

### Adding a New Theme

Adding a theme is entirely additive — you only touch `config.ts`. No component or CSS file needs to change. This is also the recommended path if you need a working light theme, since the built-in `light` theme is currently broken.

```ts
// In src/data/config.ts, add an entry to the THEMES object:
export const THEMES: Record<string, Theme> = {
  dark: { ... },
  light: { ... },
  catppuccin: { ... },

  // Your new theme:
  nord: {
    label: 'Nord',
    bgBase: '#2E3440',
    bgRaised: '#3B4252',
    bgOverlay: '#343A47',
    bgHover: '#434C5E',
    textPrimary: '#ECEFF4',
    textMuted: '#9099A8',
    border: '#4C566A',
    borderSubtle: '#3B4252',
    accent: '#88C0D0',
    accentFg: '#2E3440',
  },
};
```

Once you add the object, the theme automatically appears in the theme switcher popup (if `showThemeSwitcher` is `true`) and becomes selectable via `useTheme().setTheme('nord')`. To make it the default, set `ACTIVE_THEME = 'nord'`.

The theme switcher popup renders all themes by iterating `Object.keys(THEMES)`, so order in the object is the display order.

### Theme Switcher Visibility

The theme switcher button is a small paint-brush icon (`PiPaintBrush`) pinned to the bottom-left corner of the screen. It is intentionally invisible by default (`text-transparent`) so it doesn't clutter the design for users who don't care about themes, but it is still focusable and clickable.

```ts
// In MISC_INFO:
showThemeSwitcher: true, // Set to true to make the button visibly coloured
```

Even when `showThemeSwitcher` is `false`, the entire theme system (flash prevention, ThemeProvider, localStorage persistence) remains active. You can still drive theme changes programmatically with `useTheme().setTheme('nord')` from anywhere in the app.

---

## Syntax Highlighting

Syntax highlighting is handled by `react-syntax-highlighter` using the PrismLight bundle (tree-shakeable) in `src/components/ArticleLayout.tsx`.

### Languages Registered by Default

Only languages that are explicitly imported and registered are available. Here is every language that ships registered out of the box:

| Language identifiers in markdown fence | Notes            |
| -------------------------------------- | ---------------- |
| `tsx`                                  | TypeScript + JSX |
| `jsx`                                  | JavaScript + JSX |
| `typescript`, `ts`                     | TypeScript       |
| `javascript`, `js`                     | JavaScript       |
| `python`                               | Python           |
| `bash`, `sh`, `zsh`                    | Shell scripts    |
| `markdown`                             | Markdown source  |
| `css`                                  | CSS              |
| `markup`, `xml`, `html`                | HTML / XML       |

**If you use a language identifier that is not in this list, the code block will render without syntax highlighting** — it won't error, but the code will appear as unstyled plain text. This is a common source of confusion. For example, writing ` ```go ` in your markdown will silently produce an unhighlighted block.

### Adding a New Language

To add support for a new language, edit `src/components/ArticleLayout.tsx`:

```tsx
// Step 1: Import the language at the top of the file, alongside the existing imports.
// All available languages are in: react-syntax-highlighter/dist/esm/languages/prism/
// The full list is at: https://github.com/react-syntax-highlighter/react-syntax-highlighter/tree/master/src/languages/prism

import rust from 'react-syntax-highlighter/dist/esm/languages/prism/rust';
import go from 'react-syntax-highlighter/dist/esm/languages/prism/go';
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql';
import docker from 'react-syntax-highlighter/dist/esm/languages/prism/docker';
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';

// Step 2: Register each language with SyntaxHighlighter, below the existing registrations.
// The first argument is the string you'll use in your markdown fence.
// You can register multiple aliases for the same language.

SyntaxHighlighter.registerLanguage('rust', rust);
SyntaxHighlighter.registerLanguage('go', go);
SyntaxHighlighter.registerLanguage('sql', sql);
SyntaxHighlighter.registerLanguage('docker', docker);
SyntaxHighlighter.registerLanguage('dockerfile', docker); // alias
SyntaxHighlighter.registerLanguage('yaml', yaml);
SyntaxHighlighter.registerLanguage('yml', yaml); // alias
SyntaxHighlighter.registerLanguage('json', json);
```

Using the ESM path (`/dist/esm/languages/prism/`) rather than the CJS path is important — it allows Vite and Rollup to tree-shake out every other Prism language, keeping the bundle small.

### Changing the Highlight Theme

The visual theme for code blocks (colours, background) is controlled by the `style` prop on `SyntaxHighlighter`. The current theme is `vscDarkPlus` (VS Code dark+).

```tsx
// In ArticleLayout.tsx, find this import near the top:
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Replace it with any other available theme, for example:
import { dracula }          from 'react-syntax-highlighter/dist/esm/styles/prism';
import { oneDark }          from 'react-syntax-highlighter/dist/esm/styles/prism';
import { nord }             from 'react-syntax-highlighter/dist/esm/styles/prism';
import { solarizedlight }   from 'react-syntax-highlighter/dist/esm/styles/prism';
import { tomorrow }         from 'react-syntax-highlighter/dist/esm/styles/prism';

// Then update the style prop on the SyntaxHighlighter component:
<SyntaxHighlighter
  style={dracula}   // ← change this
  language={match[1]}
  ...
>
```

The full list of available Prism styles is at: `react-syntax-highlighter/dist/esm/styles/prism/`. Note that the code block's outer background (`bg-overlay`) and border are styled by Tailwind classes on the `<figure>` wrapper, not by the Prism theme — so even light Prism themes will have the dark card chrome unless you also adjust those Tailwind classes.

---

## Markdown Features

### Supported GFM Elements

The markdown renderer uses `remark-gfm`, which enables the following beyond standard CommonMark:

Tables (with automatic horizontal-scroll wrapping on mobile), strikethrough text with `~~double tildes~~`, task lists with `- [x]` and `- [ ]`, footnotes, and autolinks.

### Poem Blocks

A custom renderer intercepts fenced code blocks with the language identifier `poem` and renders them as a styled italic blockquote with a decorative pen icon, instead of a code block. This is useful for poetry, lyrics, or any text you want to present in a literary style.

````md
```poem
Two roads diverged in a yellow wood,
And sorry I could not travel both.
```
````

This produces a styled `<figure>` with a left border, italic serif font, and a decorative SVG edit icon in the corner. The text preserves line breaks via `white-space: pre-wrap`. Any text you put in a `poem` block will not be syntax-highlighted.

### Heading Level Remapping

Because the article title is already rendered as the page's `<h1>`, any `# h1` in your markdown is remapped to `<h2>` in the DOM. This keeps the heading hierarchy correct for both accessibility (screen readers) and SEO (only one `<h1>` per page) without requiring you to remember to start your markdown at `##`.

The mapping is: markdown `#` → `<h2>`, markdown `##` → `<h2>`, markdown `###` → `<h3>`. Both `#` and `##` produce `<h2>`, meaning you can use either convention in your markdown files and the output is semantically equivalent. Headings `####` and deeper are not intercepted and render as their native level.

All intercepted headings also receive an `id` attribute derived from their text content (lowercased, non-word characters replaced with hyphens), which is what the Table of Contents uses for scroll-to-heading links.

### Markdown Visual Styles

All visual styling for rendered markdown lives in the `.markdown-body` block in `src/index.css`. You can adjust spacing, font sizes, colours, and element styles there without touching any component. The colours all reference CSS variables (e.g. `var(--text-primary)`, `var(--border)`) so they automatically adapt to theme changes.

Key style rules and what they control:

```css
.markdown-body p {
  font-size: 1.125rem;
} /* Paragraph text size */
.markdown-body h2 {
  font-size: 1.875rem;
} /* h2 heading size */
.markdown-body blockquote {
  border-left: 4px solid var(--border);
} /* Blockquote left bar */
.markdown-body code {
  background-color: var(--bg-raised);
} /* Inline code background */
.markdown-body table {
  border-radius: 12px;
} /* Table corner rounding */
.markdown-body img {
  border-radius: 12px;
} /* Image corner rounding */
```

---

## Fonts

The portfolio uses two self-hosted variable fonts loaded from `public/fonts/`:

`DM Sans` — the primary sans-serif, used for all body text, UI labels, and code-adjacent text. Loaded in both normal and italic axis weights 100–1000.

`Playfair Display` — the display serif, used for page titles, article headings, blog card titles, and the italic portions of the hero headline. Loaded in weights 400–700 for both normal and italic.

### Changing or Adding a Font

**Step 1 — Add the font file.** Place your `.woff2` file in `public/fonts/`. Always use `.woff2` — it is the most compressed format with universal modern browser support.

**Step 2 — Declare the `@font-face` in `src/index.css`.**

```css
@font-face {
  font-family: 'My Font';
  font-style: normal;
  font-weight: 100 900; /* Range for variable fonts; single value for static */
  font-display: swap; /* Keep swap to prevent FOIT (invisible text while loading) */
  src: url('/fonts/my-font.woff2') format('woff2');
}
```

**Step 3 — Register in the `@theme` block in `src/index.css`.**

```css
@theme {
  --font-sans: 'My Font', ui-sans-serif, system-ui, sans-serif;
  /* Or, to replace the serif font: */
  --font-serif: 'My Serif', ui-serif, Georgia, serif;
}
```

Tailwind's `font-sans` and `font-serif` utilities map to these CSS variables, so the change propagates everywhere automatically.

### Font Preload Hints

For fonts used on the very first render (DM Sans and Playfair Display are both used above the fold), `index.html` includes `<link rel="preload">` hints to tell the browser to download them at the highest network priority, before the browser has parsed the CSS. If you change the primary fonts, update these hints to match — otherwise the new fonts will load late and may cause a flash:

```html
<!-- In index.html <head>, update these to match your font filenames -->
<link rel="preload" as="font" type="font/woff2" href="/fonts/dm-sans.woff2" crossorigin />
<link rel="preload" as="font" type="font/woff2" href="/fonts/playfair-display.woff2" crossorigin />
```

You only need to preload the fonts that are actually visible before the user scrolls — typically your primary sans-serif. Adding preload hints for many fonts can hurt performance by competing for bandwidth with critical resources.

---

## Hero Headline Syntax

The `heroHeadline` string in `PERSONAL_INFO` uses a lightweight inline syntax to mix two typefaces in the same headline. Any word or phrase wrapped in `{curly braces}` is rendered in **Playfair Display italic**. Everything outside braces is rendered in **DM Sans bold**. Braces can wrap any number of words.

```ts
heroHeadline: 'I like {breaking} stuff till I make something {worthy}.';
// Renders as:
// "I like " (DM Sans bold) + "breaking" (Playfair italic) + " stuff till..."
```

```ts
heroHeadline: '{Building} things {that matter}.';
// Renders as:
// "Building" (serif) + " things " (sans) + "that matter" (serif) + "." (sans)
```

The parsing is done by `renderHeadline()` in `Home.tsx`, which splits the string on `{...}` groups and maps each segment to either a `<span className="font-serif italic font-normal">` or a plain text node. The function currently supports multiple brace groups in the same string — you can have as many as you like. However, nested braces are not supported and will produce unexpected output.

---

## Feature Flags

Three boolean flags on `PERSONAL_INFO` control the visibility of entire sections and routes:

`showProjects` — when `false`, the `/projects` and `/projects/:id` routes are removed from the React Router config entirely (not just hidden), the "Featured Work" section disappears from the homepage, and the "Show all" projects link is removed. The `PROJECTS` data array still exists but is unreachable.

`showBlog` — when `false`, the `/blogs` and `/blogs/:id` routes are removed, the "Featured Writings" section disappears from the homepage, and the "Show all" blogs link is removed.

`showLinks` — when `false`, the `/links` route is removed. However, `showLinks` does **not** affect the social icon buttons in the homepage info section — those are always shown if the corresponding `SOCIAL_LINKS` values are non-null. What `showLinks: false` removes is the dedicated links page itself and any "More links" button that leads to it.

`showContactButton` — hides the "Hire Me" button on the homepage and About Me page when `false`. The contact popup component itself is still mounted in the component tree; it simply has no trigger.

`showStatus` — hides the availability badge row inside the contact popup when `false`.

`showThemeSwitcher` — hides the theme switcher button (bottom-left brush icon) when `false`.

---

## CSS Theme Tokens (`index.css`)

The `@theme` block in `src/index.css` maps Tailwind utility classes to CSS variables. This is how components use theme-aware colours via standard Tailwind classes without any JavaScript:

```css
@theme {
  --color-base: var(--bg-base);
  --color-raised: var(--bg-raised);
  --color-overlay: var(--bg-overlay);
  --color-hover: var(--bg-hover);
  --color-t-primary: var(--text-primary);
  --color-t-muted: var(--text-muted);
  --color-border: var(--border);
  --color-border-subtle: var(--border-subtle);
  --color-accent: var(--accent);
  --color-accent-fg: var(--accent-fg);
}
```

This means a class like `bg-base` resolves to `background-color: var(--bg-base)`, which is set at runtime by `ThemeContext.tsx`. The full mapping of Tailwind class → CSS variable → theme token is:

| Tailwind class                    | CSS variable      | Theme key      |
| --------------------------------- | ----------------- | -------------- |
| `bg-base`                         | `--bg-base`       | `bgBase`       |
| `bg-raised`                       | `--bg-raised`     | `bgRaised`     |
| `bg-overlay`                      | `--bg-overlay`    | `bgOverlay`    |
| `bg-hover`                        | `--bg-hover`      | `bgHover`      |
| `text-t-primary`                  | `--text-primary`  | `textPrimary`  |
| `text-t-muted`                    | `--text-muted`    | `textMuted`    |
| `border-border`                   | `--border`        | `border`       |
| `border-border-subtle`            | `--border-subtle` | `borderSubtle` |
| `bg-accent` / `text-accent`       | `--accent`        | `accent`       |
| `bg-accent-fg` / `text-accent-fg` | `--accent-fg`     | `accentFg`     |

If you want to add a new colour token to the theme system (for example, a dedicated `success` colour), the process is: add the key to the `Theme` type in `config.ts`, add it to every theme object, add a `r.style.setProperty()` call in `ThemeContext.tsx`'s `applyTheme()`, add a CSS variable to `:root` in `index.css` as a fallback, and add the `@theme` mapping in `index.css`.

---

## Table of Contents Component

The TOC (`src/components/TableOfContents.tsx`) has one directly configurable value:

```ts
// In MISC_INFO:
tocExpandDepth: 1,
```

This sets the minimum relative depth at which headings start collapsed by default. A relative depth of `1` means the very top-level headings in your article are expanded; anything nested below them starts collapsed. A value of `2` would mean the first and second levels start expanded. Setting it to `99` effectively disables auto-collapsing — everything starts expanded.

The TOC also persists its sidebar open/closed state to `localStorage` under the key `'toc-visible'`. This is a user preference, not something you configure in `config.ts`.

On desktop (≥ `xl` breakpoint, 1280px), the TOC renders as a fixed left sidebar. On smaller screens it becomes a floating button (top-right) that opens a modal popup. The `xl` breakpoint is a Tailwind default — if you need to change the breakpoint at which the sidebar appears, search for `xl:` classes in `TableOfContents.tsx` and update them.

---

## Sitemap Configuration

**Location:** `scripts/generate-sitemap.ts`

The sitemap script runs automatically before every production build (`npm run build`) via the `prebuild` npm hook. It writes `public/sitemap.xml` by combining static routes with dynamically generated entries from `BLOG_POSTS` and `PROJECTS`.

To change static route metadata (priority, change frequency) or add new static pages, edit the `STATIC_ROUTES` array:

```ts
const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/projects', priority: '0.8', changefreq: 'weekly' },
  { path: '/blogs', priority: '0.8', changefreq: 'weekly' },
  { path: '/links', priority: '0.5', changefreq: 'monthly' },

  // Add custom pages here, for example:
  { path: '/gallery', priority: '0.7', changefreq: 'monthly' },
];
```

The `BASE_URL` at the top of the script must match `PERSONAL_INFO.baseUrl` — they are intentionally separate so the script can run standalone without importing the full config, though you should keep them in sync.

---

## Build & Bundle Configuration

**Location:** `vite.config.ts`

The bundle is split into manual chunks to maximise cache hit rates for returning visitors. The heaviest dependencies are isolated so that a blog post edit (which changes `vendor-syntax`) doesn't bust the React or Framer Motion cache:

```ts
manualChunks: {
  'vendor-react':  ['react', 'react-dom', 'react-router-dom'],
  'vendor-framer': ['motion'],
  'vendor-syntax': ['react-syntax-highlighter'],
},
```

If you add a large new dependency, consider adding it to this map. The `chunkSizeWarningLimit` is set to `800` KB — Vite will warn in the console if any output chunk exceeds this.

HMR (Hot Module Replacement) can be disabled for CI or preview environments by setting the environment variable `DISABLE_HMR=true` before running `vite`. This is handled by:

```ts
server: {
  hmr: process.env.DISABLE_HMR !== 'true',
},
```

---

## Vite Plugins

Five custom plugins run in `vite.config.ts`. None require direct editing for normal use, but knowing what they do helps when something unexpected happens:

`transformHtmlPlugin` — replaces `__SITE_NAME__`, `__THEME_COLOR__`, and `__BORDER_COLOR__` placeholders in `index.html` at build and dev time using values from `config.ts`. This is how the loading screen dots and the `<meta name="theme-color">` tag get the correct colours without any JavaScript.

`robotsPlugin` — generates `robots.txt` with `Allow: /` and a Sitemap reference pointing to `PERSONAL_INFO.baseUrl/sitemap.xml`. Served at `/robots.txt` in dev and emitted as a build asset.

`webmanifestPlugin` — generates `site.webmanifest` from `PERSONAL_INFO` values (name, short name, bio, theme colour, icons). Served at `/site.webmanifest` in dev and emitted as a build asset.

`metadataPlugin` — generates `metadata.json`, a lightweight file used by some preview/embed systems. Served at `/metadata.json` in dev and emitted as a build asset.

`themeScriptPlugin` — this is the most important plugin for correctness. It serialises the entire `THEMES` object into a compact inline `<script>` tag injected at the very beginning of `<head>` (before any CSS). This script runs synchronously on page load, reads `localStorage.getItem('theme')`, and applies the matching CSS variables to `:root` before the first paint, preventing any theme flash. If you add a new theme or rename a theme key, this plugin picks up the change automatically — you don't need to touch `index.html`.

---

## Profile Picture

**Location:** `public/pfp.webp`

The profile picture is referenced in three places and optimised differently in each context:

On the About Me page, it's the **Largest Contentful Paint (LCP) element** on mobile (the animated shrinking image) and a significant element on desktop. For best performance it should be a WebP file under 200 KB, at 400×400 px or larger (since it renders up to 300px wide on mobile before scrolling).

The `index.html` includes a high-priority preload hint specifically for this image:

```html
<link rel="preload" as="image" href="/pfp.webp" type="image/webp" />
```

If you change the filename, update both the `profilePicture` key in `PERSONAL_INFO` **and** this preload hint. Forgetting to update the preload hint won't break anything, but it will cause the LCP image to load later than necessary.

On the Links page, it renders as a small 96×96 circular avatar. On the About Me desktop view, it fills a `w-full aspect-square` container inside a `w-1/3` column, which makes it roughly 250–350 px wide depending on screen size. The `grayscale` filter is applied by default; it lifts to full colour on hover (desktop) or tap-and-hold (mobile).
