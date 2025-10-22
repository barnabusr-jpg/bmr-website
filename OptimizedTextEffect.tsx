"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const OptimizedTextEffect = ({
  words,
  className,
  duration = 0.5,
  speed = 0.2,
  delay = 0
}: {
  words: string;
  className?: string;
  duration?: number;
  speed?: number;
  delay?: number;
}) => {
  const [scope, animate] = useAnimate();
  const hasAnimated = useRef(false);
  const wordsArray = words.split(" ");
  
  useEffect(() => {
    // Only animate once
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    
    // Start with all words visible but blurred
    const spans = document.querySelectorAll(`[data-word-effect="${words}"] span`);
    spans.forEach((span, i) => {
      // Use requestAnimationFrame for smoother animation scheduling
      setTimeout(() => {
        animate(
          span,
          { opacity: 1, filter: "blur(0px)" },
          { duration: duration * 0.75, delay: i * speed }
        );
      }, delay);
    });
  }, [animate, words, duration, speed, delay]);

  return (
    <div className={cn("font-bold", className)} data-word-effect={words}>
      <div className="mt-4">
        <div ref={scope} className="flex flex-wrap">
          {wordsArray.map((word, idx) => (
            <motion.span
              key={`${word}-${idx}`}
              className="opacity-100" // Start visible for better LCP
              style={{
                filter: "blur(8px)", // Start blurred but visible
                display: "inline-block",
                marginRight: "0.25em",
                willChange: "filter, opacity" // Performance hint to browser
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
};
