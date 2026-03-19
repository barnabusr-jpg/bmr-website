"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Activity } from "lucide-react"; // Added for forensic branding

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
          title: "REQUEST RECEIVED", 
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
        title: "SUBMISSION ERROR", 
        description: "The request could not be processed at this time." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-32 px-6 bg-[#020617] border-t border-slate-900">
      <div className="container mx-auto max-w-5xl text-center">
        <div className="flex flex-col items-center mb-12">
          <Activity className="text-[#14b8a6] mb-4 h-6 w-6 opacity-50" />
          <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter">
            Request The <span className="text-[#14b8a6]">Operational Protocol</span>
          </h2>
          <p className="mt-4 text-slate-500 text-[10px] uppercase font-black tracking-[0.4em] italic">
            Authorized session: Forensic Review V3
          </p>
        </div>

        <Card className="p-10 border-2 border-slate-900 bg-slate-950/40 backdrop-blur-md max-w-3xl mx-auto text-left relative overflow-hidden group transition-all duration-500 rounded-none">
          {/* Top-down vertical build highlight */}
          <div className="absolute top-0 left-0 w-1.5 h-0 group-hover:h-full bg-[#14b8a6] transition-all duration-700 ease-in-out"></div>
          
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 italic uppercase tracking-widest">Name</label>
                <Input 
                  ref={nameRef} 
                  required 
                  placeholder="Full Name" 
                  className="bg-[#020617]/50 border-slate-800 text-white rounded-none h-14 italic focus:border-[#14b8a6] transition-colors placeholder:text-slate-700" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 italic uppercase tracking-widest">Organization</label>
                <Input 
                  ref={orgRef} 
                  required 
                  placeholder="Company/Org" 
                  className="bg-[#020617]/50 border-slate-800 text-white rounded-none h-14 italic focus:border-[#14b8a6] transition-colors placeholder:text-slate-700" 
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 italic uppercase tracking-widest">Work Email</label>
              <Input 
                ref={emailRef} 
                type="email" 
                required 
                placeholder="email@company.com" 
                className="bg-[#020617]/50 border-slate-800 text-white rounded-none h-14 italic focus:border-[#14b8a6] transition-colors placeholder:text-slate-700" 
              />
            </div>
            
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 italic uppercase tracking-widest">Operational Context</label>
              <Textarea 
                ref={msgRef} 
                placeholder="Current systemic environment overview..." 
                className="bg-[#020617]/50 border-slate-800 text-white rounded-none focus:border-[#14b8a6] transition-colors min-h-[140px] italic placeholder:text-slate-700 p-4" 
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-[#14b8a6] hover:bg-white text-[#020617] font-black h-16 rounded-none italic uppercase tracking-[0.3em] text-[11px] transition-all shadow-2xl"
            >
              {loading ? "INITIALIZING DATA UPLOAD..." : "SEND PROTOCOL REQUEST"}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default FooterCTAHome;
