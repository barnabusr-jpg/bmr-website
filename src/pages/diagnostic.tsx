import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";

const bmrCoreQuestions = [
  // PILLAR: TRUST
  { id: 1, pillar: "Trust", text: "How consistently is strategic intent understood at the front-line level?", min: "Static", max: "High Fidelity" },
  { id: 2, pillar: "Trust", text: "Is there absolute consensus on what 'winning' looks like 12 months from now?", min: "Divergent", max: "Unified" },
  { id: 3, pillar: "Trust", text: "Does leadership have a real-time view of front-line operational reality?", min: "Blind", max: "Transparent" },
  { id: 4, pillar: "Trust", text: "Can failures be reported without fear of professional or social reprisal?", min: "Fear-based", max: "Safety" },
  
  // PILLAR: GOVERN
  { id: 5, pillar: "Govern", text: "How much drag is created during the handoff from leadership to execution?", min: "High Friction", max: "Fluid" },
  { id: 6, pillar: "Govern", text: "Do existing resource allocation models support rapid strategic pivots?", min: "Rigid", max: "Adaptive" },
  { id: 7, pillar: "Govern", text: "How often do bureaucratic layers delay mission-critical decisions?", min: "Frequently", max: "Never" },
  { id: 8, pillar: "Govern", text: "Are team members empowered to stop legacy work that conflicts with new goals?", min: "Restricted", max: "Empowered" },
  
  // PILLAR: EVOLVE
  { id: 9, pillar: "Evolve", text: "Does the current system reward behaviors that fulfill the strategic promise?", min: "Misaligned", max: "Aligned" },
  { id: 10, pillar: "Evolve", text: "Is performance dependent on individual heroics rather than system design?", min: "Heroic", max: "Systemic" },
  { id: 11, pillar: "Evolve", text: "How often do operational 'fires' override planned strategic initiatives?", min: "Constantly", max: "Rarely" },
  { id: 12, pillar: "Evolve", text: "Is data used to proactively adjust systems, or just for reporting?", min: "Reporting", max: "Adjusting" }
];

const DiagnosticPage = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = (value: number) => {
    setAnswers({ ...answers, [bmrCoreQuestions[step].id]: value });
    if (step < bmrCoreQuestions.length - 1) {
      setStep(step + 1);
    } else {
      setIsComplete(true);
    }
  };

  const calculateScore = () => {
    const values = Object.values(answers);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    return avg.toFixed(1);
  };

  const getMainFrictionPillar = () => {
    const pillarScores: Record<string, { total: number, count: number }> = {};
    bmrCoreQuestions.forEach(q => {
      if (!pillarScores[q.pillar]) pillarScores[q.pillar] = { total: 0, count: 0 };
      pillarScores[q.pillar].total += (answers[q.id] || 0);
      pillarScores[q.pillar].count += 1;
    });
    
    let lowestPillar = "Trust";
    let lowestAvg = 10;
    
    Object.keys(pillarScores).forEach(p => {
      const avg = pillarScores[p].total / pillarScores[p].count;
      if (avg < lowestAvg) {
        lowestAvg = avg;
        lowestPillar = p;
      }
    });
    return lowestPillar;
  };

  const progressValue = ((step + 1) / bmrCoreQuestions.length) * 100;

  return (
    <div className="bg-[#020617] min-h-screen text-white">
      <Header />
      
      <main className="pt-32 pb-20 px-6 flex items-center justify-center">
        <div className="container mx-auto max-w-2xl">
          <AnimatePresence mode="wait">
            {!isComplete ? (
              <motion.div 
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-10"
              >
                <div className="space-y-4">
                  <div className="flex justify-between text-[10px] font-mono text-[#0D9488] uppercase tracking-[0.2em]">
                    <span>Pillar: {bmrCoreQuestions[step].pillar}</span>
                    <span>{step + 1} / 12</span>
                  </div>
                  <Progress value={progressValue} className="h-1 bg-slate-900" />
                </div>

                <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                  {bmrCoreQuestions[step].text}
                </h1>

                <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleAnswer(num)}
                      className="h-12 md:h-14 border border-slate-800 rounded-lg hover:border-[#0D9488] hover:bg-[#0D9488]/10 transition-all font-bold text-sm"
                    >
                      {num}
                    </button>
                  ))}
                </div>

                <div className="flex justify-between text-[10px] text-slate-500 font-mono uppercase tracking-widest">
                  <span>← {bmrCoreQuestions[step].min}</span>
                  <span>{bmrCoreQuestions[step].max} →</span>
                </div>
                
                {step > 0 && (
                  <button 
                    onClick={() => setStep(step - 1)}
                    className="text-slate-600 hover:text-white text-[10px] font-mono uppercase transition-colors"
                  >
                    [ Back to Previous ]
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8 p-10 md:p-16 border border-slate-800 rounded-3xl bg-slate-900/20 backdrop-blur-sm"
              >
                <div className="inline-block px-4 py-1 border border-[#0D9488] rounded-full text-[#0D9488] text-[10px] font-mono uppercase tracking-widest mb-4">
                  Assessment Complete
                </div>
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">
                  Score: {calculateScore()}
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed max-w-md mx-auto">
                  Your Promise Gap™ is most visible in the <strong className="text-white">{getMainFrictionPillar()}</strong> pillar. This friction suggests your operational reality is drifting from your strategic intent.
                </p>

                

                <div className="pt-8 space-y-4">
                  <Button 
                    className="w-full bg-[#0D9488] hover:bg-[#0D9488]/90 text-white font-bold h-16 text-lg rounded-xl"
                    onClick={() => {
                      localStorage.setItem('bmr_score', calculateScore());
                      localStorage.setItem('bmr_pillar', getMainFrictionPillar());
                      window.location.href = '/#contact';
                    }}
                  >
                    Discuss My {getMainFrictionPillar()} Analysis
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default DiagnosticPage;
