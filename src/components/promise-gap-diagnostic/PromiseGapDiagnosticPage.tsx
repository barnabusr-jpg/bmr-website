import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { ArrowRight, Shield, Activity, AlertTriangle, Check } from "lucide-react";

interface PromiseGapProps {
  onSubmit: (finalAnswers: Record<string, string>, userEmail: string, name: string) => Promise<void>;
}

type Lens = {
  label: "Trust" | "Govern" | "Evolve";
};

const lenses: Lens[] = [
  { label: "Trust" },
  { label: "Govern" },
  { label: "Evolve" },
];

/* FIXED: Updated colors to Teal for consistency across all lenses */
function LensIndicator({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="h-14 w-14 rounded-full bg-[#14b8a6] flex items-center justify-center shadow-md">
        <Check className="h-6 w-6 text-white" />
      </div>
      <div className="text-base font-semibold">{label}</div>
    </div>
  );
}

export default function PromiseGapDiagnosticPage({ onSubmit }: PromiseGapProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Logic to trigger the 12-question flow would happen here or in the parent
      await onSubmit({}, formData.email, formData.name);
      window.location.href = "/promise-gap/diagnostic/results";
    } catch (error) {
      console.error("Diagnostic submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* HERO */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Diagnose where your transformation is leaking <span className="text-[#14b8a6]">trust and value.</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Surface early signals of misalignment between vision, delivery, and lived experience.
            </p>

            <div className="mt-12 flex items-center justify-center gap-12 md:gap-24">
              {lenses.map((l) => (
                <LensIndicator key={l.label} label={l.label} />
              ))}
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg bg-[#14b8a6] hover:bg-[#0d9488]">
                <a href="#start">
                  Start the Interactive Diagnostic <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>

              <Button asChild size="lg" variant="outline" className="text-lg">
                <Link href="/insights">
                  View Insights <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* WHAT IT DOES / DOES NOT */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-14">
            <Card className="p-10 border-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-3 rounded-lg bg-teal-50 w-fit">
                  <Shield className="h-6 w-6 text-[#14b8a6]" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">What This Does</h2>
              </div>
              <ul className="list-disc pl-6 space-y-3 text-lg text-muted-foreground">
                <li>Reveals indicators of expectation misalignment</li>
                <li>Highlights weakening clarity or stability</li>
                <li>Supports the decision to investigate further</li>
              </ul>
            </Card>

            <Card className="p-10 border-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-3 rounded-lg bg-orange-50 w-fit">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">What This Does Not Do</h2>
              </div>
              <ul className="list-disc pl-6 space-y-3 text-lg text-muted-foreground">
                <li>It does not score maturity</li>
                <li>It does not diagnose root causes</li>
                <li>It does not provide remediation plans</li>
              </ul>
            </Card>
          </div>

          {/* START FORM */}
          <motion.section
            id="start"
            className="max-w-4xl mx-auto"
          >
            <Card className="p-10 border-2 shadow-xl">
              <h2 className="text-3xl font-bold mb-4">Intake Information</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Complete this brief intake to unlock the 12 signal questions.
              </p>

              <form onSubmit={handleFormSubmit} className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Full Name *</label>
                  <input
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Work Email *</label>
                  <input
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-semibold">Organization *</label>
                  <input
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({...formData, organization: e.target.value})}
                  />
                </div>

                <div className="md:col-span-2">
                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-[#14b8a6] hover:bg-[#0d9488]">
                    {isSubmitting ? "Processing..." : "Continue to Diagnostic Questions"}
                  </Button>
                </div>
              </form>
            </Card>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
