import { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  PiList,
  PiListBold,
  PiX,
  PiCaretDown,
  PiCaretRight,
  PiArrowsInLineVertical,
  PiArrowsOutLineVertical,
} from 'react-icons/pi';
import { THEME, MISC_INFO } from '../data/config';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, opacity: 0 });
  const listRef = useRef<HTMLUListElement>(null);

  const [isDesktopSidebarVisible, setIsDesktopSidebarVisible] = useState(() => {
    try {
      const saved = localStorage.getItem('toc-visible');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('toc-visible', String(isDesktopSidebarVisible));
    } catch {
      // ignore
    }
  }, [isDesktopSidebarVisible]);

  // Close mobile sidebar on Escape + lock body scroll
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSidebarOpen(false);
    };
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isSidebarOpen]);

  // Track active heading by scroll position
  useEffect(() => {
    const handleScroll = () => {
      const headingElements = Array.from(
        document.querySelectorAll('.markdown-body h1, .markdown-body h2, .markdown-body h3')
      );
      if (headingElements.length === 0 || headings.length === 0) return;

      let newActiveIndex = -1;
      for (let i = 0; i < headingElements.length; i++) {
        if (headingElements[i].getBoundingClientRect().top <= 150) {
          newActiveIndex = i;
        } else {
          break;
        }
      }

      if (window.scrollY < 100) newActiveIndex = -1;
      setActiveIndex(newActiveIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  // --- Hierarchy & Collapsing Logic ---
  const minLevel = useMemo(() => {
    if (headings.length === 0) return 1;
    return Math.min(...headings.map((h) => h.level));
  }, [headings]);

  const parents = useMemo(() => {
    const p = new Array(headings.length).fill(-1);
    for (let i = 0; i < headings.length; i++) {
      for (let j = i - 1; j >= 0; j--) {
        if (headings[j].level < headings[i].level) {
          p[i] = j;
          break;
        }
      }
    }
    return p;
  }, [headings]);

  const hasChild = useMemo(() => {
    const hc = new Array(headings.length).fill(false);
    parents.forEach((p) => {
      if (p !== -1) hc[p] = true;
    });
    return hc;
  }, [parents]);

  const initialCollapsed = useMemo(() => {
    const collapsed = new Set<number>();
    headings.forEach((h, i) => {
      const relativeDepth = h.level - minLevel + 1;
      if (hasChild[i] && relativeDepth >= MISC_INFO.tocExpandDepth) {
        collapsed.add(i);
      }
    });
    return collapsed;
  }, [headings, minLevel, hasChild]);

  const [collapsedPaths, setCollapsedPaths] = useState<Set<number>>(initialCollapsed);

  // Sync collapsed paths if headings change completely
  useEffect(() => {
    setCollapsedPaths(initialCollapsed);
  }, [initialCollapsed]);

  const toggleCollapse = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCollapsedPaths((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const isAllExpanded = collapsedPaths.size === 0;

  const toggleAll = () => {
    if (isAllExpanded) {
      const allParents = new Set<number>();
      hasChild.forEach((has, i) => {
        if (has) allParents.add(i);
      });
      setCollapsedPaths(allParents);
    } else {
      setCollapsedPaths(new Set());
    }
  };

  const isVisible = (index: number) => {
    let curr = parents[index];
    while (curr !== -1) {
      if (collapsedPaths.has(curr)) return false;
      curr = parents[curr];
    }
    return true;
  };

  // Determine the effective active index (highlighting the parent if the target child is hidden)
  const effectiveActiveIndex = useMemo(() => {
    let targetIndex = activeIndex;
    while (targetIndex !== -1 && !isVisible(targetIndex)) {
      targetIndex = parents[targetIndex];
    }
    return targetIndex;
  }, [activeIndex, parents, collapsedPaths]);

  // Move the floating dot, auto-scroll TOC, and match the active item
  useEffect(() => {
    if (effectiveActiveIndex < 0 || !listRef.current) {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    const activeEl = listRef.current.querySelector(
      `[data-index="${effectiveActiveIndex}"]`
    ) as HTMLElement;
    if (!activeEl) {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    const listTop = listRef.current.getBoundingClientRect().top;
    const itemRect = activeEl.getBoundingClientRect();

    setIndicatorStyle({
      top: itemRect.top - listTop + itemRect.height / 2 - 3,
      opacity: 1,
    });

    // Auto-scroll logic: Keep the active item within the visible un-masked area
    const scrollContainer = listRef.current.closest('.overflow-y-auto');
    if (scrollContainer) {
      const containerRect = scrollContainer.getBoundingClientRect();
      const padding = 32; // Buffer space to account for the toc-fade mask

      if (itemRect.top < containerRect.top + padding) {
        scrollContainer.scrollTop -= containerRect.top + padding - itemRect.top;
      } else if (itemRect.bottom > containerRect.bottom - padding) {
        scrollContainer.scrollTop += itemRect.bottom - (containerRect.bottom - padding);
      }
    }
  }, [effectiveActiveIndex, headings]);

  const scrollToHeading = (index: number) => {
    const headingElements = document.querySelectorAll(
      '.markdown-body h1, .markdown-body h2, .markdown-body h3'
    );
    const element = headingElements[index];
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
      setIsSidebarOpen(false);
    }
  };

  if (headings.length === 0) return null;

  const HeadingButton = ({ heading, index }: { heading: Heading; index: number }) => {
    if (!isVisible(index)) return null;

    const relativeDepth = heading.level - minLevel;
    const isActive = effectiveActiveIndex === index;
    const isCollapsed = collapsedPaths.has(index);

    return (
      <li className="flex items-start w-full relative group" data-index={index}>
        <div className="flex items-center" style={{ paddingLeft: `${relativeDepth * 12}px` }}>
          <div className="w-5 h-6 flex items-center justify-center shrink-0">
            {hasChild[index] && (
              <button
                type="button"
                onClick={(e) => toggleCollapse(index, e)}
                // Hidden on desktop by default, appears on hover or focus
                className="text-t-muted hover:text-t-primary p-0.5 rounded cursor-pointer transition-all duration-200 outline-none focus-visible:ring-1 focus-visible:ring-white/40 xl:opacity-0 xl:group-hover:opacity-100 focus-visible:opacity-100"
              >
                {isCollapsed ? <PiCaretRight size={14} /> : <PiCaretDown size={14} />}
              </button>
            )}
          </div>
        </div>
        <button
          type="button"
          data-text={heading.text}
          onClick={() => scrollToHeading(index)}
          // flex flex-col & after: pseudo-element reserves the space for the bold text to prevent layout shift
          className={`flex-1 text-left text-sm cursor-pointer transition-colors duration-200 outline-none
            focus-visible:ring-2 focus-visible:ring-white/40 rounded py-0.5 mt-[1px]
            flex flex-col after:content-[attr(data-text)] after:font-semibold after:h-0 after:invisible after:overflow-hidden after:select-none
            ${isActive ? 'text-t-primary font-semibold' : 'text-t-muted hover:text-t-primary'}`}
        >
          <span>{heading.text}</span>
        </button>
      </li>
    );
  };

  return (
    <>
      <style>{`
        .toc-scrollbar::-webkit-scrollbar { width: 4px; }
        .toc-scrollbar::-webkit-scrollbar-track { background: transparent; }
        
        /* Transparent thumb by default, visible on hover */
        .toc-scrollbar::-webkit-scrollbar-thumb { 
          background-color: transparent; 
          border-radius: 4px; 
          transition: background-color 0.2s ease; 
        }
        .toc-scrollbar:hover::-webkit-scrollbar-thumb { 
          background-color: var(--border-color, #444); 
        }
        
        /* Firefox support */
        .toc-scrollbar { 
          scrollbar-width: thin; 
          scrollbar-color: transparent transparent; 
          transition: scrollbar-color 0.2s ease; 
        }
        .toc-scrollbar:hover { 
          scrollbar-color: var(--border-color, #444) transparent; 
        }
        
        /* Masks the top and bottom 24px of the scroll container for a smooth fade effect */
        .toc-fade {
          mask-image: linear-gradient(to bottom, transparent 0%, black 24px, black calc(100% - 24px), transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 24px, black calc(100% - 24px), transparent 100%);
        }
      `}</style>

      {/* Desktop toggle */}
      <button
        onClick={() => setIsDesktopSidebarVisible(!isDesktopSidebarVisible)}
        className="hidden xl:flex fixed top-6 left-6 z-50 p-3 bg-raised border border-border rounded-full text-t-primary shadow-xl transition-all duration-300 hover:bg-hover cursor-pointer"
        aria-label={isDesktopSidebarVisible ? 'Hide table of contents' : 'Show table of contents'}
      >
        {isDesktopSidebarVisible ? (
          <PiListBold className="w-5 h-5" aria-hidden="true" />
        ) : (
          <PiList className="w-5 h-5" aria-hidden="true" />
        )}
      </button>

      {/* Mobile toggle */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        aria-label="Open table of contents"
        className="xl:hidden fixed top-6 right-6 z-50 p-3 bg-raised border border-border rounded-full text-t-primary shadow-xl cursor-pointer"
      >
        <PiList className="w-5 h-5" aria-hidden="true" />
      </button>

      {/* Desktop sidebar */}
      <aside
        aria-label="Table of contents"
        className={`hidden xl:block fixed inset-y-0 left-0 z-30 w-64 bg-transparent transform transition-transform duration-300 ease-in-out ${
          isDesktopSidebarVisible ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-screen flex flex-col p-8 pt-24">
          <nav className="flex flex-col h-full min-h-0" aria-label="Article sections">
            {/* STICKY CONTENTS + TOGGLE */}
            <div className="relative z-10 flex items-center justify-between pb-2 mb-6 shrink-0">
              <h2 className="text-sm font-bold tracking-wide uppercase text-t-muted m-0">
                Contents
              </h2>
              <button
                onClick={toggleAll}
                className="text-t-muted hover:text-t-primary p-1.5 rounded-md hover:bg-hover transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-white/40"
                title={isAllExpanded ? 'Collapse All' : 'Expand All'}
              >
                {isAllExpanded ? (
                  <PiArrowsInLineVertical size={16} />
                ) : (
                  <PiArrowsOutLineVertical size={16} />
                )}
              </button>
            </div>

            {/* Fading Scroll Container. We offset the margin to allow the fade effect to not cut off the first un-scrolled item */}
            <div className="relative flex-1 overflow-y-auto toc-scrollbar toc-fade -mt-6 pt-6 -mb-6 pb-6 pr-2">
              <div className="relative pl-3">
                <div
                  aria-hidden="true"
                  className="absolute left-0 w-1.5 h-1.5 rounded-full pointer-events-none transition-all duration-200 ease-out"
                  style={{
                    top: indicatorStyle.top,
                    opacity: indicatorStyle.opacity,
                    backgroundColor: THEME.accent,
                  }}
                />
                <ul ref={listRef} className="flex flex-col gap-2 list-none p-0 m-0">
                  {headings.map((heading, index) => (
                    <HeadingButton key={heading.id} heading={heading} index={index} />
                  ))}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </aside>

      {/* Mobile popup */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            role="dialog"
            aria-modal="true"
            aria-label="Table of contents"
            className="fixed inset-0 z-[100] flex items-center justify-center xl:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsSidebarOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="bg-overlay border border-border p-6 rounded-3xl shadow-2xl w-[90%] max-w-md max-h-[80vh] flex flex-col relative z-10"
            >
              <button
                onClick={() => setIsSidebarOpen(false)}
                aria-label="Close table of contents"
                className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-t-primary hover:bg-black transition-colors cursor-pointer z-20 outline-none focus-visible:ring-1 focus-visible:ring-white/40"
              >
                <PiX className="w-4 h-4 text-t-primary" aria-hidden="true" />
              </button>

              {/* STICKY CONTENTS + TOGGLE */}
              <div className="relative z-10 flex items-center justify-between pb-2 mb-6 border-b border-border/50 pr-8 shrink-0">
                <h2 className="text-sm font-bold tracking-wide uppercase text-t-muted m-0">
                  Contents
                </h2>
                <button
                  onClick={toggleAll}
                  className="text-t-muted hover:text-t-primary p-1.5 rounded-md hover:bg-hover transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-white/40"
                  title={isAllExpanded ? 'Collapse All' : 'Expand All'}
                >
                  {isAllExpanded ? (
                    <PiArrowsInLineVertical size={16} />
                  ) : (
                    <PiArrowsOutLineVertical size={16} />
                  )}
                </button>
              </div>

              {/* Fading Scroll Container */}
              <nav
                className="overflow-y-auto pr-2 flex-1 toc-scrollbar toc-fade -mt-6 pt-6 -mb-6 pb-6"
                aria-label="Article sections"
              >
                <ul className="flex flex-col gap-2 list-none p-0 m-0">
                  {headings.map((heading, index) => (
                    <HeadingButton key={heading.id} heading={heading} index={index} />
                  ))}
                </ul>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
