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

// Site settings type
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

// Default site settings
export const defaultSiteSettings: SiteSettings = {
  companyName: 'Metabuild Realty',
  tagline: 'Premium Real Estate Developer',
  logo: '',
  heroTitle: 'Building Tomorrow\'s Landmarks',
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

// Local storage keys
const STORAGE_KEYS = {
  SITE_SETTINGS: 'metabuild_settings',
  PROJECTS: 'metabuild_projects',
};

// Get site settings from localStorage or use defaults
export const getSiteSettings = (): SiteSettings => {
  const stored = localStorage.getItem(STORAGE_KEYS.SITE_SETTINGS);
  if (stored) {
    return { ...defaultSiteSettings, ...JSON.parse(stored) };
  }
  return defaultSiteSettings;
};

// Save site settings to localStorage
export const saveSiteSettings = (settings: Partial<SiteSettings>): SiteSettings => {
  const current = getSiteSettings();
  const updated = { ...current, ...settings };
  localStorage.setItem(STORAGE_KEYS.SITE_SETTINGS, JSON.stringify(updated));
  return updated;
};

// Get projects from localStorage or use defaults
export const getProjects = (): Project[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.PROJECTS);
  if (stored) {
    return JSON.parse(stored);
  }
  // Initialize with default projects
  const defaultProjects = getDefaultProjects();
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(defaultProjects));
  return defaultProjects;
};

// Save projects to localStorage
export const saveProjects = (projects: Project[]) => {
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
};

// Add a new project
export const addProject = (project: Project) => {
  const projects = getProjects();
  projects.push(project);
  saveProjects(projects);
  return projects;
};

// Update an existing project
export const updateProject = (id: string, updates: Partial<Project>) => {
  const projects = getProjects();
  const index = projects.findIndex(p => p.id === id);
  if (index !== -1) {
    projects[index] = { ...projects[index], ...updates };
    saveProjects(projects);
  }
  return projects;
};

// Delete a project
export const deleteProject = (id: string) => {
  const projects = getProjects().filter(p => p.id !== id);
  saveProjects(projects);
  return projects;
};

// Get default projects
const getDefaultProjects = (): Project[] => [
  {
    id: 'skyline-residence',
    name: 'Skyline Residence',
    slug: 'skyline-residence',
    category: 'residential',
    status: 'completed',
    location: 'Nashik',
    description: 'Skyline Residence is a premium residential complex featuring modern architecture and luxurious amenities. Located in the heart of Nashik, this G+12 storied building offers residents a perfect blend of comfort and elegance.',
    specs: { area: '45,000 sq ft', units: '48 units', floors: 'G+12' },
    highlights: ['Strategic location in Nashik city center', 'Modern architecture with RCC frame structure', 'Spacious 2 & 3 BHK apartments', '24/7 security with CCTV surveillance'],
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'],
    brochure: '/brochures/skyline-residence.pdf'
  },
  {
    id: 'greenview-apartments',
    name: 'Greenview Apartments',
    slug: 'greenview-apartments',
    category: 'residential',
    status: 'completed',
    location: 'Nashik',
    description: 'Greenview Apartments is a serene residential destination nestled in a pollution-free zone of Nashik.',
    specs: { area: '38,000 sq ft', units: '36 units', floors: 'G+10' },
    highlights: ['Eco-friendly sustainable design', 'Proximity to schools and hospitals', 'Quality fixtures and fittings'],
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'],
    brochure: '/brochures/greenview-apartments.pdf'
  },
  {
    id: 'urban-hub-coworking',
    name: 'UrbanHub Coworking',
    slug: 'urban-hub-coworking',
    category: 'commercial',
    status: 'completed',
    location: 'Nashik',
    description: 'UrbanHub Coworking is a state-of-the-art commercial workspace designed for modern professionals and businesses.',
    specs: { area: '25,000 sq ft', floors: 'G+4' },
    highlights: ['High-speed fiber internet connectivity', 'Fully furnished workstations', 'Conference and meeting rooms'],
    coverImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80'],
    brochure: '/brochures/urban-hub-coworking.pdf'
  },
  {
    id: 'nashik-fabricated-warehouse',
    name: 'Nashik Fabricated Warehouse',
    slug: 'nashik-fabricated-warehouse',
    category: 'industrial',
    status: 'completed',
    location: 'Nashik',
    description: 'A massive 40,000 sq ft fabricated warehouse facility strategically located in Nashik industrial zone.',
    specs: { area: '40,000 sq ft', floors: 'Ground Floor' },
    highlights: ['40,000 sq ft of prime industrial space', 'Strategic location in Nashik industrial area', 'High clear height for maximum stacking'],
    coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80'],
    brochure: '/brochures/nashik-warehouse.pdf'
  },
  {
    id: 'igatpuri-luxury-villas',
    name: 'Igatpuri Luxury Villas',
    slug: 'igatpuri-luxury-villas',
    category: 'residential',
    status: 'upcoming',
    location: 'Igatpuri',
    description: 'Igatpuri Luxury Villas is an upcoming premium residential project set in the serene hills of Igatpuri.',
    specs: { area: '3,500 sq ft', units: '18 villas', floors: 'Ground + 2', rooms: '4 BHK' },
    highlights: ['Scenic location in Igatpuri hills', 'Luxurious 4 BHK villas', 'Private gardens for each villa'],
    coverImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80'],
    brochure: '/brochures/igatpuri-villas.pdf'
  }
];

// Reset to default data
export const resetToDefaults = () => {
  localStorage.setItem(STORAGE_KEYS.SITE_SETTINGS, JSON.stringify(defaultSiteSettings));
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(getDefaultProjects()));
};

// Get project by PDF slug
export const getProjectBySlug = (slug: string): Project | undefined => {
  const projects = getProjects();
  return projects.find(p => p.pdfSlug === slug);
};

// Get project by ID
export const getProjectById = (id: string): Project | undefined => {
  const projects = getProjects();
  return projects.find(p => p.id === id);
};
