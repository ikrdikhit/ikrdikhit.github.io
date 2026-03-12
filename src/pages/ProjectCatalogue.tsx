import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { PiArrowRight } from 'react-icons/pi';
import { PROJECTS, ShowcaseItem } from '../data/projects';
import SearchPage from '../components/SearchPage';
import SEO from '../components/SEO';
import { PERSONAL_INFO } from '../data/config';

export default function ProjectCatalogue() {
  const navigate = useNavigate();

  return (
    <SearchPage<ShowcaseItem>
      title="Project Catalogue"
      description="A comprehensive collection of my websites, prototypes, motion graphics, and more."
      items={PROJECTS}
      searchPlaceholder="Search projects..."
      containerClassName="grid grid-cols-1 md:grid-cols-2 gap-8"
      seoComponent={
        <SEO
          title={`Project Catalogue | ${PERSONAL_INFO.name}`}
          description="A comprehensive collection of my websites, prototypes, motion graphics, and more."
        />
      }
      renderItem={(project, index) => {
        const hasLinks = project.previewUrl || project.sourceUrl;

        return (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => navigate(`/projects/${project.slug}`)}
            className="group flex flex-col gap-4 p-5 rounded-3xl border border-border bg-raised hover:bg-hover transition-colors cursor-pointer"
          >
            <div className="w-full aspect-video rounded-xl overflow-hidden bg-base relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>
            <div className="flex flex-col flex-grow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-t-primary uppercase tracking-wide">
                  {project.type}
                </span>
                <div className="flex gap-2">
                  {project.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-raised border border-border rounded-full text-xs text-t-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <h2 className="text-2xl font-serif italic lowercase mb-2 text-t-primary group-hover:text-t-primary transition-colors">
                {project.title}
              </h2>
              {/* Expand description to 4 lines if no links exist, otherwise restrict to 2 */}
              <p
                className={`text-t-muted text-sm leading-relaxed mb-6 ${hasLinks ? 'line-clamp-2' : 'line-clamp-4'}`}
              >
                {project.description}
              </p>

              <div className={`mt-auto flex items-center ${hasLinks ? 'justify-between' : ''}`}>
                {hasLinks && (
                  <div className="flex items-center gap-2">
                    {project.previewUrl && (
                      <a
                        href={project.previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-3 py-1.5 bg-base border border-border rounded-full text-xs font-medium text-t-primary hover:bg-hover transition-colors"
                      >
                        Preview
                      </a>
                    )}
                    {project.sourceUrl && (
                      <a
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-3 py-1.5 bg-base border border-border rounded-full text-xs font-medium text-t-primary hover:bg-hover transition-colors"
                      >
                        Source
                      </a>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-2 text-t-primary font-medium text-sm">
                  View Project{' '}
                  <PiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </motion.div>
        );
      }}
    />
  );
}
