"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function DiagnosticIndexRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const { code, id, flow, ...otherQuery } = router.query;
    const flowStr = Array.isArray(flow) ? flow[0] : flow;

    // 🎯 DYNAMIC ROUTING BASE
    // 360 Triangulation routes to /triangulation, Quad Node routes to /forensic
    const destinationPath = 
      flowStr === "360_triangulation" 
        ? "/triangulation" 
        : "/forensic";

    router.replace({
      pathname: destinationPath,
      query: { 
        ...otherQuery, 
        ...(id ? { id } : {}),
        ...(code ? { org: code } : {}),
        auth: "admin_verified_secure",
        ...(flowStr ? { flow: flowStr } : {})
      },
    });
  }, [router.isReady, router]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-500 font-mono text-xs flex items-center justify-center">
      // Redirecting to active diagnostic environment...
    </div>
  );
}
