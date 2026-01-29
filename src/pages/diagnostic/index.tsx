import React from 'react';
import Head from 'next/head';
import { useRouter } from "next/router";
import PromiseGapDiagnosticPage from "@/components/promise-gap-diagnostic/PromiseGapDiagnosticPage";

export default function DiagnosticFlow() {
  // ... (keep your existing router and submit logic)
  
  return (
    <>
      <Head>
        <title>Strategic Diagnostic | BMR Solutions</title>
        <meta name="description" content="Take our 5-minute diagnostic to assess your organization's Promise Gap." />
      </Head>
      <PromiseGapDiagnosticPage onSubmit={handleDiagnosticSubmit} />
    </>
  );
}
