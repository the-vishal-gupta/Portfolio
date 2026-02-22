import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    name: 'Programming',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'JavaScript', level: 80 },
      { name: 'SQL', level: 85 },
    ],
  },
  {
    name: 'Databases',
    skills: [
      { name: 'MySQL', level: 85 },
      { name: 'MongoDB', level: 70 },
    ],
  },
  {
    name: 'AI Tools & Prompt Engineering',
    skills: [
      { name: 'ChatGPT', level: 90 },
      { name: 'Claude', level: 85 },
      { name: 'Prompt Design', level: 88 },
    ],
  },
  {
    name: 'Tools & Analytics',
    skills: [
      { name: 'Power BI', level: 80 },
      { name: 'Git', level: 75 },
      { name: 'Excel', level: 90 },
    ],
  },
];

const floatingSkills = [
  'Python',
  'C++',
  'SQL',
  'MySQL',
  'MongoDB',
  'HTML',
  'CSS',
  'JavaScript',
  'Power BI',
  'Git',
  'Excel',
  'Data Analysis',
  'Machine Learning',
  'Problem Solving',
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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

      // Category cards animation
      const cards = categoriesRef.current?.querySelectorAll('.skill-category');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: categoriesRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Progress bars animation
      const progressBars = sectionRef.current?.querySelectorAll('.progress-bar');
      if (progressBars) {
        progressBars.forEach((bar) => {
          const targetWidth = bar.getAttribute('data-width') || '0%';
          gsap.fromTo(
            bar,
            { width: '0%' },
            {
              width: targetWidth,
              duration: 1.2,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: bar,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }

      // Floating skills explosion animation
      const floatingTags = cloudRef.current?.querySelectorAll('.floating-tag');
      if (floatingTags) {
        gsap.fromTo(
          floatingTags,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: cloudRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Continuous floating animation
        floatingTags.forEach((tag, index) => {
          const duration = 2 + Math.random() * 2;
          const yOffset = 10 + Math.random() * 15;
          const delay = index * 0.1;

          gsap.to(tag, {
            y: -yOffset,
            duration: duration,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: delay,
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Mouse repulsion effect for floating tags
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cloudRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative w-full py-24 lg:py-32 bg-white overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-orange/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 w-full px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div ref={headingRef} className="text-center mb-16">
            <span className="inline-block text-orange font-semibold text-sm tracking-wider uppercase mb-4">
              Expertise
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6 tracking-tight leading-[1.1]">
              Technical <span className="text-orange">Arsenal</span>
            </h2>
            <p className="font-inter text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              A comprehensive toolkit of technologies and skills I've mastered
              throughout my academic and professional journey.
            </p>
          </div>

          {/* Skills Categories */}
          <div
            ref={categoriesRef}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          >
            {skillCategories.map((category, catIndex) => (
              <div
                key={catIndex}
                className="skill-category bg-gray-50 rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-lg font-bold text-black mb-4 tracking-tight">
                  {category.name}
                </h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between mb-1">
                        <span className="font-inter text-sm font-semibold text-gray-700">
                          {skill.name}
                        </span>
                        <span className="text-sm text-orange font-bold">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="progress-bar h-full bg-gradient-to-r from-orange to-orange-light rounded-full"
                          data-width={`${skill.level}%`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Floating Skills Cloud */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-black mb-2 tracking-tight">Skills Cloud</h3>
            <p className="font-inter text-gray-600 text-sm leading-relaxed">
              Hover over the cloud to interact with my skills
            </p>
          </div>

          <div
            ref={cloudRef}
            className="relative h-80 bg-gray-50 rounded-3xl overflow-hidden"
            onMouseMove={handleMouseMove}
          >
            {floatingSkills.map((skill, index) => {
              // Calculate position in a radial pattern
              const angle = (index / floatingSkills.length) * Math.PI * 2;
              const radius = 100 + (index % 3) * 40;
              const x = 50 + Math.cos(angle) * (radius / 4);
              const y = 50 + Math.sin(angle) * (radius / 3);

              // Calculate distance from mouse for repulsion effect
              const tagX = (x / 100) * (cloudRef.current?.offsetWidth || 0);
              const tagY = (y / 100) * (cloudRef.current?.offsetHeight || 0);
              const distance = Math.sqrt(
                Math.pow(mousePos.x - tagX, 2) + Math.pow(mousePos.y - tagY, 2)
              );
              const repulsionStrength = Math.max(0, 1 - distance / 150);
              const offsetX =
                ((mousePos.x - tagX) / distance) * repulsionStrength * 30 || 0;
              const offsetY =
                ((mousePos.y - tagY) / distance) * repulsionStrength * 30 || 0;

              return (
                <div
                  key={index}
                  className="floating-tag absolute px-4 py-2 bg-white rounded-full shadow-md text-sm font-semibold text-gray-700 hover:bg-orange hover:text-white cursor-pointer transition-colors duration-300"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: `translate(-50%, -50%) translate(${-offsetX}px, ${-offsetY}px)`,
                    zIndex: Math.floor(repulsionStrength * 10),
                  }}
                >
                  {skill}
                </div>
              );
            })}

            {/* Center decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-orange/10 rounded-full blur-2xl" />
          </div>

          {/* Soft Skills */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-black text-center mb-8 tracking-tight">
              Soft Skills
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                'Analytical Thinking',
                'Team Collaboration',
                'Adaptability',
                'Leadership',
                'Problem Solving',
                'Time Management',
              ].map((skill, index) => (
                <div
                  key={index}
                  className="skill-tag px-6 py-3 bg-white border-2 border-gray-100 rounded-full text-gray-700 font-semibold hover:border-orange hover:bg-orange hover:text-white transition-all duration-300"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
