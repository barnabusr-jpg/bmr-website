import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

const methodologies = [
  {
    id: "1",
    name: "HAI",
    fullName: "Human–AI Interaction",
    category: "Manual Friction", // Cleaned from Value Drain
    description: "Examines how people interpret, rely on, and remain accountable for AI-influenced decisions."
  },
  {
    id: "4",
    name: "AVS",
    fullName: "Adoption Value System",
    category: "System Disconnect", // Cleaned from Stranded Asset
    description: "Evaluates whether AI efforts translate into sustained organizational value rather than activity volume."
  },
  {
    id: "10",
    name: "SHP",
    fullName: "System Health Picture",
    category: "Force Multiplier", // Cleaned from Capital Multiplier
    description: "Provides visibility into how AI-enabled systems behave across people, processes, and decisions."
  }
];

const Frameworks = () => {
  const [selected, setSelected] = useState<Record<string, string>>({});

  const toggleSignal = (id: string, category: string) => {
    const newSelected = { ...selected };
    if (newSelected[id]) {
      delete newSelected[id];
    } else {
      newSelected[id] = category;
    }
    setSelected(newSelected);
    
    // VAULT: Save to browser memory
    localStorage.setItem('bmr_results_vault', JSON.stringify(newSelected));
  };

  return (
    <section className="py-24 px-6 bg-[#030712] border-t border-slate-900">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-6 tracking-tight text-white">Diagnostic Frameworks</h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
            Select the perspectives that align with your current observations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {methodologies.map((methodology) => {
            const isSelected = !!selected[methodology.id];
            return (
              <div
                key={methodology.name}
                onClick={() => toggleSignal(methodology.id, methodology.category)}
                className="cursor-pointer"
              >
                <Card className={`p-8 h-full border-2 transition-all duration-500 relative overflow-hidden group ${
                  isSelected ? 'border-[#14b8a6] bg-[#14b8a6]/10' : 'bg-slate-900/50 border-slate-800'
                }`}>
                  {isSelected && (
                    <div className="absolute top-4 right-4 bg-[#14b8a6] rounded-full p-1">
                      <Check className="h-3 w-3 text-[#020617]" />
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`text-3xl font-bold tracking-tighter ${isSelected ? 'text-white' : 'text-[#14b8a6]'}`}>
                      {methodology.name}
                    </div>
                    <div className={`h-px flex-1 ${isSelected ? 'bg-[#14b8a6]' : 'bg-slate-800'}`} />
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-white tracking-tight">{methodology.fullName}</h4>
                  <p className="text-slate-400 font-light leading-relaxed mb-4">{methodology.description}</p>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#14b8a6]">
                    Impact: {methodology.category}
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

export default Frameworks;
