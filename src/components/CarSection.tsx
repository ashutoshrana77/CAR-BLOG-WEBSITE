import { useState, useEffect } from 'react';
import { CarItem } from '../types.ts';
import { IndianRupee, Clock, TrendingUp, ChevronUp, Share2, Check, Maximize2, X, Sparkles } from 'lucide-react';

interface CarSectionProps {
  car: CarItem;
  totalCars: number;
}

export function CarSection({ car, totalCars }: CarSectionProps) {
  const [copied, setCopied] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxOpen]);

  const copyCarLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#${car.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState(null, '', '#top-10');
  };

  return (
    <article
      id={car.id}
      className="scroll-mt-24 bg-white rounded-2xl sm:rounded-3xl border border-neutral-200/80 shadow-xs sm:shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md mb-10 sm:mb-14"
    >
      {/* Anchor helper for secondary alias IDs */}
      {car.id === 'alto' && <span id="maruti-alto" className="sr-only" />}
      {car.id === 'swift' && <span id="maruti-swift" className="sr-only" />}
      {car.id === 'hyundai-creta' && <span id="creta" className="sr-only" />}
      {car.id === 'tata-nexon' && <span id="nexon" className="sr-only" />}
      {car.id === 'maruti-wagon-r' && <span id="wagon-r" className="sr-only" />}
      {car.id === 'maruti-dzire' && <span id="dzire" className="sr-only" />}
      {car.id === 'mahindra-scorpio' && <span id="scorpio" className="sr-only" />}
      {car.id === 'maruti-baleno' && <span id="baleno" className="sr-only" />}
      {car.id === 'tata-punch' && <span id="punch" className="sr-only" />}

      {/* Card Header Bar */}
      <div className="px-5 py-4 sm:px-8 sm:py-5 border-b border-neutral-100 flex flex-wrap items-center justify-between gap-3 bg-neutral-50/50">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-neutral-900 text-white font-bold text-sm tracking-wide shadow-xs">
            #{car.rank}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                {car.manufacturer}
              </span>
              {car.bodyType && (
                <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-neutral-200/70 text-neutral-700">
                  {car.bodyType}
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
              {car.name}
            </h2>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60 border border-neutral-200 transition-colors cursor-pointer"
            title="View photo in high resolution"
            aria-label={`View high-res photo of ${car.name}`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Full-Res</span>
          </button>

          <button
            type="button"
            onClick={copyCarLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60 border border-neutral-200 transition-colors cursor-pointer"
            title="Copy link to this car"
            aria-label={`Copy link to ${car.name}`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Large Hero Image in native 16:9 widescreen */}
      <div 
        onClick={() => setLightboxOpen(true)}
        className="relative w-full aspect-16/9 bg-neutral-900 overflow-hidden group cursor-zoom-in"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setLightboxOpen(true)}
        aria-label={`Click to enlarge high quality image of ${car.name}`}
      >
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 text-neutral-400 text-xs font-medium animate-pulse">
            Loading ultra high-definition image...
          </div>
        )}
        {imageError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-900 text-neutral-400 p-4 text-center">
            <span className="text-sm font-semibold text-white">{car.name}</span>
            <span className="text-xs text-neutral-500 mt-1">Image preview unavailable</span>
          </div>
        ) : (
          <img
            src={car.image}
            alt={`${car.name} by ${car.manufacturer} - High-definition automotive editorial photography`}
            loading={car.rank <= 2 ? 'eager' : 'lazy'}
            decoding="async"
            referrerPolicy="no-referrer"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 filter group-hover:contrast-[1.03] ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Top-Right Ultra HD Badge */}
        <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1.5 backdrop-blur-md bg-neutral-950/75 text-white/95 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide border border-white/15 shadow-sm transition-opacity group-hover:bg-neutral-950/90">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Ultra HD 4K</span>
        </div>

        {/* Visual Rank Tag & Zoom Overlay */}
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 flex items-center gap-2">
          <div className="backdrop-blur-md bg-neutral-950/80 text-white px-3 py-1 rounded-lg text-xs font-semibold tracking-wide border border-white/10 shadow-sm">
            Top 10 Indian Automotive Icons • #{car.rank} of {totalCars}
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center gap-1 backdrop-blur-md bg-white/90 text-neutral-900 px-2.5 py-1 rounded-lg text-xs font-semibold shadow-sm">
            <Maximize2 className="w-3 h-3" />
            <span>Click to zoom</span>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Full screen image of ${car.name}`}
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 transition-all"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl"
          >
            {/* Modal Header */}
            <div className="px-4 py-3 bg-neutral-950/80 border-b border-neutral-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">{car.name}</h3>
                <p className="text-xs text-neutral-400">{car.manufacturer} • Rank #{car.rank} Best-Seller</p>
              </div>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="p-1.5 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 transition-colors cursor-pointer"
                aria-label="Close full view"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
              <img
                src={car.image}
                alt={`${car.name} full high-resolution view`}
                className="max-h-[75vh] w-auto max-w-full object-contain select-none"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Modal Caption */}
            <div className="px-4 py-2.5 bg-neutral-950 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
              <span>{car.tagline}</span>
              <span className="text-neutral-500 font-mono text-[11px]">Studio High-Definition Capture</span>
            </div>
          </div>
        </div>
      )}

      {/* Content Body */}
      <div className="p-5 sm:p-8 space-y-6">
        {/* Key Metrics / Specification Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Cumulative Sales */}
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
            <div className="flex items-center gap-2 mb-1 text-neutral-500">
              <TrendingUp className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Approx. Cumulative Sales
              </span>
            </div>
            <p className="text-sm font-semibold text-neutral-900 leading-snug">
              {car.approxSales}
            </p>
          </div>

          {/* Ex-Showroom Price */}
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
            <div className="flex items-center gap-2 mb-1 text-neutral-500">
              <IndianRupee className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Ex-Showroom Price Range
              </span>
            </div>
            <p className="text-sm font-semibold text-neutral-900 leading-snug">
              {car.price}
            </p>
          </div>

          {/* Average Life */}
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
            <div className="flex items-center gap-2 mb-1 text-neutral-500">
              <Clock className="w-4 h-4 text-sky-600" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Average Life
              </span>
            </div>
            <p className="text-sm font-semibold text-neutral-900 leading-snug">
              {car.averageLife}
            </p>
          </div>
        </div>

        {/* 2–3 Short Paragraphs of Context */}
        <div className="pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
            Context & Legacy
          </h3>
          <div className="space-y-3.5 text-base sm:text-[17px] text-neutral-700 leading-relaxed font-normal max-w-prose">
            {car.paragraphs.map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </div>
        </div>

        {/* Section Card Footer / Navigation Aid */}
        <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
          <span className="font-medium">
            Car #{car.rank} of {totalCars} • {car.manufacturer}
          </span>
          <a
            href="#top-10"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 font-semibold text-neutral-700 hover:text-neutral-950 transition-colors"
          >
            <span>Back to top</span>
            <ChevronUp className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
}
