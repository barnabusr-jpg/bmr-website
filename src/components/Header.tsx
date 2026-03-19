import Link from "next/link";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/80 backdrop-blur-md border-b border-slate-900 text-white font-medium">
      <div className="container mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl font-black tracking-tighter text-white italic uppercase transition-all group-hover:tracking-normal">
            BMR <span className="text-[#14b8a6]">Forensics</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-10 text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
          {/* Ensure these routes exist in your /pages directory */}
          <Link href="/approach" className="hover:text-[#14b8a6] hover:italic transition-all">Approach</Link>
          <Link href="/methodology" className="hover:text-[#14b8a6] hover:italic transition-all">Architecture</Link>
          <Link href="/services" className="hover:text-[#14b8a6] hover:italic transition-all">Services</Link>
          <Link href="/insights" className="hover:text-[#14b8a6] hover:italic transition-all">Insights</Link>
          
          <Button 
            className="bg-[#14b8a6] hover:bg-white text-[#020617] border-none rounded-none font-black italic uppercase px-8 h-10 text-[10px] tracking-[0.2em] transition-all duration-300 shadow-[0_0_20px_rgba(20,184,166,0.2)]" 
            asChild
          >
            <Link href="/diagnostic">Initialize Pulse Check</Link>
          </Button>
        </nav>

        {/* Simple Mobile Indicator (Optional: You can add a sheet here later) */}
        <div className="md:hidden">
           <Link href="/diagnostic" className="text-[#14b8a6] text-[10px] font-bold uppercase tracking-widest border border-[#14b8a6]/30 px-4 py-2 italic">
             Pulse Check
           </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
