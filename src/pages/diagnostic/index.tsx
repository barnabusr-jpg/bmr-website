import { useEffect } from "react";
import { useRouter } from "next/router";

export default function DiagnosticIndexRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    // Grab incoming query parameters (e.g. ?code=RLIMOQ58 or ?id=...)
    const { code, id, ...otherQuery } = router.query;

    // Forward seamlessly to your active forensic route
    router.replace({
      pathname: "/forensic",
      query: { 
        ...otherQuery, 
        ...(id ? { id } : {}),
        ...(code ? { org: code } : {}),
        auth: "admin_verified_secure" 
      },
    });
  }, [router.isReady]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-400 font-mono text-xs flex items-center justify-center">
      // Redirecting to active diagnostic environment...
    </div>
  );
}
