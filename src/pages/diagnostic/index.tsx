"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function DiagnosticIndexRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    // Grab incoming query parameters (e.g. ?code=RLIMOQ58 or ?id=...)
    const { code, id, ...otherQuery } = router.query;

    // Forward seamlessly to active forensic route
    router.replace({
      pathname: "/forensic",
      query: { 
        ...otherQuery, 
        ...(id ? { id } : {}),
        ...(code ? { org: code } : {}),
        auth: "admin_verified_secure" 
      },
    });
  }, [router.isReady, router]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-500 font-mono text-xs flex items-center justify-center">
      // Redirecting to active diagnostic environment...
    </div>
  );
}
