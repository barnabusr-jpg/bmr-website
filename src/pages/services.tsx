import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Brain,
  FileCheck,
  Lightbulb,
  Settings,
  Shield,
  TrendingUp,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const services = [
  {
    icon: Brain,
    title: "AI Strategy & Governance",
    description:
      "Develop comprehensive frameworks for responsible AI deployment, risk management, and regulatory compliance.",
  },
  {
    icon: Settings,
    title: "Delivery Transformation",
    description:
      "Implement proven methodologies to accelerate AI adoption and optimize organizational workflows.",
  },
  {
    icon: FileCheck,
    title: "Executive Readiness",
    description:
      "Prepare leadership teams with strategic insights and decision-making frameworks for AI initiatives.",
  },
  {
    icon: Lightbulb,
    title: "Innovation Advisory",
    description:
      "Identify opportunities for AI-driven innovation while maintaining ethical standards and human values.",
  },
  {
    icon: Shield,
    title: "Risk Management",
    description:
      "Assess and mitigate AI-related risks across technical, ethical, and operational dimensions.",
  },
  {
    icon: TrendingUp,
    title: "Value Realization",
    description:
      "Measure and maximize the organizational impact and ROI of AI implementations.",
  },
];

const Services = () => {
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
            <h1 className="text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive advisory services designed to guide your
              organization through every stage of responsible AI adoption, from
              strategic planning to measurable outcomes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-8 h-full hover:shadow-lg transition-shadow duration-300 border-2">
                  <div className="flex flex-col items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
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

export default Services;
