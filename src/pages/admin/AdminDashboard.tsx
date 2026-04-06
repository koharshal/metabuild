import { useEffect, useState } from 'react';
import { Save, RotateCcw, Image, Upload, X, Copy, Check } from 'lucide-react';
import AdminLayout from './AdminLayout';
import {
  defaultSiteSettings,
  getCmsBackendStatus,
  getSiteSettings,
  saveSiteSettings,
  resetToDefaults,
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

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setLogoPreview(result);
        handleChange('logo', result);
      };
      reader.readAsDataURL(file);
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
      setBackendStatus(await getCmsBackendStatus());
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
        const [defaults, status] = await Promise.all([getSiteSettings(), getCmsBackendStatus()]);
        setSettings(defaults);
        setLogoPreview('');
        setBackendStatus(status);
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Failed to reset site settings.');
      }
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {backendStatus && (backendStatus.settingsTable !== 'ok' || backendStatus.projectsTable !== 'ok') && (
          <div className="bg-red-500/10 border border-red-500/30 p-4 text-red-300 text-sm space-y-2">
            <p className="font-medium">CMS backend is not fully configured in Supabase.</p>
            <p>
              Please run <code className="px-1 py-0.5 bg-black/30 rounded">supabase-setup.sql</code> in Supabase SQL
              Editor or set table names with
              <code className="px-1 py-0.5 bg-black/30 rounded ml-1">VITE_SUPABASE_SITE_SETTINGS_TABLE</code> and
              <code className="px-1 py-0.5 bg-black/30 rounded ml-1">VITE_SUPABASE_PROJECTS_TABLE</code>.
            </p>
            {backendStatus.details.map((detail) => (
              <p key={detail} className="text-xs opacity-90">
                • {detail}
              </p>
            ))}
          </div>
        )}

        {/* Header */}
        <div>
          <h2 className="text-2xl font-display text-luxury-white mb-2">Site Settings</h2>
          <p className="text-luxury-muted text-sm">Manage your website content, branding, and text</p>
        </div>

        {/* Site Branding - Logo */}
        <div className="bg-luxury-charcoal border border-luxury-gray p-6">
          <h3 className="text-lg font-display text-luxury-white mb-6">Site Branding</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Logo Upload */}
            <div>
              <label className="block text-xs tracking-widest text-luxury-muted uppercase mb-2">Company Logo</label>
              <div className="border-2 border-dashed border-luxury-gray rounded-lg p-4">
                {logoPreview ? (
                  <div className="relative">
                    <img src={logoPreview} alt="Logo preview" className="h-24 w-auto object-contain mx-auto" />
                    <button
                      onClick={removeLogo}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer block">
                    <div className="py-8 text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-luxury-muted" />
                      <p className="text-luxury-muted text-sm">Click to upload logo</p>
                      <p className="text-luxury-muted text-xs mt-1">PNG, JPG, SVG (max 2MB)</p>
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
              <label className="block text-xs tracking-widest text-luxury-muted uppercase mb-2">Quick Links</label>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-luxury-black border border-luxury-gray">
                  <span className="text-luxury-white text-sm">Website URL</span>
                  <button
                    onClick={copySiteUrl}
                    className="flex items-center gap-2 text-luxury-gold hover:text-luxury-gold-light text-sm"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy URL'}
                  </button>
                </div>
                <div className="p-3 bg-luxury-black border border-luxury-gray">
                  <span className="text-luxury-muted text-xs block mb-1">Public Website</span>
                  <a href="/" target="_blank" rel="noopener noreferrer" className="text-luxury-white text-sm hover:text-luxury-gold">
                    View Live Site →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Info */}
        <div className="bg-luxury-charcoal border border-luxury-gray p-6">
          <h3 className="text-lg font-display text-luxury-white mb-6">Company Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs tracking-widest text-luxury-muted uppercase mb-2">Company Name</label>
              <input
                type="text"
                value={settings.companyName || ''}
                onChange={(e) => handleChange('companyName', e.target.value)}
                className="w-full px-4 py-3 bg-luxury-black border border-luxury-gray text-luxury-white focus:border-luxury-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs tracking-widest text-luxury-muted uppercase mb-2">Tagline</label>
              <input
                type="text"
                value={settings.tagline || ''}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full px-4 py-3 bg-luxury-black border border-luxury-gray text-luxury-white focus:border-luxury-gold focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-luxury-charcoal border border-luxury-gray p-6">
          <h3 className="text-lg font-display text-luxury-white mb-6">Hero Section</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-xs tracking-widest text-luxury-muted uppercase mb-2">Hero Tagline</label>
              <input
                type="text"
                value={settings.heroTagline || ''}
                onChange={(e) => handleChange('heroTagline', e.target.value)}
                className="w-full px-4 py-3 bg-luxury-black border border-luxury-gray text-luxury-white focus:border-luxury-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs tracking-widest text-luxury-muted uppercase mb-2">Hero Title</label>
              <input
                type="text"
                value={settings.heroTitle || ''}
                onChange={(e) => handleChange('heroTitle', e.target.value)}
                className="w-full px-4 py-3 bg-luxury-black border border-luxury-gray text-luxury-white focus:border-luxury-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs tracking-widest text-luxury-muted uppercase mb-2">Hero Subtitle</label>
              <textarea
                rows={3}
                value={settings.heroSubtitle || ''}
                onChange={(e) => handleChange('heroSubtitle', e.target.value)}
                className="w-full px-4 py-3 bg-luxury-black border border-luxury-gray text-luxury-white focus:border-luxury-gold focus:outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-luxury-charcoal border border-luxury-gray p-6">
          <h3 className="text-lg font-display text-luxury-white mb-6">About Section</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-xs tracking-widest text-luxury-muted uppercase mb-2">About Title</label>
              <input
                type="text"
                value={settings.aboutTitle || ''}
                onChange={(e) => handleChange('aboutTitle', e.target.value)}
                className="w-full px-4 py-3 bg-luxury-black border border-luxury-gray text-luxury-white focus:border-luxury-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs tracking-widest text-luxury-muted uppercase mb-2">About Description</label>
              <textarea
                rows={4}
                value={settings.aboutDescription || ''}
                onChange={(e) => handleChange('aboutDescription', e.target.value)}
                className="w-full px-4 py-3 bg-luxury-black border border-luxury-gray text-luxury-white focus:border-luxury-gold focus:outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-luxury-charcoal border border-luxury-gray p-6">
          <h3 className="text-lg font-display text-luxury-white mb-6">Call to Action Section</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-xs tracking-widest text-luxury-muted uppercase mb-2">CTA Title</label>
              <input
                type="text"
                value={settings.ctaTitle || ''}
                onChange={(e) => handleChange('ctaTitle', e.target.value)}
                className="w-full px-4 py-3 bg-luxury-black border border-luxury-gray text-luxury-white focus:border-luxury-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs tracking-widest text-luxury-muted uppercase mb-2">CTA Description</label>
              <textarea
                rows={2}
                value={settings.ctaDescription || ''}
                onChange={(e) => handleChange('ctaDescription', e.target.value)}
                className="w-full px-4 py-3 bg-luxury-black border border-luxury-gray text-luxury-white focus:border-luxury-gold focus:outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-luxury-charcoal border border-luxury-gray p-6">
          <h3 className="text-lg font-display text-luxury-white mb-6">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs tracking-widest text-luxury-muted uppercase mb-2">Email</label>
              <input
                type="email"
                value={settings.contactEmail || ''}
                onChange={(e) => handleChange('contactEmail', e.target.value)}
                className="w-full px-4 py-3 bg-luxury-black border border-luxury-gray text-luxury-white focus:border-luxury-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs tracking-widest text-luxury-muted uppercase mb-2">Phone</label>
              <input
                type="text"
                value={settings.contactPhone || ''}
                onChange={(e) => handleChange('contactPhone', e.target.value)}
                className="w-full px-4 py-3 bg-luxury-black border border-luxury-gray text-luxury-white focus:border-luxury-gold focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs tracking-widest text-luxury-muted uppercase mb-2">Address</label>
              <input
                type="text"
                value={settings.contactAddress || ''}
                onChange={(e) => handleChange('contactAddress', e.target.value)}
                className="w-full px-4 py-3 bg-luxury-black border border-luxury-gray text-luxury-white focus:border-luxury-gold focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-luxury-charcoal border border-luxury-gray p-6">
          <h3 className="text-lg font-display text-luxury-white mb-6">Footer</h3>
          <div>
            <label className="block text-xs tracking-widest text-luxury-muted uppercase mb-2">Footer Description</label>
            <textarea
              rows={3}
              value={settings.footerDescription || ''}
              onChange={(e) => handleChange('footerDescription', e.target.value)}
              className="w-full px-4 py-3 bg-luxury-black border border-luxury-gray text-luxury-white focus:border-luxury-gold focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-6 py-3 border border-luxury-gray text-luxury-muted hover:border-red-500 hover:text-red-500 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset to Defaults
          </button>
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-8 py-3 ${
              saved ? 'bg-green-600' : 'bg-luxury-gold'
            } text-luxury-black font-medium transition-colors`}
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
