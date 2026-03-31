import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';
import { PERSONAL_INFO } from './src/data/config';
import { THEMES, ACTIVE_THEME } from './src/data/colors.config';

function transformHtmlPlugin(): Plugin {
  return {
    name: 'transform-html',
    transformIndexHtml(html) {
      return html
        .replace(/__SITE_NAME__/g, PERSONAL_INFO.name)
        .replace(/__SITE_DESCRIPTION__/g, PERSONAL_INFO.bio)
        .replace(/__SITE_URL__/g, PERSONAL_INFO.baseUrl)
        .replace(/__TWITTER_HANDLE__/g, PERSONAL_INFO.twitterHandle)
        .replace(/__THEME_COLOR__/g, THEMES[ACTIVE_THEME].bgBase)
        .replace(/__BORDER_COLOR__/g, THEMES[ACTIVE_THEME].border);
    },
  };
}

function webmanifestPlugin(): Plugin {
  const getContent = () =>
    JSON.stringify(
      {
        name: PERSONAL_INFO.name,
        short_name: PERSONAL_INFO.namealt,
        description: PERSONAL_INFO.bio,
        start_url: '/',
        display: 'standalone',
        background_color: THEMES[ACTIVE_THEME].bgBase,
        theme_color: THEMES[ACTIVE_THEME].bgBase,
        icons: [
          { src: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
          { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
          { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
      },
      null,
      2
    );

  return {
    name: 'generate-webmanifest',
    configureServer(server) {
      server.middlewares.use('/site.webmanifest', (_req, res) => {
        res.setHeader('Content-Type', 'application/manifest+json');
        res.end(getContent());
      });
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'site.webmanifest',
        source: getContent(),
      });
    },
  };
}

function metadataPlugin(): Plugin {
  const getContent = () =>
    JSON.stringify(
      {
        name: `${PERSONAL_INFO.name}'s Portfolio`,
        description: PERSONAL_INFO.bio,
        requestFramePermissions: [],
      },
      null,
      2
    );

  return {
    name: 'generate-metadata',
    configureServer(server) {
      server.middlewares.use('/metadata.json', (_req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(getContent());
      });
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'metadata.json',
        source: getContent(),
      });
    },
  };
}

function robotsPlugin(): Plugin {
  const getContent = () =>
    `User-agent: *\nAllow: /\n\nSitemap: ${PERSONAL_INFO.baseUrl}/sitemap.xml`;

  return {
    name: 'generate-robots',
    configureServer(server) {
      server.middlewares.use('/robots.txt', (_req, res) => {
        res.setHeader('Content-Type', 'text/plain');
        res.end(getContent());
      });
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: getContent(),
      });
    },
  };
}

/**
 * Injects the theme-flash-prevention script into <head> at serve and build time.
 *
 * Why a plugin instead of generate-theme.ts?
 * - generate-theme.ts mutates index.html directly, creating noisy git diffs and
 *   requiring a separate prebuild/dev script step.
 * - A Vite plugin runs during the transform pipeline, so index.html is never
 *   modified on disk — the injection only exists in the served/built output.
 */
function themeScriptPlugin(): Plugin {
  // Build the per-theme CSS variable map once at startup
  const themeVars: Record<string, Record<string, string>> = {};
  for (const [name, t] of Object.entries(THEMES)) {
    themeVars[name] = {
      '--bg-base': t.bgBase,
      '--bg-raised': t.bgRaised,
      '--bg-overlay': t.bgOverlay,
      '--bg-hover': t.bgHover,
      '--text-primary': t.textPrimary,
      '--text-muted': t.textMuted,
      '--border': t.border,
      '--border-subtle': t.borderSubtle,
      '--accent': t.accent,
      '--accent-fg': t.accentFg,
    };
  }

  const script = `<script>try{var t=localStorage.getItem('theme'),themes=${JSON.stringify(themeVars)},vars=themes[t];if(vars){var r=document.documentElement;Object.keys(vars).forEach(function(k){r.style.setProperty(k,vars[k])})}}catch(e){}</script>`;

  return {
    name: 'inject-theme-script',
    // transformIndexHtml runs on every request in dev and once per page in build.
    // Returning a descriptor with `injectTo: 'head'` places it before </head>
    // without us having to do any string manipulation.
    transformIndexHtml() {
      return [
        {
          tag: 'script',
          attrs: {},
          children: `try{var t=localStorage.getItem('theme'),themes=${JSON.stringify(themeVars)},vars=themes[t];if(vars){var r=document.documentElement;Object.keys(vars).forEach(function(k){r.style.setProperty(k,vars[k])})}}catch(e){}`,
          injectTo: 'head-prepend', // as early as possible to avoid flash
        },
      ];
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [
      transformHtmlPlugin(),
      robotsPlugin(),
      webmanifestPlugin(),
      metadataPlugin(),
      themeScriptPlugin(),
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Core React runtime — loaded on every page
            if (
              id.includes('/node_modules/react/') ||
              id.includes('/node_modules/react-dom/') ||
              id.includes('/node_modules/scheduler/')
            ) {
              return 'vendor-react';
            }
            // React Router — loaded on every page alongside React
            if (id.includes('/node_modules/react-router')) {
              return 'vendor-router';
            }
            // Motion (Framer) — only used on pages with animations
            if (id.includes('/node_modules/motion/')) {
              return 'vendor-motion';
            }
            // Syntax highlighting + markdown AST utilities:
            // lowlight, highlight.js, hast-*, unist-*, micromark-*, remark-*, react-markdown
            // These are all lazy-loaded as part of ArticleLayout and are not needed
            // until the user visits a blog or project page.
            if (
              id.includes('/node_modules/lowlight/') ||
              id.includes('/node_modules/highlight.js/') ||
              id.includes('/node_modules/hast') ||
              id.includes('/node_modules/unist') ||
              id.includes('/node_modules/mdast') ||
              id.includes('/node_modules/remark') ||
              id.includes('/node_modules/rehype') ||
              id.includes('/node_modules/micromark') ||
              id.includes('/node_modules/react-markdown') ||
              id.includes('/node_modules/remark-gfm') ||
              id.includes('/node_modules/vfile') ||
              id.includes('/node_modules/property-information') ||
              id.includes('/node_modules/space-separated-tokens') ||
              id.includes('/node_modules/comma-separated-tokens') ||
              id.includes('/node_modules/decode-named-character-reference') ||
              id.includes('/node_modules/character-entities')
            ) {
              return 'vendor-markdown';
            }
          },
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
