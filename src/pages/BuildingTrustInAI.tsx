import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BuildingTrustInAI = () => {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>November 2025</span>
                <span>•</span>
                <span>2 min read</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Building Trust in AI Systems: A Framework Approach
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed">
                Trust in AI is not achieved solely through compliance; it is
                cultivated through transparency. When individuals understand the
                reasoning behind decisions, confidence becomes part of the
                system itself.
              </p>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
              <h2 className="text-2xl font-semibold mt-8 mb-4">
                The Real Trust Gap
              </h2>
              <p>
                Organizations often cite trust as a key component of their
                culture, yet few can demonstrate where it lives within their
                systems. Many AI-driven decisions are made within applications,
                providing employees with little to no visibility into inputs,
                data handling, or intent. When this happens, doubt creeps in,
                and people begin to question the system and its results.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                Making Oversight Visible
              </h2>
              <p>
                Transparency should not be an afterthought; it is a design
                choice. Leaders should establish guidelines early in the process
                to clarify decision-making criteria, documented authority
                levels, and policies for making governance accessible. When
                oversight is visible, accountability becomes real, not implied.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                Trust as a Performance Signal
              </h2>
              <p>
                Without trust, everything slows. Teams hesitate, projects stall,
                and innovation fades. Visibility counters this effect. When
                teams understand boundaries and decision logic, they can move
                faster without fear of mistakes. Trust becomes an operational
                signal, not just an ethical one.
              </p>

              {/* <div className="bg-accent/5 border border-border rounded-lg p-6 my-6">
                <h3 className="text-xl font-semibold mb-4">
                  1. Transparency by Design
                </h3>
                <p>
                  Organizations must establish clear documentation of AI system
                  capabilities, limitations, and decision-making processes. This
                  includes maintaining accessible records of training data
                  sources, model architecture decisions, and performance metrics
                  across different demographic segments.
                </p>
              </div>

              <div className="bg-accent/5 border border-border rounded-lg p-6 my-6">
                <h3 className="text-xl font-semibold mb-4">
                  2. Accountable Governance
                </h3>
                <p>
                  Trust emerges when clear ownership exists for AI system
                  outcomes. This means defining roles and responsibilities
                  across the AI lifecycle—from data scientists to product owners
                  to executive sponsors—and establishing review mechanisms that
                  ensure continuous oversight.
                </p>
              </div>

              <div className="bg-accent/5 border border-border rounded-lg p-6 my-6">
                <h3 className="text-xl font-semibold mb-4">
                  3. Continuous Validation
                </h3>
                <p>
                  Trust must be earned repeatedly through demonstrated
                  reliability. Organizations should implement ongoing monitoring
                  of AI system performance, regular bias audits, and structured
                  feedback mechanisms that allow users to report concerns and
                  see responsive action.
                </p>
              </div> */}

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                Indicators of Systemic Trust
              </h2>

              <ul className="list-disc pl-6 space-y-2">
                <li>Clear decision-making criteria</li>
                <li>Identified oversight owners</li>
                <li>Regular transparency reporting</li>
                <li>Accessible feedback loops</li>
                <li>Measurable stakeholder confidence (over time)</li>
              </ul>
            </div>

            {/* <div className="border-t border-border pt-8 mt-12">
              <div className="bg-accent/5 border border-border rounded-lg p-8">
                <h3 className="text-2xl font-semibold mb-4">
                  Ready to Build Trust in Your AI Systems?
                </h3>
                <p className="text-muted-foreground mb-6">
                  BMR Solutions helps organizations establish governance
                  frameworks that create stakeholder confidence and enable
                  responsible AI adoption.
                </p>
                <Button asChild size="lg">
                  <Link to="/contact">Start a Conversation</Link>
                </Button>
              </div>

            </div> */}

            <div className="border-t border-border pt-8 mt-8">
              <h3 className="text-xl font-semibold mb-4">Next Step</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Learn how visibility accelerates adoption and accountability.
                Explore the full Trust Framework at bmrsolutions.com/frameworks.
              </p>
            </div>

            <div className=" pt-4">
              <h3 className="text-xl font-semibold mb-4">
                About BMR Solutions
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                BMR Solutions helps organizations design transparent AI
                governance systems that strengthen accountability, stakeholder
                confidence, and trust across the enterprise.
              </p>
              <p className="text-accent font-medium">
                Trust: Building the foundation for responsible AI adoption.
              </p>
            </div>
          </motion.article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BuildingTrustInAI;
