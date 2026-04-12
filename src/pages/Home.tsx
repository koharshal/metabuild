import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import { getProjects, getSiteSettings, type Project, type SiteSettings } from '../data/cmsStore';

const Home = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const [siteSettings, siteProjects] = await Promise.all([getSiteSettings(), getProjects()]);
      setSettings(siteSettings);
      setProjects(siteProjects);
    };

    loadData();
  }, []);

  if (!settings) {
    return (
      <div className="min-h-screen bg-brutal-white flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-t-4 border-b-4 border-brutal-black"></div>
      </div>
    );
  }

  const featuredProjects = projects.slice(0, 3);

  const features = [
    {
      title: 'Quality Construction',
      description: 'Premium materials and modern construction techniques ensuring lasting excellence.'
    },
    {
      title: 'Trusted Developer',
      description: 'Years of experience delivering successful projects across sectors.'
    },
    {
      title: 'On-Time Delivery',
      description: 'Committed to completing projects within agreed timelines.'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Featured Projects */}
      <section className="py-24 lg:py-32 bg-brutal-white border-b border-brutal-black">
        <div className="w-full px-6 lg:px-12">
          {/* Section Header */}
          <div className="mb-16 border-b border-brutal-black pb-8">
            <span className="inline-block px-4 py-1 bg-brutal-black text-brutal-white text-[10px] uppercase font-bold tracking-widest mb-6 border border-brutal-black">
              Our Portfolio
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-7xl text-brutal-black uppercase tracking-tighter max-w-4xl">
              Featured Projects
            </h2>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-brutal-black mb-16">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* View All Button */}
          <div className="mt-12 flex justify-start">
            <Link
              to="/projects"
              className="btn-outline-brutal inline-flex items-center gap-3"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 lg:py-32 bg-brutal-bg border-b border-brutal-black">
        <div className="w-full px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-0 items-start">
            {/* Text Content */}
            <div className="lg:pr-16 lg:border-r border-brutal-black lg:min-h-[600px]">
              <span className="inline-block px-4 py-1 bg-brutal-white text-brutal-black text-[10px] uppercase font-bold tracking-widest mb-6 border border-brutal-black">
                About Us
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-brutal-black uppercase tracking-tighter mb-8">
                {settings?.aboutTitle || 'Excellence in Every Structure'}
              </h2>
              <p className="text-brutal-black/80 font-body text-sm md:text-base leading-relaxed mb-12 border-l border-brutal-black pl-4">
                {settings?.aboutDescription || 'Metabuild Realty has been transforming skylines across Nashik and Maharashtra for over 15 years. Our commitment to quality, innovation, and customer satisfaction has made us one of the most trusted names in real estate.'}
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-brutal-black font-bold uppercase text-[12px] tracking-widest border-b border-brutal-black pb-1 hover:bg-brutal-black hover:text-brutal-white transition-colors p-1"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-0 lg:pl-16 h-full border-t lg:border-t-0 border-brutal-black">
              <div className="flex flex-col border-b border-l border-r border-brutal-black">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80"
                  alt="Luxury interior"
                  className="w-full aspect-square object-cover grayscale border-b border-brutal-black"
                />
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80"
                  alt="Modern building"
                  className="w-full aspect-[4/5] object-cover grayscale"
                />
              </div>
              <div className="flex flex-col border-b border-r border-brutal-black">
                <img
                  src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80"
                  alt="Architecture"
                  className="w-full aspect-[4/3] object-cover grayscale border-b border-brutal-black"
                />
                <img
                  src="https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600&q=80"
                  alt="Property"
                  className="w-full aspect-[3/4] object-cover grayscale"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 lg:py-32 bg-brutal-white border-b border-brutal-black">
        <div className="w-full px-6 lg:px-12">
          <div className="mb-16 border-b border-brutal-black pb-8">
            <span className="inline-block px-4 py-1 bg-brutal-black text-brutal-white text-[10px] uppercase font-bold tracking-widest mb-6 border border-brutal-black">
              Why Choose Us
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-7xl text-brutal-black uppercase tracking-tighter">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-brutal-black">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-8 lg:p-12 border-b border-r border-brutal-black hover:bg-brutal-bg transition-colors"
              >
                <div className="w-12 h-[4px] bg-brutal-black mb-8" />
                <h3 className="font-display text-2xl lg:text-3xl text-brutal-black uppercase tracking-tight mb-4">
                  {feature.title}
                </h3>
                <p className="text-brutal-black/80 font-body text-sm leading-relaxed border-l border-brutal-black pl-4">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brutal-bg p-6 lg:p-12">
        <div className="w-full bg-brutal-black relative overflow-hidden border border-brutal-black p-12 lg:py-32 flex flex-col items-center text-center">
          <h2 className="font-display text-5xl md:text-6xl lg:text-[80px] text-brutal-white uppercase tracking-tighter mb-8 leading-[0.9] max-w-5xl z-10 relative">
            {settings?.ctaTitle || 'Ready to Find Your Dream Property?'}
          </h2>
          <p className="text-brutal-bg font-body text-base max-w-2xl mb-12 z-10 relative">
            {settings?.ctaDescription || 'Contact us today to explore our projects and discover the perfect property for your needs'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto z-10 relative">
            <Link
              to="/contact"
              className="btn-brutal bg-brutal-white text-brutal-black hover:bg-brutal-bg hover:text-brutal-black border-brutal-white w-full sm:w-auto"
            >
              Get in Touch
            </Link>
            <Link
              to="/projects"
              className="btn-outline-brutal text-brutal-white border-brutal-white hover:bg-brutal-white hover:text-brutal-black w-full sm:w-auto"
            >
              Browse Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
