import { useState } from "react";
import { Card } from "@/components/ui/card";

const methodologies = [
  { id: "1", name: "HAI", fullName: "Human–AI Interaction", category: "Manual Friction", description: "Examines how people interpret, rely on, and remain accountable for AI-influenced decisions." },
  { id: "4", name: "AVS", fullName: "Adoption Value System", category: "System Disconnect", description: "Evaluates whether AI efforts translate into sustained organizational value rather than activity volume." },
  { id: "10", name: "SHP", fullName: "System Health Picture", category: "Force Multiplier", description: "Provides visibility into how AI-enabled systems behave across people, processes, and decisions." }
];

const DiagnosticFrameworks = () => {
  const [selected, setSelected] = useState<Record<string, string>>({});

  const toggleSignal = (id: string, category: string) => {
    const newSelected = { ...selected };
    if (newSelected[id]) { delete newSelected[id]; } 
    else { newSelected[id] = category; }
    setSelected(newSelected);
    localStorage.setItem('bmr_results_vault', JSON.stringify(newSelected));
  };

  return (
    <section className="py-24 px-6 bg-[#030712] border-t border-slate-900">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-6 text-white">Diagnostic Frameworks</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {methodologies.map((m) => {
            const isSelected = !!selected[m.id];
            return (
              <div key={m.name} onClick={() => toggleSignal(m.id, m.category)} className="cursor-pointer">
                <Card className={`p-8 h-full border-2 transition-all duration-300 ${isSelected ? 'border-[#14b8a6] bg-[#14b8a6]/10' : 'bg-slate-900/50 border-slate-800'}`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`text-3xl font-bold ${isSelected ? 'text-white' : 'text-[#14b8a6]'}`}>{m.name}</div>
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-white">{m.fullName}</h4>
                  <p className="text-slate-400 mb-4 font-light">{m.description}</p>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#14b8a6]">Observation: {m.category}</div>
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
