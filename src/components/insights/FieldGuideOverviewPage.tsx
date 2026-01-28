import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { ArrowRight } from "lucide-react";

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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Field Guide Overview
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              An executive orientation to how trust, governance, and value erode when AI-enabled
              systems behave differently than expected.
            </p>

            <div className="mt-8 max-w-3xl mx-auto text-lg text-muted-foreground leading-relaxed space-y-3">
              <p>This overview introduces the lenses BMR uses to observe system behavior.</p>
              <p>It is not a how-to guide and does not describe implementation mechanics.</p>
            </div>
          </motion.div>

          {/* WHY THIS GUIDE EXISTS */}
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="max-w-6xl mx-auto mb-14"
          >
            <Card className="p-10 border-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why This Guide Exists
              </h2>

              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>Organizations rarely struggle with AI because of tooling.</p>

                <p>They struggle because:</p>

                <ul className="list-disc pl-6 space-y-2">
                  <li>People do not trust decisions they cannot understand</li>
                  <li>Governance loses influence under pressure</li>
                  <li>Value becomes difficult to see before confidence erodes</li>
                </ul>

                <p>
                  The Field Guide provides shared language to recognize these patterns early.
                </p>
              </div>
            </Card>
          </motion.section>

          {/* CORE PERSPECTIVES */}
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="max-w-6xl mx-auto mb-14"
          >
            <Card className="p-10 border-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Core Perspectives
              </h2>

              <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Human–AI Interaction
                  </h3>
                  <p>
                    How people experience AI-influenced decisions in real operational contexts.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Adoption Value Perspective
                  </h3>
                  <p>
                    Whether AI efforts translate into sustained organizational value over time.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Trust to Govern to Evolve
                  </h3>
                  <p>Recurring patterns are observed as AI initiatives mature.</p>
                </div>

                <p>These are not steps, metrics, or operating instructions.</p>

                <p>
                  Meaningful evaluation requires structured assessment beyond this overview.
                </p>
              </div>
            </Card>
          </motion.section>

          {/* NEXT STEPS */}
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="max-w-6xl mx-auto"
          >
            <Card className="p-10 border-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Next Steps
              </h2>

              <div className="space-y-3 text-lg text-muted-foreground leading-relaxed mb-10">
                <p>
                  If misalignment between vision and delivery is suspected, the first step is awareness.
                </p>
                <p>Check for early signals</p>
                <p>Confirm whether further observation is warranted</p>
                <p>Start a Conversation</p>
                <p>Discuss what the early signals may indicate</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg">
                  <Link href="/promise-gap/diagnostic">
                    Check for early signals <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                <Button asChild size="lg" variant="outline" className="text-lg">
                  <Link href="/contact">
                    Start a Conversation <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </Card>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
