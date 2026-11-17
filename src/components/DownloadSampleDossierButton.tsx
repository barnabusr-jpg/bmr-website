"use client";

import React, { useState } from 'react';
import { FileText, Loader2 } from 'lucide-react';
import { downloadRedactedSamplePdf } from '@/lib/sampleDossierPdf';

interface DownloadSampleDossierButtonProps {
  label?: string;
  sublabel?: string;
  variant?: 'light' | 'dark';
  className?: string;
}

export function DownloadSampleDossierButton({
  label = 'Download Redacted C-Suite Sample (2 Pages)',
  sublabel = 'Illustrative Level 2 Control-Plane Output Format',
  variant = 'light',
  className = '',
}: DownloadSampleDossierButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      await downloadRedactedSamplePdf();
    } catch (err) {
      console.error('Sample dossier PDF download failed:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const styles =
    variant === 'dark'
      ? 'bg-slate-900 text-slate-100 hover:bg-slate-800 hover:border-red-500 border border-slate-700'
      : 'bg-white text-slate-900 hover:bg-slate-100 hover:border-red-700 border border-slate-300 shadow-xs';

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isDownloading}
      className={`inline-flex flex-col items-start sm:items-center justify-center px-5 py-3 rounded-sm font-mono transition-all cursor-pointer disabled:opacity-50 ${styles} ${className}`}
    >
      <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
        {isDownloading ? (
          <Loader2 size={14} className="animate-spin text-red-700" />
        ) : (
          <FileText size={14} className="text-red-700 shrink-0" />
        )}
        {isDownloading ? 'Generating Sample PDF...' : label}
      </span>
      {sublabel && (
        <span className="text-[10px] font-sans font-normal opacity-75 mt-0.5">
          {sublabel}
        </span>
      )}
    </button>
  );
}
