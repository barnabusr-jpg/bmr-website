import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, FileText } from "lucide-react";
import Link from "next/link";

const FieldGuide = () => {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            {/* Header */}
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
                <FileText className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium text-accent">
                  Field Guide Summary
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                HAI + AVS Field Guide Summary
              </h1>

              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A practical framework for building trust, governing responsibly,
                and measuring what matters in AI transformation.
              </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-12">
              {/* Section 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="h-1 w-24 bg-accent rounded"></div>
                <h2 className="text-3xl font-bold">
                  1. Human-AI Interaction (HAI) Framework
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    <strong>Purpose:</strong> Build AI systems people trust by
                    designing with transparency, explainability, and
                    accountability from the start.
                  </p>
                  <p>
                    <strong>Core Principles:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Make AI decisions explainable to the humans they affect
                    </li>
                    <li>
                      Design interfaces that show confidence levels and
                      reasoning
                    </li>
                    <li>
                      Create feedback loops so users can challenge or refine AI
                      outputs
                    </li>
                    <li>
                      Default to human judgment in high-stakes or ambiguous
                      situations
                    </li>
                  </ul>
                  <p>
                    <strong>Why It Matters:</strong> Trust is not built solely
                    on technical performance. It is earned when people
                    understand how AI works, why it makes certain decisions, and
                    how they can intervene when needed.
                  </p>
                </div>
              </motion.div>

              {/* Section 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="h-1 w-24 bg-accent rounded"></div>
                <h2 className="text-3xl font-bold">
                  2. Adoption Value System (AVS)
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    <strong>Purpose:</strong> Measure what matters, not just
                    technical performance, but whether AI creates real value for
                    real users in real workflows.
                  </p>
                  <p>
                    <strong>Core Metrics:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Adoption Rate:</strong> Are people actually using
                      the AI system?
                    </li>
                    <li>
                      <strong>Value Capture:</strong> Does it improve outcomes,
                      reduce friction, or create efficiency?
                    </li>
                    <li>
                      <strong>Trust Signals:</strong> Do users report increased
                      confidence and clarity?
                    </li>
                    <li>
                      <strong>Organizational Alignment:</strong> Does leadership
                      see measurable impact aligned with strategic goals?
                    </li>
                  </ul>
                  <p>
                    <strong>Why It Matters:</strong> You cannot improve what you
                    do not measure. AVS shifts focus from "did we build it?" to
                    "is it delivering value?" and "are people trusting it enough
                    to use it?"
                  </p>
                </div>
              </motion.div>

              {/* Section 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="h-1 w-24 bg-accent rounded"></div>
                <h2 className="text-3xl font-bold">
                  3. Trust → Govern → Evolve
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    This is the operational rhythm that prevents Promise Gaps
                    from forming and closes them when they do.
                  </p>
                  <div className="space-y-6 pt-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Trust
                      </h3>
                      <p>
                        Start with transparency and human-centered design. Use
                        HAI principles to ensure stakeholders understand how AI
                        works and why they should trust it.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Govern
                      </h3>
                      <p>
                        Create structures that maintain alignment at scale.
                        Establish clear roles, decision-making authority, risk
                        management protocols, and accountability mechanisms.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Evolve
                      </h3>
                      <p>
                        Use AVS metrics to track what's working and what's not.
                        Adapt quickly based on real feedback and measurable
                        outcomes.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Section 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="h-1 w-24 bg-accent rounded"></div>
                <h2 className="text-3xl font-bold">
                  4. Closing the Promise Gap
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    The Promise Gap is the gap between stakeholder expectations
                    and what your AI systems deliver. This is not always a
                    technology failure; it is often a failure of communication,
                    governance, or measurement.
                  </p>
                  <p>
                    <strong>How to Spot It:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Leadership expresses frustration about ROI timelines
                    </li>
                    <li>End users avoid or work around the AI system</li>
                    <li>
                      Delivery teams feel pressure to over-promise capabilities
                    </li>
                    <li>
                      Trust erodes because no one understands why AI made a
                      specific decision
                    </li>
                  </ul>
                  <p>
                    <strong>How to Close It:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Align expectations early using HAI transparency principles
                    </li>
                    <li>
                      Establish governance structures that manage promises vs.
                      delivery
                    </li>
                    <li>
                      Track adoption and value with AVS metrics, not just
                      technical performance
                    </li>
                    <li>
                      Iterate based on what users actually need, not what you
                      assumed they'd want
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Section 5 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="h-1 w-24 bg-accent rounded"></div>
                <h2 className="text-3xl font-bold">5. Next Steps</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    If you are facing…
                    {/* If you're facing misaligned expectations, eroding trust, or
                    AI initiatives that aren't delivering measurable value,
                    start here: */}
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 pt-4">
                    <div className="border border-border rounded-lg p-6 space-y-3">
                      <h3 className="text-lg font-semibold text-foreground">
                        Explore Our Frameworks
                      </h3>
                      <p className="text-sm">
                        Learn how HAI and AVS work together to close the Promise
                        Gap
                      </p>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/frameworks">
                          View Frameworks{" "}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                    <div className="border border-border rounded-lg p-6 space-y-3">
                      <h3 className="text-lg font-semibold text-foreground">
                        Start a Conversation
                      </h3>
                      <p className="text-sm">
                        Talk to us about where your transformation is leaking
                        trust and value
                      </p>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/contact">
                          Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Who Should Read */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-center">
                Who Should Read This Guide
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="border border-border rounded-lg p-6 space-y-3">
                  <h3 className="text-xl font-semibold">Executives</h3>
                  <p className="text-muted-foreground">
                    Understand how to set realistic AI expectations and make
                    informed investment decisions
                  </p>
                </div>

                <div className="border border-border rounded-lg p-6 space-y-3">
                  <h3 className="text-xl font-semibold">AI Leaders</h3>
                  <p className="text-muted-foreground">
                    Learn to communicate capabilities honestly while maintaining
                    organizational confidence
                  </p>
                </div>

                <div className="border border-border rounded-lg p-6 space-y-3">
                  <h3 className="text-xl font-semibold">Change Managers</h3>
                  <p className="text-muted-foreground">
                    Develop strategies for aligning stakeholders around
                    achievable AI outcomes
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-accent/5 border border-border rounded-lg p-8 text-center space-y-4">
              <h3 className="text-2xl font-semibold">Want to Go Deeper?</h3>
              <p className="text-muted-foreground">
                Schedule a consultation to discuss how the Promise Gap Framework
                applies to your specific situation.
              </p>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Schedule a Consultation</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FieldGuide;
