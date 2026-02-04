import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const FooterCTAHome = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [diagnosticResults, setDiagnosticResults] = useState<any>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    org: "",
    message: ""
  });

  // This "listens" for the diagnostic signals clicked elsewhere on the page
  useEffect(() => {
    const handleDiagnosticUpdate = (e: any) => {
      if (e.detail) setDiagnosticResults(e.detail);
    };
    window.addEventListener('diagnostic-update', handleDiagnosticUpdate);
    return () => window.removeEventListener('diagnostic-update', handleDiagnosticUpdate);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/send-diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          results: diagnosticResults // Attaches the 12 signals here
        }),
      });

      if (response.ok) {
        toast({ title: "Request Sent", description: "We will be in touch shortly." });
        setFormData({ name: "", email: "", org: "", message: "" });
      } else {
        throw new Error();
      }
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: "Failed to send request." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 bg-[#020617] border-t border-slate-900">
      <div className="container mx-auto max-w-5xl text-center">
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Request the <span className="text-[#14b8a6]">Field Guide</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Contact us to receive the guide on observing AI-enabled systems or to discuss a diagnostic for your organization.
            </p>
          </div>

          <Card className="p-8 md:p-12 border-slate-800 bg-slate-900/50 backdrop-blur-md max-w-3xl mx-auto text-left">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Name</label>
                  <Input 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Your name" 
                    className="bg-[#020617] border-slate-700 text-white" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Organization</label>
                  <Input 
                    required
                    value={formData.org}
                    onChange={(e) => setFormData({...formData, org: e.target.value})}
                    placeholder="Company name" 
                    className="bg-[#020617] border-slate-700 text-white" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Email</label>
                <Input 
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="email@company.com" 
                  className="bg-[#020617] border-slate-700 text-white" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">How can we help?</label>
                <Textarea 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="I'd like to request the Field Guide..." 
                  className="bg-[#020617] border-slate-700 min-h-[120px] text-white" 
                />
              </div>
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#14b8a6] hover:bg-[#0d9488] text-[#020617] font-bold h-12"
              >
                {loading ? "Sending..." : "Send Request"}
              </Button>
            </form>
          </Card>

          <p className="text-[11px] text-slate-600 italic tracking-wide">
            Note: BMR Solutions provides advisory services and does not provide legal advice or compliance certification.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FooterCTAHome;
