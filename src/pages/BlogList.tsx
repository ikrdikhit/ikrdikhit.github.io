import BlogCard from '../components/BlogCard';
import { BLOG_POSTS, BlogPost } from '../data/blogs';
import SEO from '../components/SEO';
import { PERSONAL_INFO } from '../data/config';
import SearchPage from '../components/SearchPage';

export default function BlogList() {
  return (
    <SearchPage<BlogPost>
      title="Writings & Thoughts"
      description="A collection of articles, guides, and thoughts on design, engineering, and everything in between."
      items={BLOG_POSTS}
      searchPlaceholder="Search articles..."
      containerClassName="flex flex-col gap-8"
      sortFn={(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()}
      seoComponent={
        <SEO
          title={`Writings & Thoughts | ${PERSONAL_INFO.name}`}
          description="A collection of articles, guides, and thoughts on design, engineering, and everything in between."
        />
      }
      renderItem={(post, index) => <BlogCard key={post.slug} post={post} index={index} />}
    />
  );
}
