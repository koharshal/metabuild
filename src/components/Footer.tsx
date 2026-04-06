import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Linkedin } from 'lucide-react';
import { getSiteSettings } from '../data/cmsStore';

const Footer = () => {
  const settings = getSiteSettings();
  const currentYear = new Date().getFullYear();
  const companyName = settings.companyName || 'Metabuild';

  return (
    <footer className="bg-luxury-charcoal border-t border-luxury-gray">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              {settings.logo ? (
                <img src={settings.logo} alt={companyName} className="h-12 w-auto object-contain" />
              ) : (
                <div className="w-12 h-12 border border-luxury-gold/30 flex items-center justify-center">
                  <span className="text-luxury-gold font-display text-xl">{companyName.charAt(0)}</span>
                </div>
              )}
              {!settings.logo && (
                <div className="flex flex-col">
                  <span className="text-lg font-display tracking-widest text-luxury-white">{companyName.toUpperCase()}</span>
                  <span className="text-[10px] tracking-[0.3em] text-luxury-muted uppercase">{settings.tagline || 'Realty'}</span>
                </div>
              )}
            </div>
            <p className="text-luxury-muted text-sm leading-relaxed max-w-md mb-6">
              {settings.footerDescription || 'Building dreams with quality construction and innovative real estate solutions across Nashik and surrounding areas. Creating landmarks that define skylines.'}
            </p>
            <div className="flex space-x-4">
              <a href={settings.socialInstagram || '#'} className="w-10 h-10 border border-luxury-gray flex items-center justify-center text-luxury-muted hover:border-luxury-gold hover:text-luxury-gold transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={settings.socialLinkedin || '#'} className="w-10 h-10 border border-luxury-gray flex items-center justify-center text-luxury-muted hover:border-luxury-gold hover:text-luxury-gold transition-all duration-300">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-medium tracking-widest text-luxury-white uppercase mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-luxury-muted hover:text-luxury-gold transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-luxury-muted hover:text-luxury-gold transition-colors text-sm">
                  Our Projects
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-luxury-muted hover:text-luxury-gold transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-luxury-muted hover:text-luxury-gold transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-medium tracking-widest text-luxury-white uppercase mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-luxury-gold flex-shrink-0 mt-1" />
                <span className="text-luxury-muted text-sm">
                  {settings.contactAddress || 'Nashik, Maharashtra'}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-luxury-gold flex-shrink-0" />
                <span className="text-luxury-muted text-sm">{settings.contactPhone || '+91 98765 43210'}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-luxury-gold flex-shrink-0" />
                <span className="text-luxury-muted text-sm">{settings.contactEmail || 'info@metabuildrealty.com'}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-luxury-gray mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-luxury-muted text-xs">
              © {currentYear} {companyName}. All rights reserved.
            </p>
            <p className="text-luxury-muted text-xs">
              Crafted with excellence
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;