import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#020617] border-t border-slate-900 py-12 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo / Brand Section */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-white italic uppercase">
              BMR <span className="text-[#14b8a6]">Solutions</span>
            </span>
          </div>
          
          {/* Copyright Section */}
          <p className="text-slate-500 text-sm font-light">
            © {new Date().getFullYear()} BMR Solutions. All rights reserved.
          </p>
          
          {/* Utility Links */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-400">
            {/* UPDATED: Added verified Field Guide path */}
            <a 
              href="/media/Field%20Guide.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#14b8a6] transition-colors uppercase tracking-widest text-[10px] font-bold"
            >
              Field Guide
            </a>
            <Link href="/privacy" className="hover:text-white transition-colors uppercase tracking-widest text-[10px]">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors uppercase tracking-widest text-[10px]">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
