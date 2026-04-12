import { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { defaultSiteSettings, getSiteSettings } from '../data/cmsStore';

const Contact = () => {
  const [settings, setSettings] = useState(defaultSiteSettings);

  useEffect(() => {
    const load = async () => {
      const data = await getSiteSettings();
      setSettings(data);
    };

    load();
  }, []);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        project: '',
        message: ''
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-brutal-bg pt-24">
      {/* Header */}
      <section className="py-16 lg:py-24 border-b border-brutal-black bg-brutal-white">
        <div className="w-full px-6 lg:px-12">
          <span className="inline-block px-4 py-1 bg-brutal-black text-brutal-white border border-brutal-black font-bold text-[10px] tracking-widest uppercase mb-6">
            Get In Touch
          </span>
          <h1 className="font-display text-5xl md:text-6xl lg:text-[100px] leading-[0.85] text-brutal-black uppercase tracking-tighter mb-8 break-words hyphens-auto max-w-5xl">
            Contact Us
          </h1>
          <p className="text-brutal-black font-body text-base md:text-lg max-w-2xl border-l-[3px] border-brutal-black pl-6 py-2">
            Have a question or want to know more about our projects? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 lg:py-24 bg-brutal-white">
        <div className="w-full px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            {/* Contact Info */}
            <div className="lg:border-r border-brutal-black lg:pr-24">
              <div className="space-y-8">
                <div className="flex items-start gap-6 border-b border-brutal-black pb-8">
                  <div className="w-12 h-12 border border-brutal-black bg-brutal-black flex items-center justify-center text-brutal-white flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[10px] tracking-widest text-brutal-black/50 uppercase mb-2">Office Address</h3>
                    <p className="text-brutal-black font-body text-sm uppercase font-bold leading-relaxed">
                      {settings.contactAddress || 'Nashik, Maharashtra, India'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 border-b border-brutal-black pb-8">
                  <div className="w-12 h-12 border border-brutal-black bg-brutal-black flex items-center justify-center text-brutal-white flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[10px] tracking-widest text-brutal-black/50 uppercase mb-2">Phone</h3>
                    <p className="text-brutal-black font-body text-sm uppercase font-bold">
                      {settings.contactPhone || '+91 98765 43210'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 border-b border-brutal-black pb-8">
                  <div className="w-12 h-12 border border-brutal-black bg-brutal-black flex items-center justify-center text-brutal-white flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[10px] tracking-widest text-brutal-black/50 uppercase mb-2">Email</h3>
                    <p className="text-brutal-black font-body text-sm uppercase font-bold">
                      {settings.contactEmail || 'info@metabuildrealty.com'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 border-b border-brutal-black pb-8">
                  <div className="w-12 h-12 border border-brutal-black bg-brutal-black flex items-center justify-center text-brutal-white flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[10px] tracking-widest text-brutal-black/50 uppercase mb-2">Business Hours</h3>
                    <p className="text-brutal-black font-body text-sm uppercase font-bold leading-relaxed">
                      Monday - Saturday: 9:00 AM - 7:00 PM<br />
                      Sunday: By Appointment
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-12 h-64 bg-brutal-bg border-t border-l border-brutal-black flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 pattern-grid opacity-10"></div>
                <div className="text-center text-brutal-black relative z-10 border border-brutal-black p-6 bg-brutal-white">
                  <MapPin className="w-8 h-8 mx-auto mb-4" />
                  <p className="font-bold text-[10px] tracking-widest uppercase">Map Geometry Coming Soon</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-brutal-white border border-brutal-black p-8 lg:p-12 relative">
                <div className="absolute top-0 right-0 w-8 h-8 border-b border-l border-brutal-black bg-brutal-black"></div>
                <h2 className="font-display text-4xl text-brutal-black mb-4 uppercase tracking-tighter">Send Us a Message</h2>
                <p className="text-brutal-black/80 font-body text-sm mb-12 border-l border-brutal-black pl-4">Fill out the form below and we'll get back to you shortly.</p>

                {submitted ? (
                  <div className="text-center py-12 bg-brutal-bg border border-brutal-black">
                    <div className="w-16 h-16 bg-brutal-black flex items-center justify-center text-brutal-white mx-auto mb-6">
                      <Send className="w-8 h-8" />
                    </div>
                    <h3 className="font-display text-3xl text-brutal-black mb-2 uppercase tracking-tighter">Message Sent!</h3>
                    <p className="text-brutal-black font-body text-sm">Thank you for contacting us. We'll get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-[10px] font-bold tracking-widest text-brutal-black uppercase mb-3">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full h-12 px-4 bg-brutal-white border border-brutal-black text-brutal-black focus:bg-brutal-black focus:text-brutal-white focus:outline-none transition-colors placeholder:text-brutal-black/40 focus:placeholder:text-brutal-bg/50"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-[10px] font-bold tracking-widest text-brutal-black uppercase mb-3">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full h-12 px-4 bg-brutal-white border border-brutal-black text-brutal-black focus:bg-brutal-black focus:text-brutal-white focus:outline-none transition-colors placeholder:text-brutal-black/40 focus:placeholder:text-brutal-bg/50"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-[10px] font-bold tracking-widest text-brutal-black uppercase mb-3">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full h-12 px-4 bg-brutal-white border border-brutal-black text-brutal-black focus:bg-brutal-black focus:text-brutal-white focus:outline-none transition-colors placeholder:text-brutal-black/40 focus:placeholder:text-brutal-bg/50"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div>
                        <label htmlFor="project" className="block text-[10px] font-bold tracking-widest text-brutal-black uppercase mb-3">
                          Interested In
                        </label>
                        <select
                          id="project"
                          name="project"
                          value={formData.project}
                          onChange={handleChange}
                          className="w-full h-12 px-4 bg-brutal-white border border-brutal-black text-brutal-black focus:bg-brutal-black focus:text-brutal-white focus:outline-none transition-colors appearance-none"
                        >
                          <option value="" className="bg-brutal-white text-brutal-black">Select a project</option>
                          <option value="residential" className="bg-brutal-white text-brutal-black">Residential</option>
                          <option value="commercial" className="bg-brutal-white text-brutal-black">Commercial</option>
                          <option value="industrial" className="bg-brutal-white text-brutal-black">Industrial</option>
                          <option value="other" className="bg-brutal-white text-brutal-black">Other Inquiry</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-[10px] font-bold tracking-widest text-brutal-black uppercase mb-3">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-brutal-white border border-brutal-black text-brutal-black focus:bg-brutal-black focus:text-brutal-white focus:outline-none transition-colors resize-none placeholder:text-brutal-black/40 focus:placeholder:text-brutal-bg/50"
                        placeholder="Tell us about your requirements..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-brutal w-full justify-between"
                    >
                      <span>Send Message</span>
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
