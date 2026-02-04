import React from 'react';

const ComparisonGrid = () => {
  const data = [
    {
      area: "Foundation",
      traditional: "Technical readiness and hardware scaling.",
      bmr: "Manual Friction: Identifying where human effort is acting as a patch for system limits."
    },
    {
      area: "Measurement",
      traditional: "Simple adoption metrics and login volume.",
      bmr: "Passive Support: Measuring if AI is just a tool or a strategic team partner."
    },
    {
      area: "Governance",
      traditional: "Static compliance checklists and rigid policies.",
      bmr: "System Disconnect: Closing the gap between model outputs and human workflows."
    },
    {
      area: "Outcome",
      traditional: "Siloed pilot programs with high friction.",
      bmr: "Force Multiplier: Turning synergy into a continuous cycle of measurable growth."
    }
  ];

  return (
    <section className="py-20 bg-[#020617]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">
          Bridging the <span className="text-[#14b8a6]">Promise Gap</span>
        </h2>
        
        <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/20">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/50">
                <th className="p-6 text-sm font-semibold text-slate-400 uppercase tracking-wider">Focus Area</th>
                <th className="p-6 text-sm font-semibold text-slate-400 uppercase tracking-wider">Traditional AI Approach</th>
                <th className="p-6 text-sm font-semibold text-[#14b8a6] uppercase tracking-wider">The BMR Approach</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {data.map((row, index) => (
                <tr key={index} className="group hover:bg-slate-800/30 transition-colors">
                  <td className="p-6 text-white font-medium">{row.area}</td>
                  <td className="p-6 text-slate-400 leading-relaxed">{row.traditional}</td>
                  <td className="p-6 text-slate-200 leading-relaxed font-medium bg-[#14b8a6]/5 group-hover:bg-[#14b8a6]/10 transition-colors">
                    {row.bmr}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonGrid;
