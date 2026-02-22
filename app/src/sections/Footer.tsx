import { Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full py-8 bg-black border-t border-gray-800">
      <div className="w-full px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="font-inter text-gray-500 text-sm">
            <p className="flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-orange fill-orange" /> by{' '}
              <span className="text-white font-semibold">Vishal Gupta</span>
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <a
              href="#hero"
              className="font-inter text-gray-500 hover:text-orange text-sm transition-colors font-medium"
            >
              Home
            </a>
            <a
              href="#about"
              className="font-inter text-gray-500 hover:text-orange text-sm transition-colors font-medium"
            >
              About
            </a>
            <a
              href="#projects"
              className="font-inter text-gray-500 hover:text-orange text-sm transition-colors font-medium"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="font-inter text-gray-500 hover:text-orange text-sm transition-colors font-medium"
            >
              Contact
            </a>
          </nav>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 font-inter text-gray-500 hover:text-orange text-sm transition-colors font-medium"
          >
            Back to top
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-orange transition-colors">
              <ArrowUp className="w-4 h-4 group-hover:text-white transition-colors" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
