import { Info, HelpCircle, FileText, CheckCircle2 } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 pt-12 pb-14 border-t border-neutral-200 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl sm:rounded-3xl bg-neutral-50 border border-neutral-200 p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 text-amber-400 flex items-center justify-center shadow-xs">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Editorial Note
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                About This Blog
              </h2>
            </div>
          </div>

          <div className="prose prose-neutral max-w-none text-neutral-700 text-base sm:text-lg leading-relaxed space-y-4">
            <p>
              This website is a curated overview of some of India's most sold and influential cars,
              based on historical sales data, market reports, and popular models up to 2026. Prices
              and specifications are indicative and may vary by city, variant, and time.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-neutral-200/80 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-600">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Data Sources:</strong> Historical manufacturer disclosures, SIAM automotive industry benchmarks, and contemporary dealer market records.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <HelpCircle className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
              <span>
                <strong>Disclaimer:</strong> Mention of trademarks, names, and logos is strictly for editorial, informational, and identification purposes.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
