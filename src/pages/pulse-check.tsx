"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Banknote, Stethoscope, Factory, ShoppingCart, Activity, ChevronRight } from "lucide-react";

const LOCAL_QUESTIONS = [
  { 
    id: "NODE_01_AVS_01", 
    text: "Are data safety rules required and enforced before third-party or vendor data (e.g., partner feeds, public web data, API payloads) is brought into your AI models?", 
    options: [
      { label: "No safety rules or verification checks present", weight: 10 }, 
      { label: "Informal developer fixes and manual scripts", weight: 6 }, 
      { label: "Documented data format guidelines", weight: 4 }, 
      { label: "Automated continuous validation and safety gates", weight: 2 }
    ] 
  },
  { 
    id: "NODE_01_AVS_02", 
    text: "Are financial and operational risks from changing data formats evaluated before approving new AI projects?", 
    options: [
      { label: "System changes and data risks are unmonitored", weight: 10 }, 
      { label: "Informal review guidelines are used", weight: 6 }, 
      { label: "Formal approval gates exist before deployment", weight: 4 }, 
      { label: "Automated continuous risk checks are active", weight: 2 }
    ] 
  },
  { 
    id: "NODE_01_AVS_03", 
    text: "How does your organization track financial losses from AI errors, hallucinations, or system failures?", 
    options: [
      { label: "System failure costs are not tracked", weight: 10 }, 
      { label: "Costs are calculated only after major incidents occur", weight: 6 }, 
      { label: "Defined risk budgets are set aside for potential failures", weight: 4 }, 
      { label: "Real-time financial loss tracking with automated reporting", weight: 2 }
    ] 
  },
  { 
    id: "NODE_02_AVS_01", 
    text: "Do your automated agents have security barriers that isolate and keep out unverified external data?", 
    options: [
      { label: "External data connects directly without safety filters", weight: 10 }, 
      { label: "Basic data checking tools are active", weight: 6 }, 
      { label: "Isolated staging environments handle data entry", weight: 4 }, 
      { label: "Strong access controls and network isolation gateways", weight: 2 }
    ] 
  },
  { 
    id: "NODE_02_AVS_02", 
    text: "How do your engineering systems respond when outside vendors change their data structures or software interfaces?", 
    options: [
      { label: "Manual fixing during active outages", weight: 10 }, 
      { label: "Basic error logging and alert notifications", weight: 6 }, 
      { label: "Automated testing environments catch changes early", weight: 4 }, 
      { label: "Continuous monitoring with automated circuit breakers", weight: 2 }
    ] 
  },
  { 
    id: "NODE_02_AVS_03", 
    text: "Do your AI models use verified internal company records instead of public web or third-party data?", 
    options: [
      { label: "Models use unverified external data sources", weight: 10 }, 
      { label: "A mix of internal and external sources is used", weight: 6 }, 
      { label: "Verified internal data pipelines feed models", weight: 4 }, 
      { label: "Fully governed and secure internal record stores", weight: 2 }
    ] 
  },
  { 
    id: "NODE_02_AVS_04", 
    text: "How well do your engineering alert systems filter out low-priority noise to help prevent team fatigue?", 
    options: [
      { label: "Unfiltered alert noise floods technical teams", weight: 10 }, 
      { label: "Basic routing rules group alerts by priority", weight: 6 }, 
      { label: "Automated rules combine repetitive alerts", weight: 4 }, 
      { label: "Actionable alerts only with automated escalation controls", weight: 2 }
    ] 
  },
  { 
    id: "NODE_03_AVS_01", 
    text: "How much do daily operations depend on staff memory to fix broken data hand-offs between systems?", 
    options: [
      { label: "Completely unwritten processes based on employee memory", weight: 10 }, 
      { label: "Informal notes and basic procedure guides", weight: 6 }, 
      { label: "Centralized operational documentation archives", weight: 4 }, 
      { label: "Continuous automated process tracking and mapping", weight: 2 }
    ] 
  },
  { 
    id: "NODE_03_AVS_02", 
    text: "Does your company track engineering hours lost to fixing broken vendor connections (Process Waste Tax)?", 
    options: [
      { label: "Lost engineering time is completely unmeasured", weight: 10 }, 
      { label: "Rough estimates discussed during team meetings", weight: 6 }, 
      { label: "Formal tracking of engineering rework hours", weight: 4 }, 
      { label: "Real-time automated calculations of wasted resources", weight: 2 }
    ] 
  },
  { 
    id: "NODE_03_AVS_03", 
    text: "Are there clear playbooks to guide teams when an automated workflow fails or produces questionable output?", 
    options: [
      { label: "No playbooks or response guides available", weight: 10 }, 
      { label: "Basic service recovery guidelines exist", weight: 6 }, 
      { label: "Formal human approval escalation protocols", weight: 4 }, 
      { label: "Automated self-executing fallback playbooks", weight: 2 }
    ] 
  }
];

