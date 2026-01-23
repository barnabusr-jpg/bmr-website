import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const frameworks = [
  {
    category: "Foundation",
    title: "Trust",
    description:
      "Establish transparency, accountability, and ethical standards for responsible AI implementation. Build stakeholder confidence through clear governance structures and consistent communication.",
    details: [
      "Transparency frameworks",
      "Ethical guidelines development",
      "Stakeholder engagement models",
      "Trust measurement methodologies",
    ],
  },
  {
    category: "Implementation",
    title: "Govern",
    description:
      "Deploy robust governance structures, policies, and compliance mechanisms across your organization. Ensure sustainable and responsible AI operations at scale.",
    details: [
      "Policy development and deployment",
      "Compliance frameworks",
      "Risk assessment protocols",
      "Governance committee structure",
    ],
  },
  {
    category: "Growth",
    title: "Evolve",
    description:
      "Continuously adapt and scale AI capabilities while maintaining responsible practices and human values. Foster innovation within ethical boundaries.",
    details: [
      "Continuous improvement cycles",
      "Innovation within guardrails",
      "Scaling best practices",
      "Adaptive governance models",
    ],
  },
];

const methodologies = [
  {
    name: "HAI",
    fullName: "Human-AI Interaction",
    description:
      "A comprehensive framework for designing collaborative systems that enhance human decision-making while maintaining ethical boundaries and human agency.",
    principles: [
      "Human-centered design",
      "Augmentation over replacement",
      "Transparent decision pathways",
      "Ethical interaction patterns",
    ],
  },
  {
    name: "AVS",
    fullName: "Adoption Value System",
    description:
      "A structured methodology for measuring and maximizing the organizational value of AI implementations through systematic assessment and optimization.",
    principles: [
      "Value identification",
      "Impact measurement",
      "ROI tracking",
      "Continuous optimization",
    ],
  },
];

const FrameworksPage = () => {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-6">Our Frameworks</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Proven methodologies and structured approaches to guide your
              organization&apos;s journey toward responsible AI adoption and
              sustainable transformation.
            </p>
          </motion.div>

          {/* Trust → Govern → Evolve */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold text-center mb-12">
              The Journey
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {frameworks.map((framework, index) => (
                <motion.div
                  key={framework.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <Card className="p-8 h-full border-2">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      {framework.category}
                    </span>
                    <h3 className="text-3xl font-bold my-4">
                      {framework.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {framework.description}
                    </p>
                    <ul className="space-y-2">
                      {framework.details.map((detail) => (
                        <li
                          key={detail}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-primary mt-1">•</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </Card>
                  {index < frameworks.length - 1 && (
                    <div className="hidden md:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <div className="bg-primary rounded-full p-2">
                        <ArrowRight className="h-4 w-4 text-primary-foreground" />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* HAI & AVS */}
          <div>
            <h2 className="text-3xl font-bold text-center mb-12">
              Core Methodologies
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {methodologies.map((methodology, index) => (
                <motion.div
                  key={methodology.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-8 h-full border-2 hover:border-primary/50 transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-4xl font-bold text-primary">
                        {methodology.name}
                      </div>
                      <div className="h-px flex-1 bg-border" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-3">
                      {methodology.fullName}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {methodology.description}
                    </p>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">
                        Key Principles
                      </h4>
                      <ul className="space-y-2">
                        {methodology.principles.map((principle) => (
                          <li
                            key={principle}
                            className="text-sm text-muted-foreground flex items-start gap-2"
                          >
                            <span className="text-primary mt-1">•</span>
                            {principle}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-24"
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              Where SHP Fits
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                The System Health Picture (SHP) is the visibility layer that
                measures system behavior — how AI interacts with people,
                processes, and decisions across the enterprise.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                SHP exposes the friction created by both EBITDA-driven pressure
                and direction-volatility pressure. It gives leaders a clearer,
                more stable view of AI&apos;s real impact by surfacing the
                hidden interactions that create instability.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                This is where SHP strengthens the HAI → AVS flow. It translates
                the signals from each layer into one coherent view, making it
                easier for leaders to understand system behavior and make
                informed decisions.
              </p>
            </div>
               
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FrameworksPage;
