"use client";

import React, { useState } from "react";
import { FileText, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

async function getFreshAccessToken(forceRefresh = false): Promise<string | null> {
  if (forceRefresh) {
    const { data, error } = await supabase.auth.refreshSession();
    if (error) return null;
    return data?.session?.access_token ?? null;
  }

  const { data } = await supabase.auth.getSession();
  const session = data?.session;

  const expiresAtMs = (session?.expires_at ?? 0) * 1000;
  if (!session?.access_token || (expiresAtMs > 0 && expiresAtMs - Date.now() < 60_000)) {
    const { data: refreshed } = await supabase.auth.refreshSession();
    return refreshed?.session?.access_token ?? session?.access_token ?? null;
  }

  return session.access_token;
}

export function AdminDownloadSampleDossierButton({
  label = "Sample Dossier (PDF)",
}: {
  label?: string;
}) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      let accessToken = await getFreshAccessToken(false);
      if (!accessToken) {
        throw new Error("No active admin session token found. Please sign in again.");
      }

      let resp = await fetch("/api/admin/sample-dossier", {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (resp.status === 401 || resp.status === 403) {
        const refreshedToken = await getFreshAccessToken(true);
        if (refreshedToken) {
          accessToken = refreshedToken;
          resp = await fetch("/api/admin/sample-dossier", {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` },
          });
        }
      }

      if (!resp.ok) {
        throw new Error(`Download failed (${resp.status})`);
      }

      const blob = await resp.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "BMR_Solutions_Sample_Process_Waste_Tax_Dossier.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();

      setTimeout(() => URL.revokeObjectURL(url), 5000);
    } catch (e) {
      console.error(e);
      alert("Admin sample download failed. Please refresh or sign in again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isDownloading}
      className="bg-white text-slate-900 hover:bg-slate-100 border border-slate-300 shadow-xs inline-flex flex-col items-center justify-center px-4 py-1.5 rounded-sm font-mono cursor-pointer disabled:opacity-50 transition-all"
    >
      <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
        {isDownloading ? (
          <Loader2 size={14} className="animate-spin text-red-700" />
        ) : (
          <FileText size={14} className="text-red-700" />
        )}
        {isDownloading ? "Generating..." : label}
      </span>
    </button>
  );
}
