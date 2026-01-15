"use client";

import { useEffect, useRef, useState, forwardRef } from "react";
import type { ReactNode, Ref, RefObject } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

function setRef<T>(r: Ref<T> | undefined, v: T | null) {
  if (!r) return;
  if (typeof r === "function") r(v);
  else (r as { current: T | null }).current = v;
}

const COLORS = {
  background: "bg-linear-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800",
  container: "bg-neutral-100",
  beam: "bg-linear-to-t from-orange-400 via-orange-300 to-transparent",
  explosionTrail: "bg-linear-to-r from-transparent via-orange-400 to-transparent blur-xs",
  explosionDot: "bg-linear-to-b from-orange-400 to-orange-300",
};

type BeamOptions = {
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

type BackgroundBeamsWithCollisionProps = {
  children?: ReactNode;
  className?: string;
};

export const BackgroundBeamsWithCollision = ({
  children,
  className,
}: BackgroundBeamsWithCollisionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const duration = 8;
  const height = "h-12 sm:h-20";

  const beams: BeamOptions[] = [
    {
      initialX: -600,
      initialY: -400,
      translateX: 1400,
      translateY: 1500,
      rotate: -45,
      duration,
      className: `${height}`,
      delay: 2,
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
        "relative flex items-center w-full justify-start overflow-hidden will-change-transform",
        "h-96 md:h-[40rem]",
        COLORS.background,
        className
      )}
      style={{
        transform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
        perspective: "100px",
      }}
    >
      {beams.map((beam, idx) => (
        <CollisionMechanism
          key={`${beam.initialX ?? 0}-${beam.initialY ?? 0}-${idx}`}
          beamOptions={beam}
          containerRef={containerRef}
          parentRef={parentRef}
        />
      ))}

      {children}

      <div
        ref={containerRef}
        className={cn("absolute bottom-0 w-full inset-x-0 pointer-events-none", COLORS.container)}
        style={{
          boxShadow:
            "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04)",
        }}
      />
    </div>
  );
};

type CollisionMechanismProps = {
  containerRef: RefObject<HTMLDivElement>;
  parentRef: RefObject<HTMLDivElement>;
  beamOptions?: BeamOptions;
};

const CollisionMechanism = forwardRef<HTMLDivElement, CollisionMechanismProps>(
  ({ parentRef, containerRef, beamOptions = {} }, ref) => {
    const beamRef = useRef<HTMLDivElement>(null);

    const [collision, setCollision] = useState<{
      detected: boolean;
      coordinates: { x: number; y: number } | null;
    }>({ detected: false, coordinates: null });

    const [beamKey, setBeamKey] = useState(0);
    const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

    useEffect(() => {
      const checkCollision = () => {
        if (!beamRef.current || !containerRef.current || !parentRef.current) return;
        if (cycleCollisionDetected) return;

        const beamRect = beamRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const parentRect = parentRef.current.getBoundingClientRect();

        // Collision when beam tip reaches container top
        if (beamRect.bottom >= containerRect.top) {
          const relativeX = beamRect.left - parentRect.left + beamRect.width / 2;
          const relativeY = beamRect.bottom - parentRect.top;

          setCollision({
            detected: true,
            coordinates: { x: relativeX, y: relativeY },
          });

          setCycleCollisionDetected(true);
        }
      };

      const animationInterval = setInterval(checkCollision, 50);
      return () => clearInterval(animationInterval);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cycleCollisionDetected, containerRef, parentRef]);

    useEffect(() => {
      if (!collision.detected || !collision.coordinates) return;

      const resetCollision = setTimeout(() => {
        setCollision({ detected: false, coordinates: null });
        setCycleCollisionDetected(false);
      }, 2000);

      const restartBeam = setTimeout(() => {
        setBeamKey((prev) => prev + 1);
      }, 2000);

      return () => {
        clearTimeout(resetCollision);
        clearTimeout(restartBeam);
      };
    }, [collision]);

    const initialX = beamOptions.initialX ?? -400;
    const initialY = beamOptions.initialY ?? -400;
    const translateX = beamOptions.translateX ?? 1400;
    const translateY = beamOptions.translateY ?? 1400;
    const rotate = beamOptions.rotate ?? -45;
    const duration = beamOptions.duration ?? 8;
    const delay = beamOptions.delay ?? 0;
    const repeatDelay = beamOptions.repeatDelay ?? 0;

    return (
      <>
        <motion.div
          key={beamKey}
          ref={(node) => {
            (beamRef as { current: HTMLDivElement | null }).current = node;
            setRef<HTMLDivElement>(ref, node);
          }}
          className={cn(
            "absolute left-0 top-0 w-px rounded-full",
            COLORS.beam,
            beamOptions.className ?? "h-12"
          )}
          style={{
            transformOrigin: "top left",
            willChange: "transform, opacity",
          }}
          initial={{
            x: initialX,
            y: initialY,
            rotate,
            opacity: 0.9,
          }}
          animate={{
            x: translateX,
            y: translateY,
            rotate,
            opacity: [0.9, 0.95, 0.9],
          }}
          transition={{
            duration,
            ease: "linear",
            delay,
            repeat: Infinity,
            repeatDelay,
          }}
        />

        <AnimatePresence>
          {collision.detected && collision.coordinates && (
            <motion.div
              className="pointer-events-none absolute"
              style={{
                left: collision.coordinates.x,
                top: collision.coordinates.y,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              {/* Explosion dot */}
              <motion.div
                className={cn("h-2 w-2 rounded-full", COLORS.explosionDot)}
                initial={{ scale: 0.8 }}
                animate={{ scale: [0.8, 1.4, 1] }}
                transition={{ duration: 0.35 }}
              />
              {/* Explosion trail */}
              <motion.div
                className={cn("mt-1 h-px w-16", COLORS.explosionTrail)}
                initial={{ opacity: 0, scaleX: 0.3 }}
                animate={{ opacity: [0, 1, 0], scaleX: [0.3, 1, 1.2] }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }
);

CollisionMechanism.displayName = "CollisionMechanism";
