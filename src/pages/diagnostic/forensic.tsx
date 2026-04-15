import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ForensicDiagnostic from '@/components/ForensicDiagnostic'; 

export default function ForensicPage() {
  const router = useRouter();
  const [cleanCode, setCleanCode] = useState<string | null>(null);

  useEffect(() => {
    // router.isReady is the key to stopping the "Unauthorized" loop in Pages Router
    if (router.isReady) {
      const { code } = router.query;
      if (typeof code === 'string') {
        // Sanitize immediately: Uppercase and fix the 0 vs O mismatch
        const sanitized = code.trim().toUpperCase().replace(/0/g, "O");
        setCleanCode(sanitized);
      }
    }
  }, [router.isReady, router.query]);

  return (
    <div className="min-h-screen bg-black">
      {router.isReady ? (
        <ForensicDiagnostic accessCode={cleanCode} />
      ) : (
        <div className="min-h-screen flex items-center justify-center text-red-600 font-mono animate-pulse uppercase tracking-[0.3em]">
          Handshake_Initializing...
        </div>
      )}
    </div>
  );
}
