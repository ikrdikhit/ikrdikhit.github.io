/**
 * scripts/generate-sitemap.ts
 *
 * Reads blogs and projects data via direct TypeScript imports
 * and writes public/sitemap.xml automatically at build time.
 *
 * Run via: "prebuild": "tsx scripts/generate-sitemap.ts"
 *
 * Previously this file used a regex to scrape slug/date values out of
 * raw TypeScript source. That approach was fragile — a comment or
 * multi-line object could silently break it. Direct imports are simpler
 * and fully type-safe.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Direct imports — tsx handles TypeScript natively so this just works.
import { BLOG_POSTS } from '../src/data/blogs.js';
import { PROJECTS } from '../src/data/projects.js';

const BASE_URL = 'https://ikrdikhit.is-a.dev';

// Static routes
const STATIC_ROUTES: Array<{ path: string; priority: string; changefreq: string }> = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/projects', priority: '0.8', changefreq: 'weekly' },
  { path: '/blogs', priority: '0.8', changefreq: 'weekly' },
  { path: '/links', priority: '0.5', changefreq: 'monthly' },
];

const today = new Date().toISOString().split('T')[0];

function urlEntry(
  loc: string,
  opts: { lastmod?: string; priority?: string; changefreq?: string } = {}
): string {
  const { lastmod = today, priority = '0.6', changefreq = 'monthly' } = opts;
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n');
}

const entries: string[] = [];

// Static routes
for (const route of STATIC_ROUTES) {
  entries.push(
    urlEntry(`${BASE_URL}${route.path}`, {
      priority: route.priority,
      changefreq: route.changefreq,
    })
  );
}

// Blog posts — directly from imported data (type-safe, no regex)
for (const post of BLOG_POSTS) {
  entries.push(
    urlEntry(`${BASE_URL}/blogs/${post.slug}`, {
      lastmod: post.date ?? today,
      priority: '0.7',
      changefreq: 'monthly',
    })
  );
}

// Projects — directly from imported data
for (const project of PROJECTS) {
  entries.push(
    urlEntry(`${BASE_URL}/projects/${project.slug}`, {
      priority: '0.7',
      changefreq: 'monthly',
    })
  );
}

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
  '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
  '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9',
  '          http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">',
  ...entries,
  '</urlset>',
].join('\n');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.resolve(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(outPath, xml, 'utf-8');

console.log(`✅  sitemap.xml written to public/sitemap.xml`);
console.log(`    ${STATIC_ROUTES.length} static routes`);
console.log(`    ${BLOG_POSTS.length} blog posts`);
console.log(`    ${PROJECTS.length} projects`);
