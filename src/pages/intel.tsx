import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function IntelPage() {
  // This hook cancels any external redirect attempts for 1 second
  useEffect(() => {
    const preventJump = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      return;
    };
    window.addEventListener('beforeunload', preventJump);
    return () => window.removeEventListener('beforeunload', preventJump);
  }, []);

  return (
    <div className="bg-[#020617] min-h-screen text-white">
      <Header />
      <main className="pt-32 pb-20 px-10 max-w-7xl mx-auto">
        <h1 className="text-6xl font-black italic uppercase border-b border-red-600 pb-10 tracking-tighter">
          FORENSIC_INTEL
        </h1>
        <div className="mt-20">
          <p className="text-red-600 font-mono text-xs mb-4 uppercase tracking-[0.5em]">System_Status: Locked</p>
          <h2 className="text-4xl font-black italic uppercase">Secure Environment Active</h2>
        </div>
      </main>
      <Footer />
    </div>
  );
}
