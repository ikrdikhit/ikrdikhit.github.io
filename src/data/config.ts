// ─── Personal Info ────────────────────────────────────────────────────────────

export const PERSONAL_INFO = {
  name: 'Dikhit Das',
  namealt: 'Dikhit',
  role: 'Developer',
  email: 'dikhitdas@outlook.com',
  location: 'India',
  remoteAvailable: true,
  bio: "Developer that's also interested in editing, designing, motion graphics, photography, music, literature and more",
  about:
    "I'm Dikhit, a developer and designer with a passion for creating minimalist, functional, and beautiful digital experiences. My programming journey started with a simple curiosity about how discord bots are made and led me into the rabbit-hole of programming and tech in general into which I dive deep into every day.",
  knowMore: [
    'I like doing everything I can, I play the guitar, write poems or read book etc.',
    "Besides that I'm also concerned about my physical health therefore I try to workout regularly in order to maintain my both mental and physical health.",
    "I find FPS games like CoD, racing games like Need For Speed, strategy games like chess or puzzle games very interesting. However my favourite one is Minecraft. But I've reduced my time spent on gaming and focus more on spending time more productively like working on something I find interesting, learning something or spending time with the people I care about.",
  ],
  profilePicture: '/pfp.webp',
  baseUrl: 'https://ikrdikhit.is-a.dev', // no trailing slash
  twitterHandle: '@ikrdikhit',

  // Resume — set to null to hide the button everywhere
  resumeUrl: null as string | null,
  // resumeUrl: '/resume.pdf',

  // Auto-calculated from this year for the "Years building" stat
  careerStartYear: 2020,

  // Contact button
  showContactButton: true,
  contactButtonLabel: 'Hire Me',
  contactDescription:
    "I'm currently available for freelance projects and full-time opportunities. Have a project in mind? Feel free to reach out.",

  // Status badge in contact popup
  showStatus: true,
  statusLabel: 'Open for freelance projects',

  // Hero headline — wrap words in {curly braces} to apply serif italic styling
  heroHeadline: 'I like {breaking} stuff till I make something {worthy}.',

  // Footer
  footerText: 'Thank You for Visiting <3',

  // Toggle entire pages/sections on or off
  showBlog: true,
  showProjects: true,
  showLinks: true, // this doesn't hide the links in the homepage, just the links page and the show more links button
};

// ─── Skills ───────────────────────────────────────────────────────────────────

export const SKILLS = {
  frontend: 'React, Next.js, TypeScript, Tailwind CSS, Bootstrap, HTML, CSS, JavaScript',
  backend: 'Node.js, Python, PHP, MongoDB, PostgreSQL',
  design: 'Figma, GIMP, Typography, UI/UX, Prototyping',
  other: 'Git, Vercel, Lua, Bash, Linux, Motion Graphics, Photo/Video Editing, Sprites',
};

// ─── Experience ───────────────────────────────────────────────────────────────

export const EXPERIENCE = [
  {
    role: 'Freelancing',
    company: 'Independent',
    period: 'Present',
    description:
      'Worked with various clients to design and build custom websites, prototypes, and motion graphics that align with their brand identity.',
    isCurrent: true,
  },
  {
    role: 'Co-Founder',
    company: 'SpicyDevs',
    period: '2022 - Present',
    description:
      'A Community started by me and my friends to provide support to the open-source community as well as a place for developers to hangout. Providing services like Discord-Bots, Web-Dev, GFX, VFX, Discord Server Designing, Video/Image Editing at one place.',
    isCurrent: true,
  },
];

// ─── Stats ────────────────────────────────────────────────────────────────────
// Set value to null to hide an individual stat.

export const STATS = [
  { label: 'Projects shipped', value: '10+' },
  {
    label: 'Years building',
    value: `${new Date().getFullYear() - PERSONAL_INFO.careerStartYear}+`,
  },
  { label: 'Clients worked with', value: '5+' },
  // { label: 'Cups of coffee',  value: '∞' },
];

// ─── Social Links ─────────────────────────────────────────────────────────────
// Set any to null to hide it from the Links page and contact popup.

export const SOCIAL_LINKS = {
  github: 'https://github.com/ikrdikhit',
  githubSponsor: 'https://github.com/sponsors/ikrdikhit',
  x: 'https://x.com/ikrdikhit',
  instagram: 'https://instagram.com/ikrdikhit',
  discord: null as string | null,
  discordServer: 'https://spicydevs.js.org/discord',
  discordServerTitle: 'Spicydevs',
  linkedin: null as string | null,
  buyMeACoffee: 'https://buymeacoffee.com/dikhit',
  email: 'mailto:dikhitdas@outlook.com',
};

// ─── Misc ─────────────────────────────────────────────────────────────────────

export const MISC_INFO = {
  keywords: 'Developer, Designer, Portfolio, React, Next.js',

  // Google Analytics — set to null to disable
  googleAnalyticsId: null as string | null,
  // googleAnalyticsId: 'G-XXXXXXXXXX',

  // Fallback OG image for pages with no explicit og:image
  defaultOgImage: '/pfp.webp',

  // Image path (mostly for blogs and projects)
  imagePath: '/img',

  // How many headers to show in the TableOfContents of the articles
  tocExpandDepth: 1,

  // Theme switcher button
  showThemeSwitcher: false,
};
