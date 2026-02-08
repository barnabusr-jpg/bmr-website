import { useRouter } from 'next/router';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { CheckCircle2, ArrowRight, Download, Calendar } from "lucide-react";

const synthesisData: Record<string, { title: string, desc: string, gap: string }> = {
  "Manual Friction": { title: "High Shadow Labor detected.", desc: "Your responses suggest the possibility that your organization is compensating for artificial intelligence reliability gaps with intensive human verification. This practice often creates 'shadow labor' that can mask true operational costs.", gap: "ESTIMATED 20-40% ROI LEAK" },
  "System Disconnect": { title: "Governance-Execution Gap detected.", desc: "The data points toward a potential break between leadership’s strategic intent and how artificial intelligence tools are actually being utilized at the frontline.", gap: "HIGH OPERATIONAL RISK PROFILE" },
  "Passive Support": { title: "Structural Stagnation detected.", desc: "The current signals indicate that while artificial intelligence is supported in theory, the organizational 'muscle' required to evolve these tools into a competitive advantage may not yet be fully developed.", gap: "INNOVATION INERTIA" },
  "Team Relief": { title: "Tactical Efficiency detected.", desc: "Your results reflect a successful use of artificial intelligence to reduce immediate task burdens. However, there are indications that the system is currently viewed as a utility.", gap: "UNTAPPED STRATEGIC CAPACITY" },
  "Force Multiplier": { title: "High Systemic Alignment.", desc: "Your responses suggest that your human and artificial intelligence assets are operating in a virtuous cycle. The primary challenge in this state is often maintaining this equilibrium.", gap: "SUSTAINABLE COMPETITIVE ADVANTAGE" }
};

export default function ThankYouPage() {
  const router = useRouter();
  const { state } = router.query;
  const synthesis = synthesisData[state as string] || synthesisData["Passive Support"];

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans">
      <Header />
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <CheckCircle2 className="h-16 w-16 text-[#14b8a6] mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4 italic uppercase tracking-tight">Observation Received</h1>
          <p className="text-slate-400 text-lg mb-12 font-light">Signals processed. We have identified your primary systemic friction point.</p>
          
          <Card className="p-8 bg-slate-900/40 border-slate-800 border-2 text-left relative overflow-hidden mb-12 flex flex-col justify-center">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#14b8a6] z-10"></div>
            <div className="pl-4"> 
              <span className="text-[#14b8a6] font-bold uppercase tracking-widest text-[10px]">Immediate Synthesis</span>
              <h2 className="text-2xl font-bold mt-2 mb-4 leading-tight">{synthesis.title}</h2>
              <p className="text-slate-300 mb-6 leading-relaxed font-light">{synthesis.desc}</p>
              <div className="p-4 bg-slate-950 rounded border border-slate-800">
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest text-white">Primary Promise Gap&trade;:</span>
                <p className="text-[#14b8a6] font-mono font-bold text-lg uppercase tracking-wider mt-1">{synthesis.gap}</p>
              </div>
              <p className="mt-8 text-[11px] text-slate-500 italic leading-relaxed border-t border-slate-800 pt-6 font-light">
                Note: While {synthesis.title.toLowerCase()} represents your primary signal, systemic friction often exists across multiple lenses. Your recovery roadmap offers a more multi-dimensional view.
              </p>
            </div>
          </Card>

          {/* FIELD GUIDE BRIDGE */}
          <div className="mt-16 p-10 border border-slate-800 bg-slate-900/20 rounded-xl text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#14b8a6]/50 to-transparent"></div>
            <h3 className="text-xl font-bold mb-4 italic text-white uppercase tracking-tight">Strategic Framework for Action</h3>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto text-sm leading-relaxed font-light">
              Download the Field Guide below to explore the architecture we use to close the Gap. 
              For a forensic audit, schedule a Deep Dive.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="/media/Field Guide.pdf" 
                download
                className="flex items-center justify-center gap-2 bg-white text-[#020617] px-8 py-3.5 rounded font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-slate-200 transition-all min-w-[220px]"
              >
                <Download size={14} /> Download Field Guide
              </a>
              <button 
                onClick={() => window.open('https://calendly.com/bmrsolutions', '_blank')}
                className="flex items-center justify-center gap-2 border border-[#14b8a6] text-[#14b8a6] px-8 py-3.5 rounded font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-[#14b8a6]/10 transition-all min-w-[220px]"
              >
                <Calendar size={14} /> Schedule Deep Dive
              </button>
            </div>
          </div>

          <div className="mt-12 text-slate-500">
            <button onClick={() => router.push('/')} className="flex items-center gap-2 mx-auto hover:text-[#14b8a6] transition-colors group font-bold uppercase tracking-widest text-[10px]">
              Return to Home <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
