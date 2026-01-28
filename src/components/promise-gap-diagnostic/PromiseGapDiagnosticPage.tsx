import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { ArrowRight, Shield, Activity, AlertTriangle } from "lucide-react";

/**
 * MANDATORY: This interface tells TypeScript that this component 
 * accepts a submission function from the parent.
 */
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

function LensIndicator({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="h-14 w-14 rounded-full bg-primary/15 flex items-center justify-center">
        <div className="h-5 w-5 rounded-full bg-primary" />
      </div>
      <div className="text-base font-semibold">{label}</div>
    </div>
  );
}

export default function PromiseGapDiagnosticPage({ onSubmit }: PromiseGapProps) {
  // 1. State management to capture user input for the API
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. Submission handler to trigger the server-side email logic
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Passes the collected data to the API caller in flow.tsx
      await onSubmit({}, formData.email, formData.name);
      
      // Redirect to the non-evaluative results page
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Diagnose where your transformation is leaking trust and value.
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Surface early signals of misalignment between vision, delivery, and lived experience.
            </p>

            <div className="mt-10 flex items-center justify-center gap-16">
              {lenses.map((l) => (
                <LensIndicator key={l.label} label={l.label} />
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg">
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

            <div className="mt-8 max-w-3xl mx-auto text-sm text-muted-foreground leading-relaxed">
              <p>This diagnostic provides early signals only.</p>
              <p>It does not score maturity, diagnose root causes, or provide remediation plans.</p>
            </div>
          </motion.div>

          {/* WHAT IT DOES / DOES NOT */}
          <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto mb-14">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <Card className="p-10 border-2 h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-3 rounded-lg bg-primary/10 w-fit">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold">What This Diagnostic Does</h2>
                </div>

                <ul className="list-disc pl-6 space-y-3 text-lg text-muted-foreground leading-relaxed">
                  <li>Reveals early indicators of expectation misalignment</li>
                  <li>Highlights where confidence, clarity, or stability may be weakening</li>
                  <li>Supports the decision to investigate further</li>
                </ul>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.05 }}
            >
              <Card className="p-10 border-2 h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-3 rounded-lg bg-primary/10 w-fit">
                    <AlertTriangle className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold">What This Diagnostic Does Not Do</h2>
                </div>

                <ul className="list-disc pl-6 space-y-3 text-lg text-muted-foreground leading-relaxed">
                  <li>It does not score maturity</li>
                  <li>It does not diagnose root causes</li>
                  <li>It does not provide remediation plans</li>
                </ul>
              </Card>
            </motion.div>
          </div>

          {/* ASSESSMENT FOCUS */}
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="max-w-6xl mx-auto mb-14"
          >
            <Card className="p-10 border-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-3 rounded-lg bg-primary/10 w-fit">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Assessment Focus</h2>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                The questions explore three recurring tension areas observed across organizations:
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="rounded-xl border border-border p-6">
                  <h3 className="text-xl font-semibold mb-2">Trust</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Signals related to confidence, transparency, and lived experience
                  </p>
                </div>

                <div className="rounded-xl border border-border p-6">
                  <h3 className="text-xl font-semibold mb-2">Govern</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Signals related to clarity, accountability, and decision consistency
                  </p>
                </div>

                <div className="rounded-xl border border-border p-6">
                  <h3 className="text-xl font-semibold mb-2">Evolve</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Signals related to adaptation, stability, and learning under change
                  </p>
                </div>
              </div>

              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                These are signal lenses, not stages or prescriptions.
              </p>
            </Card>
          </motion.section>

          {/* START FORM - Updated for API Integration */}
          <motion.section
            id="start"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="max-w-6xl mx-auto"
          >
            <Card className="p-10 border-2">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Your Information</h2>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Complete a brief intake to begin.
              </p>

              <form onSubmit={handleFormSubmit} className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium mb-2">Name *</label>
                  <input
                    className="w-full rounded-lg border border-border bg-background px-4 py-3"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Your name"
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    className="w-full rounded-lg border border-border bg-background px-4 py-3"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="your@email.com"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Organization *</label>
                  <input
                    className="w-full rounded-lg border border-border bg-background px-4 py-3"
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({...formData, organization: e.target.value})}
                    placeholder="Your organization"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Notes / Context</label>
                  <textarea
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 min-h-[120px]"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    placeholder="Share any additional context about your transformation challenges..."
                  />
                </div>

                <div className="md:col-span-2">
                  <Button type="submit" size="lg" disabled={isSubmitting} className="text-lg w-full sm:w-auto">
                    {isSubmitting ? "Submitting..." : "Submit Diagnostic"}
                  </Button>
                </div>

                <div className="md:col-span-2 pt-2">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This diagnostic provides early signals only. Deeper structured observation is
                    required for diagnosis or action planning.
                  </p>
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
