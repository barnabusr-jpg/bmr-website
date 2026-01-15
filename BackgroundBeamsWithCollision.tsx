"use client";

import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Lightweight ref setter that works with both callback refs and RefObject refs.
 */
function setRef<T>(ref: React.Ref<T> | undefined, value: T | null) {
  if (!ref) return;
  if (typeof ref === "function") {
    ref(value);
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (ref as any).current = value;
}

const COLORS = {
  background:
    "bg-linear-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800",
  container: "bg-neutral-100",
  beam: "bg-linear-to-r from-orange-400 via-orange-300 to-transparent",
  explosionTrail:
    "bg-linear-to-r from-transparent via-orange-400 to-transparent blur-xs",
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

type Collision = {
  detected: boolean;
  coordinates: { x: number; y: number } | null;
};

type CollisionMechanismProps = {
  containerRef: RefObject<HTMLDivElement>;
  parentRef: RefObject<HTMLDivElement>;
  beamOptions?: BeamOptions;
};

const CollisionMechanism = forwardRef<HTMLDivElement, CollisionMechanismProps>(
  function CollisionMechanism(
    { parentRef, containerRef, beamOptions = {} },
    ref
  ) {
    const beamRef = useRef<HTMLDivElement | null>(null);

    const [collision, setCollision] = useState<Collision>({
      detected: false,
      coordinates: null,
    });

    const [beamKey, setBeamKey] = useState(0);
    const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

    const {
      initialX = -400,
      translateX = 1600,
      initialY = -300,
      translateY = 1500,
      rotate = -45,
      className = "",
      duration = 8,
      delay = 0,
      repeatDelay = 0,
    } = beamOptions;

    useEffect(() => {
      const checkCollision = () => {
        if (
          !beamRef.current ||
          !containerRef.current ||
          !parentRef.current ||
          cycleCollisionDetected
        ) {
          return;
        }

        const beamRect = beamRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const parentRect = parentRef.current.getBoundingClientRect();

        // "Collision" when the beam reaches the top edge of container overlay area
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

      const animationInterval = window.setInterval(checkCollision, 50);
      return () => window.clearInterval(animationInterval);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cycleCollisionDetected, containerRef, parentRef]);

    useEffect(() => {
      if (collision.detected && collision.coordinates) {
        const resetCollision = window.setTimeout(() => {
          setCollision({ detected: false, coordinates: null });
          setCycleCollisionDetected(false);
        }, 2000);

        const resetBeam = window.setTimeout(() => {
          setBeamKey((prevKey) => prevKey + 1);
        }, 2000);

        return () => {
          window.clearTimeout(resetCollision);
          window.clearTimeout(resetBeam);
        };
      }
      return;
    }, [collision]);

    return (
      <>
        <motion.div
          key={beamKey}
          ref={(node) => {
            beamRef.current = node;
            setRef(ref, node);
          }}
          className={cn(
            "absolute left-0 top-0 h-px w-[220px] origin-left",
            COLORS.beam,
            className
          )}
          style={{
            transform: `translate3d(${initialX}px, ${initialY}px, 0) rotate(${rotate}deg)`,
          }}
          animate={{
            x: translateX,
            y: translateY,
          }}
          transition={{
            duration,
            delay,
            ease: "linear",
            repeat: Infinity,
            repeatDelay,
          }}
        />

        {collision.detected && collision.coordinates && (
          <div
            className="pointer-events-none absolute left-0 top-0"
            style={{
              transform: `translate3d(${collision.coordinates.x}px, ${collision.coordinates.y}px, 0)`,
            }}
          >
            {/* Explosion dot */}
            <div
              className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2 rounded-full",
                COLORS.explosionDot
              )}
              style={{ width: 10, height: 10 }}
            />

            {/* Explosion trail */}
            <div
              className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2 rounded-full",
                COLORS.explosionTrail
              )}
              style={{
                width: 140,
                height: 2,
              }}
            />
          </div>
        )}
      </>
    );
  }
);

export const BackgroundBeamsWithCollision = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);

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
      delay: 0,
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
          key={`${idx}-${beam.initialX ?? 0}-${beam.initialY ?? 0}`}
          beamOptions={beam}
          containerRef={containerRef as RefObject<HTMLDivElement>}
          parentRef={parentRef as RefObject<HTMLDivElement>}
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
            "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04)",
        }}
      />
    </div>
  );
};
