import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Linkedin } from 'lucide-react';
import { defaultSiteSettings, getSiteSettings } from '../data/cmsStore';

const Footer = () => {
  const [settings, setSettings] = useState(defaultSiteSettings);
  const currentYear = new Date().getFullYear();
  const companyName = settings.companyName || 'Metabuild';

  useEffect(() => {
    const load = async () => {
      const data = await getSiteSettings();
      setSettings(data);
    };
    load();
  }, []);

  return (
    <footer className="bg-brutal-white border-t border-brutal-black">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 border-b border-brutal-black">
          {/* Brand Column */}
          <div className="lg:col-span-2 border-r border-b lg:border-b-0 border-brutal-black p-8 lg:p-12 pl-6 lg:pl-12">
            <div className="flex items-center gap-3 mb-8">
              {settings.logo ? (
                <img src={settings.logo} alt={companyName} className="h-12 w-auto object-contain" />
              ) : (
                <div className="w-12 h-12 border border-brutal-black bg-brutal-black text-brutal-white flex items-center justify-center">
                  <span className="font-display text-xl leading-none pt-1">{companyName.charAt(0)}</span>
                </div>
              )}
              {!settings.logo && (
                <div className="flex flex-col">
                  <span className="text-lg font-display tracking-widest text-brutal-black">{companyName.toUpperCase()}</span>
                  <span className="text-[10px] tracking-[0.3em] text-brutal-black uppercase">{settings.tagline || 'Realty'}</span>
                </div>
              )}
            </div>
            <p className="text-brutal-black font-body text-sm leading-relaxed max-w-sm mb-12 border-l border-brutal-black pl-4">{settings.footerDescription}</p>
            
            <div className="flex space-x-0 border border-brutal-black w-fit">
              <a href={settings.socialInstagram || '#'} className="w-12 h-12 flex items-center justify-center text-brutal-black hover:bg-brutal-black hover:text-brutal-white border-r border-brutal-black transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={settings.socialLinkedin || '#'} className="w-12 h-12 flex items-center justify-center text-brutal-black hover:bg-brutal-black hover:text-brutal-white transition-colors duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="border-r border-b lg:border-b-0 border-brutal-black p-8 lg:p-12">
            <h3 className="text-[10px] font-bold tracking-widest text-brutal-black uppercase mb-8 border-b border-brutal-black pb-2">Quick Links</h3>
            <ul className="flex flex-col">
              <li><Link to="/" className="block py-3 border-b border-brutal-black/30 text-[12px] font-bold tracking-widest uppercase hover:px-2 hover:bg-brutal-black hover:text-brutal-white transition-all">Home</Link></li>
              <li><Link to="/projects" className="block py-3 border-b border-brutal-black/30 text-[12px] font-bold tracking-widest uppercase hover:px-2 hover:bg-brutal-black hover:text-brutal-white transition-all">Our Projects</Link></li>
              <li><Link to="/about" className="block py-3 border-b border-brutal-black/30 text-[12px] font-bold tracking-widest uppercase hover:px-2 hover:bg-brutal-black hover:text-brutal-white transition-all">About Us</Link></li>
              <li><Link to="/contact" className="block py-3 text-[12px] font-bold tracking-widest uppercase hover:px-2 hover:bg-brutal-black hover:text-brutal-white transition-all">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="p-8 lg:p-12">
            <h3 className="text-[10px] font-bold tracking-widest text-brutal-black uppercase mb-8 border-b border-brutal-black pb-2">Contact</h3>
            <ul className="flex flex-col">
              <li className="flex items-start gap-4 py-4 border-b border-brutal-black/30"><MapPin className="w-4 h-4 text-brutal-black flex-shrink-0 mt-0.5" /><span className="text-brutal-black text-[10px] uppercase font-bold tracking-wide">{settings.contactAddress}</span></li>
              <li className="flex items-center gap-4 py-4 border-b border-brutal-black/30"><Phone className="w-4 h-4 text-brutal-black flex-shrink-0" /><span className="text-brutal-black text-[10px] uppercase font-bold tracking-wide">{settings.contactPhone}</span></li>
              <li className="flex items-center gap-4 py-4"><Mail className="w-4 h-4 text-brutal-black flex-shrink-0" /><span className="text-brutal-black text-[10px] uppercase font-bold tracking-wide break-all">{settings.contactEmail}</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full bg-brutal-bg p-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-brutal-black/50 text-[10px] uppercase font-bold tracking-widest">© {currentYear} {companyName}. All rights reserved.</p>
          <p className="text-brutal-black font-display text-sm uppercase tracking-widest">Zero Compromises.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
