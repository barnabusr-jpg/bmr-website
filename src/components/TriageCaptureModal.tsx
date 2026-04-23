import React, { useState, useEffect } from 'react';
import { Mail, ShieldCheck, AlertTriangle } from 'lucide-react';
import { DiagnosticResult } from '../lib/diagnosticEngine';

interface TriageProps {
  result: DiagnosticResult;
  onClose: () => void;
  onSuccess: (email: string) => void;
}

export default function TriageCaptureModal({ result, onClose, onSuccess }: TriageProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [transmissionId, setTransmissionId] = useState('');

  useEffect(() => {
    setTransmissionId(`TX-${Math.random().toString(36).substring(2, 10).toUpperCase()}`);
  }, []);

  const validateEmail = (value: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(re.test(value));
    setEmail(value);
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const vault = localStorage.getItem('bmr_results_vault');
      const vaultData = vault ? JSON.parse(vault) : null;

      if (!vaultData) throw new Error('VAULT_MISSING');

      const focusKey = vaultData.AVS?.aggregate >= vaultData.HAI?.aggregate && 
                       vaultData.AVS?.aggregate >= vaultData.IGF?.aggregate ? 'AVS' : 'HAI';
      
      const vectorId = focusKey === 'HAI' ? 'Vector 01' : 'Vector 02';

      const calendlyUrl = `https://calendly.com/hello-bmradvisory/forensic-review?` + 
        `name=${encodeURIComponent(vaultData.name || 'User')}&` + 
        `email=${encodeURIComponent(email)}&` + 
        `a1=${vectorId}&` + 
        `utm_campaign=${encodeURIComponent(vaultData.organization || 'BMR')}`;

      window.location.href = calendlyUrl;
      onSuccess(email);
    } catch (err) {
      console.error("Forensic Handshake Failure:", err);
      setError('TRANSMISSION_FAILURE: ENDPOINT_OFFLINE');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-red-600/30 max-w-md w-full p-8 relative shadow-2xl">
        
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3 text-red-600 uppercase font-black italic tracking-widest text-[10px]">
            <ShieldCheck size={18} />
            <span>SECURE DELIVERY NODE</span>
          </div>
          <div className="text-right">
            <div className="text-[7px] font-mono text-slate-500 uppercase tracking-wider">TX_ID</div>
            <div className="text-[10px] font-mono text-white">{transmissionId}</div>
          </div>
        </div>

        <p className="text-slate-400 mb-8 text-[11px] leading-relaxed uppercase tracking-wider font-mono italic">
          Verification for <span className="text-red-600 font-bold">{result.protocol.replace('_', ' ')}</span> is required.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-700" />
            <input
              type="email"
              value={email}
              onChange={(e) => validateEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 px-10 py-4 text-xs text-white focus:outline-none font-mono"
              placeholder="USER@SECURE-NODE.COM"
              required
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 text-[9px] font-mono uppercase animate-pulse">
              <AlertTriangle size={12} />
              <span>{error}</span>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="w-full bg-red-600 text-white font-black py-5 text-[10px] uppercase tracking-[0.4em] transition-all disabled:opacity-30"
            >
              {isSubmitting ? 'TRANSMITTING...' : 'DECRYPT & TRANSMIT'}
            </button>
            
            <button 
              type="button"
              onClick={onClose}
              className="text-[8px] font-mono text-slate-600 uppercase tracking-widest hover:text-red-600 transition-colors"
            >
              Abort Handshake
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
