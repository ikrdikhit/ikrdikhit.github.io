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
    const prefetch = (href: string) => {
      try {
        const url = new URL(href, window.location.origin);
        if (url.origin !== window.location.origin) return;
        const match = Object.keys(PREFETCH_MAP).find((prefix) =>
          url.pathname.startsWith(prefix)
        );
        if (match) PREFETCH_MAP[match]();
      } catch {
        // ignore malformed hrefs
      }
    };

    const handleOver = (e: MouseEvent | FocusEvent) => {
      const anchor = (e.target as Element)?.closest('a[href]') as HTMLAnchorElement | null;
      if (anchor) prefetch(anchor.href);
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

// Shows the Loading screen between route changes so the user gets instant
// feedback while a lazy chunk downloads. Works by listening to location
// changes — on change it flips to loading, then Suspense takes over and
// shows the fallback until the new page renders, at which point this
// component re-renders with the new pathname and clears itself.
function NavigationLoader({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setIsNavigating(true);
    }
  }, [location, displayLocation]);

  // Once Suspense resolves and children re-render with the new route,
  // the effect above won't fire again — we clear the loading state here
  // after a microtask so the spinner doesn't flash on cached chunks.
  useEffect(() => {
    if (isNavigating) {
      const id = setTimeout(() => {
        setDisplayLocation(location);
        setIsNavigating(false);
      }, 0);
      return () => clearTimeout(id);
    }
  }, [isNavigating, location]);

  if (isNavigating) return <Loading />;
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RouteAnnouncer />
      <HoverPrefetch />
      <ThemeSwitcher />
      <Suspense fallback={<Loading />}>
        <NavigationLoader>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutMe />} />
            {PERSONAL_INFO.showProjects && (
              <Route path="/projects" element={<ProjectCatalogue />} />
            )}
            {PERSONAL_INFO.showProjects && <Route path="/projects/:id" element={<Project />} />}
            {PERSONAL_INFO.showBlog && <Route path="/blogs" element={<BlogList />} />}
            {PERSONAL_INFO.showBlog && <Route path="/blogs/:id" element={<BlogPost />} />}
            {PERSONAL_INFO.showLinks && <Route path="/links" element={<Links />} />}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </NavigationLoader>
      </Suspense>
    </BrowserRouter>
  );
}
