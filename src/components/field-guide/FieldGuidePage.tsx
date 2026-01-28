import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";

export default function FieldGuidePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <div className="mx-auto w-fit p-3 rounded-lg bg-primary/10 mb-6">
                <BookOpen className="h-7 w-7 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Field Guide Overview</h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                An executive orientation to how trust, governance, and value erode when 
                AI-enabled systems behave differently than expected.
              </p>
            </div>

            <div className="grid gap-8">
              <Card className="p-8 border-2">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Why This Guide Exists</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Organizations rarely struggle with AI because of tooling. They struggle because:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-muted-foreground mb-6">
                  <li>People do not trust decisions they cannot understand</li>
                  <li>Governance loses influence under pressure</li>
                  <li>Value becomes difficult to see before confidence erodes</li>
                </ul>
                <p className="text-sm italic text-muted-foreground/80">
                  The Field Guide provides shared language to recognize these patterns early.
                </p>
              </Card>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: "Human–AI Interaction", desc: "How people experience AI-influenced decisions in real operational contexts." },
                  { title: "Adoption Value", desc: "Whether AI efforts translate into sustained organizational value over time." },
                  { title: "Trust, Govern, Evolve", desc: "Recurring patterns observed as AI initiatives mature." }
                ].map((item, i) => (
                  <div key={i} className="p-5 border rounded-xl bg-card">
                    <h3 className="font-bold mb-2 text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>

              <Card className="p-8 bg-accent/5 border-dashed border-2">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Next Steps</h2>
                <p className="mb-6 text-muted-foreground leading-relaxed">
                  If misalignment between vision and delivery is suspected, the first step is awareness.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg">
                    <Link href="/contact">
                      Start a Conversation <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/">
                      Return Home <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
