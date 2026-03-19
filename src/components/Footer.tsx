import Link from "next/link";
import { Mail } from "lucide-react";

const Footer = () => {
  const handleRequestAccess = () => {
    const subject = encodeURIComponent("Access Request: BMR Systems Operations Protocol");
    const body = encodeURIComponent("I am requesting access to the BMR Systems Operations Protocol (Field Guide) for my organization.\n\nName:\nOrganization:");
    window.location.href = `mailto:hello@bmrsolutions.co?subject=${subject}&body=${body}`;
  };

  return (
    <footer className="bg-[#020617] border-t border-slate-900 py-12 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-white italic uppercase">
              BMR <span className="text-[#14b8a6]">Solutions</span>
            </span>
          </div>
          
          <p className="text-slate-600 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-center">
            © {new Date().getFullYear()} BMR SOLUTIONS CO. STRATEGIC ADVISORY & SYSTEMIC STABILITY.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 text-[10px] uppercase tracking-widest font-bold">
            {/* Fenced Asset Trigger */}
            <button 
              onClick={handleRequestAccess}
              className="text-[#14b8a6] hover:text-white transition-colors flex items-center gap-2 italic"
            >
              <Mail size={12} /> Request Protocol Access
            </button>
            
            <Link href="/privacy" className="text-slate-500 hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-slate-500 hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
