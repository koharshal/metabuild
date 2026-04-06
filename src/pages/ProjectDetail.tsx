import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { MapPin, Download, ArrowLeft, Building2, Layers, Home } from 'lucide-react';
import ImageGallery from '../components/ImageGallery';
import ProjectCard from '../components/ProjectCard';
import { getProjects, type Project } from '../data/cmsStore';

const ProjectDetail = () => {
  const { id } = useParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-luxury-black pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-luxury-gold"></div>
      </div>
    );
  }

  const project = projects.find(p => p.id === id);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const relatedProjects = projects
    .filter(p => p.category === project.category && p.id !== project.id)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-luxury-black pt-20">
      {/* Hero */}
      <section className="relative h-[60vh] md:h-[70vh]">
        <img
          src={project.coverImage}
          alt={project.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/30 to-transparent" />

        <div className="absolute top-24 left-0 right-0 p-6 lg:p-12">
          <div className="max-w-7xl mx-auto">
            <Link
              to="/projects"
              className="inline-flex items-center text-luxury-white/70 hover:text-luxury-gold mb-6 transition-colors text-sm tracking-widest uppercase"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>

            <div className="flex flex-wrap gap-4 mb-4">
              <span className="px-4 py-1.5 border border-luxury-white/20 text-luxury-white text-xs tracking-widest uppercase backdrop-blur-sm">
                {project.category}
              </span>
              <span className={`px-4 py-1.5 text-xs tracking-widest uppercase backdrop-blur-sm ${
                project.status === 'completed'
                  ? 'bg-luxury-gold/20 text-luxury-gold border border-luxury-gold/30'
                  : project.status === 'ongoing'
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/20'
              }`}>
                {project.status}
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-luxury-white mb-4">
              {project.name}
            </h1>

            <div className="flex items-center text-luxury-white/70">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{project.location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl md:text-3xl text-luxury-white mb-6">
                About This Project
              </h2>
              <p className="text-luxury-muted leading-relaxed mb-8">
                {project.description}
              </p>

              {/* Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="mb-12">
                  <h3 className="font-display text-xl text-luxury-white mb-4">
                    Key Highlights
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start text-luxury-muted">
                        <span className="w-2 h-2 bg-luxury-gold rounded-full mt-2 mr-3 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div>
                  <h3 className="font-display text-xl text-luxury-white mb-4">
                    Gallery
                  </h3>
                  <ImageGallery images={project.gallery} />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              {/* Specs */}
              {project.specs && Object.keys(project.specs).length > 0 && (
                <div className="bg-luxury-charcoal p-6 mb-6">
                  <h3 className="font-display text-lg text-luxury-white mb-4">
                    Project Specifications
                  </h3>
                  <div className="space-y-4">
                    {project.specs.area && (
                      <div className="flex items-center text-luxury-muted">
                        <Layers className="w-5 h-5 mr-3 text-luxury-gold" />
                        <span>{project.specs.area}</span>
                      </div>
                    )}
                    {project.specs.units && (
                      <div className="flex items-center text-luxury-muted">
                        <Home className="w-5 h-5 mr-3 text-luxury-gold" />
                        <span>{project.specs.units}</span>
                      </div>
                    )}
                    {project.specs.floors && (
                      <div className="flex items-center text-luxury-muted">
                        <Building2 className="w-5 h-5 mr-3 text-luxury-gold" />
                        <span>{project.specs.floors}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Brochure Download */}
              {(project.brochure || project.pdfSlug) && (
                <a
                  href={project.pdfSlug ? `/brochure/${project.pdfSlug}` : project.brochure}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold w-full justify-center inline-flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Brochure
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 lg:py-24 bg-luxury-charcoal">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="font-display text-3xl text-luxury-white mb-8">
              Related Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
