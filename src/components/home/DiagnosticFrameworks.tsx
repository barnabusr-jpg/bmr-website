import { useState } from "react";
import { Card } from "@/components/ui/card";
// Removed unused Check import to pass Vercel linting

const methodologies = [
  { 
    id: "1", 
    name: "HAI", 
    fullName: "Human–AI Interaction", 
    category: "Manual Friction", 
    description: "Examines how people interpret, rely on, and remain accountable for AI-influenced decisions." 
  },
  { 
    id: "4", 
    name: "AVS", 
    fullName: "Adoption Value System", 
    category: "System Disconnect", 
    description: "Evaluates whether AI efforts translate into sustained organizational value rather than activity volume." 
  },
  { 
    id: "10", 
    name: "SHP", 
    fullName: "System Health Picture", 
    category: "Force Multiplier", 
    description: "Provides visibility into how AI-enabled systems behave across people, processes, and decisions." 
  }
];

const DiagnosticFrameworks = () => {
  const [selected, setSelected] = useState<Record<string, string>>({});

  const toggleSignal = (id: string, category: string) => {
    const newSelected = { ...selected };
    if (newSelected[id]) { 
      delete newSelected[id]; 
    } else { 
      newSelected[id] = category; 
    }
    setSelected(newSelected);
    
    // PERSISTENCE: Save to vault so the Diagnostic Page can pick up these signals
    localStorage.setItem('bmr_results_vault', JSON.stringify(newSelected));
  };

  return (
    <section className="py-24 px-6 bg-[#030712] border-t border-slate-900">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-6 text-white tracking-tight">Diagnostic Frameworks</h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Select the perspectives that align with your current observations to begin the synthesis.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {methodologies.map((m) => {
            const isSelected = !!selected[m.id];
            return (
              <div 
                key={m.name} 
                onClick={() => toggleSignal(m.id, m.category)} 
                className="cursor-pointer h-full"
              >
                <Card className={`p-8 h-full border-2 transition-all duration-500 relative overflow-hidden group ${
                  isSelected 
                    ? 'border-[#14b8a6] bg-[#14b8a6]/10 shadow-[0_0_20px_rgba(20,184,166,0.1)]' 
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`text-3xl font-bold tracking-tighter transition-colors duration-300 ${
                      isSelected ? 'text-white' : 'text-[#14b8a6]'
                    }`}>
                      {m.name}
                    </div>
                    <div className={`h-px flex-1 transition-colors duration-300 ${
                      isSelected ? 'bg-[#14b8a6]' : 'bg-slate-800'
                    }`} />
                  </div>

                  <h4 className="text-xl font-bold mb-3 text-white tracking-tight">
                    {m.fullName}
                  </h4>
                  
                  <p className="text-slate-400 font-light leading-relaxed mb-6">
                    {m.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-slate-800/50">
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#14b8a6]">
                      Observation State: <span className={isSelected ? "text-white" : ""}>{m.category}</span>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DiagnosticFrameworks;
