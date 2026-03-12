import { PiFileText, PiArrowUpRight, PiGithubLogo } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { ShowcaseItem } from '../data/projects';
import BasePopup from './BasePopup';

interface ProjectPopupProps {
  selectedProject: ShowcaseItem | null;
  onClose: () => void;
}

export default function ProjectPopup({ selectedProject, onClose }: ProjectPopupProps) {
  const navigate = useNavigate();

  if (!selectedProject) return null;

  const ProjectButtons = [
    selectedProject.previewUrl && (
      <a
        key="preview"
        href={selectedProject.previewUrl}
        className="flex-1 flex items-center justify-center gap-2 bg-transparent border border-border text-t-primary px-4 py-2.5 rounded-full text-xs font-medium hover:border-[#888888] transition-colors cursor-pointer"
      >
        <PiArrowUpRight className="w-4 h-4 text-t-primary" />
        Preview
      </a>
    ),
    selectedProject.sourceUrl && (
      <a
        key="source"
        href={selectedProject.sourceUrl}
        className="flex-1 flex items-center justify-center gap-2 bg-transparent border border-border text-t-primary px-4 py-2.5 rounded-full text-xs font-medium hover:border-[#888888] transition-colors cursor-pointer"
      >
        <PiGithubLogo className="w-4 h-4 text-t-primary" />
        Source
      </a>
    ),
  ].filter(Boolean);

  return (
    <BasePopup isOpen={!!selectedProject} onClose={onClose} className="p-6 max-w-md" zIndex="z-50">
      <img
        src={selectedProject.image}
        alt={selectedProject.title}
        className="w-full h-full object-cover"
        loading="lazy"
      />

      <div className="flex justify-between items-start mb-4">
        <h3 className="font-serif italic text-2xl lowercase text-t-primary">
          {selectedProject.title}
        </h3>
      </div>

      <p className="text-t-muted text-sm mb-8 leading-relaxed">{selectedProject.description}</p>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => navigate(`/projects/${selectedProject.slug}`)}
          className="w-full flex items-center justify-center gap-2 bg-[#333333] text-t-primary px-4 py-3 rounded-full text-sm font-medium hover:bg-hover transition-colors cursor-pointer"
        >
          <PiFileText className="w-4 h-4 text-t-primary" />
          Learn More
        </button>

        {ProjectButtons.length > 0 && <div className="flex gap-3">{ProjectButtons}</div>}
      </div>
    </BasePopup>
  );
}
