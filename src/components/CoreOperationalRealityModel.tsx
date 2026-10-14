// src/components/CoreOperationalRealityModel.tsx
import React from 'react';

export interface CardItem {
  id: string;
  title: string;
  subtitle: string;
  type: 'neutral' | 'warning' | 'hero';
  badge?: string;
  bullets: string[];
  callout: string;
}

export interface ComparisonGridProps {
  sectionHeadline: string;
  sectionSubdeck: string;
  primaryCtaUrl: string;
  cards: CardItem[];
}

export const CoreOperationalRealityModel: React.FC<ComparisonGridProps> = ({
  sectionHeadline,
  sectionSubdeck,
  primaryCtaUrl,
  cards,
}) => {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto font-sans">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {sectionHeadline}
        </h2>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          {sectionSubdeck}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {cards.map((card) => {
          const isHero = card.type === 'hero';
          return (
            <div
              key={card.id}
              className={`flex flex-col justify-between p-6 rounded-2xl border transition-all ${
                isHero
                  ? 'bg-teal-50/40 border-teal-500 shadow-xl ring-2 ring-teal-500/20 relative'
                  : card.type === 'warning'
                  ? 'bg-slate-50 border-slate-300'
                  : 'bg-slate-100/80 border-slate-200'
              }`}
            >
              <div>
                {card.badge && (
                  <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-teal-800 uppercase bg-teal-100 rounded-full">
                    {card.badge}
                  </span>
                )}
                <h3 className="text-xl font-bold text-slate-900">{card.title}</h3>
                <p className="text-sm text-slate-500 mb-6">{card.subtitle}</p>

                <ul className="space-y-3 mb-8">
                  {card.bullets.map((bullet, idx) => (
                    <li key={idx} className="text-sm text-slate-700 flex items-start gap-2">
                      <span className="text-slate-400 mt-0.5">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`pt-4 border-t font-semibold text-sm ${
                isHero ? 'border-teal-200 text-teal-900' : 'border-slate-200 text-slate-800'
              }`}>
                {card.callout}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <a
          href={primaryCtaUrl}
          className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors shadow-lg"
        >
          Take the Process Waste Tax Assessment
        </a>
      </div>
    </section>
  );
};