const sectors = [
  { id: "FINANCE", label: "FINANCE", risk: "COMPLIANCE RISK", icon: <Banknote size={24} /> },
  { id: "HEALTHCARE", label: "HEALTHCARE", risk: "LIABILITY RISK", icon: <Stethoscope size={24} /> },
  { id: "INDUSTRIAL", label: "INDUSTRIAL", risk: "OPERATIONS RISK", icon: <Factory size={24} /> },
  { id: "SERVICES", label: "SERVICES", risk: "LABOR RISK", icon: <ShoppingCart size={24} /> }
];

export default function PulseCheck() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState("triage");
  const [sector, setSector] = useState("FINANCE");
  const [selectedLens, setSelectedLens] = useState<string | null>(null);
  const [operatorName, setOperatorName] = useState("");
  const [entityName, setEntityName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [currentDimension, setCurrentDimension] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const validateIntake = () => {
    return operatorName.length > 1 && entityName.length > 1 && email.includes('@') && email === confirmEmail;
  };

  const getLiveMetrics = (finalAnswers: Record<string, string>) => {
    const totalSum = Object.values(finalAnswers).reduce((a, b) => a + parseInt(b || "0"), 0);
    const scaledTotal = (totalSum * 0.04);
    const decayRaw = Math.round((1 - (1 / (1 + (totalSum * 0.05) / 10))) * 100);
    return { decay: Math.min(decayRaw, 98), rework: scaledTotal.toFixed(2) };
  };

  // 🔒 Cleaned: All direct client-side DB writes removed and delegated to the server route
  const logToDatabase = async (metrics: any, finalAnswers: Record<string, string>) => {
    try {
      const response = await fetch('/api/pulse-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operatorName,
          entityName,
          email,
          sector,
          selectedLens,
          metrics,
          answers: finalAnswers,
        }),
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        throw new Error(result.error || 'Database submission failed');
      }

      return result.auditId;
    } catch (e: any) {
      console.error("Database Log Failure:", e?.message || e);
      return null;
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-red-100 selection:text-red-900 overflow-x-hidden relative flex flex-col">
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center py-32 sm:py-40 px-4 sm:px-6 relative text-center">
        <AnimatePresence mode="wait">
          
          {isLoading && (
            <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[9999] flex flex-col items-center justify-center text-white">
              <Activity className="animate-spin mb-4 text-red-500" size={56} />
              <p className="font-mono uppercase tracking-widest text-xs font-bold text-slate-200">SYNTHESIZING DIAGNOSTIC DATA...</p>
            </motion.div>
          )}

          {step === 'triage' && (
            <motion.div key="triage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-5xl space-y-12">
              <div className="border-b border-slate-200 pb-8 flex flex-col items-center">
                <span className="text-red-700 font-mono text-xs font-bold tracking-widest uppercase block mb-2">
                  PRE-AUTOMATION DIAGNOSTIC MATRIX
                </span>
                <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-slate-950 leading-none">
                  STRATEGY <span className="text-red-700">INTAKE.</span>
                </h1>

                <motion.div 
                  animate={{ opacity: [1, 0.4, 1] }} 
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="flex items-center gap-3 mt-6 text-red-700"
                >
                   <div className="w-2.5 h-2.5 rounded-full bg-red-700 shadow-sm" />
                   <p className="text-xs font-mono uppercase tracking-widest font-bold">
                     {selectedLens ? `STATUS: FOCUS LOCKED [${selectedLens}] // SELECT SECTOR` : "STATUS: AWAITING FOCUS SELECTION"}
                   </p>
                </motion.div>
              </div>

              {/* Lens Selection Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {['EXECUTIVE', 'MANAGERIAL', 'TECHNICAL'].map((node) => (
                  <button key={node} onClick={() => setSelectedLens(node)}
                    className={`p-8 border rounded-sm flex flex-col items-center justify-center gap-3 transition-all cursor-pointer ${selectedLens === node ? 'bg-slate-950 border-slate-950 text-white shadow-md scale-105' : 'bg-white border-slate-200 text-slate-700 hover:border-red-700'}`}>
                    <span className="font-bold text-lg tracking-wider uppercase">{node}</span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">NODE LENS</span>
                  </button>
                ))}
              </div>

              {/* Sector Selection Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full pt-4">
                {sectors.map((s) => (
                  <button key={s.id} disabled={!selectedLens} onClick={() => { setSector(s.id); setStep("intake"); }}
                    className="p-8 bg-white border border-slate-200 hover:border-red-700 transition-all text-center flex flex-col items-center justify-between h-56 group disabled:opacity-30 rounded-sm shadow-sm cursor-pointer">
                    <div className="text-red-700 group-hover:scale-110 transition-transform mb-2">{s.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold uppercase tracking-tight text-slate-950">{s.label}</h3>
                      <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mt-1">{s.risk}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'intake' && (
            <motion.div key="intake" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-3xl space-y-10 text-center">
              <div className="border-b border-slate-200 pb-8 flex flex-col items-center">
                <span className="text-red-700 font-mono text-xs font-bold tracking-widest uppercase block mb-2">
                  AUTHENTICATION NODE
                </span>
                <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-slate-950 leading-none">
                  ENTITY <span className="text-red-700">REGISTRATION.</span>
                </h2>
                <motion.div 
                  animate={{ opacity: [1, 0.4, 1] }} 
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="flex items-center gap-3 mt-4 text-red-700"
                >
                   <div className="w-2.5 h-2.5 rounded-full bg-red-700 shadow-sm" />
                   <p className="text-xs font-mono uppercase tracking-widest font-bold">
                     {validateIntake() ? "VALIDATION COMPLETE // INITIALIZE INTAKE" : "STATUS: PROVIDE ENTITY DETAILS"}
                   </p>
                </motion.div>
              </div>

              <div className="bg-white border border-slate-200 p-8 sm:p-10 space-y-8 shadow-sm rounded-sm text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">Full Name</label>
                    <input placeholder="ENTER NAME" value={operatorName} onChange={(e) => setOperatorName(e.target.value)} className="bg-slate-50 border border-slate-300 p-4 text-slate-900 w-full uppercase font-mono focus:border-red-700 outline-none transition-colors text-base font-semibold rounded-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">Organization</label>
                    <input placeholder="ENTER COMPANY" value={entityName} onChange={(e) => setEntityName(e.target.value)} className="bg-slate-50 border border-slate-300 p-4 text-slate-900 w-full uppercase font-mono focus:border-red-700 outline-none transition-colors text-base font-semibold rounded-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">Business Email</label>
                    <input placeholder="USER@COMPANY.COM" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-slate-50 border border-slate-300 p-4 text-slate-900 w-full uppercase font-mono focus:border-red-700 outline-none transition-colors text-base font-semibold rounded-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">Verify Email</label>
                    <input placeholder="CONFIRM EMAIL" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} className="bg-slate-50 border border-slate-300 p-4 text-slate-900 w-full uppercase font-mono focus:border-red-700 outline-none transition-colors text-base font-semibold rounded-sm" />
                  </div>
                </div>
                <div className="pt-4">
                  <button disabled={!validateIntake()} onClick={() => setStep("audit")}
                    className="w-full py-5 font-bold uppercase tracking-wider bg-slate-950 text-white disabled:opacity-30 text-lg hover:bg-red-700 transition-all border border-slate-950 flex items-center justify-center cursor-pointer rounded-sm shadow-sm">
                    INITIALIZE DIAGNOSTIC INTAKE
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* --- AUDIT STEP RENDER --- */}
          {step === 'audit' && (
            <motion.div key="audit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-4xl space-y-8 text-center">
              <div className="flex flex-col items-center border-b border-slate-200 pb-8 mb-8">
                <span className="text-xs font-mono font-bold text-red-700 tracking-wider block mb-3 uppercase">
                  // QUESTION {String(currentDimension + 1).padStart(2, '0')} OF {LOCAL_QUESTIONS.length}
                </span>
                
                <h2 className="text-xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-relaxed max-w-3xl">
                  {LOCAL_QUESTIONS[currentDimension]?.text}
                </h2>
                <p className="text-xs font-mono text-slate-400 mt-3 tracking-wide">
                  Choose the option that best matches today's reality.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {LOCAL_QUESTIONS[currentDimension]?.options.map((opt, i) => (
                  <button 
                    key={i} 
                    className="p-6 border border-slate-200 bg-white hover:border-red-700 hover:bg-slate-50 transition-all text-left font-semibold text-base sm:text-lg flex justify-between items-center group cursor-pointer text-slate-800 rounded-sm shadow-sm"
                    onClick={async () => {
                      const updatedAnswers = { 
                        ...answers, 
                        [LOCAL_QUESTIONS[currentDimension].id]: opt.weight.toString() 
                      };
                      setAnswers(updatedAnswers);
                      
                      if (currentDimension < LOCAL_QUESTIONS.length - 1) {
                        setCurrentDimension(currentDimension + 1);
                      } else {
                        setIsLoading(true);

                        // Pre-flight assertion: Guarantee all 10 keys exist before triggering submission
                        const requiredKeys = LOCAL_QUESTIONS.map(q => q.id);
                        const hasAllKeys = requiredKeys.every(k => Object.prototype.hasOwnProperty.call(updatedAnswers, k));

                        if (!hasAllKeys) {
                          console.warn(
                            "⚠️ Intake payload incomplete. Missing keys:", 
                            requiredKeys.filter(k => !Object.prototype.hasOwnProperty.call(updatedAnswers, k))
                          );
                          setIsLoading(false);
                          alert("Intake incomplete: Please answer all 10 questions before submitting.");
                          return;
                        }

                        const metrics = getLiveMetrics(updatedAnswers);
                        const auditId = await logToDatabase(metrics, updatedAnswers);
                        
                        if (auditId) {
                          fetch('/api/send-vault-link', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              email: email.toLowerCase().trim(),
                              orgName: entityName.toUpperCase().trim(),
                              auditId: auditId,
                              userName: operatorName.trim()
                            })
                          }).catch(err => console.error("Vault link warning:", err));

                          window.location.href = `/results/${auditId}`;
                        } else {
                          setIsLoading(false);
                          alert("DATABASE TRANSMISSION INTERRUPTION: Check connection and try submitting option again.");
                        }
                      }
                    }}
                  >
                    <span>{opt.label}</span>
                    <ChevronRight size={24} className="opacity-0 group-hover:opacity-100 transition-all text-red-700 shrink-0" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

