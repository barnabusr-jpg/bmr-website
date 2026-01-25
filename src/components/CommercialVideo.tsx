import { useRef, useState } from "react";

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
    <section className="py-20 px-6 flex justify-center">
      <div className="relative w-full max-w-5xl rounded-2xl overflow-hidden border border-border shadow-lg">

        {/* Video */}
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          controls={isPlaying}
          className="w-full h-auto"
        />

        {/* Overlay Play Button */}
        {!isPlaying && (
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-lg font-semibold transition hover:bg-black/60"
          >
            Click to Play
          </button>
        )}

        {/* Overlay Unmute Button */}
        {isPlaying && isMuted && (
          <button
            onClick={handleUnmute}
            className="absolute bottom-4 right-4 bg-white text-black px-4 py-2 rounded-lg text-sm font-medium shadow hover:bg-gray-200"
          >
            Enable Sound
          </button>
        )}

        {/* Helper Text */}
        <div className="text-center text-xs text-muted-foreground py-3">
          Video is muted by default. Click “Enable Sound” to hear audio.
        </div>
      </div>
    </section>
  );
};

export default CommercialVideo;
