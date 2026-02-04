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

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Parse results from the hidden input field
    const resultsRaw = formData.get("results") as string;
    let resultsObj = {};
    try {
      resultsObj = JSON.parse(resultsRaw || "{}");
    } catch {
      resultsObj = {};
    }

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      org: formData.get("org"),
      message: formData.get("message"),
      results: resultsObj
    };

    try {
      const response = await fetch("/api/send-diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast({ title: "Request Sent", description: "Your System Observation Brief is in your inbox." });
        form.reset();
        // Clear hidden input after success
        const hiddenInput = document.getElementById('diagnostic-data-input') as HTMLInputElement;
        if (hiddenInput) hiddenInput.value = "{}";
      } else {
        throw new Error();
      }
    } catch {
      toast({ variant: "destructive", title: "Error", description: "Submission failed. Please try again." });
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
              {/* HIDDEN INPUT FOR DIAGNOSTIC DATA */}
              <input type="hidden" id="diagnostic-data-input" name="results" defaultValue="{}" />

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Name</label>
                  <Input name="name" required placeholder="Your name" className="bg-[#020617] border-slate-700 text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Organization</label>
                  <Input name="org" required placeholder="Organization" className="bg-[#020617] border-slate-700 text-white" />
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
              <Button type="submit" disabled={loading} className="w-full bg-[#14b8a6] text-[#020617] font-bold h-12">
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
