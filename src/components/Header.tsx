import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { getSiteSettings } from '../data/cmsStore';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const settings = getSiteSettings();
  const companyName = settings.companyName || 'Metabuild';
  const tagline = settings.tagline || 'Realty';

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || location.pathname !== '/'
          ? 'glass border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex items-center gap-3">
              {settings.logo ? (
                <img src={settings.logo} alt={companyName} className="h-12 w-auto object-contain" />
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 border border-luxury-gold flex items-center justify-center">
                    <span className="text-luxury-gold font-display text-xl">M</span>
                  </div>
                  <div>
                    <span className="block text-luxury-white font-display text-lg tracking-wide">{companyName}</span>
                    <span className="block text-luxury-gold text-xs tracking-[0.3em] uppercase">{tagline}</span>
                  </div>
                </div>
              )}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm tracking-widest uppercase transition-colors ${
                  isActive(item.href)
                    ? 'text-luxury-gold'
                    : 'text-luxury-white/70 hover:text-luxury-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="px-6 py-2.5 bg-luxury-gold text-luxury-black text-sm tracking-widest uppercase hover:bg-luxury-gold-light transition-colors"
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-luxury-white"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-white/10">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm tracking-widest uppercase transition-colors ${
                    isActive(item.href)
                      ? 'text-luxury-gold'
                      : 'text-luxury-white/70 hover:text-luxury-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="mt-4 px-6 py-2.5 bg-luxury-gold text-luxury-black text-sm tracking-widest uppercase text-center"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
