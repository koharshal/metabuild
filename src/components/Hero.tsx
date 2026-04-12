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
    <section className="relative h-screen w-full overflow-hidden border-b border-brutal-black">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80" alt="Luxury Property" className="w-full h-full object-cover bg-fixed" style={{ backgroundAttachment: 'fixed' }} />
        <div className="absolute inset-0 bg-brutal-black/30" />
      </div>

      <div className="absolute top-0 left-10 w-px h-[30vh] bg-brutal-white/50 hidden lg:block" />
      <div className="absolute top-[30vh] left-0 w-10 h-px bg-brutal-white/50 hidden lg:block" />

      <div className="relative z-10 h-full flex flex-col justify-center items-start text-left px-6 lg:px-24">
        <div className="mb-4">
          <span className="inline-block px-4 py-1 bg-brutal-white text-brutal-black font-bold text-xs tracking-widest uppercase">{settings.heroTagline}</span>
        </div>

        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[120px] text-brutal-white leading-[0.9] tracking-tighter mb-8 max-w-5xl uppercase break-words hyphens-auto">
          {settings.heroTitle}
        </h1>

        <p className="max-w-xl text-brutal-white font-body text-base tracking-wide leading-relaxed mb-12 border-l-2 border-brutal-white pl-6">
          {settings.heroSubtitle}
        </p>

        <div className="flex flex-col w-full sm:w-auto sm:flex-row gap-4">
          <Link to="/projects" className="btn-brutal bg-brutal-white text-brutal-black hover:bg-brutal-black hover:text-brutal-white border hover:border-brutal-white">Explore Projects</Link>
          <Link to="/contact" className="btn-outline-brutal border-brutal-white text-brutal-white hover:bg-brutal-white hover:text-brutal-black">Get in Touch</Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
