import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { MapPin, Download, ArrowLeft, Building2, Layers, Home } from 'lucide-react';
import ImageGallery from '../components/ImageGallery';
import ProjectCard from '../components/ProjectCard';
import { getProjects, getProjectById, type Project } from '../data/cmsStore';

const ProjectDetail = () => {
  const { id } = useParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!id) return;
        const [allProjects, currentProject] = await Promise.all([
          getProjects(),
          getProjectById(id)
        ]);
        setProjects(allProjects);
        setProject(currentProject || null);
      } catch (error) {
        console.error('Error loading project data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brutal-white pt-20 flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-t-4 border-b-4 border-brutal-black"></div>
      </div>
    );
  }

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const relatedProjects = projects
    .filter(p => p.category === project.category && p.id !== project.id)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-brutal-white pt-24">
      
      {/* Top Header Row */}
      <div className="w-full px-6 lg:px-12 py-6 border-b border-brutal-black hidden lg:block">
        <Link
          to="/projects"
          className="inline-flex items-center text-brutal-black hover:bg-brutal-black hover:text-brutal-white transition-colors text-[12px] font-bold tracking-[0.15em] uppercase border-b border-transparent py-1"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Portfolio
        </Link>
      </div>

      <div className="w-full px-6 lg:px-12 flex flex-col lg:flex-row items-start gap-12 lg:gap-24 pt-12 lg:pt-24 pb-24 border-b border-brutal-black">
        
        {/* Mobile Back Link */}
        <Link
          to="/projects"
          className="lg:hidden inline-flex items-center text-brutal-black font-bold tracking-[0.15em] uppercase text-[12px] mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Portfolio
        </Link>

        {/* Left Column: Typography & Specs */}
        <div className="w-full lg:w-1/3 flex flex-col pt-0 lg:sticky top-32">
          
          <h1 className="font-display text-6xl md:text-7xl lg:text-[100px] text-brutal-black mb-16 leading-[0.85] uppercase tracking-tighter break-words hyphens-auto">
            {project.name}
          </h1>

          {/* Brutalist Spec Table */}
          <div className="w-full border-t border-brutal-black border-b select-none mb-16">
            <div className="grid grid-cols-2 py-4 border-b border-brutal-black">
              <span className="text-[10px] font-bold tracking-[0.2em] text-brutal-black/50 uppercase">Location</span>
              <span className="text-[13px] font-bold uppercase text-right">{project.location}</span>
            </div>
            
            {project.specs?.area && (
              <div className="grid grid-cols-2 py-4 border-b border-brutal-black">
                <span className="text-[10px] font-bold tracking-[0.2em] text-brutal-black/50 uppercase">Area</span>
                <span className="text-[13px] font-bold uppercase text-right">{project.specs.area}</span>
              </div>
            )}
            
            {project.specs?.units && (
              <div className="grid grid-cols-2 py-4 border-b border-brutal-black">
                <span className="text-[10px] font-bold tracking-[0.2em] text-brutal-black/50 uppercase">Units</span>
                <span className="text-[13px] font-bold uppercase text-right">{project.specs.units}</span>
              </div>
            )}

            <div className="grid grid-cols-2 py-4 border-b border-brutal-black">
              <span className="text-[10px] font-bold tracking-[0.2em] text-brutal-black/50 uppercase">Status</span>
              <span className="text-[13px] font-bold uppercase text-right">{project.status}</span>
            </div>

            <div className="grid grid-cols-2 py-4">
              <span className="text-[10px] font-bold tracking-[0.2em] text-brutal-black/50 uppercase">Category</span>
              <span className="text-[13px] font-bold uppercase text-right">{project.category}</span>
            </div>
          </div>

          <p className="text-brutal-black text-sm md:text-base leading-relaxed mb-12">
            {project.description}
          </p>

          {project.highlights && project.highlights.length > 0 && (
            <div className="mb-12">
              <h3 className="font-bold tracking-[0.15em] text-[12px] uppercase mb-6 border-b border-brutal-black pb-4">Key Interventions</h3>
              <ul className="flex flex-col gap-4">
                {project.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <span className="font-display font-bold mr-4 text-brutal-black">0{index + 1}</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(project.brochure || project.pdfSlug) && (
            <a
              href={project.pdfSlug ? `/brochure/${project.pdfSlug}` : project.brochure}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brutal w-full justify-center inline-flex items-center gap-3 border border-brutal-black hover:bg-brutal-white hover:text-brutal-black"
            >
              <Download className="w-4 h-4" />
              Download Case Study
            </a>
          )}
        </div>

        {/* Right Column: Imagery */}
        <div className="w-full lg:w-2/3 flex flex-col gap-8">
          <div className="w-full border border-brutal-black">
            <img
              src={project.coverImage}
              alt={project.name}
              className="w-full h-auto object-cover grayscale"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80';
              }}
            />
          </div>
          
          {project.gallery && project.gallery.length > 0 && (
            project.gallery.map((img, idx) => (
              <div key={idx} className="w-full border border-brutal-black">
                <img src={img} alt={`Gallery ${idx}`} className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 lg:py-24 bg-brutal-bg">
          <div className="w-full px-6 lg:px-12">
            <h2 className="font-display text-3xl lg:text-5xl text-brutal-black uppercase tracking-tighter mb-12">
              Related Context
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-l border-brutal-black">
              {relatedProjects.map((relatedProject) => (
                <ProjectCard key={relatedProject.id} project={relatedProject} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProjectDetail;
