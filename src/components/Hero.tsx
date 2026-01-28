import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Download } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center py-20 px-6 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-8"
          >
            <h1 className="text-5xl font-bold leading-tight">
              Strategic Advisory for <span className="text-primary block mt-2">Responsible AI</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
              Helping organizations navigate AI governance, delivery transformation, 
              and executive readiness with confidence and clarity.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="group" asChild>
                <Link href="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/frameworks">Explore Frameworks</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild className="gap-2">
                <a href="/field-guide-summary.pdf" download="BMR_Field_Guide_Summary.pdf">
                  <Download className="h-4 w-4" />
                  Field Guide
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <Card className="p-8 border-2 shadow-lg backdrop-blur-sm bg-card/95">
              <h3 className="text-2xl font-semibold mb-6">Outcome Snapshot</h3>
              <div className="space-y-4 mb-6">
                {["Build trust through transparent AI governance frameworks", 
                  "Transform delivery with proven adoption methodologies", 
                  "Prepare executives for strategic AI decision-making"].map((text) => (
                  <div key={text} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <p className="text-muted-foreground">{text}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Implementation Progress</span>
                  <span className="font-semibold">85%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "85%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
