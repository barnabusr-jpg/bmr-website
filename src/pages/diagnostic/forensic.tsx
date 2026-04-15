import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ForensicDiagnostic from '@/components/ForensicDiagnostic'; 

export default function ForensicPage() {
  const router = useRouter();
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    if (router.isReady) {
      const urlCode = router.query.code;
      if (typeof urlCode === 'string') {
        // Pass the raw, trimmed uppercase code to the engine
        setCode(urlCode.trim().toUpperCase());
      }
    }
  }, [router.isReady, router.query]);

  return (
    <div className="min-h-screen bg-black">
      {router.isReady ? (
        <ForensicDiagnostic accessCode={code} />
      ) : (
        <div className="min-h-screen flex items-center justify-center text-red-600 font-mono animate-pulse uppercase tracking-[0.3em]">
          Handshake_Initializing...
        </div>
      )}
    </div>
  );
}
