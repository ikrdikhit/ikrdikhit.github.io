import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { PiGhost, PiArrowLeft } from 'react-icons/pi';
import SEO from '../components/SEO';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen w-full bg-base text-t-primary flex flex-col items-center justify-center px-6 relative z-10">
      {/* noindex prevents the 404 page from being indexed by search engines */}
      <SEO
        title="404 - Page Not Found"
        description="The page you are looking for doesn't exist or has been moved."
        noindex={true}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="flex justify-center mb-8">
          <div className="p-6 rounded-3xl bg-raised border border-border">
            <PiGhost className="w-16 h-16 text-t-muted" aria-hidden="true" />
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-serif italic lowercase mb-6">Lost?</h1>

        <p className="text-xl text-t-muted mb-12 max-w-md mx-auto leading-relaxed">
          The page you're looking for doesn't exist, or perhaps it's been moved to another
          dimension.
        </p>

        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-200 transition-colors cursor-pointer group outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        >
          <PiArrowLeft
            className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
            aria-hidden="true"
          />
          Back to Safety
        </button>
      </motion.div>

      {/* Subtle background text decoration */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none"
        aria-hidden="true"
      >
        <span className="text-[20vw] font-serif italic text-t-primary/[0.02] translate-y-20">
          404
        </span>
      </div>
    </main>
  );
}
