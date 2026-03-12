import { motion } from 'motion/react';
import {
  PiArrowLeft,
  PiGithubLogo,
  PiXLogo,
  PiArrowUpRight,
  PiDiscordLogo,
  PiLinkedinLogo,
  PiInstagramLogo,
  PiCoffee,
  PiHeart,
} from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../data/config';
import SEO from '../components/SEO';

type LinkItem = {
  title: string;
  url: string;
  icon: React.ReactNode;
  accent?: string;
};

export default function Links() {
  const navigate = useNavigate();

  const links: LinkItem[] = [
    ...(SOCIAL_LINKS.githubSponsor
      ? [
          {
            title: 'Sponsor on Github',
            url: SOCIAL_LINKS.githubSponsor,
            icon: <PiHeart className="w-5 h-5" style={{ color: '#FF69B4' }} aria-hidden="true" />,
            accent: '#FF69B4',
          },
        ]
      : []),
    ...(SOCIAL_LINKS.buyMeACoffee
      ? [
          {
            title: 'Buy Me a Coffee',
            url: SOCIAL_LINKS.buyMeACoffee,
            icon: <PiCoffee className="w-5 h-5" style={{ color: '#FBBF24' }} aria-hidden="true" />,
            accent: '#FBBF24',
          },
        ]
      : []),
    ...(SOCIAL_LINKS.github
      ? [
          {
            title: 'GitHub',
            url: SOCIAL_LINKS.github,
            icon: <PiGithubLogo className="w-5 h-5 text-t-primary" aria-hidden="true" />,
          },
        ]
      : []),
    ...(SOCIAL_LINKS.discord
      ? [
          {
            title: 'Discord',
            url: SOCIAL_LINKS.discord,
            icon: <PiDiscordLogo className="w-5 h-5 text-t-primary" aria-hidden="true" />,
          },
        ]
      : []),
    ...(SOCIAL_LINKS.x
      ? [
          {
            title: 'X',
            url: SOCIAL_LINKS.x,
            icon: <PiXLogo className="w-5 h-5 text-t-primary" aria-hidden="true" />,
          },
        ]
      : []),
    ...(SOCIAL_LINKS.linkedin
      ? [
          {
            title: 'LinkedIn',
            url: SOCIAL_LINKS.linkedin,
            icon: <PiLinkedinLogo className="w-5 h-5 text-t-primary" aria-hidden="true" />,
          },
        ]
      : []),
    ...(SOCIAL_LINKS.instagram
      ? [
          {
            title: 'Instagram',
            url: SOCIAL_LINKS.instagram,
            icon: <PiInstagramLogo className="w-5 h-5 text-t-primary" aria-hidden="true" />,
          },
        ]
      : []),
    ...(SOCIAL_LINKS.discordServer
      ? [
          {
            title: `${SOCIAL_LINKS.discordServerTitle} Discord Server`,
            url: SOCIAL_LINKS.discordServer,
            icon: <PiDiscordLogo className="w-5 h-5 text-t-primary" aria-hidden="true" />,
          },
        ]
      : []),
    ...(PERSONAL_INFO.baseUrl
      ? [
          {
            title: 'Portfolio',
            url: PERSONAL_INFO.baseUrl,
            icon: <PiArrowUpRight className="w-5 h-5 text-t-primary" aria-hidden="true" />,
          },
        ]
      : []),
  ];

  return (
    <div className="min-h-screen w-full bg-base text-t-primary relative z-10 flex flex-col items-center pt-8 pb-16 md:pt-12 md:pb-24 px-6">
      <SEO
        title={`Links | ${PERSONAL_INFO.name}`}
        description={`All links for ${PERSONAL_INFO.name} — GitHub, X, Discord and more.`}
      />

      <motion.div
        initial={{ opacity: 0.01, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 60, damping: 20, mass: 1 }}
        style={{ willChange: 'opacity, transform' }}
        className="w-full max-w-md flex flex-col items-center"
      >
        <button
          onClick={() => navigate('/')}
          className="self-start flex items-center gap-2 text-t-muted hover:text-t-primary transition-colors mb-12 group cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
        >
          <PiArrowLeft
            className="w-4 h-4 text-t-primary group-hover:-translate-x-1 transition-transform"
            aria-hidden="true"
          />
          <span className="text-sm font-medium tracking-wide uppercase">Back to Portfolio</span>
        </button>

        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#333333] to-[#111111] border border-border mb-6 overflow-hidden">
          <img
            src={PERSONAL_INFO.profilePicture}
            alt={`${PERSONAL_INFO.name} profile photo`}
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="text-2xl font-serif italic mb-2">{PERSONAL_INFO.name}</h1>
        <p className="text-t-muted text-sm mb-10 text-center">
          Here are a list of links you'd like to visit :)
        </p>

        <nav aria-label="Social links" className="flex flex-col gap-4 w-full">
          {links.map((link) => (
            <a
              key={link.title}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-2xl border bg-raised transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              style={{ borderColor: link.accent ? `${link.accent}40` : '#333333' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = link.accent
                  ? `${link.accent}15`
                  : '#333333';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#1A1A1A';
              }}
            >
              <div className="flex items-center gap-4">
                {link.icon}
                <span className="font-medium text-sm" style={{ color: link.accent ?? '#F3F3F3' }}>
                  {link.title}
                </span>
              </div>
              <PiArrowLeft
                className="w-4 h-4 rotate-180"
                style={{ color: link.accent ? `${link.accent}80` : '#888888' }}
                aria-hidden="true"
              />
            </a>
          ))}
        </nav>
      </motion.div>
    </div>
  );
}
