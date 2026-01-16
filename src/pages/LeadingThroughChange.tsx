import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LeadingThroughChange = () => {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>November 2025</span>
                <span>•</span>
                <span>3 min read</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Leading Through Change: Executive Readiness for the AI Era
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed">
                Technology mastery is not AI leadership. Leadership is about
                shaping the systems that govern how technology is used.
              </p>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">
                Leadership’s Blind Spot
              </h2>
              <p>
                Executives often view AI as something to manage, not something
                to lead. This mindset limits oversight to cost and compliance
                rather than culture and accountability. This is where AI
                strategy begins to drift.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                Focus on Strategic Oversight
              </h2>
              <p>
                Leaders do not need algorithmic expertise. They need structural
                clarity, policy boundaries, resource priorities, and
                transparency expectations that define team operation. When these
                are clear, teams can move quickly within trusted limits.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                Building Readiness Into the System
              </h2>
              <p>
                Executive readiness is not a course; it is a discipline. It
                forms through rhythm. Consistent briefings, transparent reviews,
                and candid debate. When those routines exist, AI becomes
                manageable instead of mysterious. Leaders gain insight and
                visibility without slowing innovation.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                30-Day Reset Plan
              </h2>
              <p>Week 1: Map all active AI projects and owners</p>
              <p>Week 2: Define leadership decision boundaries</p>
              <p>Week 3: Establish communication and escalation channels</p>
              <p>Week 4: Align reporting cadence with objectives</p>
            </div>

            <div className="border-t border-border pt-8 mt-8">
              <h3 className="text-xl font-semibold mb-4">Next Step</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Learn how AVS turns responsible AI into measurable performance.
                Download the HAI–AVS Field Guide at bmradvisory.co/promise-gap.
              </p>
            </div>

            <div className=" pt-4">
              <h3 className="text-xl font-semibold mb-4">
                About BMR Solutions
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                BMR Solutions helps teams quantify the impact of AI adoption
                through the AVS model, aligning governance and performance to
                measurable outcomes.
              </p>
              <p className="text-accent font-medium">
                Govern: Turning responsible principles into measurable
                performance.
              </p>
            </div>
          </motion.article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LeadingThroughChange;
