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
      // Ensure this path matches your diagnostic file structure
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Message Sent",
          description: "A strategist will be in touch shortly.",
        });
        setFormData({ name: "", email: "", company: "", message: "" });
      } else {
        throw new Error('Failed to send');
      }
    } catch {
      // Variable removed to fix @typescript-eslint/no-unused-vars
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
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-8xl font-bold mb-8 text-white tracking-tight">
            Start a <span className="text-[#14b8a6]">Conversation</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="max-w-3xl mx-auto p-1 border border-slate-800 rounded-2xl bg-slate-900/10">
            <div className="p-8 md:p-12">
              {/* THE FIX: Re-attaching the onSubmit handler */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">Name</Label>
                    <Input
                      placeholder="Your name"
                      className="bg-black/40 border-slate-800 text-white h-14"
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
                      className="bg-black/40 border-slate-800 text-white h-14"
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
                    className="bg-black/40 border-slate-800 text-white h-14"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">Message</Label>
                  <Textarea
                    placeholder="Tell us what friction you're seeing..."
                    className="bg-black/40 border-slate-800 text-white min-h-[160px] resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#14b8a6] hover:bg-[#0d9488] text-[#020617] font-extrabold text-xl h-20 rounded-xl"
                >
                  {isSubmitting ? "Dispatching Signal..." : "Send Message"}
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
