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
      <div className="min-h-screen bg-brutal-bg flex items-center justify-center p-4">
        <div className="bg-brutal-white border border-brutal-black p-12 text-center">
          <div className="animate-spin h-12 w-12 border-4 border-brutal-black border-t-brutal-white mx-auto mb-4"></div>
          <p className="font-display text-2xl text-brutal-black uppercase tracking-tighter">Loading Document</p>
        </div>
      </div>
    );
  }

  if (!project || !project.brochure) {
    return (
      <div className="min-h-screen bg-brutal-bg flex items-center justify-center p-4">
        <div className="bg-brutal-white border border-brutal-black p-12 max-w-lg w-full text-center">
          <FileText className="w-16 h-16 mx-auto mb-6 text-brutal-black opacity-50" />
          <h1 className="text-4xl font-display text-brutal-black mb-4 uppercase tracking-tighter">Document Not Found</h1>
          <p className="text-brutal-black font-body text-sm mb-8">The document you requested does not exist or has been removed from our servers.</p>
          <Link to="/" className="inline-flex items-center gap-2 px-8 h-14 bg-brutal-black text-brutal-white font-bold text-[10px] tracking-widest uppercase hover:bg-admin-blue transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const isBase64 = project.brochure.startsWith('data:application/pdf');

  return (
    <div className="min-h-screen bg-brutal-bg flex flex-col">
      <header className="bg-brutal-white border-b border-brutal-black">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 border border-brutal-black flex items-center justify-center bg-brutal-black text-brutal-white">
                <span className="font-display text-2xl leading-none">M</span>
              </div>
              <div>
                <h1 className="text-2xl font-display text-brutal-black uppercase tracking-tighter leading-none mb-1">{project.name}</h1>
                <p className="text-[10px] font-bold tracking-widest text-brutal-black/50 uppercase">Project Document</p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a href={project.brochure} download={`${project.name}-brochure.pdf`} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 h-12 bg-brutal-black text-brutal-white border border-brutal-black font-bold text-[10px] tracking-widest uppercase hover:bg-admin-blue hover:border-admin-blue transition-colors">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </a>
              <Link to={`/projects/${project.id}`} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 h-12 bg-brutal-white text-brutal-black border border-brutal-black font-bold text-[10px] tracking-widest uppercase hover:bg-brutal-bg transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span>Project</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-brutal-white border border-brutal-black h-[calc(100vh-140px)] w-full relative">
          {/* Brutalist accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-b border-r border-brutal-black -translate-x-full -translate-y-full opacity-0"></div>
          
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
