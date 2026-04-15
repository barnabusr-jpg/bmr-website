import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ForensicDiagnostic from '@/components/ForensicDiagnostic'; 

export default function ForensicPage() {
  const router = useRouter();
  const [cleanCode, setCleanCode] = useState<string | null>(null);

  useEffect(() => {
    // Only proceed once Next.js has fully parsed the URL
    if (router.isReady) {
      const { code } = router.query;
      if (typeof code === 'string') {
        // Fix the '0' vs 'O' mismatch immediately at the source
        const sanitized = code.trim().toUpperCase().replace(/0/g, "O");
        setCleanCode(sanitized);
      }
    }
  }, [router.isReady, router.query]);

  return (
    <div className="min-h-screen bg-black">
      {/* We only render the engine once the handshake signal is ready */}
      {router.isReady ? (
        <ForensicDiagnostic accessCode={cleanCode} />
      ) : (
        <div className="min-h-screen flex items-center justify-center text-red-600 font-mono animate-pulse uppercase tracking-widest">
          Handshake_Initializing...
        </div>
      )}
    </div>
  );
}
