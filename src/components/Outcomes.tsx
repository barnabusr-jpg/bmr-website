
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { TrendingUp, Users, Shield, Zap, Target, CheckCircle2 } from "lucide-react";

const outcomes = [
  {
    icon: TrendingUp,
    title: "Accelerated Adoption",
    description: "Faster AI implementation with reduced risk"
  },
  {
    icon: Users,
    title: "Enhanced Trust",
    description: "Stakeholder confidence through transparency"
  },
  {
    icon: Shield,
    title: "Robust Compliance",
    description: "Meet regulatory requirements confidently"
  },
  {
    icon: Zap,
    title: "Operational Efficiency",
    description: "Streamlined processes and workflows"
  },
  {
    icon: Target,
    title: "Strategic Alignment",
    description: "AI initiatives aligned with business goals"
  },
  {
    icon: CheckCircle2,
    title: "Measurable Impact",
    description: "Quantifiable value and ROI tracking"
  }
];

const Outcomes = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">Expected Outcomes</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Tangible results that drive organizational transformation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {outcomes.map((outcome, index) => (
            <motion.div
              key={outcome.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
            >
              <Card className="p-6 h-full hover:shadow-md transition-all duration-200">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                    <outcome.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{outcome.title}</h3>
                    <p className="text-sm text-muted-foreground">{outcome.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Outcomes;
