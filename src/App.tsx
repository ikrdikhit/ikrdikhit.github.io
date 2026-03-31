import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { PERSONAL_INFO } from './data/config';
import Loading from './components/Loading';
import ThemeSwitcher from './components/ThemeSwitcher';

const Home = lazy(() => import('./pages/Home'));
const AboutMe = lazy(() => import('./pages/AboutMe'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Links = lazy(() => import('./pages/Links'));
const BlogList = lazy(() => import('./pages/BlogList'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const ProjectCatalogue = lazy(() => import('./pages/ProjectCatalogue'));
const Project = lazy(() => import('./pages/Project'));

/** Map from pathname prefix → lazy import thunk for predictive prefetching. */
const PREFETCH_MAP: Record<string, () => Promise<unknown>> = {
  '/about': () => import('./pages/AboutMe'),
  '/projects': () => import('./pages/ProjectCatalogue'),
  '/blogs': () => import('./pages/BlogList'),
  '/links': () => import('./pages/Links'),
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/**
 * Announces page title to screen readers after each route change.
 * The live region is visually hidden but always in the DOM so AT can
 * observe the mutation and read it aloud without a page reload.
 */
function RouteAnnouncer() {
  const { pathname } = useLocation();
  const [announcement, setAnnouncement] = useState('');
  const firstRender = useRef(true);

  useEffect(() => {
    // Skip the very first render — the browser already handles that.
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const title = document.title || pathname;
    setAnnouncement('');
    // Double-rAF ensures the live region has cleared before we set new text,
    // so screen readers always fire a fresh announcement.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAnnouncement(`Navigated to ${title}`);
      });
    });
  }, [pathname]);

  return (
    <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
      {announcement}
    </p>
  );
}

/**
 * Listens for mouseover / focusin on internal <a> elements at the document
 * level and fires the corresponding lazy import so the chunk is downloaded
 * before the user clicks — zero changes to individual Link components needed.
 */
function HoverPrefetch() {
  useEffect(() => {
    const prefetched = new Set<string>();
    const prefixes = Object.keys(PREFETCH_MAP);

    const prefetchPath = (pathname: string) => {
      if (prefetched.has(pathname)) return;
      const match = prefixes.find((prefix) => pathname.startsWith(prefix));
      if (!match) return;
      prefetched.add(pathname);
      PREFETCH_MAP[match]();
    };

    const handleOver = (e: MouseEvent | FocusEvent) => {
      const anchor = (e.target as Element)?.closest('a[href]') as HTMLAnchorElement | null;
      if (!anchor) return;
      if (e instanceof MouseEvent) {
        const from = e.relatedTarget as Node | null;
        if (from && anchor.contains(from)) return;
      }
      const href = anchor.getAttribute('href');
      if (!href) return;
      if (href.startsWith('/')) {
        prefetchPath(href);
        return;
      }
      if (href.startsWith(window.location.origin)) {
        prefetchPath(new URL(href).pathname);
      }
    };

    document.addEventListener('mouseover', handleOver as EventListener, { passive: true });
    document.addEventListener('focusin', handleOver as EventListener, { passive: true });
    return () => {
      document.removeEventListener('mouseover', handleOver as EventListener);
      document.removeEventListener('focusin', handleOver as EventListener);
    };
  }, []);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RouteAnnouncer />
      <HoverPrefetch />
      <ThemeSwitcher />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutMe />} />
          {PERSONAL_INFO.showProjects && <Route path="/projects" element={<ProjectCatalogue />} />}
          {PERSONAL_INFO.showProjects && <Route path="/projects/:id" element={<Project />} />}
          {PERSONAL_INFO.showBlog && <Route path="/blogs" element={<BlogList />} />}
          {PERSONAL_INFO.showBlog && <Route path="/blogs/:id" element={<BlogPost />} />}
          {PERSONAL_INFO.showLinks && <Route path="/links" element={<Links />} />}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
