import { Car, ChevronUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-800 py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400">
              <Car className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-white tracking-tight">
                India's 10 Most Sold Cars Till Now
              </p>
              <p className="text-xs text-neutral-500">
                A retrospective on vehicles that motorized the nation
              </p>
            </div>
          </div>

          {/* Quick links & Back to top */}
          <div className="flex items-center gap-6 text-xs">
            <a
              href="#home"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Home
            </a>
            <a
              href="#top-10"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Top 10 Cars
            </a>
            <a
              href="#about"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              About
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-800 transition-colors"
              aria-label="Scroll back to top"
            >
              <span>Top</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Required Copyright & Disclaimer notice */}
        <div className="mt-8 pt-6 border-t border-neutral-900 text-center sm:text-left text-xs text-neutral-500">
          <p>© 2026 India's 10 Most Sold Cars. For educational and informational purposes only.</p>
        </div>
      </div>
    </footer>
  );
}
