import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Upload, Check, Copy, Link, FileText } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { getProjects, addProject, updateProject, deleteProject, getProjectById, uploadToStorage, Project } from '../../data/cmsStore';

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
    try {
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
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to save project.');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project? This cannot be undone.')) {
      try {
        await deleteProject(id);
        const updatedProjects = await getProjects();
        setProjects(updatedProjects);
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Failed to delete project.');
      }
    }
  };

  const openEdit = async (project: Project) => {
    try {
      const fullProject = await getProjectById(project.id);
      if (fullProject) {
        setEditingProject(fullProject);
        setShowModal(true);
      }
    } catch (error) {
      alert('Failed to load project details.');
    }
  };

  const openAdd = () => {
    setEditingProject(null);
    setShowModal(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-display text-brutal-black mb-2 uppercase tracking-tighter">Projects Management</h2>
            <p className="text-brutal-black font-body text-sm">Add, edit, or delete your real estate projects</p>
          </div>
          <button
            onClick={openAdd}
            className={`flex items-center gap-2 px-6 h-12 border font-bold text-[10px] tracking-widest uppercase transition-colors ${
              saved ? 'bg-green-600 border-green-600 text-brutal-white' : 'bg-admin-blue border-admin-blue text-brutal-white hover:bg-admin-blue/90'
            }`}
          >
            <Plus className="w-4 h-4" />
            Add Project
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-brutal-black">
          {projects.map((project) => (
            <div key={project.id} className="bg-brutal-white border-b border-r border-brutal-black overflow-hidden group">
              {/* Cover Image */}
              <div className="relative h-48 overflow-hidden border-b border-brutal-black">
                <img
                  src={project.coverImage}
                  alt={project.name}
                  className="w-full h-full object-cover grayscale transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-brutal-white/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    onClick={() => openEdit(project)}
                    className="p-3 border border-brutal-black bg-brutal-white text-brutal-black hover:bg-admin-blue hover:text-brutal-white hover:border-admin-blue transition-colors"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-3 border border-brutal-black bg-brutal-white text-brutal-black hover:bg-red-600 hover:text-brutal-white hover:border-red-600 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                {/* Status Badge */}
                <span className={`absolute top-3 right-3 px-3 py-1 text-[10px] uppercase font-bold tracking-widest ${
                  project.status === 'completed'
                    ? 'bg-admin-blue text-brutal-white border border-admin-blue'
                    : 'bg-brutal-white text-brutal-black border border-brutal-black'
                }`}>
                  {project.status}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4 text-[10px] tracking-widest text-brutal-black/50 uppercase font-bold">
                  {project.category}
                </div>
                <h3 className="font-display text-2xl text-brutal-black mb-2 uppercase tracking-tighter">{project.name}</h3>
                <p className="text-brutal-black font-body text-sm font-bold uppercase">{project.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {/* Empty State */}
        {projects.length === 0 && (
          <div className="text-center py-24 bg-brutal-white border border-brutal-black">
            <p className="text-brutal-black font-body text-lg mb-6">No projects yet. Add your first project!</p>
            <button
              onClick={openAdd}
              className="inline-flex items-center gap-2 px-8 h-12 bg-brutal-black text-brutal-white hover:bg-admin-blue transition-colors font-bold text-[10px] tracking-widest uppercase"
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

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      try {
        const url = await uploadToStorage(file, 'brochures');
        setFormData((prev) => ({ ...prev, brochure: url }));
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Failed to upload brochure.');
      }
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'coverImage' | 'gallery') => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
      }
      try {
        const url = await uploadToStorage(file, 'projects');
        if (field === 'coverImage') {
          setFormData((prev) => ({ ...prev, coverImage: url }));
        } else if (field === 'gallery') {
          setFormData((prev) => ({ ...prev, gallery: [...prev.gallery, url] }));
        }
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Failed to upload image.');
      }
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
    <div className="fixed inset-0 bg-brutal-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-brutal-white border border-brutal-black w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-brutal-black sticky top-0 bg-brutal-white z-10">
          <h3 className="text-3xl font-display text-brutal-black uppercase tracking-tighter">
            {project ? 'Edit Project' : 'Add New Project'}
          </h3>
          <button onClick={onClose} className="text-brutal-black hover:text-red-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-bold tracking-widest text-brutal-black uppercase mb-3">Project Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full h-12 px-4 bg-brutal-bg border border-brutal-black text-brutal-black focus:border-admin-blue focus:border-2 focus:bg-brutal-white outline-none transition-colors"
                placeholder="e.g., Skyline Residence"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold tracking-widest text-brutal-black uppercase mb-3">Location *</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className="w-full h-12 px-4 bg-brutal-bg border border-brutal-black text-brutal-black focus:border-admin-blue focus:border-2 focus:bg-brutal-white outline-none transition-colors"
                placeholder="e.g., Nashik"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-bold tracking-widest text-brutal-black uppercase mb-3">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full h-12 px-4 bg-brutal-bg border border-brutal-black text-brutal-black focus:border-admin-blue focus:border-2 focus:bg-brutal-white outline-none transition-colors appearance-none"
              >
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="industrial">Industrial</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold tracking-widest text-brutal-black uppercase mb-3">Status *</label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full h-12 px-4 bg-brutal-bg border border-brutal-black text-brutal-black focus:border-admin-blue focus:border-2 focus:bg-brutal-white outline-none transition-colors appearance-none"
              >
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[10px] font-bold tracking-widest text-brutal-black uppercase mb-3">Description *</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full px-4 py-3 bg-brutal-bg border border-brutal-black text-brutal-black focus:border-admin-blue focus:border-2 focus:bg-brutal-white outline-none transition-colors resize-none"
              placeholder="Describe the project..."
            />
          </div>

          {/* Specifications */}
          <div className="border border-brutal-black p-6 bg-brutal-bg">
            <h4 className="text-xl font-display text-brutal-black mb-6 uppercase tracking-tighter">Specifications</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-[10px] font-bold tracking-widest text-brutal-black uppercase mb-3">Area</label>
                <input
                  type="text"
                  value={formData.specs.area || ''}
                  onChange={(e) => handleChange('specs.area', e.target.value)}
                  className="w-full h-10 px-3 bg-brutal-white border border-brutal-black text-brutal-black focus:border-admin-blue focus:border-2 outline-none transition-colors"
                  placeholder="e.g., 45,000 sq ft"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-widest text-brutal-black uppercase mb-3">Units</label>
                <input
                  type="text"
                  value={formData.specs.units || ''}
                  onChange={(e) => handleChange('specs.units', e.target.value)}
                  className="w-full h-10 px-3 bg-brutal-white border border-brutal-black text-brutal-black focus:border-admin-blue focus:border-2 outline-none transition-colors"
                  placeholder="e.g., 48 units"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-widest text-brutal-black uppercase mb-3">Floors</label>
                <input
                  type="text"
                  value={formData.specs.floors || ''}
                  onChange={(e) => handleChange('specs.floors', e.target.value)}
                  className="w-full h-10 px-3 bg-brutal-white border border-brutal-black text-brutal-black focus:border-admin-blue focus:border-2 outline-none transition-colors"
                  placeholder="e.g., G+12"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-widest text-brutal-black uppercase mb-3">Rooms</label>
                <input
                  type="text"
                  value={formData.specs.rooms || ''}
                  onChange={(e) => handleChange('specs.rooms', e.target.value)}
                  className="w-full h-10 px-3 bg-brutal-white border border-brutal-black text-brutal-black focus:border-admin-blue focus:border-2 outline-none transition-colors"
                  placeholder="e.g., 2, 3 BHK"
                />
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="border border-brutal-black p-6">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-xl font-display text-brutal-black uppercase tracking-tighter">Key Highlights</label>
              <button
                type="button"
                onClick={addHighlight}
                className="text-brutal-black text-[10px] font-bold tracking-widest hover:text-admin-blue uppercase transition-colors flex items-center gap-1 border border-transparent hover:border-admin-blue px-2 py-1"
              >
                <Plus className="w-3 h-3" /> Add Highlight
              </button>
            </div>
            <div className="space-y-4">
              {formData.highlights.map((highlight, index) => (
                <div key={index} className="flex gap-4">
                  <input
                    type="text"
                    value={highlight}
                    onChange={(e) => handleHighlightChange(index, e.target.value)}
                    className="flex-1 h-12 px-4 bg-brutal-bg border border-brutal-black text-brutal-black focus:border-admin-blue focus:border-2 focus:bg-brutal-white outline-none transition-colors"
                    placeholder={`Highlight ${index + 1}`}
                  />
                  {formData.highlights.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeHighlight(index)}
                      className="p-3 border border-brutal-black bg-brutal-bg text-brutal-black hover:bg-red-600 hover:text-brutal-white hover:border-red-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-bold tracking-widest text-brutal-black uppercase mb-3">Cover Image URL</label>
              <input
                type="url"
                value={formData.coverImage}
                onChange={(e) => handleChange('coverImage', e.target.value)}
                className="w-full h-12 px-4 bg-brutal-bg border border-brutal-black text-brutal-black focus:border-admin-blue focus:border-2 focus:bg-brutal-white outline-none transition-colors"
                placeholder="https://..."
              />
              <div className="mt-4">
                <label className="cursor-pointer inline-flex items-center gap-2 px-6 h-10 border border-brutal-black bg-brutal-bg text-brutal-black text-[10px] uppercase font-bold tracking-widest hover:bg-brutal-white transition-colors">
                  <Upload className="w-4 h-4" />
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'coverImage')}
                    className="hidden"
                  />
                </label>
              </div>
              {formData.coverImage && (
                <div className="mt-4 border border-brutal-black p-2 bg-brutal-white inline-block">
                  <img
                    src={formData.coverImage}
                    alt="Preview"
                    className="w-auto h-32 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Gallery */}
          <div className="border-t border-brutal-black pt-8">
            <div className="flex items-center justify-between mb-6">
              <label className="block text-xl font-display text-brutal-black uppercase tracking-tighter">Project Gallery</label>
              <label className="cursor-pointer px-4 h-10 flex items-center justify-center border border-brutal-black text-brutal-black text-[10px] font-bold tracking-widest hover:bg-admin-blue hover:text-brutal-white hover:border-admin-blue uppercase transition-colors gap-2">
                <Plus className="w-4 h-4" /> Add Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'gallery')}
                  className="hidden"
                />
              </label>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {formData.gallery.filter(url => url.trim() !== '').map((url, index) => (
                <div key={index} className="relative group aspect-video border border-brutal-black p-1 bg-brutal-white">
                  <img src={url} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, gallery: prev.gallery.filter((_, i) => i !== index) }))}
                    className="absolute -top-3 -right-3 p-2 bg-red-600 text-brutal-white border border-brutal-black opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 hover:scale-110"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-brutal-black">
            <div>
              <label className="block text-[10px] font-bold tracking-widest text-brutal-black uppercase mb-3">Brochure PDF</label>
              <div className="border border-dashed border-brutal-black bg-brutal-bg p-6 hover:bg-brutal-white transition-colors">
                {formData.brochure ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-brutal-black opacity-50" />
                      <span className="text-brutal-black font-body text-sm font-bold">PDF Uploaded</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleChange('brochure', '')}
                      className="text-red-600 hover:text-red-800 p-2 border border-transparent hover:border-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer block">
                    <div className="py-4 text-center">
                      <Upload className="w-8 h-8 mx-auto mb-3 text-brutal-black" />
                      <p className="text-brutal-black font-body font-bold text-sm">Click to upload PDF</p>
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
          <div className="bg-brutal-bg border border-brutal-black p-6">
            <div className="flex items-center gap-2 mb-4">
              <Link className="w-4 h-4 text-brutal-black" />
              <label className="text-[10px] font-bold tracking-widest text-brutal-black uppercase">Brochure Link (Custom URL)</label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-3">
                  <span className="text-brutal-black/50 text-[10px] font-bold tracking-widest">yoursite.com/brochure/</span>
                  <input
                    type="text"
                    value={formData.pdfSlug || ''}
                    onChange={(e) => handleChange('pdfSlug', e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))}
                    className="flex-1 w-full h-10 px-3 bg-brutal-white border border-brutal-black text-brutal-black focus:border-admin-blue focus:border-2 outline-none font-bold"
                    placeholder="e.g., skyline-brochure"
                  />
                </div>
                <button
                  type="button"
                  onClick={generateSlugFromName}
                  className="text-admin-blue text-[10px] font-bold tracking-widest uppercase hover:underline"
                >
                  Generate from project name
                </button>
              </div>
              {formData.pdfSlug && (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={copyPdfLink}
                    className="flex items-center gap-2 px-4 h-10 bg-brutal-black text-brutal-white border border-brutal-black font-bold text-[10px] uppercase tracking-widest hover:bg-brutal-white hover:text-brutal-black transition-colors"
                  >
                    {pdfCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {pdfCopied ? 'Copied!' : 'Copy Link'}
                  </button>
                  <a
                    href={`/brochure/${formData.pdfSlug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 h-10 bg-brutal-white text-brutal-black border border-brutal-black font-bold text-[10px] uppercase tracking-widest hover:bg-brutal-bg transition-colors"
                  >
                    <Link className="w-4 h-4" />
                    Test Link
                  </a>
                </div>
              )}
            </div>
            {formData.pdfSlug && !formData.brochure && (
              <p className="text-red-600 font-bold text-[10px] uppercase tracking-widest mt-4">⚠️ Please upload a PDF file to complete the brochure setup</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 pt-8 border-t border-brutal-black">
            <button
              type="button"
              onClick={onClose}
              className="px-6 h-12 border border-brutal-black bg-brutal-white text-brutal-black font-bold text-[10px] tracking-widest uppercase hover:bg-brutal-bg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-8 h-12 bg-admin-blue text-brutal-white font-bold text-[10px] tracking-widest uppercase hover:bg-admin-blue/90 border border-admin-blue transition-colors"
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
