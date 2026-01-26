import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const HeroHome = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center py-16 px-6 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Hero content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-3">
              <p className="text-sm font-medium tracking-wide text-muted-foreground">
                BMR Solutions
              </p>

              <h1 className="text-5xl font-bold leading-tight">
                Strategic Advisory for
                <span className="text-primary block mt-2">Responsible AI</span>
              </h1>
            </div>

            <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
              Helping organizations understand how their AI-enabled systems behave under real operating
              conditions so leaders can make well-grounded, defensible decisions when trust, regulation,
              and delivery risk matter.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="group">
                Start a Conversation
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button size="lg" variant="outline" className="border-border/60">
                Explore Our Approach
              </Button>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Understand how AI-related decision risk is forming before it hardens into an outcome
              </p>
              <p className="text-sm text-muted-foreground">
                See how we observe system behavior under real operating conditions
              </p>
              <p className="text-xs text-muted-foreground">
  Note: BMR provides advisory services and does not provide legal advice or compliance
  certification.
</p>
            </div>
          </motion.div>

          {/* Right: Authority framing card (no fluff) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <Card className="p-8 border-2 shadow-lg backdrop-blur-sm bg-card/95">
              <h3 className="text-2xl font-semibold mb-4">
                Why AI Efforts Quietly Stall
              </h3>

              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  AI initiatives rarely fail because the technology does not work.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  They stall because AI-enabled systems behave differently under real operating conditions
                  than leaders expect.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  When human judgment, AI, and oversight interact at scale, predictable behavioral patterns
                  emerge.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroHome;
