import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  TrendingUp,
  Users,
  Shield,
  Zap,
  Target,
  CheckCircle2,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const outcomes = [
  {
    icon: TrendingUp,
    title: "Accelerated Adoption",
    description:
      "Faster AI implementation with reduced risk through proven methodologies and clear frameworks.",
    benefits: [
      "Reduced time to value",
      "Lower implementation risk",
      "Faster stakeholder buy-in",
      "Streamlined decision-making",
      // ww
    ],
  },
  {
    icon: Users,
    title: "Enhanced Trust",
    description:
      "Build stakeholder confidence through transparency, accountability, and consistent governance.",
    benefits: [
      "Increased stakeholder confidence",
      "Transparent operations",
      "Consistent communication",
      "Strong reputation",
    ],
  },
  {
    icon: Shield,
    title: "Robust Compliance",
    description:
      "Meet regulatory requirements confidently with comprehensive governance and risk management.",
    benefits: [
      "Regulatory readiness",
      "Risk mitigation",
      "Audit preparedness",
      "Policy adherence",
    ],
  },
  {
    icon: Zap,
    title: "Operational Efficiency",
    description:
      "Streamlined processes and workflows that maximize productivity while maintaining quality.",
    benefits: [
      "Optimized workflows",
      "Resource efficiency",
      "Process automation",
      "Reduced overhead",
    ],
  },
  {
    icon: Target,
    title: "Strategic Alignment",
    description:
      "Ensure AI initiatives align with business goals and organizational values.",
    benefits: [
      "Goal alignment",
      "Value-driven decisions",
      "Strategic clarity",
      "Unified direction",
    ],
  },
  {
    icon: CheckCircle2,
    title: "Measurable Impact",
    description:
      "Quantify value and track ROI with systematic measurement and continuous optimization.",
    benefits: [
      "Clear KPI tracking",
      "ROI measurement",
      "Performance metrics",
      "Continuous improvement",
    ],
  },
];

const OutcomesPage = () => {
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
            <h1 className="text-5xl font-bold mb-6">Expected Outcomes</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tangible results and measurable benefits that drive organizational
              transformation and sustainable AI adoption across your enterprise.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {outcomes.map((outcome, index) => (
              <motion.div
                key={outcome.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-8 h-full hover:shadow-lg transition-shadow duration-300 border-2">
                  <div className="flex flex-col gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 w-fit">
                      <outcome.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        {outcome.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {outcome.description}
                      </p>
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">
                          Key Benefits
                        </h4>
                        <ul className="space-y-2">
                          {outcome.benefits.map((benefit) => (
                            <li
                              key={benefit}
                              className="text-sm text-muted-foreground flex items-start gap-2"
                            >
                              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OutcomesPage;
