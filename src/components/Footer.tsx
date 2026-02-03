import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#020617] border-t border-slate-900 py-12 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-white">
              BMR <span className="text-[#14b8a6]">Solutions</span>
            </span>
          </div>
          
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} BMR Solutions. All rights reserved.
          </p>
          
          <div className="flex gap-6 text-sm text-slate-400">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
