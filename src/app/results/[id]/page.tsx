import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

interface DiagnosticResult {
  id: string;
  diagnostic_data: Record<string, unknown>;
  created_at: string;
  group_id: string | null;
  overall_score: number | null;
}

const uuidSchema = z.string().uuid();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!uuidSchema.safeParse(id).success) {
    return (
      <div className="p-8 text-center text-red-500">
        <h1 className="text-xl font-semibold">Invalid Capability Token</h1>
        <p className="text-sm opacity-75 mt-1">
          The requested identifier format is invalid.
        </p>
      </div>
    );
  }

  const { data: result, error } = await supabase
    .rpc("get_result_by_id", { p_id: id })
    .single<DiagnosticResult>();

  if (error || !result) {
    if (error) {
      console.error("[RPC Lookup Error]", { id, code: error.code, message: error.message });
    }

    return (
      <div className="p-8 text-center text-red-500">
        <h1 className="text-xl font-semibold">Diagnostic Result Not Found</h1>
        <p className="text-sm opacity-75 mt-1">
          Invalid or expired UUID capability token.
        </p>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Diagnostic Report</h1>
        <div className="flex items-center gap-3">
          <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full font-mono">
            Score: {result.overall_score ?? "—"}
          </span>
          <span className="text-xs text-slate-400 font-mono">
            ID: {result.id}
          </span>
        </div>
      </div>

      <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-auto text-sm font-mono">
        {JSON.stringify(result.diagnostic_data, null, 2)}
      </pre>
    </main>
  );
}
