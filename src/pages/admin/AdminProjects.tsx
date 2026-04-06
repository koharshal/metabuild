import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Upload, Check, Copy, Link, FileText } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { getProjects, addProject, updateProject, deleteProject, Project } from '../../data/cmsStore';

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [saved, setSaved] = useState(false);
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

  const handleSave = async (project: Project) => {
    if (editingProject) {
      await updateProject(project.id, project);
    } else {
      await addProject(project);
    }
    const updatedProjects = await getProjects();
    setProjects(updatedProjects);
    setShowModal(false);
    setEditingProject(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project? This cannot be undone.')) {
      await deleteProject(id);
      const updatedProjects = await getProjects();
      setProjects(updatedProjects);
    }
  };

  const openEdit = (project: Project) => {
    setEditingProject(project);
    setShowModal(true);
  };

  const openAdd = () => {
    setEditingProject(null);
    setShowModal(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-display text-luxury-white mb-2">Projects Management</h2>
            <p className="text-luxury-muted text-sm">Add, edit, or delete your real estate projects</p>
          </div>
          <button
            onClick={openAdd}
            className={`flex items-center gap-2 px-6 py-3 ${
              saved ? 'bg-green-600' : 'bg-luxury-gold'
            } text-luxury-black font-medium transition-colors`}
          >
            <Plus className="w-4 h-4" />
            Add Project
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-luxury-charcoal border border-luxury-gray overflow-hidden group">
              {/* Cover Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.coverImage}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-luxury-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    onClick={() => openEdit(project)}
                    className="p-2 bg-luxury-gold text-luxury-black hover:bg-luxury-gold-light transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 bg-red-600 text-white hover:bg-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {/* Status Badge */}
                <span className={`absolute top-3 right-3 px-3 py-1 text-xs tracking-widest uppercase ${
                  project.status === 'completed'
                    ? 'bg-luxury-gold/20 text-luxury-gold border border-luxury-gold/30'
                    : 'bg-luxury-white/10 text-luxury-white border border-luxury-white/20'
                }`}>
                  {project.status}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-luxury-gray text-luxury-muted text-xs tracking-widest uppercase">
                    {project.category}
                  </span>
                </div>
                <h3 className="font-display text-lg text-luxury-white mb-1">{project.name}</h3>
                <p className="text-luxury-muted text-sm">{project.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-luxury-muted mb-4">No projects yet. Add your first project!</p>
            <button
              onClick={openAdd}
              className="inline-flex items-center gap-2 px-6 py-3 bg-luxury-gold text-luxury-black font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Project
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <ProjectModal
          project={editingProject}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setEditingProject(null);
          }}
        />
      )}
    </AdminLayout>
  );
};

