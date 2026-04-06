import { supabase } from '../lib/supabase';

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
  heroSubtitle:
    'Crafting exceptional living and working spaces across Nashik and Maharashtra. Where vision meets excellence.',
  heroTagline: 'Premium Real Estate Developer',
  aboutTitle: 'Excellence in Every Structure',
  aboutDescription:
    'Metabuild Realty has been transforming skylines across Nashik and Maharashtra for over 15 years. Our commitment to quality, innovation, and customer satisfaction has made us one of the most trusted names in real estate.',
  ctaTitle: 'Ready to Find Your Dream Property?',
  ctaDescription: 'Contact us today to explore our projects and find the perfect property for your needs',
  footerDescription:
    'Building dreams with quality construction and innovative real estate solutions across Nashik and surrounding areas. Creating landmarks that define skylines.',
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

const TABLES = {
  SITE_SETTINGS: (import.meta.env.VITE_SUPABASE_SITE_SETTINGS_TABLE as string | undefined) || 'site_settings',
  PROJECTS: (import.meta.env.VITE_SUPABASE_PROJECTS_TABLE as string | undefined) || 'projects',
};

const CMS_SETUP_SQL_PATH = '/supabase-setup.sql';

const getAuthSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    throw new Error(`Unable to verify admin session: ${error.message}`);
  }
  return data.session;
};

const isMissingTableError = (error: { code?: string; message?: string } | null) =>
  Boolean(error?.code === 'PGRST205' || error?.message?.toLowerCase().includes('could not find the table'));

const formatBackendError = (action: string, error: { message?: string; code?: string } | null) => {
  const details = error?.message || 'Unknown backend error';
  if (isMissingTableError(error)) {
    return `${action} failed because CMS tables are not present in Supabase (${TABLES.SITE_SETTINGS}/${TABLES.PROJECTS}). Run ${CMS_SETUP_SQL_PATH} in Supabase SQL Editor, then retry.`;
  }
  return `${action}: ${details}`;
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
  coverImage: row.cover_image || '',
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
    description:
      'Skyline Residence is a premium residential complex featuring modern architecture and luxurious amenities. Located in the heart of Nashik, this G+12 storied building offers residents a perfect blend of comfort and elegance.',
    specs: { area: '45,000 sq ft', units: '48 units', floors: 'G+12' },
    highlights: [
      'Strategic location in Nashik city center',
      'Modern architecture with RCC frame structure',
      'Spacious 2 & 3 BHK apartments',
      '24/7 security with CCTV surveillance',
    ],
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'],
    brochure: '/brochures/skyline-residence.pdf',
  },
  {
    id: 'greenview-apartments',
    name: 'Greenview Apartments',
    slug: 'greenview-apartments',
    category: 'residential',
    status: 'completed',
    location: 'Nashik',
    description:
      'Greenview Apartments is a serene residential destination nestled in a pollution-free zone of Nashik.',
    specs: { area: '38,000 sq ft', units: '36 units', floors: 'G+10' },
    highlights: [
      'Eco-friendly sustainable design',
      'Proximity to schools and hospitals',
      'Quality fixtures and fittings',
    ],
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'],
    brochure: '/brochures/greenview-apartments.pdf',
  },
  {
    id: 'urban-hub-coworking',
    name: 'UrbanHub Coworking',
    slug: 'urban-hub-coworking',
    category: 'commercial',
    status: 'completed',
    location: 'Nashik',
    description:
      'UrbanHub Coworking is a state-of-the-art commercial workspace designed for modern professionals and businesses.',
    specs: { area: '25,000 sq ft', floors: 'G+4' },
    highlights: [
      'High-speed fiber internet connectivity',
      'Fully furnished workstations',
      'Conference and meeting rooms',
    ],
    coverImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80'],
    brochure: '/brochures/urban-hub-coworking.pdf',
  },
  {
    id: 'nashik-fabricated-warehouse',
    name: 'Nashik Fabricated Warehouse',
    slug: 'nashik-fabricated-warehouse',
    category: 'industrial',
    status: 'completed',
    location: 'Nashik',
    description:
      'A massive 40,000 sq ft fabricated warehouse facility strategically located in Nashik industrial zone.',
    specs: { area: '40,000 sq ft', floors: 'Ground Floor' },
    highlights: [
      '40,000 sq ft of prime industrial space',
      'Strategic location in Nashik industrial area',
      'High clear height for maximum stacking',
    ],
    coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80'],
    brochure: '/brochures/nashik-warehouse.pdf',
  },
  {
    id: 'igatpuri-luxury-villas',
    name: 'Igatpuri Luxury Villas',
    slug: 'igatpuri-luxury-villas',
    category: 'residential',
    status: 'upcoming',
    location: 'Igatpuri',
    description:
      'Igatpuri Luxury Villas is an upcoming premium residential project set in the serene hills of Igatpuri.',
    specs: { area: '3,500 sq ft', units: '18 villas', floors: 'Ground + 2', rooms: '4 BHK' },
    highlights: ['Scenic location in Igatpuri hills', 'Luxurious 4 BHK villas', 'Private gardens for each villa'],
    coverImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80'],
    brochure: '/brochures/igatpuri-villas.pdf',
  },
];

