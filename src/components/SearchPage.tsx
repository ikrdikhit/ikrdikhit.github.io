import { useState, useMemo, useEffect, ReactNode, useId } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { PiMagnifyingGlass, PiFaders, PiArrowLeft, PiX, PiList } from 'react-icons/pi';

interface SearchableItem {
  title: string;
  description: string;
  tags: string[];
  slug: string;
}

interface SearchPageProps<T extends SearchableItem> {
  title: string;
  description: string;
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  containerClassName: string;
  searchPlaceholder?: string;
  backLinkText?: string;
  backLinkPath?: string;
  sortFn?: (a: T, b: T) => number;
  extraUI?: ReactNode;
  seoComponent?: ReactNode;
}

export default function SearchPage<T extends SearchableItem>({
  title,
  description,
  items,
  renderItem,
  containerClassName,
  searchPlaceholder = 'Search...',
  backLinkText = 'Back to Portfolio',
  backLinkPath = '/',
  sortFn,
  extraUI,
  seoComponent,
}: SearchPageProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);

  // useId generates a stable, unique ID for the label/input association
  const searchInputId = useId();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    items.forEach((item) => item.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags).sort();
  }, [items]);

  const filteredItems = useMemo(() => {
    let result = items.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag =
        selectedTags.length === 0 || selectedTags.some((tag) => item.tags.includes(tag));
      return matchesSearch && matchesTag;
    });

    if (sortFn) result = [...result].sort(sortFn);
    return result;
  }, [searchQuery, selectedTags, items, sortFn]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen w-full bg-base text-t-primary relative z-10">
      {seoComponent}
      <div className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to={backLinkPath}
            className="inline-flex items-center gap-2 text-t-muted hover:text-t-primary transition-colors mb-12 group cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
          >
            <PiArrowLeft
              className="w-4 h-4 text-t-primary group-hover:-translate-x-1 transition-transform"
              aria-hidden="true"
            />
            <span className="text-sm font-medium tracking-wide uppercase">{backLinkText}</span>
          </Link>

          <h1 className="text-5xl md:text-7xl font-serif italic lowercase mb-8">{title}</h1>
          <p className="text-xl text-t-muted max-w-2xl mb-16 leading-relaxed">{description}</p>

          {/* Search and Filter Controls */}
          <div className="flex flex-col gap-6 mb-12">
            <div className="flex flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96 md:focus-within:w-full transition-all duration-300">
                {/* Visible label for screen readers */}
                <label htmlFor={searchInputId} className="sr-only">
                  {searchPlaceholder}
                </label>
                <PiMagnifyingGlass
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-t-muted"
                  aria-hidden="true"
                />
                <input
                  id={searchInputId}
                  type="search"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-raised border border-border rounded-full py-3 pl-12 pr-4 text-t-primary placeholder:text-t-muted outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus:border-[#888888] transition-colors"
                />
              </div>

              <button
                onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
                aria-label={isFiltersExpanded ? 'Hide filters' : 'Show filters'}
                aria-expanded={isFiltersExpanded}
                className="p-3 rounded-full bg-raised border border-border text-t-muted hover:text-t-primary transition-colors flex-shrink-0 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              >
                {isFiltersExpanded ? (
                  <PiFaders className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <PiList className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            </div>

            <AnimatePresence>
              {isFiltersExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div
                    role="group"
                    aria-label="Filter by tag"
                    className="flex flex-wrap gap-2 py-1"
                  >
                    <button
                      onClick={() => setSelectedTags([])}
                      aria-pressed={selectedTags.length === 0}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
                        selectedTags.length === 0
                          ? 'bg-white text-black'
                          : 'bg-raised border border-border text-t-muted hover:text-t-primary'
                      }`}
                    >
                      All
                    </button>
                    {allTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        aria-pressed={selectedTags.includes(tag)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
                          selectedTags.includes(tag)
                            ? 'bg-white text-black'
                            : 'bg-raised border border-border text-t-muted hover:text-t-primary'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                    {selectedTags.length > 0 && (
                      <button
                        onClick={() => setSelectedTags([])}
                        className="px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer bg-red-900/20 text-red-400 hover:bg-red-900/40 border border-red-900/50 flex items-center gap-1 outline-none focus-visible:ring-2 focus-visible:ring-red-400/50"
                      >
                        <PiX className="w-3 h-3" aria-hidden="true" /> Clear filters
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Results */}
          <div className={containerClassName} aria-live="polite" aria-atomic="false">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => renderItem(item, index))
            ) : (
              <div className="col-span-full py-20 text-center text-t-muted font-serif italic text-xl">
                No results found matching your criteria.
              </div>
            )}
          </div>
        </motion.div>
      </div>
      {extraUI}
    </div>
  );
}
