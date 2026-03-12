import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { PiArrowRight } from 'react-icons/pi';
import { BlogPost } from '../data/blogs';
import { THEME } from '../data/config';

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

const BlogCard = React.memo(({ post, index = 0 }: BlogCardProps) => {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleMouseEnter = () => {
    fetch(`/blogs/${post.slug}.md`).catch(() => {});
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/blogs/${post.slug}`}
        onMouseEnter={handleMouseEnter}
        className={`group flex flex-col md:flex-row gap-8 p-6 rounded-3xl border border-border bg-raised hover:bg-hover transition-colors block outline-none focus-visible:ring-2 focus-visible:ring-[${THEME.accent}]`}
        aria-label={`Read article: ${post.title}`}
      >
        <article className="flex flex-col md:flex-row gap-8 w-full">
          {post.image && (
            <div className="w-full md:w-1/3 aspect-video rounded-xl overflow-hidden bg-black flex-shrink-0">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          )}
          <div className="w-full md:w-2/3 flex flex-col justify-center">
            <header className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
              <time dateTime={post.date} className="text-t-muted text-sm font-serif italic">
                {formattedDate}
              </time>
              <div className="flex gap-2 md:ml-auto" aria-label="Tags">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-raised border border-border rounded-full text-xs font-medium text-t-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </header>
            <h3 className="text-2xl md:text-3xl font-serif italic lowercase mb-3 text-t-primary group-hover:text-t-primary transition-colors">
              {post.title}
            </h3>
            <p className="text-t-muted leading-relaxed mb-6 line-clamp-2">{post.description}</p>
            <div className="flex items-center gap-2 text-t-primary font-medium text-sm mt-auto">
              Read Article{' '}
              <PiArrowRight
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
});

BlogCard.displayName = 'BlogCard';

export default BlogCard;
