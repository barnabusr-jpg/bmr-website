import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found | BMR Solutions</title>
      </Head>
      <div className="min-h-screen bg-[#020617] flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-8xl font-bold text-white mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-slate-200 mb-6">
              We&apos;ve recently updated our site structure.
            </h2>
            <p className="text-slate-400 mb-10 max-w-md mx-auto">
              The page you are looking for has likely moved to a new, cleaner location. 
              Please use the links below to find what you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/promise-gap">The Promise Gap</Link>
              </Button>
              <Button variant="outline" asChild className="text-white border-white hover:bg-white hover:text-black">
                <Link href="/diagnostic">Start Diagnostic</Link>
              </Button>
              <Button variant="ghost" asChild className="text-slate-400">
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
