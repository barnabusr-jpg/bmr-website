import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ArrowRight, Calendar } from "lucide-react";

const insights = [
  {
    category: "Governance",
    title: "Building Trust in AI Systems: A Framework Approach",
    excerpt: "Explore how transparent governance structures create stakeholder confidence in AI deployments.",
    date: "2024-03-15",
    readTime: "5 min read"
  },
  {
    category: "Transformation",
    title: "The Adoption Value System: Measuring AI Impact",
    excerpt: "Learn how to quantify and maximize the organizational value of AI implementations.",
    date: "2024-03-10",
    readTime: "7 min read"
  },
  {
    category: "Leadership",
    title: "Executive Readiness for the AI Era",
    excerpt: "Preparing leadership teams with strategic frameworks for effective AI decision-making.",
    date: "2024-03-05",
    readTime: "6 min read"
  }
];

const Insights = () => {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">Latest Insights</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Expert perspectives on responsible AI, governance, and transformation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-all duration-200 group cursor-pointer border-2 hover:border-primary/50">
                <div className="space-y-4">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    {insight.category}
                  </span>
                  
                  <h3 className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
                    {insight.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {insight.excerpt}
                  </p>
                  
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{insight.date}</span>
                      </div>
                      <span>{insight.readTime}</span>
                    </div>
                    
                    <div className="flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                      Read More
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
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

export default Insights;