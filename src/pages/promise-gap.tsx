import React from 'react';
import Head from 'next/head'; // Import Head for SEO
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromiseGapPage from "@/components/promise-gap/PromiseGapPage";

export default function PromiseGap() {
  return (
    <>
      <Head>
        <title>The Promise Gap | BMR Solutions</title>
        <meta name="description" content="Identify and bridge the gap between your strategic promises and operational execution." />
        <meta property="og:title" content="The Promise Gap | BMR Solutions" />
        <meta property="og:description" content="Closing the distance between strategy and reality." />
      </Head>
      <div className="min-h-screen bg-[#020617]">
        <Header />
        <main>
          <PromiseGapPage />
        </main>
        <Footer />
      </div>
    </>
  );
}
