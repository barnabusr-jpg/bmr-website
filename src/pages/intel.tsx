import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const vaultData = [
  {
    id: "NODE_03",
    category: "HAI",
    title: "THE HUMAN TRUST GAP",
    content: "Trust in autonomous systems is often misplaced. We map the discrepancy between perceived safety and actual system logic to prevent catastrophic failure."
  },
  {
    id: "NODE_02",
    category: "AVS",
    title: "VALUE STREAM LEAKAGE",
    content: "Operational friction costs organizations billions. Our forensic approach identifies where value is lost between technical execution and strategic intent."
  },
  {
    id: "NODE_01",
    category: "IGF",
    title: "INSTITUTIONAL FIDELITY",
    content: "Governance must be reconstructible. We provide the forensic framework to ensure institutional decisions are backed by verifiable data chains."
  }
];

export default function VaultPage() {
  return (
    <div className="bg-[#020617] min-h-screen text-white">
      <Header />
      <main className="pt-32 pb-20 px-10 max-w-7xl mx-auto">
        <h1 className="text-6xl font-black italic uppercase mb-20 border-b border-red-600 pb-10">EVIDENCE_VAULT</h1>
        
        <div className="space-y-32">
          {vaultData.map((item) => (
            <section key={item.id} id={item.id} className="scroll-mt-32">
              <div className="flex items-center gap-4 text-red-600 mb-6">
                <span className="font-black tracking-widest text-sm uppercase">[{item.category}]</span>
                <div className="h-[1px] flex-grow bg-slate-800" />
                <span className="font-mono text-xs text-slate-500">{item.id}</span>
              </div>
              <h2 className="text-5xl font-black italic uppercase mb-8">{item.title}</h2>
              <div className="max-w-3xl">
                <p className="text-xl text-slate-400 leading-relaxed italic border-l-4 border-red-600 pl-8">
                  {item.content}
                </p>
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
