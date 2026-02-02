import React from 'react';
import { motion } from "framer-motion";
import Header from "@/components/Header";
import FooterCTA from "@/components/home/FooterCTAHome";
import { Button } from "@/components/ui/button";

const InsightsPage = () => {
  const articles = [
    {
      category: "Systems Theory",
      title: "Why Culture is an Output, Not an Input",
      excerpt: "Stop trying to fix your culture with posters and perks. Your culture is exactly what your system is designed to produce.",
      date: "Oct 2025"
    },
    {
      category: "Strategy",
      title: "The Invisibility of Friction",
      excerpt: "Operational friction doesn't show up on a P&L statement until it's too late. Here is how to spot it early.",
      date: "Nov 2025"
    },
    {
      category: "Leadership",
      title: "Closing the Decision-Action Gap",
      excerpt: "The velocity of your organization is limited by the distance between a decision and its systemic execution.",
      date: "Jan 2026"
    }
  ];

  return (
    <div className="bg-[#020617] min-h-screen text-white">
      <Header />
      
      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20 text-center md:text-left"
          >
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] mb-8">
              Field <span className="text-[#0D9488]">Guide</span>
            </h1>
            <p className="text-xl md:text-3xl text-slate-400 max-w-2xl font-light">
              Intelligence for leaders navigating the friction of operational reality.
            </p>
          </motion.div>

          {/* Featured Article Layout */}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
            {articles.map((post, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[16/9] mb-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50">
                   {/* Placeholder for article image/thumbnail */}
                   <div className="absolute inset-0 bg-gradient-to-br from-[#0D9488]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[#0D9488] font-mono text-xs uppercase tracking-widest">{post.category}</span>
                    <span className="text-slate-600 text-xs font-mono">{post.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold group-hover:text-[#0D9488] transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="pt-4 flex items-center gap-2 text-white font-bold text-sm group-hover:gap-4 transition-all">
                    Read Intelligence <span>→</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Newsletter / Direct Access */}
          <div className="p-12 border border-slate-800 rounded-3xl bg-slate-900/10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Direct Intelligence</h3>
              <p className="text-slate-400">Receive strategic memos on system behavior and operational integrity directly to your inbox.</p>
            </div>
            <Button className="bg-[#0D9488] hover:bg-[#0D9488]/90 text-white font-bold h-14 px-10 whitespace-nowrap">
              Join the Registry
            </Button>
          </div>

        </div>
      </main>

      <FooterCTA />
    </div>
  );
};

export default InsightsPage;
