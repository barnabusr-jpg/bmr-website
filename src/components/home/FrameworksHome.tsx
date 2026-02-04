import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

// v3 IDs: Forcing a complete DOM reset to bypass Vercel branch caching
const methodologies = [
  {
    id: "v3_manual_friction",
    name: "Manual Friction",
    fullName: "High Human Effort",
    category: "Value Drain",
    description: "The team is working too hard to correct the AI. Manual effort is eating up the expected benefits."
  },
  {
    id: "v3_passive_support",
    name: "Passive Support",
    fullName: "Basic Task Helper",
    category: "Utility Only",
    description: "The AI is just a 'tool' on the side. It isn't an active partner in how the team actually works."
  },
  {
    id: "v3_force_multiplier",
    name: "Force Multiplier",
    fullName: "High-Speed Partnership",
    category: "Capital Multiplier",
    description: "The team and the AI are perfectly synced. The system is ready for more investment and wider use."
  }
];

const Frameworks = () => {
  const [selected, setSelected] = useState<Record<string, string>>({});

  // Clear memory on first load to ensure new labels show up
  useEffect(() => {
    const saved = localStorage.getItem('bmr_results_vault');
    // Wipes any legacy jargon or v2 state to ensure clean v3 labels
    if (saved && (saved.includes('HAI') || saved.includes('v2'))) { 
      localStorage.removeItem('bmr_results_vault');
      setSelected({});
    }
  }, []);

  const toggleSignal = (id: string, category: string) => {
    const newSelected = { ...selected };
    if (newSelected[id]) {
      delete newSelected[id];
    } else {
      newSelected[id] = category;
    }
    setSelected(newSelected);
    localStorage.setItem('bmr_results_vault', JSON.stringify(newSelected));
  };

  return (
    <section data-version="3.0" className="py-24 px-6 bg-[#030712] border-t border-slate-900">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-6 tracking-tight text-white">System Observations</h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
            Select the human-centric signals that match your current team experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {methodologies.map((methodology) => {
            const isSelected = !!selected[methodology.id];
            return (
              <div
                key={methodology.id} // v3 key forces React to re-draw the card
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
                    <div className={`text-2xl font-bold tracking-tighter ${isSelected ? 'text-white' : 'text-[#14b8a6]'}`}>
                      {methodology.name}
                    </div>
                    <div className={`h-px flex-1 ${isSelected ? 'bg-[#14b8a6]' : 'bg-slate-800'}`} />
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-white tracking-tight">{methodology.fullName}</h4>
                  <p className="text-slate-400 font-light leading-relaxed mb-4">{methodology.description}</p>
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
