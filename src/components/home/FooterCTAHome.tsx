import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const FooterCTAHome = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const orgRef = useRef<HTMLInputElement>(null);
  const msgRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const saved = localStorage.getItem('bmr_results_vault');
    const diagnosticResults = saved ? JSON.parse(saved) : {};

    const payload = {
      name: nameRef.current?.value || "Not Provided",
      email: emailRef.current?.value || "Not Provided",
      org: orgRef.current?.value || "Not Provided",
      message: msgRef.current?.value || "",
      results: diagnosticResults
    };

    try {
      const response = await fetch("/api/send-diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast({ 
          title: "Request Received", 
          description: "The Operational Protocol has been delivered to your inbox." 
        });
        if (nameRef.current) nameRef.current.value = "";
        if (emailRef.current) emailRef.current.value = "";
        if (orgRef.current) orgRef.current.value = "";
        if (msgRef.current) msgRef.current.value = "";
        localStorage.removeItem('bmr_results_vault');
      } else {
        throw new Error("Failed to send");
      }
    } catch {
      toast({ 
        variant: "destructive", 
        title: "Submission Error", 
        description: "The request could not be processed at this time." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 bg-[#020617] border-t border-slate-900">
      <div className="container mx-auto max-w-5xl text-center">
        <h2 className="text-4xl font-bold text-white mb-12 tracking-tight italic uppercase">
          Request The <span className="text-[#14b8a6]">Operational Protocol</span>
        </h2>

        <Card className="p-8 border-slate-800 bg-slate-900/50 backdrop-blur-md max-w-3xl mx-auto text-left relative overflow-hidden group transition-all duration-500">
          {/* Top-down vertical build highlight for visual consistency */}
          <div className="absolute top-0 left-0 w-1.5 h-0 group-hover:h-full bg-[#14b8a6] transition-all duration-500 ease-in-out"></div>
          
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 italic uppercase">Name</label>
                <Input 
                  ref={nameRef} 
                  required 
                  placeholder="Full Name" 
                  className="bg-[#020617] border-slate-700 text-white rounded-none focus:border-[#14b8a6] transition-colors" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 italic uppercase">Organization</label>
                <Input 
                  ref={orgRef} 
                  required 
                  placeholder="Organization" 
                  className="bg-[#020617] border-slate-700 text-white rounded-none focus:border-[#14b8a6] transition-colors" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 italic uppercase">Email</label>
              <Input 
                ref={emailRef} 
                type="email" 
                required 
                placeholder="email@company.com" 
                className="bg-[#020617] border-slate-700 text-white rounded-none focus:border-[#14b8a6] transition-colors" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 italic uppercase">Operational Context</label>
              <Textarea 
                ref={msgRef} 
                placeholder="Provide a brief overview of your current systemic environment." 
                className="bg-[#020617] border-slate-700 text-white rounded-none focus:border-[#14b8a6] transition-colors min-h-[120px]" 
              />
            </div>
            <Button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-[#14b8a6] hover:bg-[#0d9488] text-[#020617] font-bold h-14 rounded-none italic uppercase tracking-widest transition-all"
            >
              {loading ? "INITIALIZING..." : "SEND PROTOCOL REQUEST"}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default FooterCTAHome;
