/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";
// Only import the specific functions needed
import { stagger, useAnimate } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  speed = 0.2,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  speed?: number;
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");
  
  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(speed),
      }
    );
  }, [scope.current, animate, duration, filter, speed]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="opacity-0"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div>
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
