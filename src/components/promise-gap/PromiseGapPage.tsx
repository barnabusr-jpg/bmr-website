import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  ArrowRight,
  AlertTriangle,
  Shield,
  Target,
  Activity,
} from "lucide-react";

const sections = [
  {
    icon: AlertTriangle,
    title: "The Promise Gap",
    description:
      "AI programs rarely fail because the technology does not work. They stall when real-world operating conditions expose gaps between what leaders expect and what systems actually do.",
    bullets: [
      "Decision pathways slow or fragment under load",
      "Accountability diffuses across roles and teams",
      "Controls are adapted around to maintain momentum",
      "Risk forms early, then hardens into outcomes",
    ],
  },
  {
    icon: Activity,
    title: "What Makes It Hard to See",
    description:
      "Most organizations monitor milestones and artifacts. The gap shows up in behavior: how people, AI, and oversight interact at scale.",
    bullets: [
      "Signals are distributed across delivery, governance, and operations",
      "Teams optimize locally, creating system-level blind spots",
      "Executives receive lagging indicators after options narrow",
      "Assurance becomes documentation-heavy, insight-light",
    ],
  },
  {
    icon: Shield,
    title: "What BMR Helps You Do",
    description:
      "BMR helps leaders surface decision risk early, clarify ownership, and stabilize governance and delivery behavior under real operating conditions.",
    bullets: [
      "Identify where oversight is breaking down",
      "Restore decision clarity without slowing delivery",
      "Reduce adoption friction and delivery drag",
      "Strengthen defensibility when scrutiny increases",
    ],
  },
];

export default function PromiseGapPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h1 className="text-5xl font-bold mb-5">The Promise Gap</h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The gap between what AI programs promise in design and what
              AI-enabled systems deliver in real operating conditions. When this
              gap forms, trust erodes, decisions slow, and delivery risk becomes
              harder to unwind.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-primary-foreground font-medium hover:opacity-90 transition"
              >
                Start a Conversation <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                href="/promise-gap/diagnostic"
                className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3 font-medium hover:bg-accent transition"
              >
                Explore the Diagnostic <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <p className="mt-5 text-sm text-muted-foreground">
              Note: BMR provides advisory services and does not provide legal
              advice or compliance certification.
            </p>
          </motion.div>

          {/* Core Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((s, idx) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                >
                  <Card className="p-8 h-full hover:shadow-lg transition-shadow duration-300">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>

                    <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
                    <p className="text-muted-foreground mb-5">
                      {s.description}
                    </p>

                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/70" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-12"
          >
            <Card className="p-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold">
                      Make the risk visible before it hardens.
                    </h2>
                  </div>

                  <p className="text-muted-foreground">
                    If you are seeing adoption friction, governance strain, or
                    unclear decision ownership, the right move is to surface
                    where risk is forming and align on what changes under real
                    operating conditions.
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-primary-foreground font-medium hover:opacity-90 transition"
                >
                  Start a Conversation <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
