import React from 'react';
import { motion } from "framer-motion";
import { Shield, Target, Construction, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const SERVICES = [
  {
    title: "The Pulse Check",
    id: "SRV-01",
    icon: <Target className="h-6 w-6" />,
    description: "Rapid forensic scan of a single AI implementation. We identify the Divergence Coefficient (Δ) and provide a 'Stop/Go' risk report.",
    deliverable: "Drift Diagnostic Report",
    action: "Initialize Scan"
  },
  {
    title: "Structural Hardening",
    id: "SRV-02",
    icon: <Construction className="h-6 w-6" />,
    description: "Deep-tier re-architecture. We rebuild your human-in-the-loop protocols and logging layers to stop value leakage and shadow labor.",
    deliverable: "Hardened Architecture Blueprint",
    action: "Request Protocol"
  },
  {
    title: "Forensic Retainer",
    id: "SRV-03",
    icon: <Shield className="h-6 w-6" />,
    description: "Continuous systemic monitoring. Monthly drift audits and IGF compliance checks to ensure long-term operational resonance.",
    deliverable: "Monthly Fidelity Audit",
    action: "Secure Retainer"
  }
];

export default function ServicesPreviewHome() {
  return (
    <section className="py-32 bg-white px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-8">
          <div className="max-w-xl">
            <h2 className="text-xs font-black tracking-[0.5em] text-slate-400 uppercase mb-4">Engagement Models</h2>
            <h3 className="text-4xl md:text-5xl font-black italic text-slate-900 uppercase tracking-tighter">
              Forensic <span className="text-red-600">Intervention.</span>
            </h3>
          </div>
          <p className="text-slate-500 text-sm max-w-xs font-medium leading-relaxed italic border-l-2 border-slate-100 pl-6">
            We do not offer "strategy." We offer systemic correction. Choose your level of structural depth.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
          {SERVICES.map((srv, index) => (
            <motion.div
              key={srv.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-12 group hover:bg-slate-50 transition-all flex flex-col justify-between min-h-[450px]"
            >
              <div>
                <div className="flex justify-between items-start mb-12">
                  <div className="p-4 bg-slate-900 text-white group-hover:bg-red-600 transition-colors">
                    {srv.icon}
                  </div>
                  <span className="text-[10px] font-black text-slate-300 font-mono tracking-widest">{srv.id}</span>
                </div>
                
                <h4 className="text-2xl font-black mb-6 italic uppercase tracking-tighter text-slate-900 leading-none">
                  {srv.title}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-8 font-medium italic">
                  {srv.description}
                </p>
              </div>

              <div className="space-y-8">
                <div className="pt-6 border-t border-slate-100">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Primary Deliverable</p>
                  <p className="text-xs font-bold text-slate-900 uppercase">{srv.deliverable}</p>
                </div>

                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-red-600 group-hover:gap-4 transition-all"
                >
                  {srv.action} <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
