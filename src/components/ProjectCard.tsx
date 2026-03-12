import React from 'react';
import { PiArrowRight } from 'react-icons/pi';
import { ShowcaseItem } from '../data/projects';

interface ProjectCardProps {
  project: ShowcaseItem;
  hoveredProject: ShowcaseItem | null;
  selectedProject: ShowcaseItem | null;
  onMouseEnter: (exp: ShowcaseItem) => void;
  onMouseLeave: () => void;
  onClick: (exp: ShowcaseItem) => void;
}

const ProjectCard = React.memo(
  ({
    project,
    hoveredProject,
    selectedProject,
    onMouseEnter,
    onMouseLeave,
    onClick,
  }: ProjectCardProps) => {
    const handleMouseEnter = () => {
      onMouseEnter(project);
      // Prefetch the markdown file on hover.
      // .catch() prevents an unhandled promise rejection on network failure.
      fetch(`/projects/${project.slug}.md`).catch(() => {});
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick(project);
      }
    };

    const isDimmed = hoveredProject && hoveredProject.slug !== project.slug && !selectedProject;

    if (project.displayStyle === 'text') {
      return (
        <div
          className={`col-span-1 md:col-span-2 flex justify-between items-center py-6 border-b border-border transition-all duration-150 ${
            isDimmed ? 'blur-sm opacity-50' : ''
          }`}
        >
          <div
            role="button"
            tabIndex={0}
            aria-label={`View project: ${project.title}`}
            className="flex items-center gap-4 group cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={() => onClick(project)}
            onKeyDown={handleKeyDown}
          >
            <span className="font-serif italic text-3xl md:text-4xl lowercase text-t-primary group-hover:text-t-primary transition-colors">
              {project.title}
            </span>
            <PiArrowRight
              aria-hidden="true"
              className="w-6 h-6 opacity-0 -translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-t-primary"
            />
          </div>
        </div>
      );
    }

    return (
      <div
        role="button"
        tabIndex={0}
        aria-label={`View project: ${project.title}`}
        className={`col-span-1 flex flex-col gap-4 cursor-pointer group transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-3xl ${
          isDimmed ? 'blur-sm opacity-50' : ''
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={() => onClick(project)}
        onKeyDown={handleKeyDown}
      >
        <div className="rounded-[24px] overflow-hidden aspect-[16/9] relative bg-raised border border-border">
          <img
            src={project.image}
            alt={project.title}
            width={800}
            height={600}
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
        </div>

        <div className="flex justify-between items-center px-1">
          <span className="text-xs text-t-primary font-semibold">{project.title}</span>
          <span className="text-xs text-t-primary capitalize">{project.type}</span>
        </div>
      </div>
    );
  }
);

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
