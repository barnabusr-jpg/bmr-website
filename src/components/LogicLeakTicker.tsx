"use client";
export default function LogicLeakTicker() {
  const alerts = [
    "[ALERT] UNGOVERNED_LLM_NODE_DETECTED // SECTOR:FINANCE",
    "[LOG] REWORK_TAX_ACCUMULATION: $4,201,922...",
    "[TRACE] SHADOW_AI_SHEAR_DETECTED // LATENCY: 42ms",
    "[WARNING] DELTA_GAP_EXCEEDS_THRESHOLD // MODEL:ZESTIMATE"
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black border-t border-red-900/30 p-2 z-50 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {alerts.concat(alerts).map((msg, i) => (
          <span key={i} className="font-mono text-[9px] text-slate-500 uppercase tracking-widest mx-8">
            {msg} <span className="text-red-900 ml-4">//</span>
          </span>
        ))}
      </div>
    </div>
  );
}
