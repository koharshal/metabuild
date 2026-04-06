import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { defaultSiteSettings, getSiteSettings } from '../data/cmsStore';

const Hero = () => {
  const [settings, setSettings] = useState(defaultSiteSettings);

  useEffect(() => {
    const load = async () => {
      const data = await getSiteSettings();
      setSettings(data);
    };
    load();
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80" alt="Luxury Property" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/70 via-luxury-black/50 to-luxury-black/80" />
      </div>

      <div className="absolute top-1/4 left-10 w-px h-32 bg-luxury-gold/30 hidden lg:block" />
      <div className="absolute top-1/3 left-10 w-24 h-px bg-luxury-gold/30 hidden lg:block" />

      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
        <div className="mb-8 animate-fade-up">
          <span className="inline-block px-6 py-2 border border-luxury-gold/30 text-luxury-gold text-xs tracking-[0.3em] uppercase">{settings.heroTagline}</span>
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-luxury-white leading-[0.9] mb-8 animate-fade-up delay-100">{settings.heroTitle}</h1>

        <p className="max-w-xl text-luxury-white/70 font-body text-sm md:text-base tracking-wide leading-relaxed mb-12 animate-fade-up delay-200">{settings.heroSubtitle}</p>

        <div className="flex flex-col sm:flex-row gap-6 animate-fade-up delay-300">
          <Link to="/projects" className="btn-gold">Explore Projects</Link>
          <Link to="/contact" className="btn-outline-gold">Get in Touch</Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
