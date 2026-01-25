import { motion } from "framer-motion";
import { useState } from "react";
import { Play } from "lucide-react";

type CommercialVideoProps = {
  src: string;
};

const CommercialVideo = ({ src }: CommercialVideoProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-24 px-6 bg-muted/20">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl font-bold mb-4">
            See BMR in Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A short introduction to how we observe system behavior, surface
            exposure, and support defensible AI leadership decisions.
          </p>
        </motion.div>

        {/* Video Block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden border shadow-lg bg-black"
        >
          <video
            className="w-full h-auto"
            src={src}
            controls={isPlaying}
            muted
            playsInline
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
          />

          {/* Overlay Play Button */}
          {!isPlaying && (
            <button
              onClick={() => {
                const video = document.querySelector("video");
                video?.play();
                setIsPlaying(true);
              }}
              className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition"
              aria-label="Play video"
            >
              <div className="h-20 w-20 rounded-full bg-white/90 flex items-center justify-center">
                <Play className="h-8 w-8 text-black ml-1" />
              </div>
            </button>
          )}
        </motion.div>

        {/* Accessibility Note */}
        <p className="text-sm text-muted-foreground text-center mt-4">
          Video is muted by default. Click play to enable viewing.
        </p>
      </div>
    </section>
  );
};

export default CommercialVideo;
