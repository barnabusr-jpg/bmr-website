import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { ArrowRight, CheckCircle } from "lucide-react";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="mx-auto w-fit p-3 rounded-lg bg-primary/10 mb-6">
              <CheckCircle className="h-7 w-7 text-primary" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">Thank you</h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              We’ve received your submission. If your diagnostic indicates meaningful drift or
              decision risk, the next step is structured observation — not guesswork.
            </p>

            <div className="mt-10">
              <Card className="p-8 border-2 text-left">
                <h2 className="text-2xl font-semibold mb-3">What happens next</h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
                  <li>You’ll receive a confirmation email (if email capture is enabled).</li>
                  <li>We’ll review the intake for signal patterns across Trust, Govern, and Evolve.</li>
                  <li>If warranted, we’ll propose a structured next step tailored to your context.</li>
                </ul>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="text-lg">
                    <Link href="/contact">
                      Start a conversation <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>

                  <Button asChild size="lg" variant="outline" className="text-lg">
                    <Link href="/insights/field-guides">
                      Field Guide overview <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>

                <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
                  Note: BMR provides advisory services and does not provide legal advice or
                  compliance certification.
                </p>
              </Card>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
