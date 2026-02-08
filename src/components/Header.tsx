import Link from "next/link";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/80 backdrop-blur-md border-b border-slate-900 text-white">
      <div className="container mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-white">
            BMR <span className="text-[#14b8a6]">Solutions</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <Link href="/approach" className="hover:text-white transition-colors">Approach</Link>
          <Link href="/methodology" className="hover:text-white transition-colors">Methodology</Link>
          <Link href="/services" className="hover:text-white transition-colors">Services</Link>
          <Link href="/insights" className="hover:text-white transition-colors">Insights</Link>
          <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800" asChild>
            <Link href="/contact">Contact</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
