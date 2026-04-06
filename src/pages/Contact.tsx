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
    <div className="min-h-screen bg-luxury-black pt-24">
      {/* Header */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <span className="inline-block px-6 py-2 border border-luxury-gold/30 text-luxury-gold text-xs tracking-[0.3em] uppercase mb-6">
            Get In Touch
          </span>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-luxury-white mb-6">
            Contact Us
          </h1>
          <p className="text-luxury-muted max-w-2xl text-lg">
            Have a question or want to know more about our projects? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="pb-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Contact Info */}
            <div>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-luxury-white mb-2">Office Address</h3>
                    <p className="text-luxury-muted">
                      {settings.contactAddress || 'Nashik, Maharashtra, India'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-luxury-white mb-2">Phone</h3>
                    <p className="text-luxury-muted">
                      {settings.contactPhone || '+91 98765 43210'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-luxury-white mb-2">Email</h3>
                    <p className="text-luxury-muted">
                      {settings.contactEmail || 'info@metabuildrealty.com'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-luxury-white mb-2">Business Hours</h3>
                    <p className="text-luxury-muted">
                      Monday - Saturday: 9:00 AM - 7:00 PM<br />
                      Sunday: By Appointment
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-12 h-64 bg-luxury-charcoal border border-luxury-gray flex items-center justify-center">
                <div className="text-center text-luxury-muted">
                  <MapPin className="w-12 h-12 mx-auto mb-2 text-luxury-gold/50" />
                  <p>Map View Coming Soon</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-luxury-charcoal border border-luxury-gray p-8 lg:p-10">
                <h2 className="font-display text-2xl text-luxury-white mb-2">Send Us a Message</h2>
                <p className="text-luxury-muted text-sm mb-8">Fill out the form below and we'll get back to you shortly.</p>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold mx-auto mb-4">
                      <Send className="w-8 h-8" />
                    </div>
                    <h3 className="font-display text-xl text-luxury-white mb-2">Message Sent!</h3>
                    <p className="text-luxury-muted">Thank you for contacting us. We'll get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-xs tracking-widest text-luxury-muted uppercase mb-3">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-luxury-black border border-luxury-gray text-luxury-white focus:border-luxury-gold focus:outline-none transition-colors"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs tracking-widest text-luxury-muted uppercase mb-3">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-luxury-black border border-luxury-gray text-luxury-white focus:border-luxury-gold focus:outline-none transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-xs tracking-widest text-luxury-muted uppercase mb-3">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-luxury-black border border-luxury-gray text-luxury-white focus:border-luxury-gold focus:outline-none transition-colors"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div>
                        <label htmlFor="project" className="block text-xs tracking-widest text-luxury-muted uppercase mb-3">
                          Interested In
                        </label>
                        <select
                          id="project"
                          name="project"
                          value={formData.project}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-luxury-black border border-luxury-gray text-luxury-white focus:border-luxury-gold focus:outline-none transition-colors"
                        >
                          <option value="">Select a project</option>
                          <option value="residential">Residential</option>
                          <option value="commercial">Commercial</option>
                          <option value="industrial">Industrial</option>
                          <option value="other">Other Inquiry</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs tracking-widest text-luxury-muted uppercase mb-3">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-luxury-black border border-luxury-gray text-luxury-white focus:border-luxury-gold focus:outline-none transition-colors resize-none"
                        placeholder="Tell us about your requirements..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full btn-gold flex items-center justify-center gap-3"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
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
