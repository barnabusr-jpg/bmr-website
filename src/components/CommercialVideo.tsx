import { useRef, useState } from "react"; // Removed 'useEffect' to fix build error
import { Play, Volume2, ShieldAlert, AlertCircle } from "lucide-react";

const CommercialVideo = ({ src, poster }: { src: string; poster?: string }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handlePlay = () => {
    if (!videoRef.current) return;
    videoRef.current.play().catch(() => setError("SIGNAL_INTERRUPTED"));
    setIsPlaying(true);
  };

  const handleUnmute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = false;
    setIsMuted(false);
  };

  return (
    <section className="py-32 bg-slate-950 relative overflow-hidden flex flex-col items-center border-y border-slate-900">
      {/* HUD Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)`,
          backgroundSize: '30px 30px' 
        }}
      />

      <div className="container mx-auto px-6 relative z-10 text-center mb-20">
        <div className="flex items-center justify-center gap-3 mb-6">
          <ShieldAlert className="text-red-600 h-4 w-4" />
          <span className="text-red-600 font-mono text-[10px] uppercase tracking-[0.5em] font-bold">
            FORENSIC DOCUMENTATION // PROTOCOL V.3.2
          </span>
        </div>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-8 uppercase italic leading-none">
          THE <span className="text-red-600">PROMISE GAP™</span>
        </h2>
        <p className="text-lg text-slate-400 font-light leading-relaxed max-w-2xl mx-auto italic">
          This forensic visualization documents invisible system layers as operational friction crystallizes into systemic drift. 
          The sequence terminates where behavior remains unresolved and operational equilibrium is not reached.
        </p>
      </div>

      <div className="relative w-full max-w-6xl px-6 z-10">
        <div className="relative rounded-none overflow-hidden border border-slate-900 bg-black">
          
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            preload="metadata"
            muted
            playsInline
            controls={isPlaying}
            className={`w-full h-auto aspect-video object-cover transition-all duration-1000 ${
              !isPlaying ? 'grayscale-[0.7] opacity-60' : 'grayscale-[0.4] opacity-100'
            }`}
          />

          {!isPlaying && !error && (
            <button
              onClick={handlePlay}
              aria-label="Initiate Observation"
              className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 text-white transition-all duration-500 hover:bg-red-600/5 group"
            >
              <div className="h-24 w-24 rounded-none border border-red-600/30 flex items-center justify-center mb-6 transition-all group-hover:border-red-600 group-hover:bg-red-600">
                <Play className="fill-white text-white ml-1 group-hover:scale-110 transition-transform" size={32} />
              </div>
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white border-b border-red-600 pb-2">
                INITIATE DOCUMENTATION PHASE
              </span>
            </button>
          )}

          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 text-red-600 font-mono">
              <AlertCircle className="mb-4 h-12 w-12" />
              <span className="text-xs uppercase tracking-[0.3em]">ERROR: {error}</span>
            </div>
          )}

          {isPlaying && isMuted && (
            <button
              onClick={handleUnmute}
              className="absolute bottom-8 right-8 bg-red-600 text-white px-6 py-3 rounded-none text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-red-600 transition-all border border-red-500/50"
            >
              <Volume2 size={14} className="inline mr-2" /> ENABLE SYSTEM AUDIO
            </button>
          )}

          {/* HUD Scanline Effect */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] z-20" />
        </div>

        <div className="flex justify-between items-center py-8 font-mono text-[9px] text-slate-700 uppercase tracking-widest font-bold">
          <div>DATA_ENCRYPTION: AES-256 // STABILITY_INDEX: 44.7</div>
          <div>SYSTEM AUDIO IS MUTED BY DEFAULT FOR INITIAL DOCUMENTATION.</div>
        </div>
      </div>
    </section>
  );
};

export default CommercialVideo;
