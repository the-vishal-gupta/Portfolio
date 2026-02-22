import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Github, Mail, ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const greetingRef = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set([greetingRef.current, subheadingRef.current, ctaRef.current], {
        opacity: 0,
        y: 30,
      });
      gsap.set(socialsRef.current?.children || [], {
        opacity: 0,
        y: 20,
      });

      // Image mask reveal with scale
      gsap.fromTo(
        imageRef.current,
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
          scale: 1.2,
        },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          scale: 1,
          duration: 1.4,
          ease: 'expo.out',
        }
      );

      // Headline character animation
      if (headlineRef.current) {
        const chars = headlineRef.current.querySelectorAll('.char');
        gsap.fromTo(
          chars,
          {
            y: '100%',
            opacity: 0,
          },
          {
            y: '0%',
            opacity: 1,
            duration: 1,
            stagger: 0.03,
            ease: 'expo.out',
            delay: 0.4,
          }
        );
      }

      // Greeting fade in
      gsap.to(greetingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'expo.out',
        delay: 0.2,
      });

      // Subheading typewriter effect
      gsap.to(subheadingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'expo.out',
        delay: 0.8,
      });

      // CTA button pop
      gsap.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
        delay: 1,
      });

      // Social icons stagger
      gsap.to(socialsRef.current?.children || [], {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'expo.out',
        delay: 1.2,
      });

      // Scroll parallax for image
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          if (imageRef.current) {
            gsap.to(imageRef.current, {
              y: self.progress * 150,
              duration: 0.1,
            });
          }
        },
      });

      // Headline blur on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '50% top',
        scrub: true,
        onUpdate: (self) => {
          if (headlineRef.current) {
            gsap.to(headlineRef.current, {
              filter: `blur(${self.progress * 10}px)`,
              opacity: 1 - self.progress,
              duration: 0.1,
            });
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split headline into characters
  const headlineText = 'Turning Data into Impactful Solutions';
  const headlineChars = headlineText.split('').map((char, i) => (
    <span key={i} className="char inline-block overflow-hidden">
      <span className="inline-block">{char === ' ' ? '\u00A0' : char}</span>
    </span>
  ));

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full flex items-center overflow-hidden bg-white"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-orange-50/30" />

      <div className="relative z-10 w-full px-6 sm:px-8 lg:px-16 xl:px-24 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="order-2 lg:order-1 space-y-6">
            <span
              ref={greetingRef}
              className="inline-block text-orange font-semibold text-base sm:text-lg tracking-wide uppercase"
            >
              Hello! I'm Vishal Gupta
            </span>

            <h1
              ref={headlineRef}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-black leading-[1.1] tracking-tight"
            >
              {headlineChars}
            </h1>

            <p
              ref={subheadingRef}
              className="text-xl sm:text-2xl text-dark-gray font-semibold tracking-tight"
            >
              Data Analyst & AIML Engineer
            </p>

            <p className="font-inter text-gray-600 text-base sm:text-lg max-w-lg leading-relaxed">
              Final-year B.E. student in Artificial Intelligence and Machine Learning,
              passionate about transforming complex data into actionable insights.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                ref={ctaRef}
                onClick={scrollToProjects}
                className="magnetic-btn relative z-10 px-8 py-4 bg-black text-white font-semibold rounded-full overflow-hidden transition-colors duration-300 hover:text-white group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </span>
              </button>

              <a
                href="#contact"
                className="px-8 py-4 border-2 border-black text-black font-semibold rounded-full hover:bg-black hover:text-white transition-all duration-300"
              >
                Get in Touch
              </a>
            </div>

            {/* Social Links */}
            <div ref={socialsRef} className="flex gap-4 pt-6">
              <a
                href="https://www.linkedin.com/in/vishal-gupta-3520b0399"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-orange hover:text-white transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/the-vishal-gupta"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-orange hover:text-white transition-all duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:vishalgupta10528@gmail.com"
                className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-orange hover:text-white transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="order-1 lg:order-2 relative">
            <div
              ref={imageRef}
              className="relative w-full aspect-square max-w-lg mx-auto lg:max-w-none animate-breathe"
            >
              {/* Decorative elements */}
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-orange/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-orange/20 rounded-full blur-3xl" />

              {/* Main image */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/hero-portrait.jpg"
                  alt="Vishal Gupta"
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">1+</span>
                  </div>
                  <div>
                    <p className="font-semibold text-black">Years of</p>
                    <p className="text-gray-600 text-sm">Experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2">
        <span className="text-sm text-gray-500">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-orange rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
