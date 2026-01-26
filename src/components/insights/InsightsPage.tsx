import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { BookOpen, FileText, Compass } from "lucide-react";

type InsightCard = {
  icon: React.ElementType;
  title: string;
  description: string;
};

const insights: InsightCard[] = [
  {
    icon: BookOpen,
    title: "Field Guides",
    description:
      "Practical frameworks and executive-ready tools for navigating responsible AI under real operating constraints.",
  },
  {
    icon: FileText,
    title: "Briefs & Perspectives",
    description:
      "Clear, high-authority insights on governance, delivery risk, and decision accountability in AI-enabled systems.",
  },
  {
    icon: Compass,
    title: "Diagnostic Tools",
    description:
      "Structured instruments to surface where trust breaks down, oversight diffuses, and delivery risk hardens into outcomes.",
  },
];

export default function InsightsPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-6">Insights</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Articles, field guides, and tools from BMR’s work, designed to help
              leaders make defensible AI decisions when trust, regulation, and
              delivery risk matter.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {insights.map((item, index) => {
              const isLast = index === insights.length - 1;
              const isOdd = insights.length % 2 === 1;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={
                    isLast && isOdd ? "md:col-span-2 md:flex md:justify-center" : ""
                  }
                >
                  <Card className="p-8 h-full max-w-xl w-full hover:shadow-lg transition-shadow duration-300 border-2">
                    <div className="flex flex-col gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 w-fit">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-3">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {item.description}
                        </p>

                        <span className="text-primary font-medium inline-flex items-center gap-2">
                          Explore →
                        </span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
