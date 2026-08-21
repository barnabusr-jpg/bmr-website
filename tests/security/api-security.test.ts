import { describe, it, expect } from "vitest";
import { createClient } from "@supabase/supabase-js";

const baseUrl = process.env.TEST_API_BASE_URL || "http://localhost:3000";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";

describe("Security Perimeter & Regression Tests", () => {
  it("enforces RLS and returns empty data on direct client SELECTs", async () => {
    const anonClient = createClient(supabaseUrl, anonKey);
    const { data } = await anonClient.from("operators").select("*");

    expect(data).toEqual([]);
  });

  it("dispatch-directives: returns 400 + Validation Failed on malformed payload", async () => {
    const res = await fetch(`${baseUrl}/api/dispatch-directives`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ malformedField: true }),
    });

    expect(res.status).toBe(400);

    const json = await res.json();
    expect(json).toMatchObject({
      error: "Validation Failed",
    });
    expect(json.details).toBeDefined();
  });

  it("save-operator-response: rejects oversized bodies (>100KB)", async () => {
    const oversizedBody = {
      accessCode: "TEST-CODE",
      rawResponses: { data: "x".repeat(105 * 1024) },
    };

    const res = await fetch(`${baseUrl}/api/save-operator-response`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(oversizedBody),
    });

    expect([400, 413]).toContain(res.status);

    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const json = await res.json();
      expect(json).toBeDefined();
    }
  });

  it("save-operator-response: missing accessCode returns 400 Validation Failed", async () => {
    const res = await fetch(`${baseUrl}/api/save-operator-response`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rawResponses: { data: "ok" } }),
    });

    expect(res.status).toBe(400);

    const json = await res.json();
    expect(json).toMatchObject({
      error: "Validation Failed",
    });
    expect(json.details).toBeDefined();
  });

  it("rate-limits POST /api/save-operator-response by Endpoint + IP (429 expected)", async () => {
    // Both Upstash environment variables required to execute assertion
    const hasUpstash =
      Boolean(process.env.UPSTASH_REDIS_REST_URL) &&
      Boolean(process.env.UPSTASH_REDIS_REST_TOKEN);

    if (!hasUpstash) return;

    const payload = {
      accessCode: "TEST-CODE",
      rawResponses: { data: "ok" },
    };

    // Fire 15 rapid POSTs to guarantee exceeding the 10 req / 10s window in CI
    const requests = Array.from({ length: 15 }, () =>
      fetch(`${baseUrl}/api/save-operator-response`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
    );

    const responses = await Promise.all(requests);
    const statuses = responses.map((r) => r.status);

    expect(statuses).toContain(429);
  });
});
