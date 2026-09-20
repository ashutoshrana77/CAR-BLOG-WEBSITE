import { ArrowDown, Award, Calendar, Compass, ShieldCheck, Sparkles } from 'lucide-react';
import { CARS_DATA } from '../data/cars.ts';

export function IntroSection() {
  const scrollToFirstCar = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('maruti-800');
    if (element) {
      const navOffset = 76;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      window.history.pushState(null, '', '#maruti-800');
    }
  };

  const scrollToCar = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 76;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <section id="home" className="relative pt-10 pb-12 sm:pt-14 sm:pb-16 bg-white border-b border-neutral-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Pill */}
        <div className="flex flex-wrap items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-600">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-100 text-neutral-800 rounded-full border border-neutral-300">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            Automotive Retrospective
          </span>
          <span className="text-neutral-400">•</span>
          <span className="inline-flex items-center gap-1 text-neutral-500">
            <Calendar className="w-3.5 h-3.5" /> Updated 2026
          </span>
          <span className="text-neutral-400">•</span>
          <span className="text-neutral-500">Curated Historical Overview</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight leading-[1.15] mb-4">
          India's 10 Most Sold Cars Till Now
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl font-medium text-neutral-700 leading-snug mb-5">
          From the iconic Maruti 800 to the latest SUVs, these cars shaped how India moves.
        </p>

        {/* 2-3 line Intro Paragraph */}
        <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-3xl mb-8">
          Over the decades, a few models have dominated Indian roads, combining affordability,
          reliability, and mass appeal. This blog highlights 10 of the most sold and influential cars in
          India, along with their typical price, average life, and why they became so popular.
        </p>

        {/* Quick Highlights / Key Takeaways Box */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200 mb-8 text-neutral-800">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-white border border-neutral-200 text-neutral-900 shadow-xs">
              <Compass className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-500 uppercase tracking-wide">Historical Span</p>
              <p className="text-sm font-semibold text-neutral-900">1983 to Present Day</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-white border border-neutral-200 text-neutral-900 shadow-xs">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-500 uppercase tracking-wide">Longevity Benchmark</p>
              <p className="text-sm font-semibold text-neutral-900">12–15+ Years Avg. Life</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-white border border-neutral-200 text-neutral-900 shadow-xs">
              <Sparkles className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-500 uppercase tracking-wide">Cumulative Sales</p>
              <p className="text-sm font-semibold text-neutral-900">Millions Across Generations</p>
            </div>
          </div>
        </div>

        {/* Table of Contents Pill Ribbon */}
        <div id="top-10" className="pt-2">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Quick Navigation (Click to Jump)
            </span>
            <a
              href="#maruti-800"
              onClick={scrollToFirstCar}
              className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-900 hover:text-amber-700 transition-colors"
            >
              <span>Start Reading #1</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="flex flex-wrap gap-2">
            {CARS_DATA.map((car) => (
              <a
                key={car.id}
                href={`#${car.id}`}
                onClick={(e) => scrollToCar(e, car.id)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-xs font-medium text-neutral-800 transition-all hover:shadow-xs active:scale-95"
              >
                <span className="w-4 h-4 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px] font-bold">
                  {car.rank}
                </span>
                <span>{car.name.split('(')[0].trim()}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
