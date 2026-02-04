import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const FooterCTAHome = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Grab direct values from form inputs
    const data = new FormData(e.currentTarget);
    
    // Grab diagnostic results from global window
    const diagnosticData = (window as any).bmr_diagnostic_results || {};

    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      org: data.get("org"),
      message: data.get("message"),
      results: diagnosticData
    };

    try {
      const response = await fetch("/api/send-diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast({ title: "Request Sent", description: "Your brief has been delivered." });
        (e.target as HTMLFormElement).reset();
        (window as any).bmr_diagnostic_results = {}; // Clear results after success
      } else {
        throw new Error();
      }
    } catch {
      toast({ variant: "destructive", title: "Error", description: "Failed to send request." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 bg-[#020617] border-t border-slate-900">
      <div className="container mx-auto max-w-5xl text-center">
        <div className="space-y-12">
          <h2 className="text-4xl font-bold text-white tracking-tight">
            Request the <span className="text-[#14b8a6]">Field Guide</span>
          </h2>

          <Card className="p-8 border-slate-800 bg-slate-900/50 backdrop-blur-md max-w-3xl mx-auto text-left">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Name</label>
                  <Input name="name" required placeholder="Your name" className="bg-[#020617] border-slate-700 text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Organization</label>
                  <Input name="org" required placeholder="Company" className="bg-[#020617] border-slate-700 text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Email</label>
                <Input name="email" type="email" required placeholder="email@company.com" className="bg-[#020617] border-slate-700 text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Message</label>
                <Textarea name="message" placeholder="How can we help?" className="bg-[#020617] border-slate-700 text-white" />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-[#14b8a6] text-[#020617] font-bold">
                {loading ? "Sending..." : "Send Request"}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FooterCTAHome;
