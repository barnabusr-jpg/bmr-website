import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PillarCard from "@/components/diagnostic/PillarCard";
import SystemCard from "@/components/diagnostic/SystemCard";
import { Button } from "@/components/ui/button";
import {
  calculateDiagnosticScores,
  DiagnosticScores,
} from "@/lib/diagnosticScoring";
import { motion } from "framer-motion";
import { BarChart3, BookOpen, Layers, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DiagnosticResults = () => {
  const router = useRouter();
  const { answers } = router.query;
  const [scores, setScores] = useState<DiagnosticScores | null>(null);

  useEffect(() => {
    if (!answers || Object.keys(answers).length === 0) {
      // No answers provided, redirect to diagnostic start
      router.push("/promise-gap/diagnostic/flow");
      return;
    }

    const answersObj: Record<string, string> = JSON.parse(answers as string);

    // Calculate scores from answers
    const calculatedScores = calculateDiagnosticScores(answersObj);

    setScores(calculatedScores);
  }, [answers, router]);

  if (!scores) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin h-8 w-8 border-2 border-accent border-t-transparent rounded-full mx-auto" />
          <p className="text-foreground/70">Calculating your results...</p>
        </div>
      </div>
    );
  }

  const getOverallHeadline = () => {
    switch (scores.overallLevel) {
      case "high":
        return "Your Organization Shows Strong AI Maturity";
      case "moderate":
        return "Your Organization is Building AI Maturity";
      case "low":
        return "Your Organization Has Opportunities for AI Growth";
    }
  };

  const getOverallSubheadline = () => {
    switch (scores.overallLevel) {
      case "high":
        return "Your diagnostic results indicate strong foundations across Trust, Governance, and Evolution. You're well-positioned to scale AI capabilities responsibly.";
      case "moderate":
        return "Your diagnostic results show developing capabilities with opportunities to strengthen specific areas. Focused improvements can accelerate your AI maturity.";
      case "low":
        return "Your diagnostic results highlight important areas for foundational development. Addressing these areas will help establish a solid base for AI success.";
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-32 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-16"
          >
            {/* Headline Section */}
            <div className="text-center space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20"
              >
                <BarChart3 className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium text-accent">
                  Your Results
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
              >
                {getOverallHeadline()}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg text-foreground/75 max-w-2xl mx-auto leading-[1.7]"
              >
                {getOverallSubheadline()}
              </motion.p>
            </div>

            {/* Section Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

            {/* Pillar Results Section */}
            <section className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-3"
              >
                <h2 className="text-2xl font-semibold">
                  Framework Pillar Results
                </h2>
                <p className="text-foreground/70 leading-relaxed">
                  Your assessment across the Trust → Govern → Evolve framework.
                </p>
              </motion.div>

              <div className="space-y-6">
                {scores.pillars.map((pillar, index) => (
                  <PillarCard
                    key={pillar.title}
                    title={pillar.title}
                    score={pillar.score.toFixed(1)}
                    narrative={pillar.narrative}
                    colorClass={pillar.colorClass}
                    index={index}
                  />
                ))}
              </div>
            </section>

            {/* Section Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

            {/* 4DSV System Section */}
            <section className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-3">
                  <Layers className="h-6 w-6 text-accent" />
                  <h2 className="text-2xl font-semibold">
                    4DSV System Analysis
                  </h2>
                </div>
                <p className="text-foreground/70 leading-relaxed">
                  How your organization performs across the four dimensions of
                  sustainable value.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                {scores.systems.map((system, index) => (
                  <SystemCard
                    key={system.title}
                    title={system.title}
                    state={system.stateLabel}
                    narrative={system.narrative}
                    index={index}
                  />
                ))}
              </div>
            </section>

            {/* Section Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

            {/* CTA Block */}
            <section className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-center space-y-3"
              >
                <h2 className="text-2xl font-semibold">What&apos;s Next?</h2>
                <p className="text-foreground/70 leading-relaxed max-w-xl mx-auto">
                  Explore resources to help close your organization&apos;s
                  Promise Gap.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                >
                  <Link href="/promise-gap" className="block h-full">
                    <div className="bg-card border border-border rounded-lg p-6 h-full space-y-4 transition-all duration-200 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5">
                      <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                        <BarChart3 className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="font-semibold">Promise Gap</h3>
                      <p className="text-sm text-foreground/70 leading-relaxed">
                        Learn more about the Promise Gap framework and how to
                        address it.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full transition-all duration-200"
                      >
                        Explore
                      </Button>
                    </div>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                >
                  <Link href="/insights" className="block h-full">
                    <div className="bg-card border border-border rounded-lg p-6 h-full space-y-4 transition-all duration-200 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5">
                      <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="font-semibold">Insights</h3>
                      <p className="text-sm text-foreground/70 leading-relaxed">
                        Read our latest thinking on AI transformation and
                        governance.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full transition-all duration-200"
                      >
                        Read More
                      </Button>
                    </div>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 }}
                >
                  <Link href="/contact" className="block h-full">
                    <div className="bg-card border border-border rounded-lg p-6 h-full space-y-4 transition-all duration-200 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5">
                      <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                        <MessageSquare className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="font-semibold">Contact Us</h3>
                      <p className="text-sm text-foreground/70 leading-relaxed">
                        Schedule a consultation to discuss your specific
                        challenges.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full transition-all duration-200"
                      >
                        Get in Touch
                      </Button>
                    </div>
                  </Link>
                </motion.div>
              </div>
            </section>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DiagnosticResults;
