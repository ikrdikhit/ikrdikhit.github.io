import { Helmet } from 'react-helmet-async';
import { PERSONAL_INFO, MISC_INFO, SOCIAL_LINKS } from '../data/config';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  datePublished?: string;
  dateModified?: string;
  noindex?: boolean;
}

export default function SEO({
  title = `${PERSONAL_INFO.name} | ${PERSONAL_INFO.role} Portfolio`,
  description = `Portfolio of ${PERSONAL_INFO.name}, a ${PERSONAL_INFO.role} specializing in minimalist digital experiences.`,
  keywords = `${PERSONAL_INFO.name}, ${MISC_INFO.keywords}`,
  image = PERSONAL_INFO.profilePicture,
  url = PERSONAL_INFO.baseUrl,
  type = 'website',
  author = PERSONAL_INFO.name,
  datePublished,
  dateModified,
  noindex = false,
}: SEOProps) {
  const absoluteImage = image?.startsWith('http') ? image : `${PERSONAL_INFO.baseUrl}${image}`;

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PERSONAL_INFO.name,
    url: PERSONAL_INFO.baseUrl,
    sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.x],
    jobTitle: PERSONAL_INFO.role,
    knowsAbout: ['React', 'TypeScript', 'UI/UX Design', 'Node.js'],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: PERSONAL_INFO.name,
    url: PERSONAL_INFO.baseUrl,
  };

  const articleSchema =
    type === 'article'
      ? {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: title,
          description,
          image: absoluteImage,
          author: {
            '@type': 'Person',
            name: author,
            url: PERSONAL_INFO.baseUrl,
          },
          publisher: {
            '@type': 'Person',
            name: PERSONAL_INFO.name,
            url: PERSONAL_INFO.baseUrl,
          },
          url,
          datePublished: datePublished ?? undefined,
          dateModified: dateModified ?? datePublished ?? undefined,
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
      {/* Fixed: was set to {title} which is wrong — must be the static site name */}
      <meta property="og:site_name" content={PERSONAL_INFO.name} />

      {/* Twitter — must use name="twitter:..." not property="twitter:..." */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
      <meta name="twitter:creator" content={PERSONAL_INFO.twitterHandle} />
      <meta name="twitter:site" content={PERSONAL_INFO.twitterHandle} />

      {/* Article-specific dates */}
      {datePublished && <meta property="article:published_time" content={datePublished} />}
      {dateModified && <meta property="article:modified_time" content={dateModified} />}

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      {articleSchema && <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>}

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
