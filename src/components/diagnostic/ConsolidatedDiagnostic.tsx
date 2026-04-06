// --- VIEW: INTAKE (RESTORED FORENSIC FIELDS) ---
  const Intake = (
    <motion.div key="intake" initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -25 }} className="space-y-12">
      <div className="text-center space-y-3">
        <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none text-white">
          <span>FORENSIC PROTOCOL </span><span className="text-red-600">ENGAGED</span>
        </h2>
        <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest font-bold">
          <span>Sector Calibrated: </span><span className="text-white font-black">{sector?.toUpperCase()}</span><span> // Baseline Lock Active</span>
        </p>
      </div>

      <div className="bg-slate-950/30 border border-slate-900 p-12 relative backdrop-blur-md max-w-3xl mx-auto w-full">
        {/* Top Row: Operator and Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <input 
            placeholder="OPERATOR_NAME" 
            className="bg-slate-950 border border-slate-800 p-6 text-sm font-mono focus:border-red-600 outline-none text-white uppercase placeholder:text-slate-800 transition-all" 
          />
          <input 
            placeholder="CORPORATE_EMAIL" 
            className="bg-slate-950 border border-slate-800 p-6 text-sm font-mono focus:border-red-600 outline-none text-white uppercase placeholder:text-slate-800 transition-all" 
          />
        </div>

        {/* Bottom Row: Entity Name */}
        <input 
          placeholder="ENTITY_NAME" 
          className="w-full bg-slate-950 border border-slate-800 p-6 text-sm font-mono focus:border-red-600 outline-none mb-12 text-white uppercase placeholder:text-slate-800 transition-all" 
        />

        {/* The Gate Button */}
        <button 
          onClick={() => setStep("audit")} 
          className="w-full bg-red-600 py-8 text-white font-black uppercase italic tracking-[0.4em] text-xs hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4 shadow-xl shadow-red-900/10 group"
        >
          <span>Initialize Audit Observation </span>
          <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
        </button>
      </div>
    </motion.div>
  );
