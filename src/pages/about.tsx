import React from "react";
import { useRouter } from 'next/router';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Target, Users } from "lucide-react";

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Header />
      
      <main className="pt-32 pb-20 px-6 container mx-auto max-w-5xl">
        <section className="mb-24 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 font-display leading-tight">
            Re-anchoring AI to <br/><span className="text-[#14b8a6]">Strategic Intent.</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
            BMR Advisory was founded to solve the &quot;Promise Gap&quot;&mdash;the space where technical AI deployment fails to translate into realized operational value.
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-16 mb-32 items-center text-left">
          <div>
            <h2 className="text-3xl font-bold mb-6">The Friction Tax</h2>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Most organizations view AI as a technical installation. We view it as an organizational evolution. When AI systems are &quot;bolted on&quot; rather than integrated, they create a friction tax: hidden human labor required to verify, fix, and oversee the machine.
            </p>
            <p className="text-slate-400 leading-relaxed">
              We help leaders identify these leaks and recover stranded capital through longitudinal observation and systemic re-anchoring.
            </p>
          </div>
          <Card className="p-8 bg-slate-900/40 border-slate-800 border-2">
             <div className="space-y-6">
                <div className="flex gap-4">
                    <ShieldCheck className="text-[#14b8a6] shrink-0" />
                    <div>
                        <h4 className="font-bold">Trust-First Architecture</h4>
                        <p className="text-sm text-slate-500">Reducing manual verification through behavioral predictability.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Target className="text-[#14b8a6] shrink-0" />
                    <div>
                        <h4 className="font-bold">Operational Resonance</h4>
                        <p className="text-sm text-slate-500">Aligning system outputs with brand-level standards.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Users className="text-[#14b8a6] shrink-0" />
                    <div>
                        <h4 className="font-bold">Human-Centric Evolution</h4>
                        <p className="text-sm text-slate-500">Moving staff from &quot;verification labor&quot; to high-value work.</p>
                    </div>
                </div>
             </div>
          </Card>
        </div>

        <section className="text-center py-20 border-t border-slate-900">
          <h2 className="text-3xl font-bold mb-8">Ready to see the data?</h2>
          <Button 
            onClick={() => router.push('/diagnostic')}
            className="bg-[#14b8a6] text-black font-bold h-16 px-10 text-lg hover:bg-[#0d9488]"
          >
            Begin Your Diagnostic
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
}
