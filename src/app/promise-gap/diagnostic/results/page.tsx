'use client';

import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ResultsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="py-24 px-6">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="flex justify-center mb-8">
            <div className="h-20 w-20 bg-[#14b8a6]/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-[#14b8a6]" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Diagnostic Complete</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Your Promise Gap analysis has been generated and sent to your inbox.
          </p>

          <Card className="p-8 border-2 border-[#14b8a6]/20 bg-card/50 backdrop-blur mb-12 shadow-xl">
            <Mail className="h-8 w-8 text-[#14b8a6] mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Check Your Email</h2>
            {/* FIXED: Replaced raw apostrophes to satisfy ESLint */}
            <p className="text-muted-foreground leading-relaxed">
              We&apos;ve dispatched a detailed breakdown of your identified signals and recommended next steps to the work email provided.
            </p>
          </Card>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/insights">
              <button className="flex items-center gap-2 px-8 py-4 rounded-md bg-[#14b8a6] text-white font-bold hover:bg-[#0d9488] transition-all transform hover:scale-105">
                Explore All Insights <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
            <Link href="/">
              <button className="px-8 py-4 rounded-md border-2 border-border font-bold hover:bg-muted transition-colors">
                Return Home
              </button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
