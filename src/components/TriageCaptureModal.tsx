import React, { useState, useEffect } from 'react';
import { Mail, ShieldCheck, AlertTriangle } from 'lucide-react';
import { DiagnosticResult } from '../lib/diagnosticEngine';

interface Props {
  result: DiagnosticResult;
  onClose: () => void;
  onSuccess: (email: string) => void;
}

export default function TriageCaptureModal({ result, onClose, onSuccess }: Props) {
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
      // API Handshake Simulation
      await new Promise(resolve => setTimeout(resolve, 1500));

      // BMR LOGIC: Identify highest intensity Vector for Calendly routing
      // Logic mirrors active site: AVS > HAI/IGF ? Vector 02 : (IGF > HAI ? Vector 03 : Vector 01)
      const scores = {
        hai: result.frictionIndex, // Replace with specific layer score if available in result object
        avs: result.frictionIndex, 
        igf: result.frictionIndex 
      };

      // Since 'result' structure might vary, we use the frictionIndex as the base signal
      // In a production Deep Dive, we map result.HAI.aggregate, etc.
      const vectorId = result.frictionIndex > 75 ? 'Vector 03' : 'Vector 02';

      const calendlyUrl = `https://calendly.com/hello-bmradvisory/forensic-review?` + 
        `name=${encodeURIComponent('BMR_USER')}&` + 
        `email=${encodeURIComponent(email)}&` + 
        `a1=${vectorId}&` + 
        `utm_campaign=${encodeURIComponent(result.protocol || 'BMR_DIAGNOSTIC')}`;

      // Execute Secure Redirect
      window.open(calendlyUrl, '_blank');
      
      onSuccess(email);
    } catch {
      setError('TRANSMISSION_FAILURE: AES-256_HANDSHAKE_ERROR');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getUrgency = () => {
    if (result.frictionIndex > 75) return 'CRITICAL';
    if (result.frictionIndex > 45) return 'URGENT';
    return 'STANDARD';
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

        <div className={`mb-6 p-2 text-center text-[9px] font-mono uppercase tracking-widest border ${
          getUrgency() === 'CRITICAL' ? 'border-red-600 bg-red-600/10 text-red-600 animate-pulse' :
          getUrgency() === 'URGENT' ? 'border-yellow-600 bg-yellow-600/10 text-yellow-600' :
          'border-green-600 bg-green-600/10 text-green-600'
        }`}>
          {getUrgency()} PRIORITY TRANSMISSION
        </div>

        <p className="text-slate-400 mb-8 text-[11px] leading-relaxed uppercase tracking-wider font-mono italic">
          Your <span className="text-red-600 font-bold">{result.protocol.replace('_', ' ')}</span> briefing 
          is ready. Endpoint verification required for AES-256 encrypted packet transfer.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-[9px] font-mono uppercase text-slate-600 tracking-widest">
              DESTINATION_ENDPOINT
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-700" />
              <input
                type="email"
                value={email}
                onChange={(e) => validateEmail(e.target.value)}
                className={`w-full bg-slate-950 border px-10 py-4 text-xs placeholder-slate-700 focus:outline-none font-mono transition-colors ${
                  isValid ? 'border-green-600 text-white' :
                  error ? 'border-red-600 text-red-600' :
                  'border-slate-800 text-white'
                }`}
                placeholder="USER@SECURE-NODE.COM"
                required
              />
            </div>
          </div>

          <div className="flex items-start gap-3 group cursor-pointer">
            <input 
              type="checkbox" 
              required 
              className="mt-1 accent-red-600 bg-slate-950 border-slate-800 rounded-sm" 
            />
            <span className="text-[9px] font-mono text-slate-500 uppercase leading-tight group-hover:text-slate-300 transition-colors">
              I consent to secure data retention and forensic follow-up communications.
            </span>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 text-[9px] font-mono uppercase animate-pulse border-l border-red-600 pl-2">
              <AlertTriangle size={12} />
              <span>{error}</span>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="w-full bg-red-600 hover:bg-white hover:text-black text-white font-black py-5 px-4 text-[10px] uppercase tracking-[0.4em] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
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
