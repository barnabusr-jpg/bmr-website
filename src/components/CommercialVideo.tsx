import { useRef, useState } from "react";
import { Play } from "lucide-react";

type CommercialVideoProps = {
  src: string;
};

export default function CommercialVideo({ src }: CommercialVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (!videoRef.current) return;

    videoRef.current.play();
    setIsPlaying(true);
  };

  return (
    <section className="py-16 px-6 bg-muted/20">
      <div className="container mx-auto max-w-5xl">
        <div className="relative rounded-2xl overflow-hidden border border-border shadow-sm">

          {/* Video Element */}
          <video
            ref={videoRef}
            src={src}
            muted
            playsInline
            preload="metadata"
            className="w-full h-auto"
          />

          {/* Overlay Play Button */}
          {!isPlaying && (
            <button
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition"
              aria-label="Play commercial video"
            >
              <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center">
                <Play className="h-7 w-7 text-black" />
              </div>
            </button>
          )}
        </div>

        {/* Accessibility Note */}
        <p className="text-sm text-muted-foreground text-center mt-4">
          Video is muted by default. Click play to watch.
        </p>
      </div>
    </section>
  );
}
