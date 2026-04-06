-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'upcoming',
  location TEXT,
  description TEXT,
  cover_image TEXT,
  gallery JSONB DEFAULT '[]',
  highlights JSONB DEFAULT '[]',
  specs JSONB DEFAULT '{}',
  brochure TEXT,
  pdf_slug TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public can read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public can read projects" ON projects FOR SELECT USING (true);

-- Allow authenticated users full access
CREATE POLICY "Admins can manage site_settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage projects" ON projects FOR ALL USING (auth.role() = 'authenticated');

-- Insert default site settings with proper escaping
INSERT INTO site_settings (id, data) VALUES (
  'default',
  '{"companyName": "Metabuild Realty", "tagline": "Premium Real Estate Developer", "heroTitle": "Building Tomorrow''s Landmarks", "heroSubtitle": "Crafting iconic spaces across Nashik and beyond", "footerDescription": "Building dreams with quality construction and innovative real estate solutions across Nashik and surrounding areas. Creating landmarks that define skylines.", "contactAddress": "Nashik, Maharashtra", "contactPhone": "+91 98765 43210", "contactEmail": "info@metabuildrealty.com", "socialInstagram": "#", "socialLinkedin": "#"}'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- Insert sample projects with proper escaping
INSERT INTO projects (id, name, slug, category, status, location, description, cover_image, highlights, specs, gallery) VALUES
(
  'proj-1',
  'Skyline Horizon',
  'skyline-horizon',
  'Residential',
  'completed',
  'Nashik, Maharashtra',
  'An iconic residential tower offering luxurious apartments with panoramic city views. Featuring modern amenities and premium finishes, Skyline Horizon represents the pinnacle of urban living in Nashik.',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
  '["Panoramic city views", "Modern amenities", "Premium finishes", "24/7 Security", "Underground parking", "Rooftop garden"]'::jsonb,
  '{"area": "2.5 Acres", "units": "120", "floors": "15"}'::jsonb,
  '["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80"]'::jsonb
),
(
  'proj-2',
  'Urban Heights',
  'urban-heights',
  'Commercial',
  'completed',
  'Nashik, Maharashtra',
  'A state-of-the-art commercial complex designed for businesses seeking premium office spaces. Located in the heart of the business district with excellent connectivity.',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80',
  '["Prime location", "Modern office spaces", "High-speed elevators", "Central AC", "Conference facilities", "Food court"]'::jsonb,
  '{"area": "5 Acres", "units": "50", "floors": "10"}'::jsonb,
  '["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80", "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"]'::jsonb
),
(
  'proj-3',
  'Green Meadows',
  'green-meadows',
  'Residential',
  'upcoming',
  'Nashik, Maharashtra',
  'An upcoming residential township offering villas and apartments in a lush green environment. Perfect for families seeking a peaceful yet connected lifestyle.',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
  '["Green surroundings", "Parks and gardens", "Kids play area", "Clubhouse", "Swimming pool", "Jogging track"]'::jsonb,
  '{"area": "10 Acres", "units": "200", "floors": "5"}'::jsonb,
  '["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80", "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1920&q=80"]'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
