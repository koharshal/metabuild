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
      <div className="min-h-screen bg-luxury-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-luxury-gold"></div>
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
      <section className="py-24 lg:py-32 bg-luxury-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-6 py-2 border border-luxury-gold/30 text-luxury-gold text-xs tracking-[0.3em] uppercase mb-6">
              Our Portfolio
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-luxury-white mb-6">
              Featured Projects
            </h2>
            <p className="text-luxury-muted max-w-2xl mx-auto">
              Explore our collection of premium residential, commercial, and industrial properties
            </p>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <Link
              to="/projects"
              className="btn-outline-gold inline-flex items-center gap-3"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 lg:py-32 bg-luxury-charcoal">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div>
              <span className="inline-block px-6 py-2 border border-luxury-gold/30 text-luxury-gold text-xs tracking-[0.3em] uppercase mb-6">
                About Us
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-luxury-white mb-8">
                {settings?.aboutTitle || 'Excellence in Every Structure'}
              </h2>
              <p className="text-luxury-muted leading-relaxed mb-6">
                {settings?.aboutDescription || 'Metabuild Realty has been transforming skylines across Nashik and Maharashtra for over 15 years. Our commitment to quality, innovation, and customer satisfaction has made us one of the most trusted names in real estate.'}
              </p>
              <Link
                to="/about"
                className="text-luxury-gold text-sm tracking-widest uppercase hover:text-luxury-gold-light transition-colors"
              >
                Learn More →
              </Link>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80"
                  alt="Luxury interior"
                  className="w-full h-64 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80"
                  alt="Modern building"
                  className="w-full h-40 object-cover"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80"
                  alt="Architecture"
                  className="w-full h-40 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600&q=80"
                  alt="Property"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 lg:py-32 bg-luxury-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="inline-block px-6 py-2 border border-luxury-gold/30 text-luxury-gold text-xs tracking-[0.3em] uppercase mb-6">
              Why Choose Us
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-luxury-white">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-8 border border-luxury-gray hover:border-luxury-gold/50 transition-all duration-500 group"
              >
                <div className="w-12 h-px bg-luxury-gold mb-6 group-hover:w-full transition-all duration-500" />
                <h3 className="font-display text-xl text-luxury-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-luxury-muted text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-luxury-charcoal relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center relative z-10">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-luxury-white mb-8">
            {settings?.ctaTitle || 'Ready to Find Your Dream Property?'}
          </h2>
          <p className="text-luxury-muted max-w-2xl mx-auto mb-10">
            {settings?.ctaDescription || 'Contact us today to explore our projects and discover the perfect property for your needs'}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/contact"
              className="btn-gold"
            >
              Get in Touch
            </Link>
            <Link
              to="/projects"
              className="btn-outline-gold"
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
