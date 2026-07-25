"use client"; 
import React from "react"; 
import Header from "@/components/Header"; 
import Footer from "@/components/Footer"; 
import { Shield, Activity, Zap, Scale, Target, AlertCircle, Briefcase, Lock } from "lucide-react"; 

export default function Methodology() { 
  const nodes = [ 
    { 
      id: "NODE_01", 
      title: "EXECUTIVE NODE", 
      focus: "FIDUCIARY RISK", 
      lens: "PH.D. LEADERSHIP", 
      description: "We isolate the exact systemic data drift and unhedged operational liabilities that threaten corporate balance sheets. Our engine protects corporate governance by exposing structural expense leakage before it forces an expensive operational retreat.", 
      metrics: ["Board Risk Audit", "Policy Hardening", "Brand Protection"] 
    }, 
    { 
      id: "NODE_02", 
      title: "TECHNICAL NODE", 
      focus: "PIPELINE HARDENING", 
      lens: "FEDERAL ENGINEERING", 
      description: "We evaluate your data architecture for ingestion blindness based entirely on user inputs. We identify where unannounced third party API mutations and uncontrolled schema transformations break long term data lineage.", 
      metrics: ["Input Fracture Check", "Zero Integration Review", "System Hardening"] 
    }, 
    { 
      id: "NODE_03", 
      title: "MANAGERIAL NODE", 
      focus: "OVERSIGHT DECAY", 
      lens: "MA. LEADERSHIP & DESIGN", 
      description: "We map out engineering alert fatigue and undocumented tribal workflows. Our triage exposes the hidden manual shadow labor required to repeatedly nurse broken data integrations and restores true developer velocity.", 
      metrics: ["Capability Limits", "Staff Readiness", "Recovery Runbooks"] 
    } 
  ]; 

  const phases = [ 
    { step: "01", title: "TRIAGE", detail: "Ten question diagnostic run. Three minute processing window. Localization of primary logic fractures based on user responses." }, 
    { step: "02", title: "ANALYSIS", detail: "Deep ingestion evaluation. We process your answers through a ninety point logic framework to identify organizational liabilities." }, 
    { step: "03", title: "VERDICT", detail: "Clear structural mapping. Direct identification of exactly where the platform framework is bleeding capital." }, 
    { step: "04", title: "HAND OFF", detail: "The Engineering Master Blueprint delivery. Your development team takes the keys to execute. BMR departs." } 
  ]; 

  return ( 
    <div className="min-h-screen bg-[#020617] text-white font-sans italic selection:bg-red-600/30 overflow-x-hidden uppercase font-black"> 
      <Header /> 
       
      <main className="pt-44 pb-24 px-6 max-w-7xl mx-auto italic"> 
        {/* --- SECTION I: THE BLUEPRINT --- */} 
        <section className="mb-32 italic"> 
          <div className="border-l-8 border-red-600 pl-10 mb-16 italic text-left"> 
            <span className="text-red-600 font-mono text-[11px] font-black tracking-[0.4em] italic uppercase">THE_BLUEPRINT // BMR_2.0</span> 
             
            <h1 className="font-black tracking-[0.02em] leading-[0.8] mt-6 mb-10 italic uppercase"> 
              <span className="text-6xl md:text-9xl block">FORENSIC</span> 
               
              <span className="text-red-600 text-[11vw] md:text-9xl block leading-none whitespace-nowrap -ml-1"> 
                PHILOSOPHY. 
              </span> 
            </h1> 
             
            <p className="text-xl md:text-3xl text-white max-w-4xl leading-tight font-black italic"> 
              SYSTEMIC RISK IS NOT A SOFTWARE BUG. IT IS A FAILURE OF STRUCTURAL DATA INTEGRITY. WE IDENTIFY PIPELINE AND LOGIC FRACTURES BEFORE THEY CORRUPT YOUR AUTONOMOUS RUNTIMES AND MANIFEST AS MATERIAL LIABILITIES. 
            </p> 
          </div> 

          <div className="grid md:grid-cols-2 gap-12 items-start italic"> 
            <div className="bg-slate-900/30 border border-slate-800 p-10 shadow-2xl italic"> 
              <h4 className="text-red-600 font-mono text-[10px] font-black mb-6 tracking-widest italic uppercase">THE_ORIGIN</h4> 
              <p className="text-slate-400 text-lg leading-relaxed normal-case font-medium italic"> 
                BMR was forged from over twenty years of leadership, including a decade at Microsoft. I protected <span className="text-white font-black">United States Government Intelligence</span> within air gapped networks. Following the management of over six hundred system failures, I built this framework to isolate weak points before they collapse the enterprise. 
              </p> 
            </div> 
            <div className="space-y-6 italic"> 
              <div className="flex gap-6 items-center border-b border-slate-900 pb-6 italic"> 
                <Shield className="text-red-600 shrink-0 italic" size={32} /> 
                <div> 
                  <div className="text-white font-black text-lg italic">GOVERNMENT GRADE SECURITY</div> 
                  <p className="text-slate-500 text-[10px] tracking-widest font-black italic">SECURE CLOUD // AIR GAPPED SYSTEMS</p> 
                </div> 
              </div> 
              <div className="flex gap-6 items-center border-b border-slate-900 pb-6 italic"> 
                <Briefcase className="text-red-600 shrink-0 italic" size={32} /> 
                <div> 
                  <div className="text-white font-black text-lg italic uppercase">PORTFOLIO ASSURANCE</div> 
                  <p className="text-slate-500 text-[10px] tracking-widest font-black italic">SIX HUNDRED SYSTEM RECOVERIES</p> 
                </div> 
              </div> 
              <div className="flex gap-6 items-center border-b border-slate-900 pb-6 italic"> 
                <Scale className="text-red-600 shrink-0 italic" size={32} /> 
                <div> 
                  <div className="text-white font-black text-lg italic uppercase tracking-tighter">PH.D. LEADERSHIP & MA. DESIGN</div> 
                  <p className="text-slate-500 text-[10px] tracking-widest font-black italic uppercase">SPECIALIST IN ORGANIZATIONAL DESIGN</p> 
                </div> 
              </div> 
            </div> 
          </div> 
        </section> 

        {/* --- SECTION II: THE NODES --- */} 
        <section className="mb-40 italic"> 
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 italic"> 
            {nodes.map((node) => ( 
              <div key={node.id} className="bg-slate-950 border-2 border-slate-900 p-10 shadow-2xl relative group hover:border-red-600 transition-all italic"> 
                <div className="text-red-600 font-mono text-[9px] font-black tracking-[0.3em] mb-6 italic">{node.id} // {node.lens}</div> 
                <h3 className="text-[clamp(1.5rem,3vw,2.2rem)] font-black mb-1 italic tracking-tighter text-white">{node.title}</h3> 
                <p className="text-red-600 text-[10px] font-black tracking-[0.2em] mb-8 italic">{node.focus}</p> 
                 
                <p className="text-slate-400 text-sm normal-case mb-12 leading-relaxed font-medium italic min-h-[100px]"> 
                  {node.description} 
                </p> 
                 
                <div className="space-y-4 border-t border-slate-900 pt-8 italic"> 
                  {node.metrics.map((m, j) => ( 
                    <div key={j} className="flex items-center gap-3 text-[10px] font-black tracking-widest text-white italic"> 
                      <Zap size={14} className="text-red-600 italic" /> {m} 
                    </div> 
                  ))} 
                </div> 
              </div> 
            ))} 
          </div> 
        </section> 

        {/* --- SECTION III: THE PROCESS --- */} 
        <section className="mb-24 bg-white text-slate-950 p-10 md:p-24 italic"> 
          <div className="max-w-4xl italic text-slate-950"> 
            <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-none mb-10 uppercase">THE TWO PART <span className="text-red-600">UNIFIED AUDIT.</span></h2> 
            <p className="text-lg md:text-xl font-bold text-slate-600 mb-20 normal-case italic leading-snug"> 
              This is not a generic survey. This is a targeted evaluation framework. We combine an initial ten question diagnostic run with a deep ninety point logic audit. Our system uncovers systemic architecture vulnerabilities based entirely on your narrative inputs. 
            </p> 
          </div> 

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 italic"> 
            {phases.map((p) => ( 
              <div key={p.step} className="border-l-4 border-slate-200 pl-8 space-y-4 italic"> 
                <div className="text-red-600 font-black text-4xl italic uppercase">PHASE_{p.step}</div> 
                <div className="text-xl font-black italic tracking-tight uppercase">{p.title}</div> 
                <p className="text-slate-500 text-sm normal-case font-medium leading-relaxed italic">{p.detail}</p> 
              </div> 
            ))} 
          </div> 
        </section> 

        {/* --- NEW SECURITY ACCENT: COMPLIANCE HIGHLIGHT --- */} 
        <section className="mb-40 max-w-7xl mx-auto"> 
          <div className="bg-slate-950 border-l-4 border-red-600 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 font-mono text-xs"> 
            <div className="space-y-2"> 
              <div className="text-red-500 font-black tracking-widest flex items-center gap-2"> 
                <Lock size={16} /> ZERO SECURITY FOOTPRINT COMPLIANCE VERIFICATION 
              </div> 
              <p className="text-slate-400 normal-case font-sans italic font-medium max-w-4xl"> 
                Our infrastructure analysis operates independently of your live hardware networks. We do not require active network configurations, we do not view your architectural metadata, and we do not connect to your enterprise data sources. The process relies completely on text input parameters. 
              </p> 
            </div> 
            <span className="text-slate-700 tracking-widest text-[9px] font-black hidden lg:inline">ISOLATED_EVALUATION_PROTOCOL</span> 
          </div> 
        </section> 

        {/* --- SECTION IV: THE COST OF INACTION --- */} 
        <section className="max-w-5xl mx-auto text-center border border-slate-800 p-16 md:p-24 bg-slate-950/40 italic"> 
          <AlertCircle className="text-red-600 mx-auto mb-8 italic" size={48} /> 
          <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-8 text-white leading-none uppercase">THE COST OF INACTION</h2> 
          <p className="text-xl md:text-2xl text-slate-400 leading-snug mb-12 normal-case italic font-medium"> 
            For every one million dollars committed to automation budgets, unmapped structural fractures drain hundreds of thousands of dollars annually. Securing these pathways is a strict fiduciary obligation. 
          </p> 
           
          <div className="flex flex-col items-center gap-6 italic"> 
            <button   
              onClick={() => window.location.href='/pulse-check'}   
              className="group relative bg-red-600 text-white px-12 md:px-24 py-8 text-2xl font-black italic tracking-[0.3em] hover:bg-white hover:text-red-600 transition-all shadow-2xl uppercase" 
            > 
              EXECUTE STRATEGY 
              <Target className="absolute -top-4 -right-4 text-white group-hover:text-red-600 transition-all italic" size={32} /> 
            </button> 
             
            <div className="flex items-center gap-3 text-slate-500 font-mono text-[10px] tracking-[0.4em] font-black italic uppercase"> 
              <Activity size={14} className="animate-pulse text-red-600 italic" /> 
              UNIFIED DIAGNOSTIC TRACK // ZERO SYSTEM CONNECTIONS // NO DATA RISK 
            </div> 
          </div> 
        </section> 
      </main> 

      <Footer /> 
    </div> 
  ); 
}
