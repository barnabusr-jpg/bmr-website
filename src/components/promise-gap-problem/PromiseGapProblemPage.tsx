// src/components/promise-gap-problem/PromiseGapProblemPage.tsx
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { ArrowRight, AlertTriangle, Layers, Workflow } from "lucide-react";

type ProblemCard = {
  icon: React.ElementType;
  title: string;
  body: string[];
};

const cards: ProblemCard[] = [
  {
    icon: Workflow,
    title: "Decision pathways slow or fragment",
    body: [
      "Approval chains lengthen as uncertainty increases.",
      "Teams work around governance to maintain momentum.",
      "Decisions become harder to explain and harder to defend.",
    ],
  },
  {
    icon: Layers,
    title: "Accountability diffuses across roles",
    body: [
      "Ownership blurs between leadership, delivery, and oversight.",
      "When outcomes degrade, responsibility becomes ambiguous.",
      "Risk accumulates without a clear decision owner.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Systems adapt around controls",
    body: [
      "Controls exist on paper but behavior shifts in practice.",
      "Workarounds harden into operating norms.",
      "Trust erodes as lived experience diverges from intent.",
    ],
  },
];

export default function PromiseGapProblemPage() {
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
              The Promise Gap <span className="text-primary">Problem</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              AI initiatives rarely stall because the technology does not work.
              They stall because AI-enabled systems behave differently under real operating conditions than leaders expect.
            </p>

            <div className="mt-8 max-w-3xl mx-auto text-lg text-muted-foreground leading-relaxed space-y-4">
              <p>
                When human judgment, AI, and oversight interact at scale, predictable behavioral patterns emerge.
              </p>
              <p>
                Over time, decision clarity weakens, accountability diffuses, and teams adapt around controls to keep delivery moving.
              </p>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg">
                <Link href="/promise-gap/diagnostic">
                  Check for early signals <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline" className="text-lg">
                <Link href="/promise-gap">
                  Back to Promise Gap <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* CARDS */}
          <div className="grid md:grid-cols-2 gap-6">
            {cards.map((item, index) => {
              const isLast = index === cards.length - 1;
              const isOdd = cards.length % 2 === 1;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className={isLast && isOdd ? "md:col-span-2 md:flex md:justify-center" : ""}
                >
                  <Card className="p-8 h-full max-w-2xl w-full border-2">
                    <div className="flex flex-col gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 w-fit">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>

                      <div>
                        <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>

                        <div className="space-y-3 text-muted-foreground leading-relaxed">
                          {item.body.map((p) => (
                            <p key={p}>{p}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* FINAL CTA */}
          <div className="mt-14 text-center">
            <Button asChild size="lg" className="text-lg">
              <Link href="/promise-gap/diagnostic">
                Begin the diagnostic <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
