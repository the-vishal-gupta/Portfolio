import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Code2, Plane, BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'DSA Visualizer',
    subtitle: 'Web Application',
    description:
      'An interactive web-based tool that visualizes various Data Structures and Algorithms in real-time. Built with HTML, CSS, and JavaScript to help students understand complex algorithms through visual representation.',
    image: '/project-dsa.jpg',
    tags: ['HTML', 'CSS', 'JavaScript', 'Algorithms'],
    icon: Code2,
    link: '#',
    github: '#',
  },
  {
    id: 2,
    title: 'Tourify AI',
    subtitle: 'Travel Assistant',
    description:
      'An intelligent travel planning web application that provides personalized travel suggestions based on user preferences. Features include destination recommendations, itinerary planning, and budget optimization.',
    image: '/project-tourify.jpg',
    tags: ['React', 'AI/ML', 'API Integration', 'UI/UX'],
    icon: Plane,
    link: '#',
    github: '#',
  },
  {
    id: 3,
    title: 'AIML Knowledge Base',
    subtitle: 'Final Year Project',
    description:
      'A comprehensive AI & Machine Learning knowledge base system designed for academic and research learning support. Features include searchable resources, learning modules, and interactive tutorials.',
    image: '/project-aiml.jpg',
    tags: ['Python', 'NLP', 'Machine Learning', 'Flask'],
    icon: BookOpen,
    link: '#',
    github: '#',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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

      // Cards 3D flip animation
      const cards = cardsRef.current?.querySelectorAll('.project-card');
      if (cards) {
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              rotateX: 45,
              y: 100,
            },
            {
              opacity: 1,
              rotateX: 0,
              y: 0,
              duration: 1,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
              delay: index * 0.15,
            }
          );
        });
      }

      // Parallax effect for cards
      if (cards) {
        cards.forEach((card, index) => {
          const parallaxAmount = [-50, -100, -30][index] || -50;
          ScrollTrigger.create({
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            onUpdate: (self) => {
              gsap.to(card, {
                y: self.progress * parallaxAmount,
                duration: 0.1,
              });
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardId: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.3,
      ease: 'power2.out',
    });

    setHoveredCard(cardId);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
    setHoveredCard(null);
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full py-24 lg:py-32 bg-gray-50 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-orange/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 w-full px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div ref={headingRef} className="text-center mb-16">
            <span className="inline-block text-orange font-semibold text-sm tracking-wider uppercase mb-4">
              Portfolio
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6 tracking-tight leading-[1.1]">
              Featured <span className="text-orange">Projects</span>
            </h2>
            <p className="font-inter text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              A showcase of my recent work in web development, data analytics,
              and AI/ML applications.
            </p>
          </div>

          {/* Projects Grid */}
          <div
            ref={cardsRef}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            style={{ perspective: '2000px' }}
          >
            {projects.map((project) => {
              const Icon = project.icon;
              return (
                <div
                  key={project.id}
                  className="project-card group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500"
                  style={{ transformStyle: 'preserve-3d' }}
                  onMouseMove={(e) => handleMouseMove(e, project.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Icon badge */}
                    <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                      <Icon className="w-6 h-6 text-orange" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <span className="text-orange text-sm font-semibold uppercase tracking-wide">
                      {project.subtitle}
                    </span>
                    <h3 className="text-xl font-bold text-black mt-1 mb-3 group-hover:text-orange transition-colors tracking-tight">
                      {project.title}
                    </h3>
                    <p className="font-inter text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full uppercase tracking-wide"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic shadow */}
                  {hoveredCard === project.id && (
                    <div
                      className="absolute inset-0 pointer-events-none rounded-3xl"
                      style={{
                        boxShadow: '0 25px 50px -12px rgba(255, 107, 53, 0.25)',
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
