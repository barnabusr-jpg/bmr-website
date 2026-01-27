// src/components/promise-gap/PromiseGapPage.tsx
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { ArrowRight, AlertTriangle, Activity, Shield } from "lucide-react";

type SectionCard = {
  icon: React.ElementType;
  title: string;
  body: string[];
};

const cards: SectionCard[] = [
  {
    icon: Activity,
    title: "System Friction Patterns",
    body: [
      "AI-related friction manifests differently across organizations, but the underlying issue is the same.",
      "AI-enabled system behavior becomes unstable under pressure.",
      "Some environments experience urgency-driven shortcuts. Others experience volatility driven by shifting priorities.",
      "These patterns converge in the same outcome. AI underperforms quietly inside day-to-day work long before failure is visible.",
    ],
  },
  {
    icon: Shield,
    title: "From Signal to Understanding",
    body: [
      "The Promise Gap Diagnostic reveals early behavioral signals inside workflows, decisions, and handoffs.",
      "It does not provide answers or prescriptions. It helps leaders decide whether deeper structured observation is warranted.",
      "Structured review is required to understand where instability exists and how it affects trust, governance, and adaptation.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Trust. Govern. Evolve.",
    body: [
      "These terms describe recurring patterns observed as AI efforts mature.",
      "They are not steps to follow. They are lenses that help leaders understand where risk may be accumulating.",
      "Meaningful understanding requires structured observation.",
    ],
  },
];

export default function PromiseGapPage() {
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
              The <span className="text-primary">Promise Gap™</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Where transformation falters not because technology fails, but
              because system behavior diverges from expectation.
            </p>

            <div className="mt-8 max-w-3xl mx-auto text-lg text-muted-foreground leading-relaxed">
              <p>Sales sell the future.</p>
              <p>Delivery inherits reality.</p>
              <p>And value quietly leaks in between.</p>
              <p className="mt-4">
                Every organization pursuing transformation encounters this
                moment.
              </p>
              <p className="mt-4">
                The breakdown is rarely technical. It occurs when expectations,
                accountability, and context fragment after deployment.
              </p>
              <p className="mt-4">
                Organizations that close this gap strengthen the connection
                between people, processes, and purpose as systems scale.
              </p>
            </div>

            {/* CTAs (leave hrefs stable; we’ll wire properly later) */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg">
                <Link
                  href="/promise-gap/diagnostic"
                  className="flex flex-col items-center"
                >
                  <span className="inline-flex items-center">
                    Check for early signals{" "}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                  <span className="text-sm opacity-80 mt-1">
                    See whether system behavior is diverging from expectation
                  </span>
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline" className="text-lg">
                <Link href="/insights" className="flex flex-col items-center">
                  <span className="inline-flex items-center">
                    View the Field Guide overview{" "}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                  <span className="text-sm opacity-80 mt-1">
                    Build shared language to recognize drift early
                  </span>
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* WHY TRANSFORMATION DRIFTS */}
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="max-w-5xl mx-auto mb-14"
          >
            <Card className="p-10 border-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Transformation Drifts
              </h2>

              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Transformation does not fail because tools are flawed. It
                  drifts when trust erodes between what was promised and what is
                  experienced.
                </p>
                <p>
                  Most initiatives begin with alignment and intent. Over time,
                  communication thins, accountability blurs, and confidence
                  weakens.
                </p>
                <p>
                  The Promise Gap describes this drift before failure becomes
                  visible.
                </p>
              </div>
            </Card>
          </motion.section>

          {/* 3 CARDS */}
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
                  className={
                    isLast && isOdd
                      ? "md:col-span-2 md:flex md:justify-center"
                      : ""
                  }
                >
                  <Card className="p-8 h-full max-w-2xl w-full border-2">
                    <div className="flex flex-col gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 w-fit">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>

                      <div>
                        <h3 className="text-2xl font-semibold mb-4">
                          {item.title}
                        </h3>

                        <div className="space-y-4 text-muted-foreground leading-relaxed">
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
