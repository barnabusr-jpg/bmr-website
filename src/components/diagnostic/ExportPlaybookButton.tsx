import React, { useState } from 'react';
import { useDiagnosticContext } from '../../context/DiagnosticContext';
import { compileCustomerStory } from '../../lib/playbookStoryCompiler';

export default function ExportPlaybookButton() {
  const {
    organizationName,
    sector,
    rawResponses,
    state,
    getDiagnosticSnapshot,
  } = useDiagnosticContext();

  const [status, setStatus] = useState<'IDLE' | 'COMPILING' | 'GENERATING' | 'ERROR'>('IDLE');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleExport = async () => {
    try {
      setStatus('COMPILING');
      setErrorMessage(null);

      const diagSnapshot = getDiagnosticSnapshot();
      if (!diagSnapshot.isHydrated) {
        throw new Error('Diagnostic context is not fully hydrated.');
      }
      if (!state.isComplete) {
        throw new Error('Telemetry Deficit: All 10 diagnostic vector scores must be valid (1-5) before generating an audit-ready playbook.');
      }

      const structuredStory = await compileCustomerStory(
        organizationName,
        sector,
        diagSnapshot,
        rawResponses
      );

      setStatus('GENERATING');

      const response = await fetch('/api/export-playbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(structuredStory),
      });

      if (!response.ok) {
        const errorJson = await response.json().catch(() => ({}));
        throw new Error(errorJson.error || `Export failed with status ${response.status}`);
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `BMR_Playbook_${structuredStory.provenance.documentId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      setStatus('IDLE');
    } catch (err: any) {
      console.error('Playbook export failed:', err);
      setStatus('ERROR');
      setErrorMessage(err.message || 'An unexpected error occurred during export.');
    }
  };

  return (
    <div className="flex flex-col items-end">
      <button
        onClick={handleExport}
        disabled={status === 'COMPILING' || status === 'GENERATING' || !state.isComplete}
        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-mono text-xs font-bold rounded shadow transition-colors"
      >
        <svg
          className="w-4 h-4 text-emerald-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        {status === 'COMPILING' && 'COMPILING STORY...'}
        {status === 'GENERATING' && 'GENERATING PDF...'}
        {status === 'IDLE' && 'EXPORT CONTROL PLANE PLAYBOOK (.PDF)'}
        {status === 'ERROR' && 'RETRY EXPORT (.PDF)'}
      </button>

      {errorMessage && (
        <span className="text-[10px] text-red-500 font-mono mt-1">
          {errorMessage}
        </span>
      )}
    </div>
  );
}
