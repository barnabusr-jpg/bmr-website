"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";  // etc.

function setRef<T>(r: React.Ref<T> | undefined, v: T | null) {
  if (!r) return;
  if (typeof r === "function") r(v);
  else (r as React.MutableRefObject<T | null>).current = v;
}
// Add COLORS constant with color definitions
const COLORS = {
  background: "bg-linear-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800",
  container: "bg-neutral-100",
  beam: "bg-linear-to-t from-orange-400 via-orange-300 to-transparent",
  explosionTrail: "bg-linear-to-r from-transparent via-orange-400 to-transparent blur-xs",
  explosionDot: "bg-linear-to-b from-orange-400 to-orange-300"
};

export const BackgroundBeamsWithCollision = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const duration = 8;
  const height = "h-12 sm:h-20";
  const beams = [
    {
      initialX: -600,
      initialY: -400,
      translateX: 1400,
      translateY: 1500,
      rotate: -45,
      duration,
      className: `${height}`,
    },
    {
      initialX: -400,
      initialY: -400,
      translateX: 1400,
      translateY: 1400,
      rotate: -45,
      duration,
      className: `${height}`,
      delay: 5,
    },
    {
      initialX: 0,
      initialY: -300,
      translateX: 1600,
      translateY: 1300,
      rotate: -45,
      duration,
      className: `${height}`,
      delay: 0,

    },
    {
      initialX: 200,
      initialY: -500,
      translateX: 2300,
      translateY: 1500,
      rotate: -45,
      duration,
      className: `${height}`,
      delay: 2,
    },

  ];

  return (
    <div
      ref={parentRef}
      className={cn(
        "h-96 md:h-[40rem]",
        COLORS.background,
        "relative flex items-center w-full justify-start overflow-hidden will-change-transform",
        // h-screen if you want bigger
        className
      )}
      style={{
        transform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
        perspective: "100px"
      }}
    >
      {beams.map((beam) => (
        <CollisionMechanism
          key={beam.initialX + "beam-idx"}
          beamOptions={beam}
          containerRef={containerRef}
          parentRef={parentRef}
        />
      ))}

      {children}
      <div
        ref={containerRef}
        className={cn(
          "absolute bottom-0 w-full inset-x-0 pointer-events-none",
          COLORS.container
        )}
        style={{
          boxShadow:
            "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
        }}
      ></div>
    </div>
  );
};

const CollisionMechanism = React.forwardRef<
  HTMLDivElement,
  {
    containerRef: React.RefObject<HTMLDivElement | null>;
    parentRef: React.RefObject<HTMLDivElement | null>;
    beamOptions?: {
      initialX?: number;
      translateX?: number;
      initialY?: number;
      translateY?: number;
      rotate?: number;
      className?: string;
      duration?: number;
      delay?: number;
      repeatDelay?: number;
    };
>(({ parentRef, containerRef, beamOptions = {} }, ref) => {
  const beamRef = useRef<HTMLDivElement>(null);
  const [collision, setCollision] = useState<{
    detected: boolean;
    coordinates: { x: number; y: number } | null;
  }>({
    detected: false,
    coordinates: null,
  });
  const [beamKey, setBeamKey] = useState(0);
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

  useEffect(() => {
    const checkCollision = () => {
      if (
        beamRef.current &&
        containerRef.current &&
        parentRef.current &&
        !cycleCollisionDetected
      ) {
        const beamRect = beamRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const parentRect = parentRef.current.getBoundingClientRect();

        if (beamRect.bottom >= containerRect.top) {
          const relativeX =
            beamRect.left - parentRect.left + beamRect.width / 2;
          const relativeY = beamRect.bottom - parentRect.top;

          setCollision({
            detected: true,
            coordinates: {
              x: relativeX,
              y: relativeY,
            },
          });
          setCycleCollisionDetected(true);
        }
      }
    };

    const animationInterval = setInterval(checkCollision, 50);

    return () => clearInterval(animationInterval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cycleCollisionDetected, containerRef]);

  useEffect(() => {
    if (collision.detected && collision.coordinates) {
      setTimeout(() => {
        setCollision({ detected: false, coordinates: null });
        setCycleCollisionDetected(false);
      }, 2000);

      setTimeout(() => {
        setBeamKey((prevKey) => prevKey + 1);
      }, 2000);
    }
  }, [collision]);

  return (
    <>
      <motion.div
        key={beamKey}
        ref={(node) => {
  (beamRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
  setRef<HTMLDivElement>(ref, node);
}}
        animate="animate"
        initial={{
          translateY: `${beamOptions.initialY || -200}px`,
          translateX: `${beamOptions.initialX || 0}px`,
          rotate: beamOptions.rotate || 0,
        }}
        variants={{
          animate: {
            translateY: `${beamOptions.translateY || 1800}px`,
            translateX: `${beamOptions.translateX || 0}px`,
            rotate: beamOptions.rotate || 0,
          },
        }}
        transition={{
          duration: beamOptions.duration || 8,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          delay: beamOptions.delay || 0,
          repeatDelay: beamOptions.repeatDelay || 0,
        }}
        className={cn(
          "absolute left-0 top-20 m-auto h-20 w-px rounded-full",
          COLORS.beam,
          "will-change-transform",
          beamOptions.className
        )}
        style={{
          transform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden"
        }}
      />
      <AnimatePresence>
        {collision.detected && collision.coordinates && (
          <Explosion
            key={`${collision.coordinates.x}-${collision.coordinates.y}`}
            className=""
            style={{
              left: `${collision.coordinates.x}px`,
              top: `${collision.coordinates.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
});

CollisionMechanism.displayName = "CollisionMechanism";

const Explosion = ({ ...props }: React.HTMLProps<HTMLDivElement>) => {
  const spans = Array.from({ length: 15 }, (_, index) => ({
    id: index,
    initialX: 50,
    initialY: 0,
    directionX: Math.floor(Math.random() * 80 - 40),
    directionY: Math.floor(Math.random() * -50 - 10),
  }));

  return (
    <div {...props} className={cn("absolute z-50 h-2 w-2", props.className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className={cn(
          "absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full",
          COLORS.explosionTrail
        )}
      ></motion.div>
      {spans.map((span) => (
        <motion.span
          key={span.id}
          initial={{ x: span.initialX, y: span.initialY, opacity: 1 }}
          animate={{
            x: span.directionX,
            y: span.directionY,
            opacity: 0,
          }}
          transition={{ duration: Math.random() * 1.5 + 0.5, ease: "easeOut" }}
          className={cn("absolute h-1 w-1 rounded-full", COLORS.explosionDot)}
        />
      ))}
    </div>
  );
};
