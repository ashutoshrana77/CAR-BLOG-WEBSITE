import { useState } from 'react';
import { Menu, X, Car, ChevronDown } from 'lucide-react';
import { CARS_DATA } from '../data/cars.ts';

interface NavbarProps {
  activeSection: string;
}

export function Navbar({ activeSection }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const scrollToAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setDropdownOpen(false);

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 76;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      window.history.pushState(null, '', href);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-neutral-950/95 backdrop-blur-md text-white border-b border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => scrollToAnchor(e, '#home')}
            className="flex items-center gap-2.5 group"
            id="brand-link"
          >
            <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-amber-400 group-hover:border-amber-400/50 transition-colors">
              <Car className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base sm:text-lg tracking-tight text-white leading-tight">
                India's Top 10 Cars
              </span>
              <span className="text-xs text-neutral-400 font-medium tracking-wide uppercase">
                All-Time Bestsellers
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            <a
              href="#home"
              onClick={(e) => scrollToAnchor(e, '#home')}
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeSection === 'home'
                  ? 'bg-neutral-800 text-white'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
              }`}
            >
              Home
            </a>

            {/* Quick Car Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === 'top-10' || activeSection.startsWith('car-')
                    ? 'bg-neutral-800 text-white'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
                }`}
                aria-expanded={dropdownOpen}
              >
                <span>Top 10 Models</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div
                  className="absolute left-0 mt-2 w-72 bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl py-2 z-50 max-h-96 overflow-y-auto"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-xs font-semibold text-neutral-400 uppercase tracking-wider border-b border-neutral-800 mb-1">
                    Select Car Model
                  </div>
                  {CARS_DATA.map((car) => (
                    <a
                      key={car.id}
                      href={`#${car.id}`}
                      onClick={(e) => scrollToAnchor(e, `#${car.id}`)}
                      className="flex items-center gap-3 px-3.5 py-2 text-xs hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
                    >
                      <span className="w-5 h-5 rounded-full bg-neutral-800 text-neutral-300 flex items-center justify-center font-bold text-[10px]">
                        {car.rank}
                      </span>
                      <span className="truncate font-medium">{car.name}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#top-10"
              onClick={(e) => scrollToAnchor(e, '#top-10')}
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeSection === 'top-10'
                  ? 'bg-neutral-800 text-white'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
              }`}
            >
              Top 10 List
            </a>

            <a
              href="#about"
              onClick={(e) => scrollToAnchor(e, '#about')}
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeSection === 'about'
                  ? 'bg-neutral-800 text-white'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
              }`}
            >
              About
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
              aria-label="Toggle navigation menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-950 border-t border-neutral-800 px-4 pt-3 pb-6 space-y-2">
          <a
            href="#home"
            onClick={(e) => scrollToAnchor(e, '#home')}
            className="block px-3 py-2.5 rounded-lg text-base font-medium text-neutral-200 hover:text-white hover:bg-neutral-900"
          >
            Home
          </a>
          <a
            href="#top-10"
            onClick={(e) => scrollToAnchor(e, '#top-10')}
            className="block px-3 py-2.5 rounded-lg text-base font-medium text-neutral-200 hover:text-white hover:bg-neutral-900"
          >
            Top 10 Cars
          </a>
          <div className="pt-2 pb-1 border-t border-neutral-800">
            <span className="px-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Jump to Car:
            </span>
            <div className="grid grid-cols-2 gap-1.5 mt-2">
              {CARS_DATA.map((car) => (
                <a
                  key={car.id}
                  href={`#${car.id}`}
                  onClick={(e) => scrollToAnchor(e, `#${car.id}`)}
                  className="px-2.5 py-1.5 rounded text-xs text-neutral-300 hover:text-white hover:bg-neutral-900 truncate"
                >
                  #{car.rank} {car.name.split(' ')[0]} {car.name.split(' ')[1] || ''}
                </a>
              ))}
            </div>
          </div>
          <a
            href="#about"
            onClick={(e) => scrollToAnchor(e, '#about')}
            className="block px-3 py-2.5 rounded-lg text-base font-medium text-neutral-200 hover:text-white hover:bg-neutral-900 border-t border-neutral-800"
          >
            About This Blog
          </a>
        </div>
      )}
    </header>
  );
}
