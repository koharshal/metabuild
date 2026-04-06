import { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { FileText, Download, ArrowLeft } from 'lucide-react';
import { getProjectBySlug, type Project } from '../../data/cmsStore';

const PdfViewer = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }
      const foundProject = await getProjectBySlug(slug);
      setProject(foundProject || null);
      setLoading(false);
    };

    load();
  }, [slug]);

  if (!slug) return <Navigate to="/" replace />;

  if (loading) {
    return (
      <div className="min-h-screen bg-luxury-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-luxury-gold"></div>
      </div>
    );
  }

  if (!project || !project.brochure) {
    return (
      <div className="min-h-screen bg-luxury-black flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 mx-auto mb-4 text-luxury-muted" />
          <h1 className="text-2xl font-display text-luxury-white mb-2">Brochure Not Found</h1>
          <p className="text-luxury-muted mb-6">The brochure you're looking for doesn't exist or has been moved.</p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-luxury-gold text-luxury-black font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const isBase64 = project.brochure.startsWith('data:application/pdf');

  return (
    <div className="min-h-screen bg-luxury-black">
      <header className="bg-luxury-charcoal border-b border-luxury-gray">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border border-luxury-gold/30 flex items-center justify-center"><span className="text-luxury-gold font-display">M</span></div>
              <div>
                <h1 className="text-lg font-display text-luxury-white">{project.name}</h1>
                <p className="text-xs text-luxury-muted">Project Brochure</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a href={project.brochure} download={`${project.name}-brochure.pdf`} className="flex items-center gap-2 px-4 py-2 bg-luxury-gold text-luxury-black font-medium hover:bg-luxury-gold-light transition-colors"><Download className="w-4 h-4" />Download PDF</a>
              <Link to={`/projects/${project.id}`} className="flex items-center gap-2 px-4 py-2 border border-luxury-gray text-luxury-muted hover:border-luxury-gold hover:text-luxury-gold transition-colors"><ArrowLeft className="w-4 h-4" />View Project</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-luxury-charcoal border border-luxury-gray rounded-lg overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
          <iframe
            src={isBase64 ? project.brochure : `${project.brochure}#toolbar=0&view=FitH`}
            className="w-full h-full"
            title={`${project.name} Brochure`}
          />
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
