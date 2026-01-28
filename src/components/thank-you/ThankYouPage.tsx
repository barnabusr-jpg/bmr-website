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

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Thank You for Completing the Promise Gap Diagnostic
            </h1>

            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              <p>
                You have taken an initial step toward understanding whether there is misalignment 
                between vision, delivery, and lived experience.
              </p>
              <p className="font-medium text-foreground">
                This diagnostic reveals early signals only. It is not a complete assessment 
                and does not produce prescriptions or recommendations.
              </p>
            </div>

            <div className="mt-10">
              <Card className="p-8 border-2 text-left">
                <h2 className="text-2xl font-semibold mb-3">What Happens Next</h2>
                <p className="mb-4 text-muted-foreground leading-relaxed">
                  We will review your responses to determine whether indicators suggest that a 
                  deeper, structured assessment is warranted. If so, we will follow up as soon 
                  as practical, typically within two business days, to discuss:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed mb-6">
                  <li>What signals appeared</li>
                  <li>What they may indicate at a high level</li>
                  <li>Whether further evaluation would be useful</li>
                </ul>
                <p className="text-sm italic text-muted-foreground border-t pt-4">
                  No action is required unless you choose to proceed.
                </p>

                <div className="mt-8">
                   <h3 className="text-lg font-semibold mb-4">Explore Further</h3>
                   <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild size="lg" className="text-lg">
                      <Link href="/contact">
                        Start a Conversation <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>

                    <Button asChild size="lg" variant="outline" className="text-lg">
                      <Link href="/">
                        Return to Home <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
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
