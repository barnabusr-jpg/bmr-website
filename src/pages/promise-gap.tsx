import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// Importing the specific component you found in src/components/promise-gap/
import PromiseGapPage from "@/components/promise-gap/PromiseGapPage";

export default function PromiseGap() {
  return (
    <div className="min-h-screen bg-[#020617]">
      <Header />
      <main>
        <PromiseGapPage />
      </main>
      <Footer />
    </div>
  );
}
