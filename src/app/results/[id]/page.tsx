import { createClient } from "@supabase/supabase-js";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

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

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function ResultsPage({ params }: { params: { id: string } }) {
  if (resultsLimiter) {
    const rateKey = `results:${params.id}`;
    const { success } = await resultsLimiter.limit(rateKey);

    if (!success) {
      return (
        <div className="p-8 text-center text-red-500 font-mono">
          <h1 className="text-xl font-semibold">TOO MANY REQUESTS</h1>
          <p className="text-sm opacity-75 mt-1">Please try again shortly.</p>
        </div>
      );
    }
  }

  const { data: result, error } = await supabase
    .schema("auth_capabilities")
    .rpc("get_result_by_id", { p_id: params.id })
    .single();

  if (error || !result) {
    return (
      <div className="p-8 text-center text-red-500 font-mono">
        <h1 className="text-xl font-semibold">DIAGNOSTIC RESULT NOT FOUND</h1>
        <p className="text-sm opacity-75 mt-1">
          {error?.message || "Invalid or expired UUID capability token."}
        </p>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-6 font-mono">
      <div className="flex items-center justify-between mb-4 border-b pb-2">
        <h1 className="text-2xl font-bold">DIAGNOSTIC REPORT</h1>
        <span className="text-xs text-slate-400">ID: {result.id}</span>
      </div>

      <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-auto text-sm">
        {JSON.stringify(result.diagnostic_data, null, 2)}
      </pre>
    </main>
  );
}
