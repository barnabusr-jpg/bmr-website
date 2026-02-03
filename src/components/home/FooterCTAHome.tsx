import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const FooterCTAHome = () => {
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
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Name</label>
                  <Input placeholder="Your name" className="bg-[#020617] border-slate-700" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Email</label>
                  <Input type="email" placeholder="email@company.com" className="bg-[#020617] border-slate-700" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">How can we help?</label>
                <Textarea 
                  placeholder="I'd like to request the Field Guide..." 
                  className="bg-[#020617] border-slate-700 min-h-[120px]" 
                />
              </div>
              <Button className="w-full bg-[#14b8a6] hover:bg-[#0d9488] text-[#020617] font-bold h-12">
                Send Request
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