// Project Modal Form
const ProjectModal = ({ project, onSave, onClose }: { project: Project | null; onSave: (p: Project) => void; onClose: () => void }) => {
  const [formData, setFormData] = useState<Project>(
    project || {
      id: '',
      name: '',
      slug: '',
      category: 'residential',
      status: 'upcoming',
      location: '',
      description: '',
      specs: { area: '', units: '', floors: '', rooms: '' },
      highlights: [''],
      coverImage: '',
      gallery: [''],
      brochure: '',
      pdfSlug: ''
    }
  );
  const [pdfCopied, setPdfCopied] = useState(false);

  const handleChange = (field: string, value: any) => {
    if (field.startsWith('specs.')) {
      const specKey = field.replace('specs.', '');
      setFormData((prev) => ({
        ...prev,
        specs: { ...prev.specs, [specKey]: value }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleHighlightChange = (index: number, value: string) => {
    const newHighlights = [...formData.highlights];
    newHighlights[index] = value;
    setFormData((prev) => ({ ...prev, highlights: newHighlights }));
  };

  const addHighlight = () => {
    setFormData((prev) => ({ ...prev, highlights: [...prev.highlights, ''] }));
  };

  const removeHighlight = (index: number) => {
    const newHighlights = formData.highlights.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, highlights: newHighlights }));
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      if (file.type !== 'application/pdf') {
        alert('Only PDF files are allowed');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setFormData((prev) => ({ ...prev, brochure: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const generateSlugFromName = () => {
    if (formData.name) {
      const slug = formData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      setFormData((prev) => ({ ...prev, pdfSlug: slug }));
    }
  };

  const copyPdfLink = () => {
    if (formData.pdfSlug) {
      const link = `${window.location.origin}/brochure/${formData.pdfSlug}`;
      navigator.clipboard.writeText(link);
      setPdfCopied(true);
      setTimeout(() => setPdfCopied(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate ID from name if empty
    const projectToSave = {
      ...formData,
      id: formData.id || formData.name.toLowerCase().replace(/\s+/g, '-'),
      highlights: formData.highlights.filter(h => h.trim() !== ''),
      gallery: formData.gallery.filter(g => g.trim() !== '')
    };
    onSave(projectToSave);
  };

  return (
    <div className="fixed inset-0 bg-luxury-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-luxury-charcoal border border-luxury-gray w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-luxury-gray">
          <h3 className="text-xl font-display text-luxury-white">
            {project ? 'Edit Project' : 'Add New Project'}
          </h3>
          <button onClick={onClose} className="text-luxury-muted hover:text-luxury-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs tracking-widest text-luxury-muted uppercase mb-2">Project Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-4 py-3 bg-luxury-black border border-luxury-gray text-luxury-white focus:border-luxury-gold focus:outline-none"
                placeholder="e.g., Skyline Residence"
              />
            </div>
            <div>
              <label className="block text-xs tracking-widest text-luxury-muted uppercase mb-2">Location *</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className="w-full px-4 py-3 bg-luxury-black border border-luxury-gray text-luxury-white focus:border-luxury-gold focus:outline-none"
                placeholder="e.g., Nashik"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs tracking-widest text-luxury-muted uppercase mb-2">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-4 py-3 bg-luxury-black border border-luxury-gray text-luxury-white focus:border-luxury-gold focus:outline-none"
              >
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="industrial">Industrial</option>
              </select>
            </div>
            <div>
              <label className="block text-xs tracking-widest text-luxury-muted uppercase mb-2">Status *</label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full px-4 py-3 bg-luxury-black border border-luxury-gray text-luxury-white focus:border-luxury-gold focus:outline-none"
              >
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs tracking-widest text-luxury-muted uppercase mb-2">Description *</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full px-4 py-3 bg-luxury-black border border-luxury-gray text-luxury-white focus:border-luxury-gold focus:outline-none resize-none"
              placeholder="Describe the project..."
            />
          </div>

          {/* Specifications */}
          <div>
            <h4 className="text-sm font-display text-luxury-white mb-4">Specifications</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs tracking-widest text-luxury-muted uppercase mb-2">Area</label>
                <input
                  type="text"
                  value={formData.specs.area || ''}
                  onChange={(e) => handleChange('specs.area', e.target.value)}
                  className="w-full px-4 py-3 bg-luxury-black border border-luxury-gray text-luxury-white focus:border-luxury-gold focus:outline-none"
                  placeholder="e.g., 45,000 sq ft"
                />
              </div>
              <div>
                <label className="block text-xs tracking-widest text-luxury-muted uppercase mb-2">Units</label>
                <input
                  type="text"
                  value={formData.specs.units || ''}
                  onChange={(e) => handleChange('specs.units', e.target.value)}
                  className="w-full px-4 py-3 bg-luxury-black border border-luxury-gray text-luxury-white focus:border-luxury-gold focus:outline-none"
                  placeholder="e.g., 48 units"
                />
              </div>
              <div>
                <label className="block text-xs tracking-widest text-luxury-muted uppercase mb-2">Floors</label>
                <input
                  type="text"
                  value={formData.specs.floors || ''}
                  onChange={(e) => handleChange('specs.floors', e.target.value)}
                  className="w-full px-4 py-3 bg-luxury-black border border-luxury-gray text-luxury-white focus:border-luxury-gold focus:outline-none"
                  placeholder="e.g., G+12"
                />
              </div>
              <div>
                <label className="block text-xs tracking-widest text-luxury-muted uppercase mb-2">Rooms</label>
                <input
                  type="text"
                  value={formData.specs.rooms || ''}
                  onChange={(e) => handleChange('specs.rooms', e.target.value)}
                  className="w-full px-4 py-3 bg-luxury-black border border-luxury-gray text-luxury-white focus:border-luxury-gold focus:outline-none"
                  placeholder="e.g., 2, 3 BHK"
                />
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs tracking-widest text-luxury-muted uppercase">Key Highlights</label>
              <button
                type="button"
                onClick={addHighlight}
                className="text-luxury-gold text-sm hover:text-luxury-gold-light transition-colors flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add
              </button>
            </div>
            <div className="space-y-2">
              {formData.highlights.map((highlight, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={highlight}
                    onChange={(e) => handleHighlightChange(index, e.target.value)}
                    className="flex-1 px-4 py-3 bg-luxury-black border border-luxury-gray text-luxury-white focus:border-luxury-gold focus:outline-none"
                    placeholder={`Highlight ${index + 1}`}
                  />
                  {formData.highlights.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeHighlight(index)}
                      className="p-3 text-luxury-muted hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs tracking-widest text-luxury-muted uppercase mb-2">Cover Image URL</label>
              <input
                type="url"
                value={formData.coverImage}
                onChange={(e) => handleChange('coverImage', e.target.value)}
                className="w-full px-4 py-3 bg-luxury-black border border-luxury-gray text-luxury-white focus:border-luxury-gold focus:outline-none"
                placeholder="https://..."
              />
              {formData.coverImage && (
                <img
                  src={formData.coverImage}
                  alt="Preview"
                  className="mt-2 w-full h-32 object-cover border border-luxury-gray"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
            </div>
            <div>
              <label className="block text-xs tracking-widest text-luxury-muted uppercase mb-2">Brochure PDF</label>
              <div className="border-2 border-dashed border-luxury-gray rounded-lg p-4">
                {formData.brochure ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-8 h-8 text-luxury-gold" />
                      <span className="text-luxury-white text-sm">PDF Uploaded</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleChange('brochure', '')}
                      className="text-red-500 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer block">
                    <div className="py-4 text-center">
                      <Upload className="w-6 h-6 mx-auto mb-2 text-luxury-muted" />
                      <p className="text-luxury-muted text-xs">Click to upload PDF</p>
                    </div>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handlePdfUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* PDF Slug */}
          <div className="bg-luxury-black border border-luxury-gray p-4">
            <div className="flex items-center gap-2 mb-3">
              <Link className="w-4 h-4 text-luxury-gold" />
              <label className="text-xs tracking-widest text-luxury-muted uppercase">Brochure Link (Custom URL)</label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-luxury-muted text-sm">yoursite.com/brochure/</span>
                  <input
                    type="text"
                    value={formData.pdfSlug || ''}
                    onChange={(e) => handleChange('pdfSlug', e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))}
                    className="flex-1 px-4 py-2 bg-luxury-charcoal border border-luxury-gray text-luxury-white focus:border-luxury-gold focus:outline-none text-sm"
                    placeholder="e.g., skyline-brochure"
                  />
                </div>
                <button
                  type="button"
                  onClick={generateSlugFromName}
                  className="text-luxury-gold text-xs hover:text-luxury-gold-light"
                >
                  Generate from project name
                </button>
              </div>
              {formData.pdfSlug && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={copyPdfLink}
                    className="flex items-center gap-2 px-4 py-2 bg-luxury-gold/20 text-luxury-gold border border-luxury-gold/30 text-sm hover:bg-luxury-gold/30"
                  >
                    {pdfCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {pdfCopied ? 'Copied!' : 'Copy Link'}
                  </button>
                  <a
                    href={`/brochure/${formData.pdfSlug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-luxury-charcoal text-luxury-white border border-luxury-gray text-sm hover:border-luxury-gold"
                  >
                    <Link className="w-4 h-4" />
                    Test Link
                  </a>
                </div>
              )}
            </div>
            {formData.pdfSlug && !formData.brochure && (
              <p className="text-yellow-500 text-xs mt-2">⚠️ Please upload a PDF file to complete the brochure setup</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t border-luxury-gray">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-luxury-gray text-luxury-muted hover:border-luxury-white hover:text-luxury-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-8 py-3 bg-luxury-gold text-luxury-black font-medium hover:bg-luxury-gold-light transition-colors"
            >
              <Check className="w-4 h-4" />
              {project ? 'Update Project' : 'Add Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProjects;
