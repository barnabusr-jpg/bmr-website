// src/components/promise-gap-diagnostic/PromiseGapDiagnosticPage.tsx
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { ArrowRight, Shield, Activity, AlertTriangle } from "lucide-react";

export default function PromiseGapDiagnosticPage() {
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
              Promise Gap <span className="text-primary">Diagnostic</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Surface early signals of misalignment between vision, delivery, and lived experience.
            </p>

            <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The diagnostic reveals whether AI-enabled system behavior may be diverging from expectations.
            </p>

            <div className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed space-y-2">
              <p>It does not score maturity.</p>
              <p>It does not diagnose root causes.</p>
              <p>It does not provide remediation plans.</p>
            </div>

            <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Meaningful diagnosis requires deeper assessment beyond a short intake.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg">
                <a href="#start">
                  Start the Interactive Diagnostic <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>

              {/* Leave links as-is for now; we’ll wire later */}
              <Button asChild size="lg" variant="outline" className="text-lg">
                <Link href="/insights">
                  View Insights <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
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
                  <li>Supports decisions about whether further evaluation is warranted</li>
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

          {/* START */}
          <motion.section
            id="start"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="max-w-6xl mx-auto"
          >
            <Card className="p-10 border-2">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Start the Interactive Diagnostic</h2>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Complete a brief 12-question assessment to check for early signals of misalignment.
                <br />
                Approximately 10 minutes · Initial signal only
              </p>

              {/* Intake shell (UI only for now) */}
              <form className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    className="w-full rounded-lg border border-border bg-background px-4 py-3"
                    type="text"
                    name="name"
                    autoComplete="name"
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    className="w-full rounded-lg border border-border bg-background px-4 py-3"
                    type="email"
                    name="email"
                    autoComplete="email"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Organization</label>
                  <input
                    className="w-full rounded-lg border border-border bg-background px-4 py-3"
                    type="text"
                    name="organization"
                    autoComplete="organization"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Notes or Context (optional)</label>
                  <textarea
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 min-h-[120px]"
                    name="notes"
                  />
                </div>

                <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <Button type="button" size="lg" className="text-lg">
                    Submit Diagnostic
                  </Button>

                  <p className="text-sm text-muted-foreground">
                    Receive an initial signal of alignment risk
                  </p>
                </div>

                <div className="md:col-span-2 pt-2">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This diagnostic provides early signals only.
                    <br />
                    Deeper structured observation is required for diagnosis or action planning.
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
