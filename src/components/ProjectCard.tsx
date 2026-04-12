import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../data/cmsStore';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="group block relative border-r border-b border-brutal-black bg-brutal-bg transition-colors hover:bg-brutal-black"
    >
      {/* Image Block */}
      <div className="relative aspect-[4/5] border border-brutal-black overflow-hidden bg-brutal-bg">
        <img
          src={project.coverImage}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-500 will-change-transform"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80';
          }}
        />

        {/* Status Badge */}
        <div className="absolute top-0 left-0 bg-brutal-white border-b border-r border-brutal-black">
          <span className="block px-4 py-2 text-[10px] tracking-[0.15em] uppercase font-bold text-brutal-black">
            {project.status}
          </span>
        </div>

        {/* Category Badge */}
        <div className="absolute top-0 right-0 bg-brutal-black border-b border-l border-brutal-black">
          <span className="block px-4 py-2 text-[10px] tracking-[0.15em] uppercase font-bold text-brutal-white">
            {project.category}
          </span>
        </div>
      </div>

        {/* Content - Shows on hover */}
      {/* Info Block */}
      <div className="py-8 px-6 lg:px-8 border-t border-brutal-black bg-brutal-white transition-colors">
        <h3 className="font-display text-2xl lg:text-3xl text-brutal-black mb-2 uppercase tracking-tighter">
          {project.name}
        </h3>
        <div className="grid grid-cols-2 gap-4 mt-8 border-t border-brutal-black pt-6">
          <div>
            <span className="block text-[10px] font-bold text-brutal-black/50 uppercase tracking-widest mb-1 border-b border-brutal-black pb-1 w-max">LOCATION</span>
            <span className="block font-body text-xs font-bold uppercase mt-2">{project.location}</span>
          </div>
          {project.specs.area && (
            <div>
              <span className="block text-[10px] font-bold text-brutal-black/50 uppercase tracking-widest mb-1 border-b border-brutal-black pb-1 w-max">AREA</span>
              <span className="block font-body text-xs font-bold uppercase mt-2">{project.specs.area}</span>
            </div>
          )}
        </div>
        
        <div className="mt-8 flex items-center justify-between border-t border-brutal-black pt-4 group-hover:bg-brutal-white transition-all">
          <span className="text-brutal-black text-[10px] font-bold uppercase tracking-widest border border-brutal-black px-4 py-2 hover:bg-brutal-black hover:text-brutal-white transition-colors">View Project</span>
          <div className="w-10 h-10 border border-brutal-black flex items-center justify-center bg-brutal-white text-brutal-black group-hover:bg-brutal-black group-hover:text-brutal-white transition-colors">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
