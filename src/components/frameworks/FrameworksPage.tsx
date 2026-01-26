import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

type FrameworkItem = {
  title: string;
  description: string;
};

const frameworks: FrameworkItem[] = [
  {
    title: "Trust → Govern → Evolve",
    description:
      "A sequencing model for building defensible AI decisions in regulated environments.",
  },
  {
    title: "Promise Gap Diagnostic",
    description:
      "A structured signal for where decision risk is forming before it hardens into an outcome.",
  },
  {
    title: "System Health Picture",
    description:
      "A system-level view of behavior, friction, and controls under real operating conditions.",
  },
];

export default function FrameworksPage() {
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
            <h1 className="text-5xl font-bold mb-6">Frameworks</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A practical set of structures we use to surface decision risk,
              strengthen governance, and improve delivery behavior under real
              operating conditions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {frameworks.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-8 h-full hover:shadow-lg transition-shadow duration-300 border-2">
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
