import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { defaultSiteSettings, getSiteSettings } from '../data/cmsStore';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [settings, setSettings] = useState(defaultSiteSettings);
  const location = useLocation();
  const companyName = settings.companyName || 'Metabuild';
  const tagline = settings.tagline || 'Realty';

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const loadSettings = async () => {
      const data = await getSiteSettings();
      setSettings(data);
    };
    loadSettings();
  }, []);

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || location.pathname !== '/' ? 'bg-brutal-white border-b border-brutal-black' : 'bg-transparent border-b border-brutal-black/20'
      }`}
    >
      <nav className="w-full px-6 lg:px-12">
        <div className="flex justify-between items-center h-24">
          <Link to="/" className="flex items-center">
            <div className="flex items-center gap-3">
              {settings.logo ? (
                <img src={settings.logo} alt={companyName} className="h-12 w-auto object-contain" />
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 border border-brutal-black bg-brutal-black text-brutal-white flex items-center justify-center">
                    <span className="font-display text-xl leading-none pt-1">M</span>
                  </div>
                  <div>
                    <span className={`block font-display text-lg tracking-wide ${scrolled || location.pathname !== '/' ? 'text-brutal-black' : 'text-brutal-white'}`}>{companyName}</span>
                  </div>
                </div>
              )}
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link ${
                  isActive(item.href) ? 'active' : ''
                } ${scrolled || location.pathname !== '/' ? 'text-brutal-black after:bg-brutal-black' : 'text-brutal-white after:bg-brutal-white'}`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className={`px-6 h-12 inline-flex items-center justify-center border font-body font-bold text-[13px] tracking-wide uppercase transition-colors ${
                scrolled || location.pathname !== '/' 
                ? 'bg-brutal-black text-brutal-white border-brutal-black hover:bg-brutal-white hover:text-brutal-black' 
                : 'bg-brutal-white text-brutal-black border-brutal-white hover:bg-transparent hover:text-brutal-white'
              }`}
            >
              Get in Touch
            </Link>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`lg:hidden ${scrolled || location.pathname !== '/' ? 'text-brutal-black' : 'text-brutal-white'}`}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className={`lg:hidden border-t-0 p-0 m-0 w-full flex flex-col ${scrolled || location.pathname !== '/' ? 'bg-brutal-white' : 'bg-brutal-black'}`}>
            <div className="flex flex-col w-full border-t border-brutal-black">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-6 py-4 border-b border-brutal-black text-[10px] font-bold tracking-widest uppercase transition-colors hover:bg-brutal-black hover:text-brutal-white ${
                    scrolled || location.pathname !== '/' ? 'text-brutal-black' : 'text-brutal-white border-brutal-white hover:bg-brutal-white hover:text-brutal-black'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-6 py-4 w-full h-14 flex items-center bg-brutal-bg font-body font-bold text-[10px] tracking-widest uppercase border-b border-brutal-black hover:bg-brutal-black hover:text-brutal-white transition-colors ${
                  scrolled || location.pathname !== '/'
                  ? 'text-brutal-black'
                  : 'text-brutal-white border-brutal-white hover:bg-brutal-white hover:text-brutal-black'
                }`}
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
