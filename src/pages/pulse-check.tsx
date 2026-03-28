import React, { useState } from 'react'; // Removed 'useEffect'
import { ForensicEngine } from '../lib/diagnosticEngine';
import ForensicResultCard from '../components/ForensicResultCard';

export default function PulseCheck() {
  const [startTime] = useState(Date.now());
  // If you aren't using the setter yet, we just initialize the state
  const [answers] = useState<Record<string, number>>({
    reworkTax: 8,
    shadowAI: 5,
    expertiseDebt: 4,
    deltaGap: 3
  }); 
  const [result, setResult] = useState<any>(null);

  const handleSubmit = () => {
    const duration = (Date.now() - startTime) / 1000;
    const finalResult = ForensicEngine.calculate(answers, duration);
    setResult(finalResult);
  };

  if (result) return (
    <div className="min-h-screen bg-slate-950 pt-32 px-6 flex justify-center">
      <div className="max-w-2xl w-full">
        <ForensicResultCard result={result} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-48 px-6 flex flex-col items-center">
      <h1 className="text-4xl font-black italic uppercase mb-12">Systemic Friction Audit</h1>
      <p className="text-slate-400 mb-8 font-mono text-sm uppercase tracking-widest">Status: Ready for Generation</p>
      
      <button 
        onClick={handleSubmit} 
        className="bg-red-600 hover:bg-white hover:text-black transition-all text-white px-12 py-5 font-black uppercase italic tracking-widest border border-red-600"
      >
        Generate Audit
      </button>
    </div>
  );
}
