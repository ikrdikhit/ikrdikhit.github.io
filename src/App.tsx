import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { PERSONAL_INFO } from './data/config';
import ThemeSwitcher from './components/ThemeSwitcher';
import Home from './pages/Home';
import AboutMe from './pages/AboutMe';
import NotFound from './pages/NotFound';
import Links from './pages/Links';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import ProjectCatalogue from './pages/ProjectCatalogue';
import Project from './pages/Project';


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
    <p
      role="status"
      aria-live="polite"
      aria-atomic="true"
      style={{
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: '1px',
        margin: '-1px',
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        whiteSpace: 'nowrap',
        width: '1px',
      }}
    >
      {announcement}
    </p>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RouteAnnouncer />
      <ThemeSwitcher />
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
    </BrowserRouter>
  );
}
