import Link from "next/link";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/80 backdrop-blur-md border-b border-slate-900 text-white font-medium">
      <div className="container mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-white italic uppercase">
            BMR <span className="text-[#14b8a6]">Forensics</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <Link href="/approach" className="hover:text-white transition-colors italic uppercase">Approach</Link>
          <Link href="/methodology" className="hover:text-white transition-colors italic uppercase">Architecture</Link>
          <Link href="/services" className="hover:text-white transition-colors italic uppercase">Services</Link>
          <Link href="/insights" className="hover:text-white transition-colors italic uppercase">Insights</Link>
          
          <Button 
            className="bg-[#14b8a6] hover:bg-[#0d9488] text-white border-none rounded-none font-bold italic uppercase px-6" 
            asChild
          >
            <Link href="/diagnostic">Initialize Pulse Check</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
