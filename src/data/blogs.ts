import { MISC_INFO } from './config';

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  image: string;
  markdownFile: string;
  date: string;
  tags: string[];
  featured: boolean;
};

export const BLOG_POSTS: BlogPost[] = (
  [
    // {
    //   slug: 'lorem', // url to show in browser addressbar
    //   title: 'lorem',
    //   description:
    //     'lorem',
    //   image:
    //     'url', // stored in public/img/
    //   markdownFile: 'lorem.md',
    //   date: 'YYYY-MM-DD',
    //   tags: ['abc', 'xyz'],
    //   featured: true,
    // },
    {
      slug: 'mastering-fonts-and-fontconfig-on-linux',
      title: 'Mastering Fonts & Fontconfig on Linux: A Complete Guide Including Emoji Setup',
      description:
        'A practical reference for intermediate-to-advanced Linux users who want real control over how text renders on their system.',
      image: 'linux-fonts-understanding-fontconfig-and-configuration.webp',
      markdownFile: 'mastering-fonts-and-fontconfig-on-linux.md',
      date: '2026-03-10',
      tags: ['linux', 'tech', 'guide'],
      featured: true,
    },
  ] as BlogPost[]
).map((post) => ({ ...post, image: `${MISC_INFO.imagePath}/${post.image}` }));
