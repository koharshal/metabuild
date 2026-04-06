import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getSiteSettings } from '../data/cmsStore';

const About = () => {
  const settings = getSiteSettings();
  const stats = [
    { value: '50+', label: 'Projects Completed' },
    { value: '15+', label: 'Years Experience' },
    { value: '500+', label: 'Happy Families' },
    { value: '100%', label: 'Client Satisfaction' },
  ];

  const values = [
    {
      title: 'Quality First',
      description: 'We never compromise on the quality of materials and construction, ensuring lasting value for our clients.'
    },
    {
      title: 'Customer Centric',
      description: 'Our clients are at the heart of everything we do. We listen, understand, and deliver beyond expectations.'
    },
    {
      title: 'Innovation',
      description: 'We embrace modern construction techniques and sustainable practices to build for the future.'
    },
    {
      title: 'Transparency',
      description: 'Clear communication and honest dealings are the foundation of our client relationships.'
    }
  ];

  return (
    <div className="min-h-screen bg-luxury-black pt-24">
      {/* Hero */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <span className="inline-block px-6 py-2 border border-luxury-gold/30 text-luxury-gold text-xs tracking-[0.3em] uppercase mb-6">
            About Us
          </span>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-luxury-white mb-6">
            {settings.aboutTitle || 'Building Excellence'}
            <br />
            <span className="text-gold-gradient">Since 2010</span>
          </h1>
          <p className="text-luxury-muted max-w-2xl text-lg">
            {settings.aboutDescription || 'Transforming visions into reality with quality construction and innovative real estate solutions across Nashik and Maharashtra.'}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="border border-luxury-gray p-6 lg:p-8 text-center hover:border-luxury-gold/50 transition-all duration-500">
                <p className="font-display text-4xl lg:text-5xl text-luxury-gold mb-2">{stat.value}</p>
                <p className="text-luxury-muted text-sm tracking-wider uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 lg:py-24 bg-luxury-charcoal">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div>
              <span className="inline-block px-6 py-2 border border-luxury-gold/30 text-luxury-gold text-xs tracking-[0.3em] uppercase mb-6">
                Our Story
              </span>
              <h2 className="font-display text-4xl lg:text-5xl text-luxury-white mb-8">
                A Legacy of
                <br />
                <span className="text-gold-gradient">Excellence</span>
              </h2>
              <div className="space-y-6 text-luxury-muted leading-relaxed">
                <p>
                  Metabuild Realty was founded with a vision to transform the real estate landscape of Nashik and surrounding areas. Since our inception, we have been committed to delivering exceptional projects that combine quality craftsmanship with modern design.
                </p>
                <p>
                  Over the years, we have successfully delivered over 50 residential, commercial, and industrial projects, earning the trust and satisfaction of hundreds of happy families and business owners.
                </p>
                <p>
                  Our team of experienced professionals works tirelessly to ensure every project meets the highest standards of quality, safety, and sustainability. We believe in building not just structures, but homes and spaces where people can thrive.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                alt="Construction site"
                className="w-full"
              />
              <div className="absolute -bottom-6 -left-6 lg:-bottom-12 lg:-left-12 bg-luxury-charcoal border border-luxury-gold/30 p-6 lg:p-10">
                <p className="font-display text-3xl lg:text-4xl text-luxury-gold">Since 2010</p>
                <p className="text-luxury-muted text-sm tracking-widest uppercase mt-2">Building Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 lg:py-24 bg-luxury-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="inline-block px-6 py-2 border border-luxury-gold/30 text-luxury-gold text-xs tracking-[0.3em] uppercase mb-6">
              What We Stand For
            </span>
            <h2 className="font-display text-4xl lg:text-5xl text-luxury-white">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-8 border border-luxury-gray hover:border-luxury-gold/50 transition-all duration-500 group"
              >
                <div className="w-12 h-px bg-luxury-gold mb-6 group-hover:w-full transition-all duration-500" />
                <h3 className="font-display text-xl text-luxury-white mb-4">
                  {value.title}
                </h3>
                <p className="text-luxury-muted text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-luxury-charcoal">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-display text-4xl lg:text-5xl text-luxury-white mb-6">
            Ready to Work
            <br />
            <span className="text-gold-gradient">With Us?</span>
          </h2>
          <p className="text-luxury-muted max-w-xl mx-auto mb-10">
            Explore our projects or get in touch to discuss your real estate needs
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/projects"
              className="btn-gold inline-flex items-center gap-3"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="btn-outline-gold"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
