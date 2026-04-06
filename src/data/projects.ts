export interface Project {
  id: string;
  name: string;
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
}

export interface ProjectData {
  projects: Project[];
}

export const projects: Project[] = [
  {
    id: 'skyline-residence',
    name: 'Skyline Residence',
    category: 'residential',
    status: 'completed',
    location: 'Nashik',
    description: 'Skyline Residence is a premium residential complex featuring modern architecture and luxurious amenities. Located in the heart of Nashik, this G+12 storied building offers residents a perfect blend of comfort and elegance. The project showcases exceptional craftsmanship with spacious apartments that flood with natural light and ventilation.',
    specs: {
      area: '45,000 sq ft',
      units: '48 units',
      floors: 'G+12'
    },
    highlights: [
      'Strategic location in Nashik city center',
      'Modern architecture with RCC frame structure',
      'Spacious 2 & 3 BHK apartments',
      '24/7 security with CCTV surveillance',
      'Reserved parking for residents',
      'Landscaped gardens and open spaces'
    ],
    coverImage: '/images/skyline-residence/cover.jpg',
    gallery: [
      '/images/skyline-residence/gallery-1.jpg',
      '/images/skyline-residence/gallery-2.jpg',
      '/images/skyline-residence/gallery-3.jpg'
    ],
    brochure: '/brochures/skyline-residence.pdf'
  },
  {
    id: 'greenview-apartments',
    name: 'Greenview Apartments',
    category: 'residential',
    status: 'completed',
    location: 'Nashik',
    description: 'Greenview Apartments is a serene residential destination nestled in a pollution-free zone of Nashik. This thoughtfully designed complex emphasizes green living with abundant trees, gardens, and eco-friendly features. The apartments are designed to maximize natural ventilation and sunlight, creating a healthy living environment for families.',
    specs: {
      area: '38,000 sq ft',
      units: '36 units',
      floors: 'G+10'
    },
    highlights: [
      'Eco-friendly sustainable design',
      'Proximity to schools and hospitals',
      '精心设计的通风系统',
      'Quality fixtures and fittings',
      'Rainwater harvesting system',
      'Community hall for gatherings'
    ],
    coverImage: '/images/greenview-apartments/cover.jpg',
    gallery: [
      '/images/greenview-apartments/gallery-1.jpg',
      '/images/greenview-apartments/gallery-2.jpg',
      '/images/greenview-apartments/gallery-3.jpg'
    ],
    brochure: '/brochures/greenview-apartments.pdf'
  },
  {
    id: 'urban-hub-coworking',
    name: 'UrbanHub Coworking',
    category: 'commercial',
    status: 'completed',
    location: 'Nashik',
    description: 'UrbanHub Coworking is a state-of-the-art commercial workspace designed for modern professionals and businesses. This contemporary coworking space offers flexible desk arrangements, private cabins, meeting rooms, and collaborative areas. Perfect for startups, freelancers, and established companies looking for a productive work environment.',
    specs: {
      area: '25,000 sq ft',
      floors: 'G+4'
    },
    highlights: [
      'High-speed fiber internet connectivity',
      'Fully furnished workstations',
      'Conference and meeting rooms',
      '24/7 access for members',
      'Free refreshments and networking events',
      'Professional reception and admin support'
    ],
    coverImage: '/images/urban-hub-coworking/cover.jpg',
    gallery: [
      '/images/urban-hub-coworking/gallery-1.jpg',
      '/images/urban-hub-coworking/gallery-2.jpg',
      '/images/urban-hub-coworking/gallery-3.jpg'
    ],
    brochure: '/brochures/urban-hub-coworking.pdf'
  },
  {
    id: 'nashik-fabricated-warehouse',
    name: 'Nashik Fabricated Warehouse',
    category: 'industrial',
    status: 'completed',
    location: 'Nashik',
    description: 'A massive 40,000 sq ft fabricated warehouse facility strategically located in Nashik industrial zone. This Grade A warehouse is designed for heavy-duty industrial operations with robust construction, high clear heights, and efficient loading dock facilities. Ideal for manufacturing units, logistics companies, and storage requirements.',
    specs: {
      area: '40,000 sq ft',
      floors: 'Ground Floor'
    },
    highlights: [
      '40,000 sq ft of prime industrial space',
      'Strategic location in Nashik industrial area',
      'High clear height for maximum stacking',
      'Multiple loading dock entrances',
      'Heavy-duty flooring for forklift operations',
      '24/7 security and perimeter fencing'
    ],
    coverImage: '/images/nashik-warehouse/cover.jpg',
    gallery: [
      '/images/nashik-warehouse/gallery-1.jpg',
      '/images/nashik-warehouse/gallery-2.jpg',
      '/images/nashik-warehouse/gallery-3.jpg'
    ],
    brochure: '/brochures/nashik-warehouse.pdf'
  },
  {
    id: 'igatpuri-luxury-villas',
    name: 'Igatpuri Luxury Villas',
    category: 'residential',
    status: 'upcoming',
    location: 'Igatpuri',
    description: 'Igatpuri Luxury Villas is an upcoming premium residential project set in the serene hills of Igatpuri. This exclusive villa project offers a unique opportunity to own a dream home surrounded by nature, fresh mountain air, and breathtaking views. Perfect for those seeking a peaceful retreat away from city chaos while maintaining connectivity to Nashik and Mumbai.',
    specs: {
      area: '3,500 sq ft',
      units: '18 villas',
      floors: 'Ground + 2',
      rooms: '4 BHK'
    },
    highlights: [
      'Scenic location in Igatpuri hills',
      'Luxurious 4 BHK villas',
      'Private gardens for each villa',
      'Clubhouse and recreational facilities',
      '24/7 security and gated community',
      'Near Mumbai-Nashik Expressway'
    ],
    coverImage: '/images/igatpuri-villas/cover.jpg',
    gallery: [
      '/images/igatpuri-villas/gallery-1.jpg',
      '/images/igatpuri-villas/gallery-2.jpg',
      '/images/igatpuri-villas/gallery-3.jpg'
    ],
    brochure: '/brochures/igatpuri-villas.pdf'
  }
];
