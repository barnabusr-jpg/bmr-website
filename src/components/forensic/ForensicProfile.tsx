import React from 'react';

interface ProfileProps {
  archetype: string;
  archetypeCode: string;
  score: number;
  strength: string;
  weakness: string;
  specificRisk: string;
  verifiedValue: number;
}

export const ForensicProfile = ({ 
  archetype, 
  archetypeCode, 
  score, 
  strength, 
  weakness, 
  specificRisk,
  verifiedValue 
}: ProfileProps) => {
  const promiseGap = 100 - verifiedValue;

  return (
    <div className="bg-bmr-dark p-10 border border-bmr-red/20 text-bmr-light font-body min-h-[11in] w-full max-w-[8.5in] mx-auto relative overflow-hidden shadow-2xl">
      {/* Background Radar Detail */}
      <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
        <svg width="400" height="400" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#dc2626" strokeWidth="0.5" />
          <line x1="100" y1="20" x2="100" y2="180" stroke="#dc2626" strokeWidth="0.5" />
          <line x1="20" y1="100" x2="180" y2="100" stroke="#dc2626" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative z-10">
        <div className="font-forensic text-[10px] text-bmr-gray uppercase tracking-widest mb-4">
          BMR-CF-2026-03-{archetypeCode} // PROTOCOL P-01 [cite: 5, 31]
        </div>
        
        <h1 className="text-4xl font-bold font-heading tracking-tighter uppercase leading-none mb-2">
          Forensic Profile: <span className="text-bmr-red">{archetype}</span> [cite: 17, 33]
        </h1>

        <div className="flex gap-3 mb-12">
          <span className="text-[9px] border border-bmr-gray px-2 py-0.5 rounded uppercase">Restricted Analysis</span>
          <span className="text-[9px] border border-bmr-gray px-2 py-0.5 rounded uppercase font-forensic">Score: {score}/100</span>
        </div>

        {/* Operational Reality Block */}
        <div className="bg-slate-900/50 border-l-2 border-bmr-red p-6 mb-10">
          <p className="text-sm leading-relaxed mb-4 italic">
            <strong className="text-bmr-light not-italic uppercase tracking-wide">Operational Reality:</strong> [cite: 8]
            Your organization exhibits {archetype} traits. While this profile excels at {strength}, 
            forensic analysis reveals vulnerabilities in {weakness}. [cite: 37]
            Without a human-centric foundation, systems fail to scale because trust is absent. [cite: 22]
          </p>
          <div className="inline-block border border-bmr-red text-bmr-red px-3 py-1 text-[10px] font-bold uppercase tracking-tighter -rotate-1">
            ⚠️ Archetype Shear Point: {specificRisk}
          </div>
        </div>

        {/* Promise Gap™ Visualization */}
        <div className="mt-16">
          <h3 className="font-forensic text-xs text-bmr-gray uppercase mb-6 tracking-widest">
            The Promise Gap™ Analysis [cite: 7]
          </h3>
          
          <div className="relative h-14 w-full bg-slate-950 border border-bmr-red/10 rounded overflow-hidden">
            <div className="absolute inset-0 border border-dashed border-bmr-red/20 flex items-center justify-between px-4">
              <span className="text-[9px] uppercase text-bmr-gray">Advertised Potential</span> [cite: 10]
              <span className="font-forensic text-xs text-bmr-gray">100%</span>
            </div>
            
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-bmr-red to-red-500 flex items-center px-4"
              style={{ width: `${verifiedValue}%` }}
            >
              <span className="text-[10px] font-bold uppercase text-white truncate">
                Forensically Verified Value [cite: 10]
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="text-lg font-bold font-forensic text-bmr-red">GAP: {promiseGap}% [cite: 9]</div>
            <div className="text-[9px] font-bold bg-bmr-red text-white px-2 py-1 uppercase italic -rotate-1">
              Critical Divergence Detected
            </div>
          </div>
        </div>
      </div>

      {/* Forensic Footer */}
      <div className="absolute bottom-10 left-10 right-10 border-t border-bmr-red/10 pt-4 flex justify-between items-center font-forensic text-[8px] text-bmr-gray tracking-[0.3em]">
        <div>UNAUTHORIZED DISTRIBUTION PROHIBITED [cite: 5]</div>
        <div>OUTCOMES ARE ENGINEERED [cite: 3]</div>
      </div>
    </div>
  );
};
