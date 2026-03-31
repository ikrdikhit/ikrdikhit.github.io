import { Helmet } from 'react-helmet-async';
import { PERSONAL_INFO, MISC_INFO, SOCIAL_LINKS } from '../data/config';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  imageAlt?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  datePublished?: string;
  dateModified?: string;
  noindex?: boolean;
  /** Breadcrumb trail: array of { name, url } pairs, home is auto-prepended. */
  breadcrumbs?: { name: string; url: string }[];
  /** Article tags / keywords for BlogPosting schema */
  tags?: string[];
}

export default function SEO({
  title = `${PERSONAL_INFO.name} | ${PERSONAL_INFO.role} Portfolio`,
  description = `Portfolio of ${PERSONAL_INFO.name}, a ${PERSONAL_INFO.role} specializing in minimalist digital experiences.`,
  keywords = `${PERSONAL_INFO.name}, ${MISC_INFO.keywords}`,
  image = MISC_INFO.defaultOgImage,
  imageAlt,
  url = PERSONAL_INFO.baseUrl,
  type = 'website',
  author = PERSONAL_INFO.name,
  datePublished,
  dateModified,
  noindex = false,
  breadcrumbs,
  tags,
}: SEOProps) {
  const absoluteImage = image?.startsWith('http') ? image : `${PERSONAL_INFO.baseUrl}${image}`;
  const resolvedImageAlt = imageAlt ?? `${PERSONAL_INFO.name} — ${PERSONAL_INFO.role}`;

  // ── ProfilePage schema (portfolio home) ─────────────────────────────────────
  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${PERSONAL_INFO.baseUrl}/#profilepage`,
    name: `${PERSONAL_INFO.name}'s Portfolio`,
    url: PERSONAL_INFO.baseUrl,
    description,
    mainEntity: {
      '@type': 'Person',
      '@id': `${PERSONAL_INFO.baseUrl}/#person`,
      name: PERSONAL_INFO.name,
      url: PERSONAL_INFO.baseUrl,
      image: absoluteImage,
      jobTitle: PERSONAL_INFO.role,
      email: PERSONAL_INFO.email,
      knowsAbout: [
        'React',
        'TypeScript',
        'Node.js',
        'UI/UX Design',
        'Figma',
        'Tailwind CSS',
      ],
      sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.x].filter(Boolean),
    },
  };

  // ── WebSite schema ───────────────────────────────────────────────────────────
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${PERSONAL_INFO.baseUrl}/#website`,
    name: PERSONAL_INFO.name,
    url: PERSONAL_INFO.baseUrl,
    author: { '@id': `${PERSONAL_INFO.baseUrl}/#person` },
  };

  // ── BreadcrumbList schema ────────────────────────────────────────────────────
  const allBreadcrumbs = breadcrumbs
    ? [{ name: 'Home', url: PERSONAL_INFO.baseUrl }, ...breadcrumbs]
    : null;
  const breadcrumbSchema = allBreadcrumbs
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: allBreadcrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: crumb.name,
          item: crumb.url,
        })),
      }
    : null;

  // ── Article / BlogPosting schema ─────────────────────────────────────────────
  const articleSchema =
    type === 'article'
      ? {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          '@id': `${url}#article`,
          headline: title,
          description,
          image: {
            '@type': 'ImageObject',
            url: absoluteImage,
            description: resolvedImageAlt,
          },
          url,
          author: {
            '@type': 'Person',
            '@id': `${PERSONAL_INFO.baseUrl}/#person`,
            name: author,
            url: PERSONAL_INFO.baseUrl,
          },
          publisher: {
            '@type': 'Person',
            '@id': `${PERSONAL_INFO.baseUrl}/#person`,
            name: PERSONAL_INFO.name,
            url: PERSONAL_INFO.baseUrl,
          },
          datePublished: datePublished ?? undefined,
          dateModified: dateModified ?? datePublished ?? undefined,
          ...(tags && tags.length > 0 ? { keywords: tags.join(', ') } : {}),
          isPartOf: { '@id': `${PERSONAL_INFO.baseUrl}/#website` },
          inLanguage: 'en',
        }
      : null;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:alt" content={resolvedImageAlt} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={PERSONAL_INFO.name} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter — must use name="twitter:..." not property="twitter:..." */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
      <meta name="twitter:image:alt" content={resolvedImageAlt} />
      <meta name="twitter:creator" content={PERSONAL_INFO.twitterHandle} />
      <meta name="twitter:site" content={PERSONAL_INFO.twitterHandle} />

      {/* Article-specific dates */}
      {datePublished && <meta property="article:published_time" content={datePublished} />}
      {dateModified && <meta property="article:modified_time" content={dateModified} />}
      {tags && tags.map((tag) => <meta key={tag} property="article:tag" content={tag} />)}

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">{JSON.stringify(profilePageSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      {breadcrumbSchema && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      )}
      {articleSchema && (
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      )}

      {MISC_INFO.googleAnalyticsId && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${MISC_INFO.googleAnalyticsId}`}
          />
          <script>{`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${MISC_INFO.googleAnalyticsId}');
    `}</script>
        </>
      )}
    </Helmet>
  );
}
