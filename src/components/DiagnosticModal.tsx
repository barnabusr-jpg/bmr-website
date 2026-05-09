"use client";
import React, { useState } from 'react';
import { X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

interface DiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DiagnosticModal({ isOpen, onClose }: DiagnosticModalProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] bg-[#020617]/98 backdrop-blur-2xl flex items-center justify-center p-6"
        >
          <div className="max-w-[1280px] w-full mx-auto relative">
            {/* TERMINATE TRIGGER */}
            <button 
              onClick={onClose} 
              className="absolute -top-24 right-0 text-slate-500 hover:text-red-600 transition-colors flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest italic"
            >
              [ TERMINATE_SESSION ] <X size={20} />
            </button>

            <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16 text-left">
              {/* LEFT COLUMN: THE ACTION */}
              <div className="w-full lg:w-[55%] shrink-0">
                <div className="border-l-[6px] border-red-600 pl-6 md:pl-10 mb-10">
                  <h2 className="text-red-600 font-mono text-[10px] font-black tracking-[0.5em] uppercase italic mb-5 italic">BMR_SOLUTIONS // INTAKE_MODAL</h2>
                  <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-white m-0">Initialize <br /><span className="text-red-600">Intake.</span></h1>
                </div>

                <div className="border-t border-slate-900 pt-10 mb-12">
                   <h3 className={`text-[11px] font-mono font-black tracking-[0.4em] uppercase italic transition-all duration-700 mb-8 ${
                    !selectedNode ? "text-red-600 animate-pulse scale-105 origin-left" : "text-slate-700 opacity-50"
                  }`}>
                    Step 1: Choose Operational Focus {selectedNode && <span className="text-green-500 ml-4 font-mono">[ SIGNAL_LOCKED ]</span>}
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {['Executive', 'Managerial', 'Technical'].map((node) => (
                      <button 
                        key={node} 
                        onClick={() => setSelectedNode(node)} 
                        className={`py-8 px-6 border-2 font-black uppercase italic tracking-widest text-[10px] transition-all text-left ${
                          selectedNode === node 
                            ? "border-red-600 bg-red-600/10 text-white" 
                            : "border-slate-900 bg-slate-950 text-slate-500 hover:border-slate-700 hover:text-white"
                        }`}
                      >
                        {node}_Node
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-24">
                  {selectedNode && (
                    <button className="bg-white text-black py-6 px-12 font-black uppercase tracking-[0.3em] text-[11px] hover:bg-red-600 hover:text-white transition-all flex items-center gap-4 italic italic">
                      INITIATE_DIAGNOSTIC <ArrowRight size={20} />
                    </button>
                  )}
                </div>
              </div>

              {/* RIGHT COLUMN: THE DEFINITION */}
              <div className="w-full lg:w-[40%] mt-8 lg:mt-24 shrink-0">
                <div className="bg-slate-950/50 border-2 border-slate-900 p-8 md:p-14 relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-red-600" />
                  <p className="text-slate-400 text-xl md:text-3xl font-medium italic font-sans uppercase leading-tight italic">
                    Most AI deployments leak capital through <span className="text-white">unmonitored systemic decay</span>. This decoupling of strategic intent creates invisible financial fractures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
