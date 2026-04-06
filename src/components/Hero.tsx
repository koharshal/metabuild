import { Link } from 'react-router-dom';
import { getSiteSettings } from '../data/cmsStore';

const Hero = () => {
  const settings = getSiteSettings();

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
          alt="Luxury Property"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/70 via-luxury-black/50 to-luxury-black/80" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-px h-32 bg-luxury-gold/30 hidden lg:block" />
      <div className="absolute top-1/3 left-10 w-24 h-px bg-luxury-gold/30 hidden lg:block" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
        {/* Tagline */}
        <div className="mb-8 animate-fade-up">
          <span className="inline-block px-6 py-2 border border-luxury-gold/30 text-luxury-gold text-xs tracking-[0.3em] uppercase">
            {settings.heroTagline || 'Premium Real Estate Developer'}
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-luxury-white leading-[0.9] mb-8 animate-fade-up delay-100">
          {settings.heroTitle || "Building Tomorrow's Landmarks"}
        </h1>

        {/* Subtitle */}
        <p className="max-w-xl text-luxury-white/70 font-body text-sm md:text-base tracking-wide leading-relaxed mb-12 animate-fade-up delay-200">
          {settings.heroSubtitle || "Crafting exceptional living and working spaces across Nashik and Maharashtra. Where vision meets excellence."}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-6 animate-fade-up delay-300">
          <Link
            to="/projects"
            className="btn-gold"
          >
            Explore Projects
          </Link>
          <Link
            to="/contact"
            className="btn-outline-gold"
          >
            Get in Touch
          </Link>
        </div>

        {/* Stats Row */}
        <div className="absolute bottom-24 left-0 right-0 hidden lg:block">
          <div className="max-w-4xl mx-auto flex justify-between items-center px-12">
            <div className="text-center">
              <span className="block text-4xl font-display text-luxury-gold">50+</span>
              <span className="text-xs tracking-widest text-luxury-muted uppercase">Projects</span>
            </div>
            <div className="w-px h-12 bg-luxury-gray" />
            <div className="text-center">
              <span className="block text-4xl font-display text-luxury-gold">15+</span>
              <span className="text-xs tracking-widest text-luxury-muted uppercase">Years</span>
            </div>
            <div className="w-px h-12 bg-luxury-gray" />
            <div className="text-center">
              <span className="block text-4xl font-display text-luxury-gold">100%</span>
              <span className="text-xs tracking-widest text-luxury-muted uppercase">Satisfaction</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-up delay-500">
        <span className="text-[10px] tracking-widest text-luxury-muted uppercase">Scroll</span>
        <div className="w-px h-12 bg-luxury-gold/50 relative">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-luxury-gold animate-scroll-down" />
        </div>
      </div>

      <style>{`
        @keyframes scrollDown {
          from { transform: translateY(-100%); }
          to { transform: translateY(100%); }
        }
        .animate-scroll-down {
          animation: scrollDown 1.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
