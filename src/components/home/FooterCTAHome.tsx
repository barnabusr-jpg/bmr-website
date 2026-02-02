import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const FooterCTA = () => {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
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
        toast({ title: "Signal Received", description: "Strategic inquiry has been logged." });
        setFormData({ name: "", email: "", company: "", message: "" });
      }
    } catch (err) {
      toast({ title: "Error", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 px-4 md:px-6 bg-[#020617] border-t border-slate-900 overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-5xl md:text-8xl font-bold mb-6 text-white tracking-tight">
            Start a <span className="text-[#14b8a6]">Conversation</span>
          </h2>
        </motion.div>
        <div className="max-w-3xl mx-auto border border-slate-800 rounded-2xl bg-slate-900/10 p-6 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input className="bg-black/40 border-slate-800" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" className="bg-black/40 border-slate-800" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Company</Label>
              <Input className="bg-black/40 border-slate-800" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea className="bg-black/40 border-slate-800 min-h-[150px]" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required />
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full bg-[#14b8a6] text-[#020617] h-16 font-bold text-lg">
              {isSubmitting ? "Dispatching..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FooterCTA;
