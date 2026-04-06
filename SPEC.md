# Metabuild Realty Website Specification

## Project Overview
- **Project Name**: Metabuild Realty
- **Type**: Real Estate Portfolio Website
- **Core Functionality**: A dynamic portfolio website showcasing real estate projects with easy content management via JSON data files
- **Target Users**: Property buyers, commercial tenants, real estate investors

## Technical Architecture

### Content Management System
- **Approach**: JSON-based data file system
- **Data File**: `/src/data/projects.json`
- **Benefits**:
  - No external CMS setup required
  - Non-technical users can easily add/edit projects
  - Version control friendly
  - Fast page loads

### Data Schema (Project)
```json
{
  "id": "unique-project-id",
  "name": "Project Name",
  "category": "residential | commercial | industrial",
  "status": "completed | ongoing | upcoming",
  "location": "City/Area",
  "description": "Project description",
  "specs": {
    "area": "40,000 sq ft",
    "units": "24 units",
    "floors": "G+12"
  },
  "highlights": ["Feature 1", "Feature 2"],
  "coverImage": "/images/project-name/cover.jpg",
  "gallery": ["/images/project-name/gallery-1.jpg"],
  "brochure": "/brochures/project-name.pdf"
}
```

## UI/UX Specification

### Color Palette
- **Primary**: #1a1a2e (Deep Navy - Trust & Professionalism)
- **Secondary**: #16213e (Dark Blue - Premium feel)
- **Accent**: #e94560 (Coral Red - Call to action)
- **Light**: #f8f9fa (Off-white - Clean backgrounds)
- **Text Primary**: #1a1a2e
- **Text Secondary**: #6c757d

### Typography
- **Headings**: "Playfair Display", serif (Luxury & Elegance)
- **Body**: "Inter", sans-serif (Clean & Readable)
- **Sizes**:
  - Hero Title: 64px / 4rem
  - Section Title: 48px / 3rem
  - Card Title: 24px / 1.5rem
  - Body: 16px / 1rem
  - Small: 14px / 0.875rem

### Layout Structure

#### Header
- Fixed navigation bar
- Logo on left (Metabuild Realty)
- Navigation links: Home, Projects, About, Contact
- "Enquire Now" CTA button on right
- Mobile: Hamburger menu

#### Hero Section
- Full viewport height
- Background: High-quality property image with overlay
- Centered headline + subheadline
- "View Projects" CTA button

#### Projects Section
- Filter tabs: All, Residential, Commercial, Industrial
- Grid layout: 3 columns desktop, 2 tablet, 1 mobile
- Project cards with:
  - Cover image
  - Project name
  - Location
  - Category badge
  - Status badge
  - "View Details" button

#### Project Detail Page
- Hero image with overlay
- Project info bar (location, status, area)
- Description section
- Specifications grid
- Highlights list
- Image gallery (grid)
- Download brochure button
- Related projects section

#### Footer
- Company info
- Quick links
- Contact information
- Copyright

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Components

1. **ProjectCard**
   - Image with hover zoom effect
   - Category & status badges
   - Title & location
   - Hover: Show "View Project" button

2. **FilterTabs**
   - Horizontal tab bar
   - Active state: Accent color underline
   - Smooth filter transition

3. **BrochureButton**
   - Prominent button with PDF icon
   - Download indicator
   - Opens in new tab

4. **ImageGallery**
   - Grid layout
   - Lightbox on click
   - Responsive images

5. **StatusBadge**
   - Completed: Green (#22c55e)
   - Ongoing: Blue (#3b82f6)
   - Upcoming: Orange (#f59e0b)

6. **CategoryBadge**
   - Residential: Purple (#8b5cf6)
   - Commercial: Teal (#14b8a6)
   - Industrial: Slate (#64748b)

## Current Projects Data

1. **Residential Building 1** (Nashik)
   - Category: Residential
   - Status: Completed

2. **Residential Building 2** (Nashik)
   - Category: Residential
   - Status: Completed

3. **Coworking Space** (Nashik)
   - Category: Commercial
   - Status: Completed

4. **Fabricated Warehouse** (Nashik)
   - Category: Industrial
   - Status: Completed
   - Area: 40,000 sq ft

5. **Luxury Villas** (Igatpuri)
   - Category: Residential
   - Status: Upcoming
   - Note: Add as upcoming project

## Functionality Specification

### Core Features
1. **Project Filtering**
   - Filter by category (All/Residential/Commercial/Industrial)
   - Instant filter without page reload
   - Smooth transition animations

2. **Project Detail View**
   - Dynamic routing (/projects/:id)
   - Full project information display
   - Image gallery with lightbox

3. **PDF Brochure Download**
   - Direct PDF file links
   - Opens in new tab for viewing
   - Download attribute for saving

4. **Responsive Design**
   - Mobile-first approach
   - Touch-friendly navigation
   - Optimized images

### User Interactions
- Click filter tab → Filter projects instantly
- Click project card → Navigate to detail page
- Click brochure button → Open/download PDF
- Click gallery image → Open lightbox

## Acceptance Criteria

1. ✅ Homepage loads with hero section and project grid
2. ✅ All 5 projects display correctly with images
3. ✅ Filter functionality works (All/Residential/Commercial/Industrial)
4. ✅ Each project has dedicated detail page
5. ✅ PDF brochure buttons present for each project
6. ✅ Mobile responsive design works
7. ✅ Adding new project only requires JSON edit
8. ✅ Images load correctly
9. ✅ Smooth animations and transitions
10. ✅ Professional real estate aesthetic
