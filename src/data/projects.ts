import { MISC_INFO } from './config';

export type ShowcaseItem = {
  slug: string;
  title: string;
  description: string;
  image: string;
  markdownFile: string;
  previewUrl: string | null;
  sourceUrl: string | null;
  type: string;
  tags: string[];
  featured: boolean;
  displayStyle?: 'image' | 'text';
};

export const PROJECTS: ShowcaseItem[] = (
  [
    // {
    //   slug: 'lorem', // url to show in browser addressbar
    //   title: 'lorem',
    //   description: 'lorem',
    //   image: 'url', // stored in public/img/
    //   markdownFile: 'lorem.md',
    //   previewUrl: '#',
    //   sourceUrl: '#',
    //   type: 'lorem', // Example: 'project'
    //   tags: ['abc', 'xyz'],
    //   featured: true,
    //   displayStyle: 'image',
    // },
    {
      slug: 'posterium',
      title: 'posterium',
      description:
        'Free movie and TV poster generator with live rating badges from IMDb, Rotten Tomatoes, Metacritic, and TMDB. Drag-and-drop editor, glassmorphism effects, instant API URL export. Perfect for Plex, Jellyfin, Discord bots, and Notion.',
      image: 'posterium.webp',
      markdownFile: 'posterium.md',
      previewUrl: 'https://posters.spicydevs.xyz',
      sourceUrl: null,
      type: 'project',
      tags: ['website', 'tech', 'spicydevs', 'customization', 'beta'],
      featured: true,
      displayStyle: 'image',
    },
    {
      slug: 'spicydevs',
      title: 'spicydevs',
      description: `A welcoming community, SpicyDevs encourages developers to get started on interesting projects and dive into the world of coding. Join us so we can geek out together! We provide high-quality codes at the lowest cost of Nothing!`,
      image: 'spicydevs.webp',
      markdownFile: 'spicydevs.md',
      previewUrl: 'https://spicydevs.js.org',
      sourceUrl: 'https://github.com/SpicyDevs',
      type: 'project',
      tags: ['website', 'spicydevs', 'service', 'tech'],
      featured: true,
      displayStyle: 'image',
    },
  ] as ShowcaseItem[]
).map((post) => ({ ...post, image: `${MISC_INFO.imagePath}/${post.image}` }));
