import { lazy, Suspense, useEffect, useState } from 'react';
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

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
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
