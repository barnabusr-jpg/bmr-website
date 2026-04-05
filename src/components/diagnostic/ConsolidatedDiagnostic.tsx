"use client";

// ... other imports

export default function ConsolidatedDiagnostic() {
  const [step, setStep] = useState("triage");
  const [sector, setSector] = useState<string | null>(null);
  const [currentDimension, setCurrentDimension] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // 🛡️ DEFENSIVE GUARD: Ensure data exists before rendering
  const activeQuestions = diagnosticQuestions?.[currentDimension];

  const Audit = (
    <motion.div key="audit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
      {activeQuestions ? (
        <>
          <DiagnosticStep 
            dimensionTitle={activeQuestions.title}
            dimensionDescription={activeQuestions.description}
            questions={activeQuestions.questions}
            answers={answers}
            onAnswerChange={(qId, val) => setAnswers(prev => ({ ...prev, [qId]: val }))}
          />
          <div className="pt-12 border-t border-slate-900 flex justify-end">
            <button 
              onClick={() => {
                if (currentDimension < diagnosticQuestions.length - 1) {
                  setCurrentDimension(prev => prev + 1);
                } else {
                  setStep("diagnostic");
                }
              }}
              className="bg-red-600 px-12 py-6 text-white font-black uppercase italic tracking-widest text-xs"
            >
              {currentDimension === diagnosticQuestions.length - 1 ? "Generate Final Verdict" : "Next Dimension"}
            </button>
          </div>
        </>
      ) : (
        <div className="text-white font-mono uppercase text-xs">
          <span>Error: Forensic Data Node Missing</span>
        </div>
      )}
    </motion.div>
  );

  // Use a safer content mapping
  let content = Triage;
  if (step === "intake") content = Intake;
  if (step === "audit") content = Audit;
  if (step === "diagnostic") content = Diagnostic;

  return (
    <AnimatePresence mode="wait">
      {content}
    </AnimatePresence>
  );
}
