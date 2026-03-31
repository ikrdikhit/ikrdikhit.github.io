import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'motion/react';
import { PERSONAL_INFO } from '../data/config';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { createLowlight } from 'lowlight';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import { HIGHLIGHT_LANGUAGE_ENTRIES } from '../data/languages.config';

import { PiCheck, PiCopy, PiArrowLeft } from 'react-icons/pi';
import SEO from './SEO';
import TableOfContents from './TableOfContents';

const lowlight = createLowlight();
for (const [name, grammar] of HIGHLIGHT_LANGUAGE_ENTRIES) {
  lowlight.register(name, grammar);
}

function highlightCode(code: string, language: string): React.ReactNode {
  try {
    const tree = lowlight.highlight(language, code);
    return toJsxRuntime(tree, { Fragment, jsx, jsxs });
  } catch {
    return <>{code}</>;
  }
}

interface CodeBlockProps {
  node?: unknown;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}

const CodeBlock = ({ inline, className, children }: CodeBlockProps) => {
  const match = /language-(\w+)/.exec(className || '');
  const [copied, setCopied] = useState(false);
  const codeString = String(children).replace(/\n$/, '');

  if (!inline && match && match[1] === 'poem') {
    return (
      <figure className="my-10 py-8 px-8 border-l-4 border-border bg-overlay rounded-r-2xl relative">
        <div className="absolute top-4 right-4 text-border opacity-50" aria-hidden="true">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
        </div>
        <blockquote className="font-serif italic text-lg md:text-xl text-t-primary whitespace-pre-wrap leading-loose">
          {codeString}
        </blockquote>
      </figure>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return !inline && match ? (
    <figure className="relative group my-8 rounded-xl overflow-hidden bg-overlay border border-border-subtle shadow-lg">
      <figcaption className="flex items-center justify-between px-4 py-2 bg-base border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5" aria-hidden="true">
            <div className="w-2.5 h-2.5 rounded-full bg-border"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-border"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-border"></div>
          </div>
          <span className="text-xs font-mono text-t-muted ml-2">{match[1]}</span>
        </div>
        <button
          onClick={handleCopy}
          aria-label="Copy code"
          className="p-1.5 rounded-md hover:bg-hover text-t-muted hover:text-t-primary transition-colors cursor-pointer"
        >
          {copied ? <PiCheck className="w-4 h-4 text-green-400" /> : <PiCopy className="w-4 h-4" />}
        </button>
      </figcaption>
      <pre className="p-2 overflow-x-auto">
        <code
          className="hljs block p-3 text-sm leading-6"
          aria-label={`${match[1]} code block`}
        >
          {highlightCode(codeString, match[1])}
        </code>
      </pre>
    </figure>
  ) : (
    <code className={`${className} bg-raised px-1.5 py-0.5 rounded text-t-primary`}>
      {children}
    </code>
  );
};

const getReadingTime = (text: string) => {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return `${time} min read`;
};

interface HastNode {
  type: string;
  value?: string;
  children?: HastNode[];
}

const extractText = (node: HastNode): string => {
  if (!node) return '';
  if (node.type === 'text' && node.value) return node.value;
  if (node.children) return node.children.map(extractText).join('');
  return '';
};

interface ArticleLayoutProps {
  title: string;
  description: string;
  image?: string;
  markdownFile: string;
  contentFolder: 'projects' | 'blogs';
  tags?: string[];
  backPath: string;
  seoType: 'article' | 'website';
  leftMeta?: React.ReactNode;
  actionButtons?: React.ReactNode;
  datePublished?: string;
}

export default function ArticleLayout({
  title,
  description,
  image,
  markdownFile,
  contentFolder,
  tags,
  backPath,
  seoType,
  leftMeta,
  actionButtons,
  datePublished,
}: ArticleLayoutProps) {
  const navigate = useNavigate();
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [readingTime, setReadingTime] = useState<string>('');
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);

    fetch(`/${contentFolder}/${markdownFile}`)
      .then((response) => {
        const contentType = response.headers.get('content-type');
        if (!response.ok || contentType?.includes('text/html')) {
          throw new Error('Content not found');
        }
        return response.text();
      })
      .then((text) => {
        setMarkdownContent(text);
        setReadingTime(getReadingTime(text));

        const stripped = text
          .split(/^```[^\n]*/gm)
          .filter((_, i) => i % 2 === 0)
          .join('');
        const headingRegex = /^(#{1,3})\s+(.+)$/gm;
        const extractedHeadings: { id: string; text: string; level: number }[] = [];
        let match: RegExpExecArray | null;
        while ((match = headingRegex.exec(stripped)) !== null) {
          const level = match[1].length;
          const textContent = match[2];
          const id = textContent.toLowerCase().replace(/[^\w]+/g, '-');
          extractedHeadings.push({ id, text: textContent, level });
        }
        setHeadings(extractedHeadings);
      })
      .catch((err) => {
        console.error(err);
        setMarkdownContent('# Content Not Found\n\nThe documentation is currently unavailable.');
      })
      .finally(() => setIsLoading(false));
  }, [markdownFile, contentFolder]);

  // Firefox Reader View runs Readability.js on initial page load, before async content
  // arrives. Once our markdown is rendered into the DOM, history.replaceState signals
  // Firefox to re-run its eligibility check without triggering a full navigation.
  // This is the standard fix for SPAs where article content loads asynchronously.
  useEffect(() => {
    if (!isLoading && markdownContent) {
      requestAnimationFrame(() => {
        window.history.replaceState(null, document.title, window.location.href);
      });
    }
  }, [isLoading, markdownContent]);

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate(backPath);
    }
  };

  return (
    <div className="min-h-screen w-full bg-base text-t-primary relative z-10">
      {/* SEO renders immediately — title and description are known from props,
          no need to wait for the markdown fetch to complete. */}
      <SEO
        title={`${title} | ${PERSONAL_INFO.name}`}
        description={description}
        image={image}
        imageAlt={title}
        type={seoType}
        url={typeof window !== 'undefined' ? window.location.href : undefined}
        datePublished={datePublished}
        dateModified={datePublished}
        tags={tags}
        breadcrumbs={[
          {
            name: contentFolder === 'blogs' ? 'Blogs' : 'Projects',
            url: `${PERSONAL_INFO.baseUrl}/${contentFolder}`,
          },
          {
            name: title,
            url: typeof window !== 'undefined' ? window.location.href : PERSONAL_INFO.baseUrl,
          },
        ]}
      />

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 origin-left z-50"
        style={{ scaleX, backgroundColor: 'var(--accent)' }}
      />

      <nav aria-label="Table of contents">
        <TableOfContents headings={headings} />
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24 overflow-x-hidden">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-t-muted hover:text-t-primary transition-colors mb-12 group cursor-pointer outline-none bg-transparent border-none p-0"
        >
          <PiArrowLeft className="w-4 h-4 text-t-primary group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium tracking-wide uppercase">Back</span>
        </button>

        <motion.div
          key={markdownFile}
          // opacity: 0.01 instead of 0 — Firefox Readability skips elements with
          // opacity exactly 0 during its initial DOM scan, preventing reader mode.
          initial={{ opacity: 0.01, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <article className="h-entry" itemScope itemType="https://schema.org/Article">
            <header className="mb-12">
              <h1
                className="text-4xl md:text-6xl font-serif italic lowercase mb-6 p-name entry-title"
                itemProp="headline"
              >
                {title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-t-muted text-sm font-serif italic mb-4">
                {leftMeta && (
                  <>
                    <span className="meta-author p-author h-card">{leftMeta}</span>
                    <span className="w-1 h-1 rounded-full bg-border" aria-hidden="true"></span>
                  </>
                )}
                <span aria-label="Reading time" className="text-t-muted">
                  {readingTime || '...'}
                </span>
              </div>

              <p
                className="text-xl text-t-muted leading-relaxed mb-6 p-summary entry-summary"
                itemProp="description"
              >
                {description}
              </p>

              {tags && tags.length > 0 && (
                <nav aria-label="Article tags" className="mb-8">
                  <ul className="flex flex-wrap gap-2 list-none p-0">
                    {tags.map((tag) => (
                      <li
                        key={tag}
                        className="px-3 py-1 bg-raised border border-border rounded-full text-xs text-t-muted p-category"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </header>

            {actionButtons && (
              <section
                aria-label="Article actions"
                className="flex flex-wrap gap-4 mb-16 pb-12 border-b border-border"
              >
                {actionButtons}
              </section>
            )}

            {image && (
              <figure className="w-full aspect-video rounded-2xl overflow-hidden mb-16 border border-border">
                <img
                  src={image}
                  alt={title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover u-photo"
                />
              </figure>
            )}

            <section
              className="markdown-body e-content entry-content [overflow-wrap:anywhere]"
              aria-label="Article body"
              itemProp="articleBody"
            >
              {isLoading ? (
                <div
                  className="min-h-[40vh] flex items-center justify-center"
                  role="status"
                  aria-label="Loading content"
                >
                  <span className="sr-only">Loading content…</span>
                  <div className="flex gap-2" aria-hidden="true">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-2 h-2 rounded-full bg-border animate-pulse"
                        style={{ animationDelay: `${i * 200}ms` }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    code: CodeBlock as any,
                    // Map markdown h1 → h2 so there's only one <h1> on the page
                    // (the article title above). Duplicate h1s confuse Readability.
                    h1: ({ node, ...props }) => (
                      <h2
                        id={extractText(node as HastNode)
                          .toLowerCase()
                          .replace(/[^\w]+/g, '-')}
                        {...props}
                      />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2
                        id={extractText(node as HastNode)
                          .toLowerCase()
                          .replace(/[^\w]+/g, '-')}
                        {...props}
                      />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3
                        id={extractText(node as HastNode)
                          .toLowerCase()
                          .replace(/[^\w]+/g, '-')}
                        {...props}
                      />
                    ),
                    table: ({ ...props }) => (
                      <div className="w-full overflow-x-auto my-8 border border-border rounded-xl">
                        <table
                          className="w-full min-w-[600px] border-collapse m-0 border-none"
                          {...props}
                        />
                      </div>
                    ),
                  }}
                >
                  {markdownContent}
                </Markdown>
              )}
            </section>
          </article>
        </motion.div>
      </main>
    </div>
  );
}
