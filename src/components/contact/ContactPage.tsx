import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { Mail, ArrowRight } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-6">Contact</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Start a conversation about how AI-enabled decision risk is forming
              inside your operating system before it hardens into outcomes.
            </p>
          </motion.div>

          {/* Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-10 border-2 max-w-3xl mx-auto">
              <div className="flex flex-col gap-8">
                {/* Intro */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">
                      Let’s talk.
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      BMR supports leaders working in environments where trust,
                      regulation, and delivery risk converge. If you are seeing
                      adoption friction, governance strain, or unclear decision
                      ownership, this is the right moment to engage.
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="mailto:contact@bmrsolutions.ai"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
                  >
                    Start a Conversation
                    <ArrowRight className="h-4 w-4" />
                  </a>

                  <p className="text-sm text-muted-foreground sm:pt-3">
                    Note: BMR provides advisory services and does not provide
                    legal advice or compliance certification.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
