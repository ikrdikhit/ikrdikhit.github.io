import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  PiUser,
  PiMapPin,
  PiArrowRight,
  PiGithubLogo,
  PiCode,
  PiGlobe,
  PiXLogo,
  PiDiscordLogo,
  PiDotsThree,
  PiArrowDown,
  PiArrowUp,
} from 'react-icons/pi';
import { PROJECTS, ShowcaseItem } from '../data/projects';
import { BLOG_POSTS } from '../data/blogs';
import SEO from '../components/SEO';
import ContactPopup from '../components/ContactPopup';
import ProjectCard from '../components/ProjectCard';
import ProjectPopup from '../components/ProjectPopup';
import BlogCard from '../components/BlogCard';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../data/config';

function renderHeadline(text: string) {
  return text.split(/(\{[^}]+\})/).map((part, i) => {
    const match = part.match(/^\{(.+)\}$/);
    return match ? (
      <span key={i} className="font-serif italic font-normal">
        {match[1]}
      </span>
    ) : (
      part
    );
  });
}

export default function Home() {
  const navigate = useNavigate();
  const [hoveredProject, setHoveredProject] = useState<ShowcaseItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<ShowcaseItem | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [showScrollUp, setShowScrollUp] = useState(false);
  const projectsRef = useRef<HTMLElement>(null);
  const writingsRef = useRef<HTMLElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    },
    []
  );

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollDown(false);
      clearTimeout(timer);

      if (projectsRef.current) {
        const projectsTop = projectsRef.current.offsetTop;
        const projectsHeight = projectsRef.current.offsetHeight;
        const halfway = projectsTop + projectsHeight / 2;

        if (scrollY < halfway) {
          timer = setTimeout(() => {
            setShowScrollDown(true);
          }, 5000);
        }
      }

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const ninetyPercentPage = maxScroll * 0.9;

      if (writingsRef.current) {
        const writingsTop = writingsRef.current.offsetTop;
        const writingsHalfway = writingsTop + writingsRef.current.offsetHeight / 2;
        const smartTriggerPoint = Math.min(writingsHalfway, ninetyPercentPage);
        setShowScrollUp(scrollY >= smartTriggerPoint);
      } else {
        setShowScrollUp(scrollY >= ninetyPercentPage);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    timer = setTimeout(() => {
      if (window.scrollY < 50) setShowScrollDown(true);
    }, 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const scrollToProjects = () => window.scrollBy({ top: 400, behavior: 'smooth' });
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleRowClick = (exp: ShowcaseItem) => setSelectedProject(exp);

  const handleMouseEnterProject = (exp: ShowcaseItem) => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setHoveredProject(exp);
  };

  const handleMouseLeaveProject = () => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;
    hoverTimeoutRef.current = setTimeout(() => setHoveredProject(null), 150);
  };

  return (
    <main className="min-h-screen w-full relative">
      {/* Skip to main content — first focusable element for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-full focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>

      <SEO />

      <div
        id="main-content"
        className={`w-full max-w-5xl mx-auto px-6 py-12 md:py-24 flex flex-col gap-24 transition-[filter,opacity,scale] duration-150 ${
          selectedProject ? 'blur-md opacity-40 scale-[0.98]' : hoveredProject ? 'scale-[0.98]' : ''
        }`}
      >
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0.01, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 60, damping: 20, mass: 1 }}
          style={{ willChange: 'opacity, transform' }}
          className={`flex flex-col justify-center pt-8 pb-8 md:pt-16 md:pb-12 gap-12 transition-[filter] duration-150 min-h-[50vh] ${
            hoveredProject && !selectedProject ? 'blur-sm opacity-50' : ''
          }`}
        >
          <div className="flex flex-col gap-4">
            <span className="text-t-muted font-medium tracking-wide uppercase text-sm">
              Hi, I'm {PERSONAL_INFO.namealt}
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] text-balance">
              {renderHeadline(PERSONAL_INFO.heroHeadline)}
            </h1>
            <p className="text-t-muted text-lg md:text-xl max-w-2xl mt-4 leading-relaxed">
              {PERSONAL_INFO.bio}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/about')}
              className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors cursor-pointer w-full sm:w-fit"
            >
              About Me
            </button>
            {PERSONAL_INFO.showContactButton && (
              <button
                onClick={() => setIsContactOpen(true)}
                className="bg-transparent border border-border text-t-primary px-6 py-3 rounded-full font-medium hover:border-[#888888] transition-colors cursor-pointer w-full sm:w-fit"
              >
                {PERSONAL_INFO.contactButtonLabel || 'Contact Me'}
              </button>
            )}
          </div>
        </motion.section>
        {/* Info */}
        <motion.section
          initial={{ opacity: 0.01, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ type: 'spring', stiffness: 60, damping: 20, mass: 1 }}
          style={{ willChange: 'opacity, transform' }}
          aria-label="About"
          className={`flex flex-col gap-12 transition-[filter] duration-150 ${
            hoveredProject && !selectedProject ? 'blur-sm opacity-50' : ''
          }`}
        >
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 md:items-start">
            <div className="flex flex-col gap-3">
              <span className="font-bold text-sm tracking-wide uppercase text-t-primary">
                Location
              </span>
              <div className="flex items-center gap-3">
                <PiMapPin className="w-5 h-5 text-t-primary" aria-hidden="true" />
                <div className="flex flex-col">
                  <span className="text-t-primary text-sm">{PERSONAL_INFO.location}</span>
                  {PERSONAL_INFO.remoteAvailable && (
                    <span className="text-t-muted text-sm">Remote Available</span>
                  )}
                </div>
              </div>
            </div>

            {PERSONAL_INFO.showLinks && (
              <div className="flex flex-col gap-4">
                <span className="font-bold text-sm tracking-wide uppercase text-t-primary">
                  Connect
                </span>
                <div className="flex gap-4 items-center text-t-muted">
                  {SOCIAL_LINKS.github && (
                    <a
                      aria-label="GitHub profile"
                      href={SOCIAL_LINKS.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-t-primary transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
                    >
                      <PiGithubLogo className="w-6 h-6" aria-hidden="true" />
                    </a>
                  )}
                  {SOCIAL_LINKS.x && (
                    <a
                      aria-label="X (Twitter) profile"
                      href={SOCIAL_LINKS.x}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-t-primary transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
                    >
                      <PiXLogo className="w-6 h-6" aria-hidden="true" />
                    </a>
                  )}
                  {SOCIAL_LINKS.discord && (
                    <a
                      aria-label="Discord"
                      href={SOCIAL_LINKS.discord}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-t-primary transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
                    >
                      <PiDiscordLogo className="w-6 h-6" aria-hidden="true" />
                    </a>
                  )}
                  <Link
                    aria-label="More links"
                    to="/links"
                    className="hover:text-t-primary transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
                  >
                    <PiDotsThree className="w-6 h-6" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </motion.section>
        {/* Featured Work */}
        {PERSONAL_INFO.showProjects && (
          <motion.section
            ref={projectsRef}
            initial={{ opacity: 0.01, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ type: 'spring', stiffness: 60, damping: 20, mass: 1 }}
            style={{ willChange: 'opacity, transform' }}
            aria-label="Featured Work"
            className="flex flex-col gap-8"
          >
            <div className="flex justify-between items-end mb-2">
              <h2 className="text-sm font-bold tracking-wide uppercase text-t-primary">
                Featured Work
              </h2>
              <Link
                to="/projects"
                aria-label="Show all projects"
                className="text-xs font-medium text-t-muted hover:text-t-primary transition-colors flex items-center gap-1 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
              >
                Show all <PiArrowRight className="w-3 h-3" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PROJECTS.filter((item) => item.featured).map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  hoveredProject={hoveredProject}
                  selectedProject={selectedProject}
                  onMouseEnter={handleMouseEnterProject}
                  onMouseLeave={handleMouseLeaveProject}
                  onClick={handleRowClick}
                />
              ))}
            </div>
          </motion.section>
        )}
        {/* Featured Writings */}
        {PERSONAL_INFO.showBlog && (
          <motion.section
            ref={writingsRef}
            initial={{ opacity: 0.01, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ type: 'spring', stiffness: 60, damping: 20, mass: 1 }}
            style={{ willChange: 'opacity, transform' }}
            aria-label="Featured Writings"
            className={`flex flex-col mt-24 mb-12 relative z-0 transition-[filter] duration-150 ${
              hoveredProject && !selectedProject ? 'blur-sm opacity-50' : ''
            }`}
          >
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-sm font-bold tracking-wide uppercase text-t-primary">
                Featured Writings
              </h2>
              <Link
                to="/blogs"
                aria-label="Show all blogs"
                className="text-xs font-medium text-t-muted hover:text-t-primary transition-colors flex items-center gap-1 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
              >
                Show all <PiArrowRight className="w-3 h-3" aria-hidden="true" />
              </Link>
            </div>

            <div className="flex flex-col gap-8">
              {BLOG_POSTS.filter((post) => post.featured).map((post, index) => (
                <BlogCard key={index} post={post} index={index} />
              ))}
            </div>
          </motion.section>
        )}
        <footer className="text-center text-xs text-t-muted py-8 border-t border-border">
          {PERSONAL_INFO.footerText}
        </footer>
      </div>

      {selectedProject && (
        <ProjectPopup selectedProject={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
      <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      <AnimatePresence>
        {showScrollDown && (
          <motion.button
            aria-label="Scroll down to projects"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={scrollToProjects}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40 p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-t-primary hover:bg-white/20 transition-colors cursor-pointer animate-bounce"
          >
            <PiArrowDown className="w-5 h-5" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showScrollUp && (
          <motion.button
            aria-label="Scroll to top"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40 p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-t-primary hover:bg-white/20 transition-colors cursor-pointer"
          >
            <PiArrowUp className="w-5 h-5" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}
