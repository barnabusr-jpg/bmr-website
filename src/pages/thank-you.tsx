import { useRouter } from 'next/router';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { CheckCircle2, ArrowRight } from "lucide-react";

const synthesisData: Record<string, { title: string, desc: string, gap: string }> = {
  "Manual Friction": { title: "High Shadow Labor detected.", desc: "Your organization is likely compensating for AI reliability gaps with intensive human verification.", gap: "Estimated 20-40% ROI Leak." },
  "System Disconnect": { title: "Governance-Execution Gap detected.", desc: "There is a significant break between leadership intent and how AI tools are actually being used.", gap: "High Operational Risk Profile." },
  "Passive Support": { title: "Structural Stagnation detected.", desc: "AI is accepted in theory, but the organizational 'muscle' to evolve it into a Force Multiplier is missing.", gap: "Innovation Inertia." },
  "Team Relief": { title: "Tactical Efficiency detected.", desc: "You have successfully reduced task burden, but the system isn't yet driving strategic growth.", gap: "Untapped Strategic Capacity." },
  "Force Multiplier": { title: "High Systemic Alignment.", desc: "Your human and AI assets are in a virtuous cycle, though vigilance is required to maintain this lead.", gap: "Sustainable Competitive Advantage." }
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
          <h1 className="text-4xl font-bold mb-4">Observation Received</h1>
          <p className="text-slate-400 text-lg mb-12">Signals processed. We have identified your specific Promise Gap.</p>
          
          <Card className="p-8 bg-slate-900/40 border-slate-800 border-2 text-left relative overflow-hidden mb-12 flex flex-col justify-center">
            {/* The Polish: Ensuring the accent bar is anchored top-to-bottom and visible */}
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#14b8a6]"></div>
            
            <div className="pl-4"> 
              <span className="text-[#14b8a6] font-bold uppercase tracking-widest text-xs">Immediate Synthesis</span>
              <h2 className="text-2xl font-bold mt-2 mb-4">{synthesis.title}</h2>
              <p className="text-slate-300 mb-6 leading-relaxed">{synthesis.desc}</p>
              <div className="p-4 bg-slate-950 rounded border border-slate-800">
                <span className="text-slate-500 text-sm uppercase">Primary Promise Gap:</span>
                <p className="text-[#14b8a6] font-mono font-bold text-lg uppercase tracking-wider">{synthesis.gap}</p>
              </div>
            </div>
          </Card>

          <div className="text-slate-400">
            <p>A detailed recovery roadmap has been sent to your inbox.</p>
            {/* Updated Hyperlink to BMR Solutions */}
            <button 
              onClick={() => router.push('/')} 
              className="mt-8 flex items-center gap-2 mx-auto text-white hover:text-[#14b8a6] transition-colors group font-medium"
            >
              Return to BMR Solutions <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
