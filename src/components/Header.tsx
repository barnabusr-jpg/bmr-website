import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navigation = [
  { name: "Services", href: "/services" },
  { name: "Frameworks", href: "/frameworks" },
  { name: "The Problem", href: "/promise-gap" },
  { name: "Diagnostic", href: "/promise-gap/diagnostic" },
  { name: "Outcomes", href: "/outcomes" },
  { name: "Insights", href: "/insights" },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  // ... rest of your component code

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-heading font-bold tracking-tight">
            BMR<span className="text-accent">.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navigation.map((item) => {
              /* FIXED: Added optional chaining and fallback for null pathname */
              const isActive = pathname?.startsWith(item.href) ?? false;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-all duration-200 hover:text-primary rounded-sm px-1 ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <ThemeToggle />
            <Button size="sm" asChild>
              <Link href="/contact">Start a Conversation</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-4 py-6">
                {navigation.map((item) => {
                  /* FIXED: Added optional chaining and fallback for null pathname */
                  const isActive = pathname?.startsWith(item.href) ?? false;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-sm font-medium ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
