import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="group block relative overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={project.coverImage}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80';
          }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

        {/* Status Badge */}
        <div className="absolute top-6 left-6">
          <span className={`px-4 py-1.5 text-[10px] tracking-widest uppercase backdrop-blur-sm ${
            project.status === 'completed'
              ? 'bg-luxury-gold/20 text-luxury-gold border border-luxury-gold/30'
              : project.status === 'upcoming'
              ? 'bg-luxury-white/10 text-luxury-white border border-luxury-white/20'
              : 'bg-luxury-gold/20 text-luxury-gold border border-luxury-gold/30'
          }`}>
            {project.status}
          </span>
        </div>

        {/* Category */}
        <div className="absolute top-6 right-6">
          <span className="text-[10px] tracking-widest uppercase text-luxury-white/60">
            {project.category}
          </span>
        </div>

        {/* Content - Shows on hover */}
        <div className="absolute inset-x-6 bottom-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <div className="flex items-center justify-between">
            <span className="text-luxury-gold text-xs tracking-widest uppercase">View Project</span>
            <ArrowUpRight className="w-5 h-5 text-luxury-gold" />
          </div>
        </div>

        {/* Always visible bottom content */}
        <div className="absolute bottom-0 inset-x-0 p-6">
          <h3 className="font-display text-2xl text-luxury-white mb-2 group-hover:text-luxury-gold transition-colors duration-300">
            {project.name}
          </h3>
          <p className="text-luxury-muted text-sm">
            {project.location}
          </p>
          {project.specs.area && (
            <p className="text-luxury-white/60 text-xs mt-2">
              {project.specs.area}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
