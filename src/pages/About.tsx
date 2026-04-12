import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { defaultSiteSettings, getSiteSettings } from '../data/cmsStore';

const About = () => {
  const [settings, setSettings] = useState(defaultSiteSettings);

  useEffect(() => {
    const load = async () => {
      const data = await getSiteSettings();
      setSettings(data);
    };

    load();
  }, []);
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
    <div className="min-h-screen bg-brutal-bg pt-24">
      {/* Hero */}
      <section className="py-16 lg:py-32 border-b border-brutal-black bg-brutal-white">
        <div className="w-full px-6 lg:px-12">
          <span className="inline-block px-4 py-1 bg-brutal-black text-brutal-white border border-brutal-black font-bold text-[10px] tracking-widest uppercase mb-6">
            About Us
          </span>
          <h1 className="font-display text-5xl md:text-6xl lg:text-[100px] leading-[0.85] text-brutal-black uppercase tracking-tighter mb-8 break-words hyphens-auto max-w-5xl">
            {settings.aboutTitle || 'Building Excellence'}
            <br />
            <span className="text-brutal-black/50">Since 2010</span>
          </h1>
          <p className="text-brutal-black font-body text-base md:text-lg max-w-2xl border-l-[3px] border-brutal-black pl-6 py-2">
            {settings.aboutDescription || 'Transforming visions into reality with quality construction and innovative real estate solutions across Nashik and Maharashtra.'}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-brutal-white border-b border-brutal-black">
        <div className="w-full px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border-l border-r border-brutal-black">
            {stats.map((stat, index) => (
              <div key={index} className="border-b border-r border-brutal-black p-6 lg:p-12 hover:bg-brutal-bg transition-colors">
                <p className="font-display text-4xl lg:text-5xl text-brutal-black mb-4 uppercase tracking-tighter">{stat.value}</p>
                <p className="text-brutal-black font-bold text-[10px] tracking-widest uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 lg:py-32 bg-brutal-bg border-b border-brutal-black">
        <div className="w-full px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start border border-brutal-black bg-brutal-white">
            <div className="p-8 lg:p-16 border-b lg:border-b-0 lg:border-r border-brutal-black">
              <span className="inline-block px-4 py-1 bg-brutal-black text-brutal-white border border-brutal-black font-bold text-[10px] tracking-widest uppercase mb-8">
                Our Story
              </span>
              <h2 className="font-display text-4xl lg:text-6xl text-brutal-black uppercase tracking-tighter mb-12">
                A Legacy of
                <br />
                Excellence
              </h2>
              <div className="space-y-6 text-brutal-black font-body text-sm leading-relaxed border-l border-brutal-black pl-4 lg:pl-6">
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
            <div className="relative h-full">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                alt="Construction site"
                className="w-full h-full object-cover lg:absolute inset-0 grayscale"
              />
              <div className="absolute right-0 bottom-0 bg-brutal-white border-t border-l border-brutal-black p-6 lg:p-10 text-right">
                <p className="font-display text-3xl lg:text-4xl text-brutal-black uppercase tracking-tighter">Since 2010</p>
                <p className="text-brutal-black text-[10px] tracking-widest uppercase mt-2 font-bold">Building Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 lg:py-32 bg-brutal-white border-b border-brutal-black">
        <div className="w-full px-6 lg:px-12">
          <div className="mb-16 border-b border-brutal-black pb-8">
            <span className="inline-block px-4 py-1 bg-brutal-black text-brutal-white border border-brutal-black font-bold text-[10px] tracking-widest uppercase mb-6">
              What We Stand For
            </span>
            <h2 className="font-display text-4xl lg:text-6xl text-brutal-black uppercase tracking-tighter">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-brutal-black">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-8 lg:p-10 border-b border-r border-brutal-black hover:bg-brutal-bg transition-colors"
              >
                <div className="w-12 h-[3px] bg-brutal-black mb-8" />
                <h3 className="font-display text-xl text-brutal-black mb-4 uppercase tracking-tighter">
                  {value.title}
                </h3>
                <p className="text-brutal-black font-body text-sm leading-relaxed border-l border-brutal-black pl-3">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-48 bg-brutal-black">
        <div className="w-full px-6 lg:px-12 flex flex-col md:items-center text-left md:text-center">
          <h2 className="font-display text-5xl md:text-6xl lg:text-[80px] text-brutal-white uppercase tracking-tighter leading-[0.9] max-w-5xl mb-8">
            Ready to Work
            <br />
            With Us?
          </h2>
          <p className="text-brutal-bg font-body text-base max-w-2xl mb-12 border-l-2 border-brutal-white pl-4 md:border-l-0 md:pl-0 md:text-center">
            Explore our projects or get in touch to discuss your real estate needs
          </p>
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 justify-center">
            <Link
              to="/projects"
              className="btn-brutal bg-brutal-white text-brutal-black hover:bg-brutal-black hover:text-brutal-white border hover:border-brutal-white w-full sm:w-auto"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 ml-2 inline" />
            </Link>
            <Link
              to="/contact"
              className="btn-outline-brutal text-brutal-white border-brutal-white hover:bg-brutal-white hover:text-brutal-black w-full sm:w-auto"
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
