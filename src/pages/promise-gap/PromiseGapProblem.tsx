import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  AlertTriangle,
  TrendingDown,
  Users,
  DollarSign,
  Clock,
  Shield,
} from "lucide-react";

const PromiseGapProblem = () => {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-16"
          >
            {/* Header */}
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <span className="text-sm font-medium text-destructive">
                  Critical Issue
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                The Promise Gap:
                <br />A Silent Crisis in AI Adoption
              </h1>

              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                What happens when AI systems consistently fail to meet
                stakeholder expectations? Trust erodes, investments stall, and
                organizational confidence collapses.
              </p>
            </div>

            {/* The Problem Definition */}
            <div className="bg-accent/5 border-2 border-accent/20 rounded-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6">
                What Is the Promise Gap?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                The Promise Gap arises when expectations, whether explicitly
                communicated or implicitly understood, exceed what these systems
                deliver in practice. This is not about technical failure; it is
                about a fundamental misalignment between promised capabilities
                and lived reality.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Promise Gaps are created by vendor hype, overly optimistic
                internal projections, incomplete stakeholder communication, and
                insufficient understanding of AI limitations. Once established,
                these gaps widen over time, destroying trust and undermining
                future AI initiatives.
              </p>
            </div>

            {/* Impact Areas */}
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-center">
                The Cascading Impact
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-border rounded-lg p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-destructive/10">
                      <TrendingDown className="h-6 w-6 text-destructive" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Collapse in Stakeholder Trust
                      </h3>
                      <p className="text-muted-foreground">
                        When AI systems fail to deliver on promises,
                        stakeholders stop believing future claims. This
                        skepticism extends beyond individual projects to poison
                        the well for all AI initiatives.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-border rounded-lg p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-destructive/10">
                      <DollarSign className="h-6 w-6 text-destructive" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Investment Paralysis
                      </h3>
                      <p className="text-muted-foreground">
                        Leadership becomes reluctant to fund new AI initiatives
                        after witnessing previous over-promises. Organizations
                        miss competitive opportunities while stuck in analysis
                        paralysis.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-border rounded-lg p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-destructive/10">
                      <Users className="h-6 w-6 text-destructive" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        User Resistance
                      </h3>
                      <p className="text-muted-foreground">
                        End users who've been disappointed by AI systems
                        actively resist adoption of new tools, regardless of
                        actual capability improvements. Change management
                        becomes exponentially harder.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-border rounded-lg p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-destructive/10">
                      <Clock className="h-6 w-6 text-destructive" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Timeline Erosion
                      </h3>
                      <p className="text-muted-foreground">
                        Organizations waste months or years pursuing AI
                        implementations based on unrealistic expectations before
                        acknowledging the gap and course-correcting.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-border rounded-lg p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-destructive/10">
                      <Shield className="h-6 w-6 text-destructive" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Brand Damage
                      </h3>
                      <p className="text-muted-foreground">
                        External stakeholders—customers, partners,
                        regulators—lose confidence in the organization's ability
                        to deliver on AI commitments, harming reputation and
                        market position.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-border rounded-lg p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-destructive/10">
                      <AlertTriangle className="h-6 w-6 text-destructive" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Talent Flight
                      </h3>
                      <p className="text-muted-foreground">
                        Technical teams become demoralized when forced to defend
                        systems that can't meet promised capabilities, leading
                        skilled AI professionals to seek opportunities
                        elsewhere.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Why It Happens */}
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-center">
                Root Causes of the Promise Gap
              </h2>

              <div className="space-y-6">
                <div className="border-l-4 border-accent pl-6 space-y-2">
                  <h3 className="text-xl font-semibold">
                    Vendor Hype and Marketing Pressure
                  </h3>
                  <p className="text-muted-foreground">
                    AI vendors consistently oversell capabilities while
                    underselling limitations. Organizations adopt these inflated
                    expectations and inadvertently propagate them to internal
                    stakeholders.
                  </p>
                </div>

                <div className="border-l-4 border-accent pl-6 space-y-2">
                  <h3 className="text-xl font-semibold">
                    Insufficient Technical Literacy
                  </h3>
                  <p className="text-muted-foreground">
                    Leadership teams lack frameworks for understanding AI
                    capabilities and constraints, making them vulnerable to
                    unrealistic projections and unable to set appropriate
                    expectations.
                  </p>
                </div>

                <div className="border-l-4 border-accent pl-6 space-y-2">
                  <h3 className="text-xl font-semibold">
                    Organizational Optimism Bias
                  </h3>
                  <p className="text-muted-foreground">
                    Internal teams naturally emphasize best-case scenarios when
                    seeking project approval, downplaying risks and
                    implementation challenges that inevitably surface later.
                  </p>
                </div>

                <div className="border-l-4 border-accent pl-6 space-y-2">
                  <h3 className="text-xl font-semibold">
                    Incomplete Stakeholder Mapping
                  </h3>
                  <p className="text-muted-foreground">
                    Organizations fail to identify all stakeholder groups with
                    expectations about AI systems, leading to surprise
                    disappointments from groups whose needs were not considered
                    or addressed.
                  </p>
                </div>

                <div className="border-l-4 border-accent pl-6 space-y-2">
                  <h3 className="text-xl font-semibold">
                    Poor Change Management
                  </h3>
                  <p className="text-muted-foreground">
                    Insufficient investment in stakeholder communication creates
                    information voids that get filled with unrealistic
                    assumptions about what AI systems will deliver.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-accent/5 border-2 border-accent/20 rounded-lg p-8 md:p-12 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Identify Your Promise Gap Before It Is Too Late
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our diagnostic assessment reveals where your AI initiatives face
                the greatest risk of expectation misalignment and provides
                actionable steps to close the gap.
              </p>
              <Button asChild size="lg" className="text-lg">
                <Link to="/promise-gap/diagnostic">
                  Take the Free Diagnostic
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground">
                10 minutes • No registration • Immediate insights
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PromiseGapProblem;