const readLocalSettings = (): SiteSettings => {
  const stored = localStorage.getItem(STORAGE_KEYS.SITE_SETTINGS);
  if (!stored) return defaultSiteSettings;
  try {
    return { ...defaultSiteSettings, ...JSON.parse(stored) };
  } catch {
    return defaultSiteSettings;
  }
};

const writeLocalSettings = (settings: SiteSettings) => {
  localStorage.setItem(STORAGE_KEYS.SITE_SETTINGS, JSON.stringify(settings));
};

const readLocalProjects = (): Project[] => {
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
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
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
    throw new Error(formatBackendError('Failed to save settings to backend', error));
  }

  writeLocalSettings(updated);
  return updated;
};

export const getProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase.from(TABLES.PROJECTS).select('*').order('created_at', { ascending: true });

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
    throw new Error(formatBackendError('Failed to create project in backend', error));
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
    throw new Error(formatBackendError('Failed to update project in backend', error));
  }

  return getProjects();
};

export const deleteProject = async (id: string): Promise<Project[]> => {
  await requireAuthenticatedSession();
  const { error } = await supabase.from(TABLES.PROJECTS).delete().eq('id', id);

  if (error) {
    throw new Error(formatBackendError('Failed to delete project in backend', error));
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
    throw new Error(formatBackendError('Failed to reset settings in backend', settingsError));
  }

  const { error: deleteProjectsError } = await supabase.from(TABLES.PROJECTS).delete().not('id', 'is', null);
  if (deleteProjectsError) {
    throw new Error(formatBackendError('Failed to reset projects in backend', deleteProjectsError));
  }

  const { error: seedProjectsError } = await supabase.from(TABLES.PROJECTS).upsert(defaults.map(fromProject));
  if (seedProjectsError) {
    throw new Error(formatBackendError('Failed to seed default projects in backend', seedProjectsError));
  }
};

export type CmsBackendStatus = {
  settingsTable: 'ok' | 'missing' | 'error';
  projectsTable: 'ok' | 'missing' | 'error';
  details: string[];
};

export const getCmsBackendStatus = async (): Promise<CmsBackendStatus> => {
  const details: string[] = [];

  const { error: settingsError } = await supabase.from(TABLES.SITE_SETTINGS).select('id').limit(1);
  const { error: projectsError } = await supabase.from(TABLES.PROJECTS).select('id').limit(1);

  const settingsTable: CmsBackendStatus['settingsTable'] = settingsError
    ? isMissingTableError(settingsError)
      ? 'missing'
      : 'error'
    : 'ok';

  const projectsTable: CmsBackendStatus['projectsTable'] = projectsError
    ? isMissingTableError(projectsError)
      ? 'missing'
      : 'error'
    : 'ok';

  if (settingsError) details.push(formatBackendError('Site settings table check failed', settingsError));
  if (projectsError) details.push(formatBackendError('Projects table check failed', projectsError));

  return { settingsTable, projectsTable, details };
};

export const getProjectBySlug = async (slug: string): Promise<Project | undefined> => {
  const { data, error } = await supabase.from(TABLES.PROJECTS).select('*').eq('pdf_slug', slug).maybeSingle();

  if (error || !data) {
    return readLocalProjects().find((project) => project.pdfSlug === slug);
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
