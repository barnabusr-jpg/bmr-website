import type { ElementType } from "react";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import {
  TrendingUp,
  Users,
  Shield,
  Zap,
  Target,
  CheckCircle2,
} from "lucide-react";

type Outcome = {
  icon: ElementType;
  title: string;
  description: string;
  benefits: string[];
};

const outcomes: Outcome[] = [
  {
    icon: TrendingUp,
    title: "Accelerated Adoption",
    description:
      "Move AI initiatives out of pilot mode and into real operational use with reduced delivery risk.",
    benefits: [
      "Reduced time to value",
      "Lower implementation risk",
      "Faster stakeholder alignment",
      "Clearer decision pathways",
    ],
  },
  {
    icon: Users,
    title: "Stronger Organizational Trust",
    description:
      "Build confidence through transparency, accountability, and governance that holds up under scrutiny.",
    benefits: [
      "Improved executive confidence",
      "Clear ownership of oversight",
      "More resilient adoption",
      "Reduced internal friction",
    ],
  },
  {
    icon: Shield,
    title: "Defensible Risk Management",
    description:
      "Identify where decision risk is forming early — before it hardens into an operational or regulatory outcome.",
    benefits: [
      "Early detection of unowned risk",
      "Better governance posture",
      "Reduced compliance exposure",
      "Improved assurance discipline",
    ],
  },
  {
    icon: Zap,
    title: "Operational Clarity",
    description:
      "Understand how AI-enabled systems actually behave under real conditions, not just in design documents.",
    benefits: [
      "Fewer delivery surprises",
      "Better human–AI interaction design",
      "More predictable outcomes",
      "Stronger system-level insight",
    ],
  },
  {
    icon: Target,
    title: "Measurable Value Realization",
    description:
      "Ensure AI investments translate into durable organizational outcomes — not stalled initiatives.",
    benefits: [
      "Improved ROI alignment",
      "Reduced waste in experimentation",
      "Clearer outcome tracking",
      "Sustained delivery momentum",
    ],
  },
  {
    icon: CheckCircle2,
    title: "Executive Readiness",
    description:
      "Equip leadership teams with the decision structures needed to act confidently in high-stakes environments.",
    benefits: [
      "Better decision discipline",
      "Stronger accountability",
      "Defensible governance choices",
      "Improved operational readiness",
    ],
  },
];

export default function OutcomesPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-6">Outcomes</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Organizations work with BMR to strengthen decision confidence,
              reduce adoption friction, and ensure AI-enabled systems behave
              reliably under real operating conditions.
            </p>
          </motion.div>

          {/* Outcome Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {outcomes.map((outcome, index) => (
              <motion.div
                key={outcome.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-8 h-full hover:shadow-lg transition-shadow duration-300 border-2">
                  <div className="flex flex-col items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <outcome.icon className="h-6 w-6 text-primary" />
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        {outcome.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {outcome.description}
                      </p>

                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {outcome.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-2">
                            <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
