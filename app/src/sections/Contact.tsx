import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, Linkedin, Github, ArrowUpRight } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form lines animation
      const formLines = formRef.current?.querySelectorAll('.form-line');
      if (formLines) {
        gsap.fromTo(
          formLines,
          { width: '0%' },
          {
            width: '100%',
            duration: 1,
            stagger: 0.1,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Info items animation
      const infoItems = infoRef.current?.querySelectorAll('.info-item');
      if (infoItems) {
        gsap.fromTo(
          infoItems,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: infoRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success('Message sent successfully! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full py-24 lg:py-32 bg-black overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div ref={headingRef} className="text-center mb-16">
            <span className="inline-block text-orange font-semibold text-sm tracking-wider uppercase mb-4">
              Get in Touch
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
              Let's Build Something{' '}
              <span className="text-orange">Amazing</span>
            </h2>
            <p className="font-inter text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              I'm currently open for internships and freelance opportunities.
              Let's discuss how we can work together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              <div className="relative">
                <label className="font-inter block text-gray-400 text-sm mb-2 font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent text-white text-base font-medium py-3 focus:outline-none"
                  placeholder="John Doe"
                />
                <div className="form-line h-0.5 bg-gray-700 relative">
                  <div className="absolute inset-y-0 left-0 w-0 bg-orange transition-all duration-300 peer-focus:w-full" />
                </div>
                <div
                  className="absolute bottom-0 left-0 h-0.5 bg-orange transition-all duration-300"
                  style={{
                    width: formData.name ? '100%' : '0%',
                  }}
                />
              </div>

              <div className="relative">
                <label className="font-inter block text-gray-400 text-sm mb-2 font-medium">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent text-white text-base font-medium py-3 focus:outline-none"
                  placeholder="john@example.com"
                />
                <div className="form-line h-0.5 bg-gray-700" />
                <div
                  className="absolute bottom-0 left-0 h-0.5 bg-orange transition-all duration-300"
                  style={{
                    width: formData.email ? '100%' : '0%',
                  }}
                />
              </div>

              <div className="relative">
                <label className="font-inter block text-gray-400 text-sm mb-2 font-medium">
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-transparent text-white text-base font-medium py-3 focus:outline-none resize-none"
                  placeholder="Tell me about your project..."
                />
                <div className="form-line h-0.5 bg-gray-700" />
                <div
                  className="absolute bottom-0 left-0 h-0.5 bg-orange transition-all duration-300"
                  style={{
                    width: formData.message ? '100%' : '0%',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-orange text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </span>
                <Send
                  className={`w-5 h-5 relative z-10 transition-transform duration-300 ${
                    isSubmitting ? 'translate-x-8 opacity-0' : 'group-hover:translate-x-1'
                  }`}
                />
                {isSubmitting && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  </div>
                )}
              </button>
            </form>

            {/* Contact Info */}
            <div ref={infoRef} className="space-y-8">
              <div className="info-item flex items-start gap-4">
                <div className="w-14 h-14 bg-orange/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-orange" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 tracking-tight">Email</h4>
                  <a
                    href="mailto:vishalgupta10528@gmail.com"
                    className="font-inter text-gray-400 hover:text-orange transition-colors link-hover text-sm"
                  >
                    vishalgupta10528@gmail.com
                  </a>
                </div>
              </div>

              <div className="info-item flex items-start gap-4">
                <div className="w-14 h-14 bg-orange/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-orange" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 tracking-tight">Phone</h4>
                  <a
                    href="tel:+919005542834"
                    className="font-inter text-gray-400 hover:text-orange transition-colors link-hover text-sm"
                  >
                    +91-9005542834
                  </a>
                </div>
              </div>

              <div className="info-item flex items-start gap-4">
                <div className="w-14 h-14 bg-orange/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-orange" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 tracking-tight">Location</h4>
                  <p className="font-inter text-gray-400 text-sm">Mumbai, Maharashtra, India</p>
                </div>
              </div>

              {/* Social Links */}
              <div className="info-item pt-8 border-t border-gray-800">
                <h4 className="text-white font-bold mb-4 tracking-tight">Connect with me</h4>
                <div className="flex gap-4">
                  <a
                    href="https://www.linkedin.com/in/vishal-gupta-3520b0399"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-6 py-3 bg-gray-800 rounded-full text-gray-300 hover:bg-orange hover:text-white transition-all duration-300"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <a
                    href="https://github.com/the-vishal-gupta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-6 py-3 bg-gray-800 rounded-full text-gray-300 hover:bg-orange hover:text-white transition-all duration-300"
                  >
                    <Github className="w-5 h-5" />
                    <span>GitHub</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
