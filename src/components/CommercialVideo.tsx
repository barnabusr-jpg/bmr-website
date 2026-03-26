import { useRef, useState } from "react";
import { Play, Volume2, ShieldAlert } from "lucide-react";

const CommercialVideo = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handlePlay = () => {
    if (!videoRef.current) return;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const handleUnmute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = false;
    setIsMuted(false);
  };

  return (
    <section className="py-32 bg-slate-950 relative overflow-hidden flex flex-col items-center border-y border-slate-900">
      {/* HARDENED SYSTEM GRID: Replacing Teal with Slate-800 */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)`,
          backgroundSize: '30px 30px' 
        }}
      />

      {/* NARRATIVE HEADER: PURGING TEAL */}
      <div className="container mx-auto px-6 relative z-10 text-center mb-20">
        <div className="flex items-center justify-center gap-3 mb-6">
          <ShieldAlert className="text-red-600 h-4 w-4" />
          <span className="text-red-600 font-mono text-[10px] uppercase tracking-[0.5em] font-bold">
            FORENSIC VISUALIZATION // V.01
          </span>
        </div>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-8 uppercase italic leading-none">
          THE <span className="text-red-600">PROMISE GAP™</span>
        </h2>
        <p className="text-lg text-slate-400 font-light leading-relaxed max-w-2xl mx-auto italic">
          This observation tracks invisible system layers as friction becomes drift. 
          The sequence terminates where behavior remains unresolved 
          and systemic balance is not reached.
        </p>
      </div>

      <div className="relative w-full max-w-6xl px-6 z-10">
        <div className="relative rounded-none overflow-hidden border border-slate-900 bg-black shadow-2xl">
          
          {/* VIDEO ELEMENT: ADDING GRAYSCALE TO KILL TEAL SOURCE DATA */}
          <video
            ref={videoRef}
            src={src}
            muted
            playsInline
            controls={isPlaying}
            className={`w-full h-auto aspect-video object-cover transition-all duration-1000 ${
              !isPlaying ? 'grayscale opacity-40 scale-105' : 'grayscale-[0.5] opacity-100 scale-100'
            }`}
          />

          {/* CINEMATIC OVERLAY: REDESIGNED FOR BMR SOLUTIONS */}
          {!isPlaying && (
            <button
              onClick={handlePlay}
              className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/60 text-white transition-all duration-500 hover:bg-red-600/10 group"
            >
              <div className="h-24 w-24 rounded-none border border-red-600/50 flex items-center justify-center mb-6 transition-all group-hover:border-red-600 group-hover:bg-red-600">
                <Play className="fill-white text-white ml-1 group-hover:scale-110 transition-transform" size={32} />
              </div>
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white border-b border-red-600 pb-2">
                INITIATE OBSERVATION
              </span>
            </button>
          )}

          {/* UNMUTE BUTTON: HARDENED RED */}
          {isPlaying && isMuted && (
            <button
              onClick={handleUnmute}
              className="absolute bottom-8 right-8 bg-red-600 text-white px-6 py-3 rounded-none text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-white hover:text-red-600 transition-all flex items-center gap-3 border border-red-500/50"
            >
              <Volume2 size={14} /> ENABLE SYSTEM AUDIO
            </button>
          )}

          {/* SCANLINE EFFECT */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-20 bg-[length:100%_2px,3px_100%]" />
        </div>

        {/* FOOTER HELPER TEXT: NO CONTRACTIONS */}
        <div className="flex justify-between items-center py-8">
          <div className="text-[9px] font-mono text-slate-700 uppercase tracking-widest italic font-bold">
            DATA_STREAM: [ENCRYPTED] // STABILITY: 44%
          </div>
          <div className="text-[9px] font-mono text-slate-700 uppercase tracking-widest italic font-bold">
            SYSTEM AUDIO IS MUTED BY DEFAULT FOR INITIAL OBSERVATION.
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommercialVideo;
