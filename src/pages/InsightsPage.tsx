import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ArrowRight, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const insights = [
  {
    // category: "Governance",
    title: "Building Trust in AI Systems: A Framework Approach",
    excerpt:
      "Trust in AI is not achieved solely through compliance; it is cultivated through transparency. When individuals understand the reasoning behind decisions, confidence becomes part of the system itself.",
    date: "November 2025",
    readTime: "3 min read",
    link: "/building-trust-in-ai-systems",
  },
  {
    // category: "Transformation",
    title: "Measuring What Matters: The Adoption Value System (AVS)",
    excerpt:
      "Proving value is an AI adoption accelerator. The Adoption Value System (AVS) turns intent into measurable impact.",
    date: "November 2025",
    readTime: "2 min read",
    link: "/measuring-what-matters-avs",
  },
  {
    // category: "Leadership",
    title: "Leading Through Change: Executive Readiness for the AI Era",
    excerpt:
      "Technology mastery is not AI leadership. Leadership is about shaping the systems that govern how technology is used.",
    date: "November 2025",
    readTime: "3 min read",
    link: "/leading-through-change",
  },
];

const InsightsPage = () => {
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
            <h1 className="text-5xl font-bold mb-6">Insights</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Expert perspectives on responsible AI, governance frameworks,
              transformation strategies, and leadership in the age of artificial
              intelligence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insights.map((insight, index) => (
              <motion.div
                key={insight.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 group border-2 hover:border-primary/50 flex flex-col">
                  <div className="space-y-4 flex-1 pb-4">
                    {/* <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      {insight.category}
                    </span> */}

                    <h3 className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
                      {insight.title}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {insight.excerpt}
                    </p>
                  </div>

                  {/* Bottom section fixed equally for all cards */}
                  <div className="pt-4 border-t border-border mt-auto">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{insight.date}</span>
                      </div>
                      <span>{insight.readTime}</span>
                    </div>

                    <Link
                      to={insight.link}
                      className="flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
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

export default InsightsPage;
