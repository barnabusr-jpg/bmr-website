import type { ElementType } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  TrendingUp,
  Users,
  Shield,
  Zap,
  Target,
  CheckCircle2,
} from "lucide-react";

type Outcome = {
  icon: ElementType;
  title: string;
  description: string;
  benefits: string[];
};

const outcomes: Outcome[] = [
  {
    icon: TrendingUp,
    title: "Accelerated Adoption",
    description: "Move AI initiatives out of pilot mode and into real operational use with reduced delivery risk.",
    benefits: ["Reduced time to value", "Lower implementation risk", "Faster stakeholder alignment", "Clearer decision pathways"],
  },
  {
    icon: Users,
    title: "Organizational Trust",
    description: "Build confidence through transparency, accountability, and governance that holds up under scrutiny.",
    benefits: ["Improved executive confidence", "Clear ownership of oversight", "More resilient adoption", "Reduced internal friction"],
  },
  {
    icon: Shield,
    title: "Defensible Risk Management",
    description: "Identify where decision risk is forming early — before it hardens into an operational or regulatory outcome.",
    benefits: ["Early detection of unowned risk", "Better governance posture", "Reduced compliance exposure", "Improved assurance discipline"],
  },
  {
    icon: Zap,
    title: "Operational Clarity",
    description: "Understand how AI-enabled systems actually behave under real conditions, not just in design documents.",
    benefits: ["Fewer delivery surprises", "Better human–AI interaction design", "More predictable outcomes", "Stronger system-level insight"],
  },
  {
    icon: Target,
    title: "Value Realization",
    description: "Ensure AI investments translate into durable organizational outcomes — not stalled initiatives.",
    benefits: ["Improved ROI alignment", "Reduced waste in experimentation", "Clearer outcome tracking", "Sustained delivery momentum"],
  },
  {
    icon: CheckCircle2,
    title: "Executive Readiness",
    description: "Equip leadership teams with the decision structures needed to act confidently in high-stakes environments.",
    benefits: ["Better decision discipline", "Stronger accountability", "Defensible governance choices", "Improved operational readiness"],
  },
];

export default function OutcomesPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Header />

      <main className="py-32 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-24"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight italic uppercase">
              Outcome <span className="text-[#14b8a6]">Snapshot</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
              Restoring alignment between intent, execution, and lived experience before risk hardens into outcome.
            </p>
          </motion.div>

          {/* Outcome Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {outcomes.map((outcome, index) => (
              <motion.div
                key={outcome.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-10 h-full bg-slate-900/30 border-slate-800 border-2 relative overflow-hidden transition-all duration-500 group">
                  
                  {/* THE STANDARDIZED FIX: Top-down building highlight */}
                  <div className="absolute top-0 left-0 w-1.5 h-0 group-hover:h-full bg-[#14b8a6] transition-all duration-500 ease-in-out"></div>

                  <div className="flex flex-col items-start gap-6 relative z-10">
                    <div className="p-3 rounded-lg bg-[#14b8a6]/10">
                      <outcome.icon className="h-6 w-6 text-[#14b8a6]" />
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-white tracking-tight italic uppercase">
                        {outcome.title}
                      </h3>
                      <p className="text-slate-400 font-light leading-relaxed mb-6">
                        {outcome.description}
                      </p>

                      <ul className="space-y-3">
                        {outcome.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-3 text-sm text-slate-500 font-light italic">
                            <span className="mt-1.5 h-1 w-1 rounded-full bg-[#14b8a6]" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-24 text-center"
          >
            <p className="text-slate-500 font-light italic text-sm tracking-wide">
              &quot;Meaningful understanding requires structured observation. We look for why risk is persisting, not just where it is occurring.&quot;
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
