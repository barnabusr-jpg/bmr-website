import React, { useState, useMemo } from 'react';
import { useDiagnosticContext } from '../../context/DiagnosticContext';
import { compileCustomerStory, isQuadNodeTriangulationComplete } from '../../lib/playbookStoryCompiler';

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

  const isQuadComplete = useMemo(() => {
    return isQuadNodeTriangulationComplete(rawResponses);
  }, [rawResponses]);

  const isLocked = !isQuadComplete || !state.isComplete;

  const handleExport = async () => {
    try {
      setStatus('COMPILING');
      setErrorMessage(null);

      if (!isQuadComplete) {
        throw new Error(
          'Playbook export locked: Preliminary pulse-check intake cannot be compiled. Completed 4-node triangulated telemetry is required.'
        );
      }

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
      <div className="relative group inline-block">
        <button
          onClick={handleExport}
          disabled={isLocked || status === 'COMPILING' || status === 'GENERATING'}
          className={`inline-flex items-center gap-2 px-4 py-2 font-mono text-xs font-bold rounded shadow transition-colors ${
            isLocked
              ? 'border border-slate-700 bg-slate-900/60 text-slate-500 cursor-not-allowed opacity-60'
              : 'bg-slate-900 hover:bg-slate-800 text-white cursor-pointer'
          }`}
        >
          {isLocked ? (
            <svg
              className="w-4 h-4 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeWidth="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
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
          )}

          {status === 'COMPILING' && 'COMPILING STORY...'}
          {status === 'GENERATING' && 'GENERATING PDF...'}
          {status === 'IDLE' && (
            isLocked
              ? 'PLAYBOOK LOCKED (4-NODE TRIANGULATION REQUIRED)'
              : 'EXPORT CONTROL PLANE PLAYBOOK (.PDF)'
          )}
          {status === 'ERROR' && 'RETRY EXPORT (.PDF)'}
        </button>

        {isLocked && (
          <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block w-72 p-2.5 bg-slate-950 border border-slate-800 text-slate-300 text-[10px] font-mono rounded shadow-2xl z-50 pointer-events-none">
            <span className="text-red-400 font-bold block mb-1">// AUDIT INTEGRITY GATE</span>
            Preliminary pulse-check telemetry cannot generate a board-ready Playbook. Full 4-node triangulated telemetry must be locked first.
          </div>
        )}
      </div>

      {errorMessage && (
        <span className="text-[10px] text-red-500 font-mono mt-1">
          {errorMessage}
        </span>
      )}
    </div>
  );
}
