import { supabase } from '../lib/supabase';

// 1. Updated Table Names with SITE_SETTINGS
export const TABLES = {
  PROJECTS: 'projects',
  CONTENT: 'site_content',
  BROCHURES: 'brochures',
  SITE_SETTINGS: 'site_settings'
};

export const uploadToStorage = async (file: File, folder: string): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('cms-assets')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (uploadError) {
    throw new Error(`Error uploading file to storage: ${uploadError.message}`);
  }

  const { data } = supabase.storage
    .from('cms-assets')
    .getPublicUrl(filePath);

  return data.publicUrl;
};

// 3. Updated Error Formatter to handle 2 arguments
export const formatBackendError = (message: string, error: any) => {
  console.error(`${message}:`, error);
  return error?.message || "An unexpected error occurred with the backend.";
};

// 3. Updated Status Type to an Object (matching AdminDashboard.tsx requirements)
export interface CmsBackendStatus {
  status: 'loading' | 'online' | 'offline' | 'error';
  settingsTable: boolean;
  projectsTable: boolean;
  details?: string;
}

export const getCmsBackendStatus = async (): Promise<CmsBackendStatus> => {
  try {
    // Check critical tables to verify DB health
    // Check critical tables to verify DB health using correct count syntax
    const { error: settingsError } = await supabase.from(TABLES.SITE_SETTINGS).select('*', { count: 'exact', head: true });
    const { error: projectsError } = await supabase.from(TABLES.PROJECTS).select('*', { count: 'exact', head: true });

    const isOnline = !settingsError && !projectsError;

    return {
      status: isOnline ? 'online' : 'error',
      settingsTable: !settingsError,
      projectsTable: !projectsError,
      details: settingsError?.message || projectsError?.message || 'All systems operational'
    };
  } catch (e: any) {
    return {
      status: 'error',
      settingsTable: false,
      projectsTable: false,
      details: e.message
    };
  }
};

export interface Project {
  id: string;
  name: string;
  slug: string;
  category: 'residential' | 'commercial' | 'industrial';
  status: 'completed' | 'ongoing' | 'upcoming';
  location: string;
  description: string;
  specs: {
    area?: string;
    units?: string;
    floors?: string;
    rooms?: string;
  };
  highlights: string[];
  coverImage: string;
  gallery: string[];
  brochure: string;
  pdfSlug?: string;
}

export type SiteSettings = {
  companyName: string;
  tagline: string;
  logo: string;
  heroTitle: string;
  heroSubtitle: string;
  heroTagline: string;
  aboutTitle: string;
  aboutDescription: string;
  ctaTitle: string;
  ctaDescription: string;
  footerDescription: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  socialInstagram: string;
  socialLinkedin: string;
};

export const defaultSiteSettings: SiteSettings = {
  companyName: 'Metabuild Realty',
  tagline: 'Premium Real Estate Developer',
  logo: '',
  heroTitle: "Building Tomorrow's Landmarks",
  heroSubtitle: 'Crafting exceptional living and working spaces across Nashik and Maharashtra. Where vision meets excellence.',
  heroTagline: 'Premium Real Estate Developer',
  aboutTitle: 'Excellence in Every Structure',
  aboutDescription: 'Metabuild Realty has been transforming skylines across Nashik and Maharashtra for over 15 years. Our commitment to quality, innovation, and customer satisfaction has made us one of the most trusted names in real estate.',
  ctaTitle: 'Ready to Find Your Dream Property?',
  ctaDescription: 'Contact us today to explore our projects and find the perfect property for your needs',
  footerDescription: 'Building dreams with quality construction and innovative real estate solutions across Nashik and surrounding areas. Creating landmarks that define skylines.',
  contactEmail: 'info@metabuildrealty.com',
  contactPhone: '+91 98765 43210',
  contactAddress: 'Metabuild Realty, Nashik, Maharashtra',
  socialInstagram: '#',
  socialLinkedin: '#',
};

const STORAGE_KEYS = {
  SITE_SETTINGS: 'metabuild_settings',
  PROJECTS: 'metabuild_projects',
};

const getAuthSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    throw new Error(`Unable to verify admin session: ${error.message}`);
  }
  return data.session;
};

const requireAuthenticatedSession = async () => {
  const session = await getAuthSession();
  if (!session) {
    throw new Error('Please log in with a valid admin account to save CMS changes.');
  }
};

const toProject = (row: any): Project => ({
  id: row.id,
  name: row.name,
  slug: row.slug,
  category: String(row.category || 'residential').toLowerCase() as Project['category'],
  status: String(row.status || 'upcoming').toLowerCase() as Project['status'],
  location: row.location || '',
  description: row.description || '',
  specs: (row.specs as Project['specs']) || {},
  highlights: (row.highlights as string[]) || [],
  // Support both 'cover_image' and 'save_image' column names
  coverImage: row.cover_image || row.save_image || '',
  gallery: (row.gallery as string[]) || [],
  brochure: row.brochure || '',
  pdfSlug: row.pdf_slug || '',
});

const fromProject = (project: Project) => ({
  id: project.id,
  name: project.name,
  slug: project.slug,
  category: project.category,
  status: project.status,
  location: project.location,
  description: project.description,
  specs: project.specs,
  highlights: project.highlights,
  cover_image: project.coverImage,
  gallery: project.gallery,
  brochure: project.brochure,
  pdf_slug: project.pdfSlug || null,
});

const getDefaultProjects = (): Project[] => [
  {
    id: 'skyline-residence',
    name: 'Skyline Residence',
    slug: 'skyline-residence',
    category: 'residential',
    status: 'completed',
    location: 'Nashik',
    description: 'Skyline Residence is a premium residential complex featuring modern architecture and luxurious amenities.',
    specs: { area: '45,000 sq ft', units: '48 units', floors: 'G+12' },
    highlights: ['Strategic location', 'Modern architecture', '24/7 security'],
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'],
    brochure: '/brochures/skyline-residence.pdf',
  }
];

const readLocalSettings = (): SiteSettings => {
  if (typeof window === 'undefined') return defaultSiteSettings;
  const stored = localStorage.getItem(STORAGE_KEYS.SITE_SETTINGS);
  if (!stored) return defaultSiteSettings;
  try {
    return { ...defaultSiteSettings, ...JSON.parse(stored) };
  } catch {
    return defaultSiteSettings;
  }
};

const writeLocalSettings = (settings: SiteSettings) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.SITE_SETTINGS, JSON.stringify(settings));
  }
};

const readLocalProjects = (): Project[] => {
  if (typeof window === 'undefined') return getDefaultProjects();
  const stored = localStorage.getItem(STORAGE_KEYS.PROJECTS);
  if (!stored) {
    const defaults = getDefaultProjects();
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(defaults));
    return defaults;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return getDefaultProjects();
  }
};

const writeLocalProjects = (projects: Project[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }
};

export const getSiteSettings = async (): Promise<SiteSettings> => {
  const { data, error } = await supabase
    .from(TABLES.SITE_SETTINGS)
    .select('data')
    .eq('id', 'default')
    .single();

  if (error) {
    console.warn(formatBackendError('Failed to load site settings from backend', error));
    return readLocalSettings();
  }

  const merged = { ...defaultSiteSettings, ...((data?.data as Partial<SiteSettings>) || {}) };
  writeLocalSettings(merged);
  return merged;
};

export const saveSiteSettings = async (settings: Partial<SiteSettings>): Promise<SiteSettings> => {
  await requireAuthenticatedSession();
  const current = await getSiteSettings();
  const updated = { ...current, ...settings };

  const { error } = await supabase
    .from(TABLES.SITE_SETTINGS)
    .upsert({ id: 'default', data: updated }, { onConflict: 'id' });

  if (error) {
    throw new Error(`Failed to save settings to backend: ${error.message}`);
  }

  writeLocalSettings(updated);
  return updated;
};

