// src/components/insights/FieldGuideOverviewPage.tsx
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { ArrowRight, BookOpen, Target, Layers, MessageSquare } from "lucide-react";

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

            <p className="text-xl text-foreground max-w-3xl mx-auto leading-relaxed font-medium">
              An executive orientation to how trust, governance, and value erode when 
              AI-enabled systems behave differently than expected.
            </p>

            <div className="mt-8 max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
              <p>
                This overview introduces the lenses BMR uses to observe system behavior. 
                It is not a how-to guide and does not describe implementation mechanics.
              </p>
            </div>
          </motion.div>

          {/* WHY THIS GUIDE EXISTS */}
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="max-w-4xl mx-auto mb-20"
          >
            <Card className="p-10 border-2 bg-slate-50/50">
              <h2 className="text-3xl font-bold mb-6">Why This Guide Exists</h2>
              <p className="text-lg mb-6">Organizations rarely struggle with AI because of tooling. They struggle because:</p>
              <ul className="space-y-4 text-lg text-muted-foreground">
                <li className="flex gap-3 items-start">
                  <span className="text-primary font-bold">•</span>
                  <span>People do not trust decisions they cannot understand</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-primary font-bold">•</span>
                  <span>Governance loses influence under pressure</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-primary font-bold">•</span>
                  <span>Value becomes difficult to see before confidence erodes</span>
                </li>
              </ul>
              <p className="mt-8 font-medium text-foreground">
                The Field Guide provides shared language to recognize these patterns early.
              </p>
            </Card>
          </motion.section>

          {/* CORE PERSPECTIVES */}
          <h2 className="text-3xl font-bold text-center mb-10">Core Perspectives</h2>
          <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
            <Card className="p-8 border-2">
              <h3 className="text-xl font-bold mb-4">Human–AI Interaction</h3>
              <p className="text-muted-foreground">
                How people experience AI-influenced decisions in real operational contexts.
              </p>
            </Card>

            <Card className="p-8 border-2">
              <h3 className="text-xl font-bold mb-4">Adoption Value Perspective</h3>
              <p className="text-muted-foreground">
                Whether AI efforts translate into sustained organizational value over time.
              </p>
            </Card>

            <Card className="p-8 border-2">
              <h3 className="text-xl font-bold mb-4">Trust to Govern to Evolve</h3>
              <p className="text-muted-foreground">
                Recurring patterns are observed as AI initiatives mature.
              </p>
            </Card>
          </div>

          {/* NEXT STEPS */}
          <div className="max-w-4xl mx-auto text-center border-t pt-16">
            <h2 className="text-3xl font-bold mb-6">Next Steps</h2>
            <p className="text-lg text-muted-foreground mb-10">
              If misalignment between vision and delivery is suspected, the first step is awareness.
            </p>
            
            <div className="flex flex-col md:flex-row gap-8 justify-center items-start text-left">
              <div className="flex-1">
                <Button asChild className="mb-4 w-full">
                  <Link href="/promise-gap/diagnostic">Check for early signals</Link>
                </Button>
                <p className="text-sm text-muted-foreground">Confirm whether further observation is warranted</p>
              </div>

              <div className="flex-1">
                <Button variant="outline" asChild className="mb-4 w-full">
                  <Link href="/contact">Start a Conversation</Link>
                </Button>
                <p className="text-sm text-muted-foreground">Discuss what the early signals may indicate</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
