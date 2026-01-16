import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Download } from "lucide-react";

const PromiseGapLanding = () => {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section
          id="hero"
          className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-background to-muted/20"
        >
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center space-y-8"
            >
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                The{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">Promise Gap™</span>
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-accent/30 -rotate-1"></span>
                </span>
              </h1>

              <p className="text-2xl md:text-3xl text-muted-foreground max-w-3xl mx-auto">
                Where transformation fails not because of technology, but
                because of trust.
              </p>

              <div className="max-w-3xl mx-auto space-y-6 text-lg md:text-xl leading-[1.9]">
                <p className="text-[#A7B7C5] leading-10">
                  Sales sells the vision.
                  <br />
                  Delivery inherits the reality.
                  <br />
                  And value leaks through the cracks.
                  <br />
                  Every organization chasing transformation hits this point.
                </p>

                <p className="text-[#A7B7C5] leading-10 ">
                  The breakdown is not in the technology.
                  <br />
                  Leaders who close this gap do more than optimize for cost.
                  <br />
                  It is in how leaders connect people, processes, and purpose
                  once it is deployed.
                  <br />
                  They redesign how the organization learns, adapts, and
                  delivers value together.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/promise-gap/diagnostic">
                    Take the Diagnostic <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg">
                  <a href="/downloads/HAI-AVS-Field-Guide-Summary.pdf" download>
                    Download Field Guide Summary{" "}
                    <Download className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

        {/* Problem Section */}
        <section
          id="problem"
          className="py-24 px-6 bg-gradient-to-b from-muted/20 to-background"
        >
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              <div className="max-w-4xl mx-auto space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  Transformation does not fail because of bad tools.
                  <br />
                  It fails when trust breaks between vision and delivery period.
                </h2>

                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Every organization embarks on this journey with the intent
                    to modernize, automate, or transform. But somewhere between
                    what was promised and what was delivered, alignment erodes.
                    Teams lose confidence and stakeholders lose clarity.
                    <br />
                    The result is not failure, it is drift!
                  </p>

                  <p>
                    The Promise Gap™ is that drift.
                    <br />
                    It is where communication, accountability, and context get
                    lost between those who sell the story and those who deliver
                    the reality.
                    <br />
                    Closing the gap starts with awareness, feeling that
                    invisible friction that slows progress and leaks value.
                  </p>
                </div>

                <div className="space-y-6">
                  <h2 className="text-3xl font-bold">
                    System Friction Patterns
                  </h2>
                  <div className="space-y-4">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      AI friction shows up differently in PE-owned companies and
                      traditional CIO-led enterprises, but the root cause is the
                      same: system instability.
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      PE-owned companies experience EBITDA-driven friction,
                      where forced AI adoption creates hidden operational debt.
                      CIO-led enterprises experience direction-volatility
                      friction, where shifting AI priorities destabilize
                      workflows.
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      These patterns look different, but they lead to the same
                      outcome: AI fails quietly inside workflows long before it
                      fails on dashboards.
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      That is the friction the Promise Gap reveals, and the
                      friction the System Health Picture (SHP) is designed to
                      measure.
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      This diagnostic reveals the signals that form your System
                      Health Picture (SHP), providing leaders visibility into
                      where AI creates friction inside their workflows.
                    </p>
                  </div>
                            
                </div>
              </div>

              {/* Signal Drop Visual */}
              <div className="flex justify-center items-center gap-2 max-w-3xl mx-auto pt-8">
                {[100, 80, 60, 40, 20].map((height, i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="w-12 bg-gradient-to-t from-accent/60 to-accent/20 rounded-t"
                    style={{ height: `${height}px`, originY: 1 }}
                  />
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/promise-gap/diagnostic">
                    Take the Diagnostic <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg">
                  <a href="/downloads/HAI-AVS-Field-Guide-Summary.pdf" download>
                    Download Field Guide <Download className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

        {/* Diagnostic Intro Section */}
        <section id="diagnostic" className="py-24 px-6">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              <div className="text-center space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold">
                  Diagnose where your transformation is leaking trust and value.
                </h2>

                <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-2xl p-8 max-w-3xl mx-auto">
                  <p className="text-lg text-foreground/95 leading-relaxed">
                    Every organization experiences the Promise Gap™ differently.
                    Some struggle with misaligned expectations between
                    leadership and delivery teams. Others face trust erosion
                    from stakeholders who've seen too many initiatives fail to
                    deliver. Still others find that their governance structures
                    can't keep pace with the speed of change.
                  </p>

                  <p className="text-lg text-foreground/95 leading-relaxed mt-4">
                    This diagnostic helps identify where your organization is
                    most vulnerable and how to prioritize the repair.
                  </p>
                </div>
              </div>

              {/* Framework Pillars */}
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="space-y-3 text-center">
                  <div className="h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
                    <div className="h-8 w-8 rounded-full bg-accent"></div>
                  </div>
                  <h3 className="text-xl font-semibold">Trust</h3>
                  <p className="text-sm text-muted-foreground">
                    Build confidence through transparency and human-centered
                    design
                  </p>
                </div>

                <div className="space-y-3 text-center">
                  <div className="h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
                    <div className="h-8 w-8 rounded-full bg-accent"></div>
                  </div>
                  <h3 className="text-xl font-semibold">Govern</h3>
                  <p className="text-sm text-muted-foreground">
                    Create systems that scale with accountability and clarity
                  </p>
                </div>

                <div className="space-y-3 text-center">
                  <div className="h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
                    <div className="h-8 w-8 rounded-full bg-accent"></div>
                  </div>
                  <h3 className="text-xl font-semibold">Evolve</h3>
                  <p className="text-sm text-muted-foreground">
                    Measure what matters and adapt with intention
                  </p>
                </div>
              </div>

              {/* Readiness Dial Placeholder */}
              <div className="flex justify-center py-8">
                <div className="relative h-48 w-48">
                  <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="hsl(var(--muted))"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="hsl(var(--accent))"
                      strokeWidth="8"
                      strokeDasharray="282.7"
                      strokeDashoffset="70.7"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-medium text-muted-foreground text-center">
                      Pending
                      <br />
                      Diagnostic
                      <br />
                      Input
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/promise-gap/diagnostic">
                    Start Diagnostic <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                {/* <p className="text-sm text-muted-foreground italic">
                  Interactive version coming in next release.
                </p> */}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PromiseGapLanding;
