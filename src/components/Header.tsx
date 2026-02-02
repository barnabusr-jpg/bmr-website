import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

const Header = () => {
  // Function to handle the smooth scroll to the contact form
  const scrollToContact = (e: React.MouseEvent) => {
    // Prevent default anchor behavior
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-slate-800">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-white tracking-tight">
          BMR<span className="text-[#0D9488]">SOLUTIONS</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="/promise-gap" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            The Problem
          </Link>
          <Link href="/approach" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Our Approach
          </Link>
          <Link href="/strategic-advisory" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Strategic Advisory
          </Link>
          
          {/* New Contact Link that triggers the scroll */}
          <a 
            href="#contact" 
            onClick={scrollToContact}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            Contact
          </a>
          
          <Button 
            onClick={scrollToContact}
            className="bg-[#0D9488] hover:bg-[#0D9488]/90 text-white font-bold"
          >
            Start a Conversation
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
