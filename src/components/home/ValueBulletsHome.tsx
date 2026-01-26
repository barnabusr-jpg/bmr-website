import { motion } from "framer-motion";
import { Shield, TrendingUp, Users, Target } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Responsible AI",
    description: "Build ethical frameworks that prioritize transparency and accountability"
  },
  {
    icon: TrendingUp,
    title: "Measurable Results",
    description: "Drive outcomes with data-driven insights and proven methodologies"
  },
  {
    icon: Users,
    title: "Human-Centered",
    description: "Design solutions that enhance human capabilities and decision-making"
  },
  {
    icon: Target,
    title: "Strategic Focus",
    description: "Align AI initiatives with organizational goals and values"
  }
];

const ValueBullets = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
              className="flex flex-col items-start gap-4 p-6 hover:shadow-lg transition-all duration-200 border-2 rounded-lg"
            >
              
               <div className="p-3 rounded-lg bg-primary/10">

                <value.icon className="h-6 w-6 text-primary " />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueBullets;
