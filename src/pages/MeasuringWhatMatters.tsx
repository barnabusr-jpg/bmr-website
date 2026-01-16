import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const MeasuringWhatMatters = () => {
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
                <span>2 min read</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Measuring What Matters: The Adoption Value System (AVS)
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed">
                Proving value is an AI adoption accelerator. The Adoption Value
                System (AVS) turns intent into measurable impact.
              </p>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">
                The Value Problem
              </h2>
              <p>
                When organizations move into adoption mode without defining
                success, AI efforts stall. Without measurement, value becomes an
                assumption rather than an outcome. AVS aligns delivery,
                governance, and performance so leaders can track impact in real
                time.
              </p>

              {/* <div className="bg-accent/5 border border-border rounded-lg p-6 my-6">
                <h3 className="text-xl font-semibold mb-4">
                  The Adoption Value System
                </h3>
                <p className="mb-4">
                  AVS connects vision to validation across four dimensions:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Value Identification</li>
                  <li>Impact Measurement</li>
                  <li>ROI Tracking</li>
                  <li>Continuous Optimization</li>
                </ul>
              </div>

              <div className="bg-accent/5 border border-border rounded-lg p-6 my-6">
                <h3 className="text-xl font-semibold mb-4">Strategic Value</h3>
                <p className="mb-4">
                  Less immediate but often more significant, strategic value
                  encompasses:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Enhanced decision-making quality and speed</li>
                  <li>New capability development and competitive advantages</li>
                  <li>
                    Market positioning and customer perception improvements
                  </li>
                  <li>Innovation acceleration and experimentation capacity</li>
                </ul>
              </div> */}

              {/* <div className="bg-accent/5 border border-border rounded-lg p-6 my-6">
                <h3 className="text-xl font-semibold mb-4">
                  Organizational Value
                </h3>
                <p className="mb-4">
                  The foundational layer that enables sustained AI success:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Capability building and skill development across teams
                  </li>
                  <li>Cultural evolution toward data-driven decision-making</li>
                  <li>Process maturation and institutional learning</li>
                  <li>Change readiness and adaptation capacity</li>
                </ul>
              </div> */}

              <h3 className="text-xl font-semibold mb-4">
                The Adoption Value System
              </h3>
              <p className="mb-4">
                AVS connects vision to validation across four dimensions:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Value Identification</li>
                <li>Impact Measurement</li>
                <li>ROI Tracking</li>
                <li>Continuous Optimization</li>
              </ul>

              <p>This creates a shared, measurable definition of success.</p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                Balancing Lag and Lead Metrics
              </h2>
              <p>
                Organizations tend to focus too heavily on lagging metrics:
                savings, revenue, and compliance. AVS brings leading indicators
                into the picture. Workforce confidence, model reliability, and
                stakeholder engagement. This balanced view keeps leadership
                informed and teams motivated.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                From Data to Decisions
              </h2>
              <p>
                AVS helps leaders understand which governance decisions add
                value and which create friction. This shortens alignment cycles
                between what is measured and what matters.
              </p>
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

export default MeasuringWhatMatters;
