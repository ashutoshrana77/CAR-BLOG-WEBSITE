import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { IntroSection } from './components/IntroSection.tsx';
import { CarSection } from './components/CarSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { Footer } from './components/Footer.tsx';
import { CARS_DATA } from './data/cars.ts';
import { ChevronUp } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [showFloatingTop, setShowFloatingTop] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle floating back-to-top button
      setShowFloatingTop(window.scrollY > 500);

      // Simple active section detection
      const scrollPosition = window.scrollY + 120;
      const aboutElement = document.getElementById('about');

      if (aboutElement && scrollPosition >= aboutElement.offsetTop) {
        setActiveSection('about');
        return;
      }

      // Check cars
      let currentCar = '';
      for (const car of CARS_DATA) {
        const el = document.getElementById(car.id);
        if (el && scrollPosition >= el.offsetTop) {
          currentCar = car.id;
        }
      }

      if (currentCar) {
        setActiveSection(currentCar);
      } else if (window.scrollY < 300) {
        setActiveSection('home');
      } else {
        setActiveSection('top-10');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa] text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Sticky Dark Header with Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Intro Section Above the List */}
      <IntroSection />

      {/* Main Content Area: 10 Car Model Sections */}
      <main id="cars-list" className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="space-y-4">
          {CARS_DATA.map((car) => (
            <CarSection
              key={car.id}
              car={car}
              totalCars={CARS_DATA.length}
            />
          ))}
        </div>
      </main>

      {/* About Section at Bottom */}
      <AboutSection />

      {/* Simple Footer */}
      <Footer />

      {/* Floating Scroll to Top Button for Quick Mobile & Desktop Navigation */}
      {showFloatingTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-neutral-900 text-white shadow-lg hover:bg-neutral-800 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400"
          aria-label="Scroll back to top"
          id="floating-scroll-top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
