import { Card } from "@/components/ui/card";

const methodologies = [
  { 
    name: "HAI", 
    fullName: "The Trust Lens", 
    description: "Evaluates the psychological and operational readiness of the organization by identifying where human mental models diverge from system outputs." 
  },
  { 
    name: "AVS", 
    fullName: "The Govern Lens", 
    description: "Audits the alignment of artificial intelligence workflows with strategic intent to ensure automated activity translates into verifiable value." 
  },
  { 
    name: "IGF", 
    fullName: "The Evolve Lens", 
    description: "Establishes the architecture for long term resilience through the Safeguard Loop to ensure autonomous adaptation remains under leadership control." 
  }
];

const DiagnosticFrameworks = () => {
  return (
    <section className="py-24 px-6 bg-[#030712] border-t border-slate-900">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-6 text-white tracking-tight italic uppercase">
            Triple-Lens <span className="text-[#14b8a6]">Architecture</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Our forensic methodology is built on three core systemic lenses designed to identify and stabilize systemic drift.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {methodologies.map((m) => {
            return (
              <div key={m.name} className="h-full">
                <Card className="p-8 h-full bg-slate-900/50 border-slate-800 border-2 relative overflow-hidden transition-all duration-300 group">
                  
                  {/* THE STANDARDIZED FIX: Top-down building highlight */}
                  <div className="absolute top-0 left-0 w-1.5 h-0 group-hover:h-full bg-[#14b8a6] transition-all duration-500 ease-in-out"></div>

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
