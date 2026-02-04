import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const FooterCTAHome = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // DIRECT REFS: No state lag, no sync issues.
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const orgRef = useRef<HTMLInputElement>(null);
  const msgRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Grab signals from the vault
    const saved = localStorage.getItem('bmr_results_vault');
    const diagnosticResults = saved ? JSON.parse(saved) : {};

    // Manually construct the payload from physical field values
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
        toast({ title: "Request Sent", description: "Observation Brief delivered." });
        // Manually clear fields
        if (nameRef.current) nameRef.current.value = "";
        if (emailRef.current) emailRef.current.value = "";
        if (orgRef.current) orgRef.current.value = "";
        if (msgRef.current) msgRef.current.value = "";
        localStorage.removeItem('bmr_results_vault');
      } else {
        throw new Error();
      }
    } catch {
      toast({ variant: "destructive", title: "Error", description: "Failed to send." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 bg-[#020617] border-t border-slate-900">
      <div className="container mx-auto max-w-5xl text-center">
        <h2 className="text-4xl font-bold text-white mb-12 tracking-tight">
          Request the <span className="text-[#14b8a6]">Field Guide</span>
        </h2>

        <Card className="p-8 border-slate-800 bg-slate-900/50 backdrop-blur-md max-w-3xl mx-auto text-left">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Name</label>
                <Input ref={nameRef} required placeholder="Your name" className="bg-[#020617] border-slate-700 text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Organization</label>
                <Input ref={orgRef} required placeholder="Organization" className="bg-[#020617] border-slate-700 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Email</label>
              <Input ref={emailRef} type="email" required placeholder="email@company.com" className="bg-[#020617] border-slate-700 text-white" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Message</label>
              <Textarea ref={msgRef} placeholder="How can we help?" className="bg-[#020617] border-slate-700 text-white" />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-[#14b8a6] text-[#020617] font-bold h-12">
              {loading ? "Sending..." : "Send Request"}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default FooterCTAHome;
