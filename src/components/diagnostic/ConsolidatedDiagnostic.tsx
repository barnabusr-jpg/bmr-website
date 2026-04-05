// 1. Add "audit" to your step logic
const [step, setStep] = useState("triage"); 

// 2. Update the button in the Intake section:
<button 
  onClick={() => setStep("audit")} // Change "diagnostic" to "audit"
  className="w-full bg-red-600 py-8 text-white font-black uppercase italic tracking-[0.4em] text-xs"
>
  <span>Initialize Audit Observation </span>
</button>

// 3. Define the Audit UI (The Questions)
const Audit = (
  <motion.div key="audit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
    <div className="text-center py-12">
      <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white leading-none">
        <span>ACTIVE </span><span className="text-red-600">DECAY SCAN</span>
      </h2>
      <p className="text-slate-500 font-mono text-[10px] mt-2 tracking-widest">PROTOCOL: {sector?.toUpperCase()}</p>
    </div>
    
    {/* This is where your Question component or logic goes */}
    <div className="bg-slate-900/50 border border-slate-900 p-8">
       <p className="text-white italic">Loading Forensic Question Set...</p>
       {/* Call your question component here: 
          <DiagnosticQuestions sector={sector} onComplete={() => setStep("diagnostic")} /> 
       */}
       <button 
         onClick={() => setStep("diagnostic")} 
         className="mt-8 text-red-600 font-bold uppercase text-xs tracking-widest border border-red-600 p-4 hover:bg-red-600 hover:text-white transition-all"
       >
         Generate Final Verdict
       </button>
    </div>
  </motion.div>
);

// 4. Update the View Map at the bottom:
let content = Triage;
if (step === "intake") content = Intake;
if (step === "audit") content = Audit; // New mapping
if (step === "diagnostic") content = Diagnostic;
