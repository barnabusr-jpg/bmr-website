import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const FooterCTA = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Signal Received",
          description: "Check hello@bmradvisory.co for the dispatch.",
        });
        setFormData({ name: "", email: "", company: "", message: "" });
      } else {
        throw new Error('Failed to send');
      }
    } catch {
      toast({
        title: "Transmission Error",
        description: "Please try again or email hello@bmradvisory.co directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 md:py-32 px-4 md:px-6 bg-[#020617] border-t border-slate-900 overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-20"
        >
          {/* RESPONSIVE TEXT: text-5xl on mobile, text-8xl on desktop */}
          <h2 className="text-5xl md:text-8xl font-bold mb-6 md:mb-8 text-white tracking-tight leading-tight">
            Start a <span className="text-[#14b8a6]">Conversation</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-2xl font-light max-w-3xl mx-auto leading-relaxed px-4">
            The first step in closing the Promise Gap™ is making your system behavior visible.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="max-w-3xl mx-auto border border-slate-800 rounded-2xl bg-slate-900/10">
            <div className="p-6 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-3">
                    <Label className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">Name</Label>
                    <Input
                      placeholder="Your name"
                      className="bg-black/40 border-slate-800 text-white h-12 md:h-14"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">Email</Label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      className="bg-black/40 border-slate-800 text-white h-12 md:h-14"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">Company</Label>
                  <Input
                    placeholder="Your organization"
                    className="bg-black/40 border-slate-800 text-white h-12 md:h-14"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">Message</Label>
                  <Textarea
                    placeholder="What friction are you seeing?"
                    className="bg-black/40 border-slate-800 text-white min-h-[120px] md:min-h-[160px] resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#14b8a6] hover:bg-[#0d9488] text-[#020617] font-extrabold text-lg md:text-xl h-16 md:h-20 rounded-xl transition-all"
                >
                  {isSubmitting ? "Dispatching..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FooterCTA;
