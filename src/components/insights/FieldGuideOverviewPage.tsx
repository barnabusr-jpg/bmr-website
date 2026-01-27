// src/components/insights/FieldGuideOverviewPage.tsx
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { ArrowRight, BookOpen, Target, Layers } from "lucide-react";

export default function FieldGuideOverviewPage() {
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Field Guide Overview</h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A structured orientation to how BMR approaches trust, decision risk, and system behavior
              under real operating conditions.
            </p>

            <div className="mt-8 max-w-4xl mx-auto text-lg text-muted-foreground leading-relaxed space-y-4">
              <p>
                Our field guides are not frameworks to adopt. They are tools for leaders who need to
                understand how AI-enabled systems behave once deployed — when accountability, oversight,
                and lived experience collide.
              </p>
              <p>
                These guides are designed to help you identify where risk is forming before it becomes
                visible as failure, backlash, regulatory exposure, or stalled adoption.
              </p>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg">
                <Link href="/promise-gap/diagnostic">
                  Check for early signals <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline" className="text-lg">
                <Link href="/insights">
                  View Insights <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* WHAT THIS OVERVIEW IS */}
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
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">What This Overview Covers</h2>
              </div>

              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  This overview introduces the core lenses BMR uses to interpret AI-related delivery risk:
                  how trust forms, how governance holds (or breaks), and how systems adapt under pressure.
                </p>
                <p>
                  It is intentionally not prescriptive. It helps leaders recognize patterns and determine
                  whether deeper structured observation is needed.
                </p>
              </div>
            </Card>
          </motion.section>

          {/* THREE FOCUS AREAS */}
          <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <Card className="p-8 border-2 h-full">
                <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Why These Guides Exist</h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    AI initiatives rarely stall because the technology does not work. They stall because
                    system behavior diverges from expectation under real conditions.
                  </p>
                  <p>
                    The guides focus on the behavioral mechanics of delivery: decision pathways,
                    accountability, adaptation, and drift.
                  </p>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.05 }}
            >
              <Card className="p-8 border-2 h-full">
                <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                  <Layers className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">What You Will See</h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Each guide introduces a structured lens, real operating patterns, and the kinds of
                    signals that indicate risk is accumulating.
                  </p>
                  <p>
                    The goal is not compliance language. The goal is executive visibility into behavior
                    that undermines trust, slows adoption, or creates defensibility gaps.
                  </p>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <Card className="p-8 border-2 h-full">
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <h3 className="text-2xl font-semibold text-foreground">How to Use This</h3>
                  <p>
                    Start with the Promise Gap lens if you are seeing drift between expectations and
                    lived experience.
                  </p>
                  <p>
                    Use Trust / Govern / Evolve as signal lenses to understand where instability is
                    forming — not as stages to follow.
                  </p>
                  <p>
                    If signals are present, structured observation is the next step.
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* FINAL CTA */}
          <div className="mt-14 text-center">
            <Button asChild size="lg" className="text-lg">
              <Link href="/promise-gap/diagnostic">
                Begin the diagnostic <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="mt-3 text-sm text-muted-foreground">
              See whether system behavior is diverging from expectation
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
