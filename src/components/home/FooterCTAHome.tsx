import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
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
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thank you for reaching out. We'll be in touch soon.",
    });
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  return (
    <section className="py-24 px-6 bg-[#020617]"> {/* Forced Brand Black */}
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            Start a <span className="text-[#14b8a6]">Conversation</span>
          </h2>
          <p className="text-xl text-slate-400 leading-relaxed font-light">
            Let&apos;s discuss how we can help your organization navigate
            responsible AI through systemic clarity.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          {/* Card styled for brand depth */}
          <Card className="p-8 md:p-12 border border-slate-800 bg-slate-900/10 backdrop-blur-md shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-400 uppercase tracking-widest text-[10px] font-bold">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    className="bg-black/40 border-slate-800 text-white focus:border-[#14b8a6] transition-all h-12"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-400 uppercase tracking-widest text-[10px] font-bold">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="bg-black/40 border-slate-800 text-white focus:border-[#14b8a6] transition-all h-12"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-slate-400 uppercase tracking-widest text-[10px] font-bold">Company</Label>
                <Input
                  id="company"
                  placeholder="Your organization"
                  className="bg-black/40 border-slate-800 text-white focus:border-[#14b8a6] transition-all h-12"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-slate-400 uppercase tracking-widest text-[10px] font-bold">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us what decision risk or delivery friction you’re seeing..."
                  className="bg-black/40 border-slate-800 text-white focus:border-[#14b8a6] transition-all min-h-[120px]"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-[#14b8a6] hover:bg-[#0d9488] text-[#020617] font-bold text-lg h-14 transition-all shadow-[0_0_20px_rgba(20,184,166,0.15)]"
              >
                Send Message
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default FooterCTA;
