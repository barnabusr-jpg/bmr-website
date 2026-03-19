import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { LucideIcon } from "lucide-react";
import {
  Brain,
  FileCheck,
  Zap,
  Activity,
  Shield,
  Target,
} from "lucide-react";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const services: Service[] = [
  {
    icon: Brain,
    title: "Systemic Strategy (HAI)",
    description:
      "Developing the Trust Architecture required for responsible deployment. We align human mental models with system behavior to eliminate adoption friction.",
  },
  {
    icon: Zap,
    title: "Operational Hardening",
    description:
      "Identifying and neutralizing systemic drift within automated workflows. We stabilize implementation cycles to ensure predictable system performance.",
  },
  {
    icon: FileCheck,
    title: "Forensic Audit Protocol",
    description:
      "A granular 72-point examination of organizational AI health. We surface the hidden friction points where technical execution diverges from strategic intent.",
  },
  {
    icon: Target,
    title: "Value Capture (AVS)",
    description:
      "Auditing the Adoption Value System to identify leaked ROI. We link automated activity directly to core mission objectives and measurable impact.",
  },
  {
    icon: Shield,
    title: "Defensible Governance",
    description:
      "Establishing automated audit trails and accountability loops. We ensure your AI evolution remains compliant and under leadership control.",
  },
  {
    icon: Activity,
    title: "The Safeguard Loop (IGF)",
    description:
      "Implementing the proprietary IGF framework for long-term resilience. We provide the mechanism for rapid, responsible system adaptation.",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Header />

      <main className="py-32 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-24"
          >
            <span className="text-[#14b8a6] font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">
              Forensic Intervention
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-8 italic uppercase tracking-tight">
              Our <span className="text-[#14b8a6]">Services</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed italic">
              Stabilizing the transition from technical capability to operational maturity through targeted systemic interventions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-8 h-full bg-slate-900/40 border-slate-800 border-2 relative overflow-hidden group transition-all duration-500 hover:border-[#14b8a6]/50">
                  {/* THE STANDARDIZED FIX: Top-down vertical build highlight */}
                  <div className="absolute top-0 left-0 w-1.5 h-0 group-hover:h-full bg-[#14b8a6] transition-all duration-500 ease-in-out"></div>
                  
                  <div className="flex flex-col items-start gap-6 relative z-10">
                    <div className="p-3 rounded-none bg-[#14b8a6]/10">
                      <service.icon className="h-6 w-6 text-[#14b8a6]" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-4 italic uppercase tracking-tight text-white">
                        {service.title}
                      </h3>
                      <p className="text-slate-400 leading-relaxed font-light text-sm">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