export const getProjects = async (): Promise<Project[]> => {
  // Select all fields needed — include both cover_image and save_image for compatibility
  const { data, error } = await supabase
    .from(TABLES.PROJECTS)
    .select('id, name, slug, category, status, location, cover_image, save_image, specs')
    .order('created_at', { ascending: true });

  if (error || !data) {
    if (error) {
      console.warn(formatBackendError('Failed to load projects from backend', error));
    }
    return readLocalProjects();
  }

  const projects = data.map(toProject);
  writeLocalProjects(projects);
  return projects;
};

export const addProject = async (project: Project): Promise<Project[]> => {
  await requireAuthenticatedSession();
  const { error } = await supabase.from(TABLES.PROJECTS).upsert(fromProject(project), { onConflict: 'id' });
  if (error) {
    throw new Error(`Failed to create project in backend: ${error.message}`);
  }
  return getProjects();
};

export const updateProject = async (id: string, updates: Partial<Project>): Promise<Project[]> => {
  await requireAuthenticatedSession();
  const payload: any = {};
  if (updates.name !== undefined) payload.name = updates.name;
  if (updates.slug !== undefined) payload.slug = updates.slug;
  if (updates.category !== undefined) payload.category = updates.category;
  if (updates.status !== undefined) payload.status = updates.status;
  if (updates.location !== undefined) payload.location = updates.location;
  if (updates.description !== undefined) payload.description = updates.description;
  if (updates.specs !== undefined) payload.specs = updates.specs;
  if (updates.highlights !== undefined) payload.highlights = updates.highlights;
  if (updates.coverImage !== undefined) payload.cover_image = updates.coverImage;
  if (updates.gallery !== undefined) payload.gallery = updates.gallery;
  if (updates.brochure !== undefined) payload.brochure = updates.brochure;
  if (updates.pdfSlug !== undefined) payload.pdf_slug = updates.pdfSlug;

  const { error } = await supabase.from(TABLES.PROJECTS).update(payload).eq('id', id);
  if (error) {
    throw new Error(`Failed to update project in backend: ${error.message}`);
  }

  return getProjects();
};

export const deleteProject = async (id: string): Promise<Project[]> => {
  await requireAuthenticatedSession();
  const { error } = await supabase.from(TABLES.PROJECTS).delete().eq('id', id);

  if (error) {
    throw new Error(`Failed to delete project in backend: ${error.message}`);
  }

  return getProjects();
};

export const resetToDefaults = async (): Promise<void> => {
  await requireAuthenticatedSession();
  writeLocalSettings(defaultSiteSettings);
  writeLocalProjects(getDefaultProjects());

  const defaults = getDefaultProjects();
  const { error: settingsError } = await supabase
    .from(TABLES.SITE_SETTINGS)
    .upsert({ id: 'default', data: defaultSiteSettings }, { onConflict: 'id' });
  
  if (settingsError) {
    throw new Error(`Failed to reset settings in backend: ${settingsError.message}`);
  }

  const { error: deleteProjectsError } = await supabase.from(TABLES.PROJECTS).delete().not('id', 'is', null);
  if (deleteProjectsError) {
    throw new Error(`Failed to reset projects in backend: ${deleteProjectsError.message}`);
  }

  const { error: seedProjectsError } = await supabase.from(TABLES.PROJECTS).upsert(defaults.map(fromProject));
  if (seedProjectsError) {
    throw new Error(`Failed to seed default projects in backend: ${seedProjectsError.message}`);
  }
};

export const getProjectBySlug = async (slug: string): Promise<Project | undefined> => {
  const { data, error } = await supabase.from(TABLES.PROJECTS).select('*').eq('slug', slug).maybeSingle();

  if (error || !data) {
    return readLocalProjects().find((project) => project.slug === slug);
  }

  return toProject(data);
};

export const getProjectById = async (id: string): Promise<Project | undefined> => {
  const { data, error } = await supabase.from(TABLES.PROJECTS).select('*').eq('id', id).maybeSingle();

  if (error || !data) {
    return readLocalProjects().find((project) => project.id === id);
  }

  return toProject(data);
};
