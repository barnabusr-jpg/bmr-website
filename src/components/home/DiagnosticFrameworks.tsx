import { Card } from "@/components/ui/card";

const methodologies = [
  { 
    name: "HAI", 
    fullName: "Trust Architecture", 
    description: "Examines how people interpret, rely on, and remain accountable for AI-influenced decisions." 
  },
  { 
    name: "AVS", 
    fullName: "Adoption Value System", 
    description: "Evaluates whether AI efforts translate into sustained organizational value rather than activity volume." 
  },
  { 
    name: "IGF", 
    fullName: "Internal Governance Framework", 
    description: "Provides the accountability loop required to ensure AI-enabled systems behave across people, processes, and decisions." 
  }
];

const DiagnosticFrameworks = () => {
  return (
    <section className="py-24 px-6 bg-[#030712] border-t border-slate-900">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-6 text-white tracking-tight italic uppercase">
            Diagnostic <span className="text-[#14b8a6]">Frameworks</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Our forensic methodology is built on three core systemic lenses.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {methodologies.map((m) => {
            return (
              <div key={m.name} className="h-full">
                {/* THE FIX: 
                   1. Removed onClick and isSelected logic.
                   2. Swapped full-box hover for left-side teal highlight.
                */}
                <Card className="p-8 h-full bg-slate-900/50 border-slate-800 border-2 relative overflow-hidden transition-all duration-300 group">
                  
                  {/* Forensic Sidebar Highlight */}
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#14b8a6] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></div>

                  <div className="flex items-center gap-3 mb-6 relative z-10">
                    <div className="text-3xl font-bold tracking-tighter text-[#14b8a6] italic uppercase">
                      {m.name}
                    </div>
                    <div className="h-px flex-1 bg-slate-800" />
                  </div>

                  <h4 className="text-xl font-bold mb-3 text-white tracking-tight italic uppercase relative z-10">
                    {m.fullName}
                  </h4>
                  
                  <p className="text-slate-400 font-light leading-relaxed italic relative z-10">
                    {m.description}
                  </p>
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
