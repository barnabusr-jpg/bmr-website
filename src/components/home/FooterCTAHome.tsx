import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const FooterCTA = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedScore = localStorage.getItem('bmr_score');
    const savedPillar = localStorage.getItem('bmr_pillar');

    if (savedScore && savedPillar) {
      setFormData(prev => ({
        ...prev,
        message: `I just completed the diagnostic. My Promise Gap™ score is ${savedScore}/10, with the primary friction occurring in the ${savedPillar} pillar. I&apos;d like to discuss these results.`
      }));
      localStorage.removeItem('bmr_score');
      localStorage.removeItem('bmr_pillar');
    }
  }, []);

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
        toast({ title: "Signal Received", description: "Your diagnostic data and message have been dispatched." });
        setFormData({ name: "", email: "", company: "", message: "" });
      } else {
        throw new Error('Failed to send');
      }
    } catch {
      // Catch block updated to satisfy "no-unused-vars" ESLint rule
      toast({ title: "Transmission Error", description: "Please try again or email hello@bmradvisory.co directly.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 px-4 md:px-6 bg-[#020617] border-t border-slate-900 overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-5xl md:text-8xl font-bold mb-8 text-white tracking-tight">
            Start a <span className="text-[#0D9488]">Conversation</span>
          </h2>
        </motion.div>
        <div className="max-w-3xl mx-auto border border-slate-800 rounded-2xl bg-slate-900/10 p-6 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">Name</Label>
                <Input className="bg-black/40 border-slate-800 text-white h-14" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div className="space-y-3">
                <Label className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">Email</Label>
                <Input type="email" className="bg-black/40 border-slate-800 text-white h-14" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
              </div>
            </div>
            <div className="space-y-3">
              <Label className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">Company</Label>
              <Input className="bg-black/40 border-slate-800 text-white h-14" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
            </div>
            <div className="space-y-3">
              <Label className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">Message</Label>
              <Textarea className="bg-black/40 border-slate-800 text-white min-h-[160px] resize-none" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required />
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full bg-[#0D9488] hover:bg-[#0D9488]/90 text-white font-extrabold text-xl h-20 rounded-xl transition-all">
              {isSubmitting ? (
                <div className="flex items-center gap-2"><Loader2 className="h-6 w-6 animate-spin" /><span>Dispatching...</span></div>
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FooterCTA;
