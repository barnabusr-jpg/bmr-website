import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* 📡 PRIMARY FORENSIC METADATA */}
        <title>BMR Advisory | Forensic AI Audit & Structural Hardening</title>
        <meta 
          name="description" 
          content="Enterprise-grade forensic diagnostic for identifying AI logic decay and quantifying rework tax across global architectures." 
        />
        
        {/* 🏛️ OPEN GRAPH (SOCIAL PREVIEW) */}
        <meta property="og:title" content="BMR Advisory | Forensic AI Audit" />
        <meta 
          property="og:description" 
          content="Identify systemic friction and quantify the fiscal bleed of logic rot in your AI infrastructure." 
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="BMR Solutions Forensic Unit" />
        
        {/* 🛡️ SECURITY & UI PROTOCOLS */}
        <meta name="theme-color" content="#020617" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Font Loading for Forensic Aesthetic */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=JetBrains+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="antialiased bg-[#020617] selection:bg-red-600/30">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
