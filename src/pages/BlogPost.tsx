import { useParams, useNavigate } from 'react-router-dom';
import { PiArrowLeft } from 'react-icons/pi';
import { BLOG_POSTS } from '../data/blogs';
import ArticleLayout from '../components/ArticleLayout';

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const activePost = BLOG_POSTS.find((post) => post.slug === id);

  if (!activePost) {
    return (
      <div className="min-h-screen w-full bg-base text-t-primary flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-serif italic">Article not found</h1>
        <button
          onClick={() => navigate('/blogs')}
          className="text-t-muted hover:text-t-primary transition-colors flex items-center gap-2 cursor-pointer bg-transparent border-none outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
        >
          <PiArrowLeft className="w-4 h-4 text-t-primary" aria-hidden="true" /> Back to Blogs
        </button>
      </div>
    );
  }

  const formattedDate = new Date(activePost.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <ArticleLayout
      title={activePost.title}
      description={activePost.description}
      image={activePost.image}
      markdownFile={activePost.markdownFile}
      contentFolder="blogs"
      tags={activePost.tags}
      backPath="/blogs"
      seoType="article"
      // Pass the ISO date so ArticleLayout can inject it into the BlogPosting schema
      datePublished={activePost.date}
      leftMeta={<time dateTime={activePost.date}>{formattedDate}</time>}
    />
  );
}
