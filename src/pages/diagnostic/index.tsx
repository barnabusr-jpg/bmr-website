import Head from 'next/head';
import PromiseGapDiagnosticPage from '@/components/promise-gap-diagnostic/PromiseGapDiagnosticPage';

export default function DiagnosticPage() {
  return (
    <>
      <Head>
        <title>Strategic Diagnostic | BMR Advisory</title>
        <meta name="description" content="Take our 5-minute diagnostic to assess your organization's Promise Gap." />
      </Head>
      
      {/* Cleaned: No props passed here to match the internal redirect logic */}
      <PromiseGapDiagnosticPage />
    </>
  );
}
