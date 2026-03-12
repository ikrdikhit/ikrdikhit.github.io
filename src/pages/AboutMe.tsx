import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from 'motion/react';
import { PiArrowLeft, PiBriefcase, PiCode, PiHeart, PiDownloadSimple } from 'react-icons/pi';
import SEO from '../components/SEO';
import ContactPopup from '../components/ContactPopup';
import { PERSONAL_INFO, SKILLS, EXPERIENCE } from '../data/config';

export default function AboutMe() {
  const navigate = useNavigate();
  const [isContactMeOpen, setIsContactMeOpen] = useState(false);
  // isScrolled still needed for the header background div (non-animated className swap)
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  // --- useMotionValueEvent instead of scrollY.on() ---
  // This avoids scheduling a React re-render on every single scroll frame.
  // setIsScrolled only fires when crossing the threshold, not on every pixel.
  // add near other useState declarations
  const [showContact, setShowContact] = useState(true);
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const crossed = latest > 80;
    setIsScrolled((prev) => (prev !== crossed ? crossed : prev));
    setShowContact(latest < lastScrollY.current || latest < 80);
    lastScrollY.current = latest;
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // --- Drive the profile picture animation directly from scrollY ---
  // useTransform maps scroll position → CSS values with zero React re-renders.
  // A spring wraps the raw scrollY-derived value to give it the same springy
  // feel you had before, but now it runs entirely on the compositor thread.
  // [0, 80] means the animation completes over the first 80px of scroll. Increase to [0, 150] for a slower/lazier transition, decrease to [0, 40] for a snappier one.
  const rawProgress = useTransform(scrollY, [0, 80], [0, 1], { clamp: true });
  // Higher stiffness = snappier. Lower = more sluggish
  // Higher damping = less bounce. Lower = more bouncy
  // mass amplifies both — keep it between 0.5–1.5
  const progress = useSpring(rawProgress, { stiffness: 200, damping: 24, mass: 0.8 });

  // Width: from 100% → 64px  (we animate px via a numeric scale trick)
  // We'll animate using a CSS custom property pattern via style instead of className
  const borderRadius = useTransform(progress, [0, 1], [24, 9999]);
  // We can't directly animate percentage width, so we use a max-width approach:
  // at 0 → very large (unconstrained), at 1 → 64px
  const imageSize = useTransform(progress, [0, 1], [300, 64]);
  // The only thing to be careful about: imageSize drives both width and height together, so the image stays square at all sizes. If you ever want different width/height values, split it into two separate useTransform calls:
  // const imageWidth = useTransform(progress, [0, 1], [400, 64]);
  // const imageHeight = useTransform(progress, [0, 1], [400, 64]); // can differ
  // and bind them separately in the style prop.

  return (
    <div className="min-h-screen w-full bg-base text-t-primary relative z-10">
      <SEO
        title={`About Me | ${PERSONAL_INFO.name}`}
        description={`Learn more about ${PERSONAL_INFO.name}, ${PERSONAL_INFO.bio}`}
      />

      {/* Sticky Contact Button */}
      {PERSONAL_INFO.showContactButton && (
        <div
          className={`fixed bottom-8 right-8 z-40 transition-all duration-300 ${
            showContact
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <button
            onClick={() => setIsContactMeOpen(true)}
            className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors shadow-2xl cursor-pointer flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-black/50"
          >
            <PiBriefcase className="w-4 h-4" aria-hidden="true" />
            {PERSONAL_INFO.contactButtonLabel || 'Contact Me'}
          </button>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 pt-8 pb-24 md:pt-12 md:pb-32">
        <motion.div
          initial={{ opacity: 0.01, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 60, damping: 20, mass: 1 }}
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-t-muted hover:text-t-primary transition-colors mb-16 group cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
          >
            <PiArrowLeft
              className="w-4 h-4 text-t-primary group-hover:-translate-x-1 transition-transform"
              aria-hidden="true"
            />
            <span className="text-sm font-medium tracking-wide uppercase">Back to Portfolio</span>
          </button>

          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start mb-24 relative">
            {/* Mobile sticky header background — className swap is fine, it's not animated */}
            <div
              className={`md:hidden fixed top-0 left-0 right-0 bg-base/90 backdrop-blur-md z-20 transition-all duration-300 ${
                isScrolled
                  ? 'h-24 border-b border-border'
                  : 'h-0 border-b-0 opacity-0 pointer-events-none'
              }`}
              aria-hidden="true"
            />

            {/* --- Remove `layout` prop, use style with motion values instead --- */}
            {/* `layout` forces Framer Motion to measure the DOM on every render.      */}
            {/* Replacing it with direct style bindings keeps everything off the        */}
            {/* main thread and avoids layout thrashing.                                */}
            <div className="w-full md:w-1/3 z-30 sticky top-4 md:top-8 flex justify-center md:block">
              {/* Mobile animated profile picture */}
              <motion.div
                className="md:hidden overflow-hidden border border-border origin-top-left"
                style={{
                  // Use motion values in `style`, not `animate` + `layout`
                  // This drives the animation on the compositor — no JS per frame.
                  borderRadius,
                  width: imageSize,
                  height: imageSize,
                  // Hint to the browser to create a separate GPU layer
                  willChange: 'transform, width, height, border-radius',
                }}
              >
                <img
                  src={PERSONAL_INFO.profilePicture}
                  alt={`${PERSONAL_INFO.name} profile photo`}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover grayscale active:grayscale-0 transition-all duration-700"
                  fetchPriority="high"
                />
              </motion.div>

              {/* Desktop static profile picture — untouched */}
              <div className="hidden md:block w-full aspect-square rounded-3xl overflow-hidden border border-border">
                <img
                  src={PERSONAL_INFO.profilePicture}
                  alt={`${PERSONAL_INFO.name} profile photo`}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  fetchPriority="high"
                />
              </div>
            </div>

            <div className="w-full md:w-2/3 flex flex-col gap-8 mt-4 md:mt-0">
              <div>
                <h1 className="text-5xl md:text-7xl font-serif italic lowercase mb-6">My Story</h1>
                <p className="text-xl text-t-muted leading-relaxed">{PERSONAL_INFO.about}</p>
              </div>
              <div className="h-px w-full bg-border my-4" />

              <motion.div
                initial={{ opacity: 0.01, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ type: 'spring', stiffness: 60, damping: 20, mass: 1 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif italic lowercase flex items-center gap-3">
                    <PiCode className="w-6 h-6 text-t-muted" aria-hidden="true" /> Tech Stack &
                    Skills
                  </h2>
                  {PERSONAL_INFO.resumeUrl && (
                    <a
                      href={PERSONAL_INFO.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-transparent border border-border text-t-primary px-4 py-2 rounded-full text-xs font-medium hover:border-t-muted transition-colors cursor-pointer"
                    >
                      <PiDownloadSimple className="w-3.5 h-3.5" aria-hidden="true" />
                      Resume
                    </a>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Frontend', value: SKILLS.frontend },
                    { label: 'Design', value: SKILLS.design },
                    { label: 'Backend', value: SKILLS.backend },
                    { label: 'Other', value: SKILLS.other },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex flex-col gap-2">
                      <span className="text-t-primary font-medium">{label}</span>
                      <span className="text-t-muted text-sm">{value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <div className="h-px w-full bg-border my-4" />

              <motion.div
                initial={{ opacity: 0.01, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ type: 'spring', stiffness: 60, damping: 20, mass: 1 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-serif italic lowercase flex items-center gap-3">
                    <PiBriefcase className="w-6 h-6 text-t-muted" aria-hidden="true" /> Experience
                  </h2>
                </div>

                <ol className="relative border-l border-border ml-3 flex flex-col gap-12">
                  {EXPERIENCE.map((job, index) => (
                    <li key={index} className="relative pl-8">
                      <div
                        className={`absolute left-0 top-2 w-3 h-3 -translate-x-1/2 rounded-full ring-4 ring-base ${
                          job.isCurrent ? 'bg-t-primary' : 'bg-border'
                        }`}
                        aria-hidden="true"
                      />
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-medium text-t-primary">{job.role}</h3>
                          <span className="text-sm text-t-muted font-serif italic">
                            {job.period}
                          </span>
                        </div>
                        <span className="text-t-muted text-sm uppercase tracking-wide">
                          {job.company}
                        </span>
                        <p className="text-t-muted leading-relaxed mt-2">{job.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </motion.div>

              <div className="h-px w-full bg-border my-4" />

              <motion.div
                initial={{ opacity: 0.01, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ type: 'spring', stiffness: 60, damping: 20, mass: 1 }}
              >
                <h2 className="text-2xl font-serif italic lowercase mb-6 flex items-center gap-3">
                  <PiHeart className="w-6 h-6 text-t-muted" aria-hidden="true" /> Know More
                </h2>
                <div className="flex flex-col gap-4">
                  {PERSONAL_INFO.knowMore.map((paragraph, index) => (
                    <p key={index} className="text-t-muted leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <ContactPopup isOpen={isContactMeOpen} onClose={() => setIsContactMeOpen(false)} />
    </div>
  );
}
