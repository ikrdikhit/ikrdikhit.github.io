import { useParams, useNavigate } from 'react-router-dom';
import { PiArrowLeft, PiArrowUpRight, PiGithubLogo } from 'react-icons/pi';
import { PROJECTS } from '../data/projects';
import ArticleLayout from '../components/ArticleLayout';

export default function Project() {
  const { id } = useParams();
  const navigate = useNavigate();
  const activeProject = PROJECTS.find((project) => project.slug === id);

  if (!activeProject) {
    return (
      <div className="min-h-screen w-full bg-base text-t-primary flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-serif italic">Project not found</h1>
        <button
          onClick={() => navigate('/')}
          className="text-t-muted hover:text-t-primary transition-colors flex items-center gap-2 cursor-pointer bg-transparent border-none"
        >
          <PiArrowLeft className="w-4 h-4 text-t-primary" /> Back Home
        </button>
      </div>
    );
  }

  const ProjectButtons = [
    activeProject.previewUrl && (
      <a
        key="preview"
        href={activeProject.previewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-[#333333] text-t-primary px-6 py-3 rounded-full text-sm font-medium hover:bg-hover transition-colors cursor-pointer"
      >
        <PiArrowUpRight className="w-4 h-4 text-t-primary" />
        Live Preview
      </a>
    ),
    activeProject.sourceUrl && (
      <a
        key="source"
        href={activeProject.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-transparent border border-border text-t-primary px-6 py-3 rounded-full text-sm font-medium hover:border-[#888888] transition-colors cursor-pointer"
      >
        <PiGithubLogo className="w-4 h-4 text-t-primary" />
        View Source
      </a>
    ),
  ].filter(Boolean);

  return (
    <ArticleLayout
      title={activeProject.title}
      description={activeProject.description}
      image={activeProject.image}
      markdownFile={activeProject.markdownFile}
      contentFolder="projects"
      tags={activeProject.tags}
      backPath="/"
      seoType="article"
      leftMeta={<span>{activeProject.type === 'project' ? 'Project' : 'Showcase'}</span>}
      actionButtons={ProjectButtons.length ? <>{ProjectButtons}</> : undefined}
    />
  );
}
