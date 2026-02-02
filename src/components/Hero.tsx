import React from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Hero = () => {
  // Function to handle the smooth scroll to the contact form
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#020617]">
      {/* Background Decorative Gradient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0D9488]/10 blur-[120px] rounded-full -mr-64 -mt-64" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="text-6xl md:text-9xl font-bold text-white tracking-tighter mb-8 leading-[0.9]">
            Close the <br />
            <span className="text-[#0D9488]">Promise Gap™</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl leading-relaxed">
            Expose the friction between your strategic intent and operational reality. 
            Build systems that actually deliver what you promise.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            {/* Primary Action: Smooth Scroll to Form */}
            <Button 
              size="lg" 
              onClick={scrollToContact}
              className="bg-[#0D9488] hover:bg-[#0D9488]/90 text-white text-xl h-16 px-10 font-bold rounded-xl transition-all shadow-[0_0_40px_rgba(13,148,136,0.2)]"
            >
              Start a Conversation
            </Button>

            {/* Secondary Action: Open Diagnostic in New Tab */}
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => window.open('/diagnostic', '_blank')}
              className="border-slate-800 text-white hover:bg-slate-900 text-xl h-16 px-10 rounded-xl transition-all"
            >
              Launch Diagnostic
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
