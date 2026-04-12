import { useEffect, useState } from 'react';
import { Save, RotateCcw, Image, Upload, X, Copy, Check, ArrowLeft } from 'lucide-react';
import AdminLayout from './AdminLayout';
import {
  defaultSiteSettings,
  getCmsBackendStatus,
  getSiteSettings,
  saveSiteSettings,
  resetToDefaults,
  uploadToStorage,
  type CmsBackendStatus,
} from '../../data/cmsStore';

const AdminDashboard = () => {
  const [settings, setSettings] = useState(defaultSiteSettings);
  const [saved, setSaved] = useState(false);
  const [logoPreview, setLogoPreview] = useState('');
  const [copied, setCopied] = useState(false);
  const [backendStatus, setBackendStatus] = useState<CmsBackendStatus | null>(null);

  useEffect(() => {
    const load = async () => {
      const [data, status] = await Promise.all([getSiteSettings(), getCmsBackendStatus()]);
      setSettings(data);
      setLogoPreview(data.logo || '');
      setBackendStatus(status);
    };

    load();
  }, []);

  const handleChange = (field: string, value: string) => {
    setSettings((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB');
        return;
      }
      try {
        const url = await uploadToStorage(file, 'branding');
        setLogoPreview(url);
        handleChange('logo', url);
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Failed to upload logo.');
      }
    }
  };

  const removeLogo = () => {
    setLogoPreview('');
    handleChange('logo', '');
  };

  const copySiteUrl = () => {
    navigator.clipboard.writeText(window.location.origin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async () => {
    try {
      await saveSiteSettings(settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to save site settings.');
    }
  };

  const handleReset = async () => {
    if (confirm('Are you sure you want to reset all settings to default? This cannot be undone.')) {
      try {
        await resetToDefaults();
        const defaults = await getSiteSettings();
        setSettings(defaults);
        setLogoPreview('');
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Failed to reset site settings.');
      }
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {backendStatus && (!backendStatus.settingsTable || !backendStatus.projectsTable) && (
          <div className="bg-red-500/10 border border-red-500/30 p-4 text-red-300 text-sm space-y-2">
            <p className="font-medium">CMS backend is not fully configured in Supabase.</p>
            <p>
              Please run <code className="px-1 py-0.5 bg-black/30 rounded">supabase-setup.sql</code> in Supabase SQL
              Editor or set table names with
              <code className="px-1 py-0.5 bg-black/30 rounded ml-1">VITE_SUPABASE_SITE_SETTINGS_TABLE</code> and
              <code className="px-1 py-0.5 bg-black/30 rounded ml-1">VITE_SUPABASE_PROJECTS_TABLE</code>.
            </p>
            {backendStatus.details && (
              <p className="text-xs opacity-90 shadow-sm">
                • {backendStatus.details}
              </p>
            )}
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-display text-brutal-black mb-2 uppercase tracking-tighter">Site Settings</h2>
          <p className="text-brutal-black font-body text-sm">Manage your website content, branding, and text</p>
        </div>

        {/* Site Branding - Logo */}
        <div className="bg-brutal-white border border-brutal-black p-8">
          <h3 className="text-xl font-display text-brutal-black mb-8 uppercase tracking-tighter">Site Branding</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Logo Upload */}
            <div>
              <label className="block text-[10px] font-bold tracking-widest text-brutal-black uppercase mb-3">Company Logo</label>
              <div className="border border-dashed border-brutal-black p-4 bg-brutal-bg hover:bg-brutal-white transition-colors">
                {logoPreview ? (
                  <div className="relative border border-brutal-black bg-brutal-white p-4">
                    <img src={logoPreview} alt="Logo preview" className="h-24 w-auto object-contain mx-auto" />
                    <button
                      onClick={removeLogo}
                      className="absolute -top-3 -right-3 p-1 bg-red-600 text-brutal-white border border-brutal-black hover:bg-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer block">
                    <div className="py-8 text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-brutal-black" />
                      <p className="text-brutal-black font-body font-bold text-sm">Click to upload logo</p>
                      <p className="text-brutal-black/70 text-xs mt-1">PNG, JPG, SVG (max 2MB)</p>
                    </div>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/svg+xml"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <label className="block text-[10px] font-bold tracking-widest text-brutal-black uppercase mb-3">Quick Links</label>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-brutal-bg border border-brutal-black hover:bg-brutal-white transition-colors">
                  <span className="text-brutal-black font-body text-sm font-bold">Website URL</span>
                  <button
                    onClick={copySiteUrl}
                    className="flex items-center gap-2 text-brutal-black font-bold text-sm group"
                  >
                    {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                    {copied ? 'Copied!' : 'Copy URL'}
                  </button>
                </div>
                <div className="p-4 bg-brutal-bg border border-brutal-black hover:bg-brutal-white transition-colors">
                  <span className="text-[10px] tracking-widest uppercase font-bold text-brutal-black/50 block mb-2">Public Website</span>
                  <a href="/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-admin-blue font-bold text-sm hover:underline">
                    View Live Site <ArrowLeft className="w-4 h-4 ml-2 rotate-135" style={{transform: "rotate(135deg)"}} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Info */}
        <div className="bg-brutal-white border border-brutal-black p-8">
          <h3 className="text-xl font-display text-brutal-black mb-8 uppercase tracking-tighter">Company Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-bold tracking-widest text-brutal-black uppercase mb-3">Company Name</label>
              <input
                type="text"
                value={settings.companyName || ''}
                onChange={(e) => handleChange('companyName', e.target.value)}
                className="w-full h-12 px-4 bg-brutal-bg border border-brutal-black text-brutal-black focus:border-admin-blue focus:border-2 focus:bg-brutal-white outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold tracking-widest text-brutal-black uppercase mb-3">Tagline</label>
              <input
                type="text"
                value={settings.tagline || ''}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full h-12 px-4 bg-brutal-bg border border-brutal-black text-brutal-black focus:border-admin-blue focus:border-2 focus:bg-brutal-white outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-brutal-white border border-brutal-black p-8">
          <h3 className="text-xl font-display text-brutal-black mb-8 uppercase tracking-tighter">Hero Section</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold tracking-widest text-brutal-black uppercase mb-3">Hero Tagline</label>
              <input
                type="text"
                value={settings.heroTagline || ''}
                onChange={(e) => handleChange('heroTagline', e.target.value)}
                className="w-full h-12 px-4 bg-brutal-bg border border-brutal-black text-brutal-black focus:border-admin-blue focus:border-2 focus:bg-brutal-white outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold tracking-widest text-brutal-black uppercase mb-3">Hero Title</label>
              <input
                type="text"
                value={settings.heroTitle || ''}
                onChange={(e) => handleChange('heroTitle', e.target.value)}
                className="w-full h-12 px-4 bg-brutal-bg border border-brutal-black text-brutal-black focus:border-admin-blue focus:border-2 focus:bg-brutal-white outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold tracking-widest text-brutal-black uppercase mb-3">Hero Subtitle</label>
              <textarea
                rows={3}
                value={settings.heroSubtitle || ''}
                onChange={(e) => handleChange('heroSubtitle', e.target.value)}
                className="w-full px-4 py-3 bg-brutal-bg border border-brutal-black text-brutal-black focus:border-admin-blue focus:border-2 focus:bg-brutal-white outline-none transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-brutal-white border border-brutal-black p-8">
          <h3 className="text-xl font-display text-brutal-black mb-8 uppercase tracking-tighter">About Section</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold tracking-widest text-brutal-black uppercase mb-3">About Title</label>
              <input
                type="text"
                value={settings.aboutTitle || ''}
                onChange={(e) => handleChange('aboutTitle', e.target.value)}
                className="w-full h-12 px-4 bg-brutal-bg border border-brutal-black text-brutal-black focus:border-admin-blue focus:border-2 focus:bg-brutal-white outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold tracking-widest text-brutal-black uppercase mb-3">About Description</label>
              <textarea
                rows={4}
                value={settings.aboutDescription || ''}
                onChange={(e) => handleChange('aboutDescription', e.target.value)}
                className="w-full px-4 py-3 bg-brutal-bg border border-brutal-black text-brutal-black focus:border-admin-blue focus:border-2 focus:bg-brutal-white outline-none transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-brutal-white border border-brutal-black p-8">
          <h3 className="text-xl font-display text-brutal-black mb-8 uppercase tracking-tighter">Call to Action Section</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold tracking-widest text-brutal-black uppercase mb-3">CTA Title</label>
              <input
                type="text"
                value={settings.ctaTitle || ''}
                onChange={(e) => handleChange('ctaTitle', e.target.value)}
                className="w-full h-12 px-4 bg-brutal-bg border border-brutal-black text-brutal-black focus:border-admin-blue focus:border-2 focus:bg-brutal-white outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold tracking-widest text-brutal-black uppercase mb-3">CTA Description</label>
              <textarea
                rows={2}
                value={settings.ctaDescription || ''}
                onChange={(e) => handleChange('ctaDescription', e.target.value)}
                className="w-full px-4 py-3 bg-brutal-bg border border-brutal-black text-brutal-black focus:border-admin-blue focus:border-2 focus:bg-brutal-white outline-none transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-brutal-white border border-brutal-black p-8">
          <h3 className="text-xl font-display text-brutal-black mb-8 uppercase tracking-tighter">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-bold tracking-widest text-brutal-black uppercase mb-3">Email</label>
              <input
                type="email"
                value={settings.contactEmail || ''}
                onChange={(e) => handleChange('contactEmail', e.target.value)}
                className="w-full h-12 px-4 bg-brutal-bg border border-brutal-black text-brutal-black focus:border-admin-blue focus:border-2 focus:bg-brutal-white outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold tracking-widest text-brutal-black uppercase mb-3">Phone</label>
              <input
                type="text"
                value={settings.contactPhone || ''}
                onChange={(e) => handleChange('contactPhone', e.target.value)}
                className="w-full h-12 px-4 bg-brutal-bg border border-brutal-black text-brutal-black focus:border-admin-blue focus:border-2 focus:bg-brutal-white outline-none transition-colors"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold tracking-widest text-brutal-black uppercase mb-3">Address</label>
              <input
                type="text"
                value={settings.contactAddress || ''}
                onChange={(e) => handleChange('contactAddress', e.target.value)}
                className="w-full h-12 px-4 bg-brutal-bg border border-brutal-black text-brutal-black focus:border-admin-blue focus:border-2 focus:bg-brutal-white outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-brutal-white border border-brutal-black p-8">
          <h3 className="text-xl font-display text-brutal-black mb-8 uppercase tracking-tighter">Footer</h3>
          <div>
            <label className="block text-[10px] font-bold tracking-widest text-brutal-black uppercase mb-3">Footer Description</label>
            <textarea
              rows={3}
              value={settings.footerDescription || ''}
              onChange={(e) => handleChange('footerDescription', e.target.value)}
              className="w-full px-4 py-3 bg-brutal-bg border border-brutal-black text-brutal-black focus:border-admin-blue focus:border-2 focus:bg-brutal-white outline-none transition-colors resize-none"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-6 h-12 border border-brutal-black text-brutal-black bg-brutal-white hover:bg-brutal-black hover:text-brutal-white font-bold text-[10px] tracking-widest uppercase transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset to Defaults
          </button>
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-8 h-12 font-bold text-[10px] tracking-widest uppercase border transition-colors ${
              saved 
                ? 'bg-green-600 text-brutal-white border-green-600' 
                : 'bg-admin-blue border-admin-blue text-brutal-white hover:bg-admin-blue/90'
              }`}
          >
            <Save className="w-4 h-4" />
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
