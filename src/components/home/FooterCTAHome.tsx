import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const FooterCTAHome = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [diagnosticResults, setDiagnosticResults] = useState<Record<string, string>>({});
  
  // Explicitly named state for maximum reliability
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleDiagnosticUpdate = (e: any) => {
      if (e.detail) {
        console.log("Form received signal update:", e.detail);
        setDiagnosticResults(e.detail);
      }
    };
    window.addEventListener('diagnostic-update', handleDiagnosticUpdate);
    return () => window.removeEventListener('diagnostic-update', handleDiagnosticUpdate);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name,
      email,
      org,
      message,
      results: diagnosticResults
    };

    try {
      const response = await fetch("/api/send-diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast({ title: "Request Sent", description: "Your Field Guide request has been received." });
        setName(""); setEmail(""); setOrg(""); setMessage("");
      } else {
        throw new Error("Send failed");
      }
    } catch {
      toast({ variant: "destructive", title: "Error", description: "Could not send request." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 bg-[#020617] border-t border-slate-900">
      <div className="container mx-auto max-w-5xl text-center">
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-white tracking-tight">
              Request the <span className="text-[#14b8a6]">Field Guide</span>
            </h2>
          </div>

          <Card className="p-8 border-slate-800 bg-slate-900/50 backdrop-blur-md max-w-3xl mx-auto text-left">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Name</label>
                  <Input 
                    required 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="bg-[#020617] border-slate-700 text-white" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Organization</label>
                  <Input 
                    required 
                    value={org} 
                    onChange={(e) => setOrg(e.target.value)} 
                    className="bg-[#020617] border-slate-700 text-white" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Email</label>
                <Input 
                  required 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="bg-[#020617] border-slate-700 text-white" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Message</label>
                <Textarea 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  className="bg-[#020617] border-slate-700 text-white" 
                />
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
