import { supabase } from '../lib/supabase';

// 1. Updated Table Names with SITE_SETTINGS
export const TABLES = {
  PROJECTS: 'projects',
  CONTENT: 'site_content',
  BROCHURES: 'brochures',
  SITE_SETTINGS: 'site_settings'
};

// 2. Updated Error Formatter to handle 2 arguments
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
    const { error: settingsError } = await supabase.from(TABLES.SITE_SETTINGS).select('count', { count: 'exact', head: true });
    const { error: projectsError } = await supabase.from(TABLES.PROJECTS).select('count', { count: 'exact', head: true });

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
