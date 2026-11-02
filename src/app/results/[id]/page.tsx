import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import UnifiedResultsPortal from "@/components/UnifiedResultsPortal";
import { DiagnosticProvider } from "@/context/DiagnosticContext";

export const dynamic = "force-dynamic";

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

const resultsLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, "60s"),
      analytics: true,
    })
  : null;

interface PageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default async function ResultsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const auditId = resolvedParams?.id;

  if (resultsLimiter && auditId) {
    const { success } = await resultsLimiter.limit(`results:${auditId}`);
    if (!success) {
      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
          <div className="p-8 text-center text-red-500 border border-red-900/50 bg-red-950/20 rounded-xl max-w-md font-mono">
            <h1 className="text-xl font-bold tracking-wide">TOO MANY REQUESTS</h1>
            <p className="text-sm opacity-75 mt-2">Please try again shortly.</p>
          </div>
        </div>
      );
    }
  }

  return (
    <DiagnosticProvider>
      <UnifiedResultsPortal auditId={auditId} />
    </DiagnosticProvider>
  );
}
