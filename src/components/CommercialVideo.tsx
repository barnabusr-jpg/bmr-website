import { useRef, useState } from "react";
import { Play, Volume2 } from "lucide-react"; // Added for professional UI signals

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
    <section className="py-24 bg-[#020617] relative overflow-hidden flex flex-col items-center">
      {/* Subtle Background System Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(#14b8a6 1px, transparent 1px), linear-gradient(90deg, #14b8a6 1px, transparent 1px)`,
          backgroundSize: '40px 40px' 
        }}
      />

      {/* Methodological Header */}
      <div className="container mx-auto px-6 relative z-10 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
          Visualizing the <span className="text-[#14b8a6]">Promise Gap™</span>
        </h2>
        <p className="text-xl text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
          An observation of invisible system layers, identifying where 
          friction becomes drift and instability becomes risk.
        </p>
      </div>

      <div className="relative w-full max-w-5xl px-6 z-10">
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-black shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          
          {/* Video Element */}
          <video
            ref={videoRef}
            src={src}
            muted
            playsInline
            controls={isPlaying}
            className="w-full h-auto aspect-video object-cover"
          />

          {/* Cinematic Overlay Play Button */}
          {!isPlaying && (
            <button
              onClick={handlePlay}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white transition-all duration-500 hover:bg-black/40 group"
            >
              <div className="h-20 w-20 rounded-full border-2 border-[#14b8a6] flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                <Play className="fill-[#14b8a6] text-[#14b8a6] ml-1" size={32} />
              </div>
              <span className="text-sm font-bold tracking-[0.3em] uppercase text-[#14b8a6]">
                Observe System Behavior
              </span>
            </button>
          )}

          {/* Enable Sound Button */}
          {isPlaying && isMuted && (
            <button
              onClick={handleUnmute}
              className="absolute bottom-6 right-6 bg-[#14b8a6] text-[#020617] px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl hover:bg-[#0d9488] transition-colors flex items-center gap-2"
            >
              <Volume2 size={16} /> Enable Audio
            </button>
          )}
        </div>

        {/* Muted Notification Polish */}
        <div className="text-center text-[10px] text-slate-600 uppercase tracking-[0.2em] py-6">
          System audio is muted by default for initial observation.
        </div>
      </div>
    </section>
  );
};

export default CommercialVideo;
