import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Activity, Zap } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center py-24 px-6 overflow-hidden bg-slate-950 text-white">
      {/* Background visual element for systemic drift */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-900/50 bg-red-900/10 text-red-500 text-xs font-black uppercase tracking-[0.2em]">
              <Activity className="h-3 w-3" />
              Forensic Review V3 // Active
            </div>

            <h1 className="text-5xl md:text-6xl font-black leading-[1.1] tracking-tight">
              AI Doesn’t Fail Because the <span className="text-slate-500">Code Breaks.</span>
              <span className="block text-red-600 italic mt-2">It Fails Because the System Drifts.</span>
            </h1>

            <p className="text-xl text-slate-400 max-w-xl leading-relaxed font-medium">
              We measure the <span className="text-white italic">Divergence Coefficient (Δ)</span> — the gap between strategic intent and operational reality. We harden your architecture before drift becomes permanent failure.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest text-xs px-8 h-14" asChild>
                <Link href="/pulse-check">
                  Initialize Pulse Check
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-slate-800 hover:bg-slate-900 text-slate-300 font-bold uppercase tracking-widest text-xs h-14" asChild>
                <Link href="/protocol">Access Protocol</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-slate-900/50 border-slate-800 border-2 backdrop-blur-xl p-10 font-mono relative overflow-hidden">
              {/* Ticker Header */}
              <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
                <div className="space-y-1">
                  <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em]">Operational Reality Scan</p>
                  <p className="text-xs text-red-500 font-bold flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    Active Shear Force Detected 
                  </p>
                </div>
                <Zap className="text-slate-700 h-5 w-5" />
              </div>

              {/* Δ Ticker Logic */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-4xl md:text-6xl font-black text-white italic tracking-tighter">Δ: 0.28</span>
                    <span className="text-[10px] text-slate-500 mb-2">THRESHOLD: 0.15</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 w-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "75%" }}
                      transition={{ duration: 1.5, delay: 0.8 }}
                      className="h-full bg-red-600 relative"
                    >
                      <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
                    </motion.div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-[10px] uppercase tracking-widest font-bold">
                  <div className="p-3 bg-slate-950/50 border border-slate-800">
                    <p className="text-slate-500 mb-1">Trust (HAI)</p>
                    <p className="text-red-500">Erosion: 55%</p>
                  </div>
                  <div className="p-3 bg-slate-950/50 border border-slate-800">
                    <p className="text-slate-500 mb-1">Audit (IGF)</p>
                    <p className="text-yellow-500">Log Rot: Active</p>
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 leading-relaxed text-center italic border-t border-slate-800 pt-6">
                  "Systemic balance not reached. Structural hardening required".
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
