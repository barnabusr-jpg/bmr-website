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

  // This logic matches the confirmed fix from 11:30 AM
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
          title: "Message Sent",
          description: "Thank you for reaching out. A strategist will be in touch soon.",
        });
        setFormData({ name: "", email: "", company: "", message: "" });
      } else {
        throw new Error('Failed to send');
      }
    } catch {
      // Unused variable removed to pass ESLint
      toast({
        title: "Submission Error",
        description: "Please try again or email hello@bmradvisory.co directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-32 px-6 bg-[#020617] border-t border-slate-900 overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-8xl font-bold mb-8 text-white tracking-tight">
            Start a <span className="text-[#14b8a6]">Conversation</span>
          </h2>
          <p className="text-slate-400 text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed">
            The first step in closing the Promise Gap™ is making your system behavior visible.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <div className="max-w-3xl mx-auto p-1 border border-slate-800 rounded-2xl bg-slate-900/10 shadow-2xl">
            <div className="p-8 md:p-12 space-y-8">
              {/* ATTACHING HANDLER HERE FIXES THE BUILD ERROR */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      className="bg-black/40 border-slate-800 text-white focus:border-[#14b8a6] h-14"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="bg-black/40 border-slate-800 text-white focus:border-[#14b8a6] h-14"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="company" className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">Company</Label>
                  <Input
                    id="company"
                    placeholder="Your organization"
                    className="bg-black/40 border-slate-800 text-white focus:border-[#14b8a6] h-14"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="message" className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us what friction you're seeing..."
                    className="bg-black/40 border-slate-800 text-white focus:border-[#14b8a6] min-h-[160px] resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#14b8a6] hover:bg-[#0d9488] text-[#020617] font-extrabold text-xl h-20 shadow-[0_0_40px_rgba(20,184,166,0.2)] rounded-xl"
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
