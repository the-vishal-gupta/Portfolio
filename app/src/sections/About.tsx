import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Briefcase, Calendar, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    school: 'Universal College of Engineering, Mumbai',
    degree: 'Bachelor of Engineering (AIML)',
    period: '2022 – Present',
    description: 'Currently pursuing final year of B.E. in Artificial Intelligence and Machine Learning.',
  },
  {
    school: 'Maharashtra State Board of Technical Education',
    degree: 'Diploma in Information Technology',
    period: '2019 – 2022',
    description: 'Completed diploma with focus on software development and database management.',
  },
];

const experience = [
  {
    company: 'Uni Gaming Cafe',
    role: 'Front Desk Executive',
    period: 'June 2025 – Present',
    description: 'Managing front-end operations, billing, and customer coordination. Implemented automated record systems using Python and Excel.',
  },
  {
    company: 'Sevapremi',
    role: 'Team Lead (Data Analytics)',
    period: 'February 2025 – May 2025',
    description: 'Managing and leading a data analytics team, performing insights on data, presenting analysis to senior management.',
  },
  {
    company: 'Accelus Service Pvt. Ltd',
    role: 'Database Engineer Intern',
    period: 'August 2022 – October 2022',
    description: 'Worked on database optimization, query performance tuning, and data migration projects.',
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const expRef = useRef<HTMLDivElement>(null);

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

      // Bio animation
      gsap.fromTo(
        bioRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: bioRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Timeline items animation
      const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');
      if (timelineItems) {
        gsap.fromTo(
          timelineItems,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Experience items animation
      const expItems = expRef.current?.querySelectorAll('.exp-item');
      if (expItems) {
        gsap.fromTo(
          expItems,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: expRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Timeline line draw animation
      const timelineLine = sectionRef.current?.querySelector('.timeline-line-svg');
      if (timelineLine) {
        gsap.fromTo(
          timelineLine,
          { strokeDashoffset: 1000 },
          {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full py-24 lg:py-32 bg-white overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 w-full px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2
              ref={headingRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6 tracking-tight leading-[1.1]"
            >
              About <span className="text-orange">Me</span>
            </h2>
            <p
              ref={bioRef}
              className="font-inter text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              I'm a final-year B.E. student in Artificial Intelligence and Machine Learning
              with a passion for data analytics and software development. My journey started
              with a diploma in IT, and I've since gained hands-on experience in data analytics,
              database engineering, and web development.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Education Section */}
            <div ref={timelineRef} className="relative">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-orange" />
                </div>
                <h3 className="text-2xl font-bold text-black tracking-tight">Education</h3>
              </div>

              {/* Timeline line */}
              <svg
                className="absolute left-6 top-20 w-0.5 h-[calc(100%-5rem)]"
                preserveAspectRatio="none"
              >
                <line
                  className="timeline-line-svg"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="100%"
                  stroke="#ff6b35"
                  strokeWidth="2"
                  strokeDasharray="1000"
                  strokeDashoffset="1000"
                />
              </svg>

              <div className="space-y-8 pl-16">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="timeline-item relative bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 group"
                  >
                    {/* Timeline dot */}
                    <div className="absolute -left-[2.65rem] top-8 w-4 h-4 bg-orange rounded-full border-4 border-white shadow-md group-hover:scale-125 transition-transform" />

                    <div className="flex items-center gap-2 text-orange text-sm font-medium mb-2">
                      <Calendar className="w-4 h-4" />
                      {edu.period}
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-black mb-1 tracking-tight">{edu.degree}</h4>
                    <p className="font-inter text-gray-700 font-medium mb-2 text-sm sm:text-base">{edu.school}</p>
                    <p className="font-inter text-gray-600 text-sm leading-relaxed">{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Section */}
            <div ref={expRef}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-orange" />
                </div>
                <h3 className="text-2xl font-bold text-black tracking-tight">Experience</h3>
              </div>

              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div
                    key={index}
                    className="exp-item bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:border-orange/20 transition-all duration-300 group"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <h4 className="text-lg sm:text-xl font-bold text-black group-hover:text-orange transition-colors tracking-tight">
                        {exp.role}
                      </h4>
                      <span className="text-sm text-orange font-medium bg-orange/10 px-3 py-1 rounded-full">
                        {exp.period}
                      </span>
                    </div>
                    <p className="font-inter text-gray-700 font-medium mb-2 flex items-center gap-2 text-sm sm:text-base">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {exp.company}
                    </p>
                    <p className="font-inter text-gray-600 text-sm leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
