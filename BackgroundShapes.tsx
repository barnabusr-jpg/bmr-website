"use client";
import React from "react";

export const BackgroundShapes = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 grid   h-[calc(100vh-230px)] top-[0vh] w-full rotate-[32deg]  select-none grid-cols-2 gap-10 md:grid-cols-4">
      {/* Column 1 */}
      <div className="relative h-full w-full">
        <div
          className="absolute top-[-75px] h-[calc(100%+150px)] w-[1px] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2),rgba(0,0,0,0.2)_50%,transparent_0,transparent)] bg-[length:1px_5px] z-30 left-0 dark:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.3),rgba(255,255,255,0.3)_50%,transparent_0,transparent)]"
          style={{
            mask: "linear-gradient(to top, #ffffff 90%, transparent), linear-gradient(to bottom, #ffffff 90%, transparent), linear-gradient(black, black)",
            maskComposite: "exclude"
          }}
        ></div>
        <div
          className="absolute top-[-75px] h-[calc(100%+150px)] w-[1px] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2),rgba(0,0,0,0.2)_50%,transparent_0,transparent)] bg-[length:1px_5px] z-30 left-auto right-0 dark:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.3),rgba(255,255,255,0.3)_50%,transparent_0,transparent)]"
          style={{
            mask: "linear-gradient(to top, #ffffff 90%, transparent), linear-gradient(to bottom, #ffffff 90%, transparent), linear-gradient(black, black)",
            maskComposite: "exclude"
          }}
        ></div>
      </div>

      {/* Column 2 */}
      <div className="relative h-full w-full">
        <div
          className="absolute top-[-75px] h-[calc(100%+150px)] w-[1px] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2),rgba(0,0,0,0.2)_50%,transparent_0,transparent)] bg-[length:1px_5px] z-30 left-0 dark:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.3),rgba(255,255,255,0.3)_50%,transparent_0,transparent)]"
          style={{
            mask: "linear-gradient(to top, #ffffff 90%, transparent), linear-gradient(to bottom, #ffffff 90%, transparent), linear-gradient(black, black)",
            maskComposite: "exclude"
          }}
        ></div>
        <div
          className="absolute top-[-75px] h-[calc(100%+150px)] w-[1px] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2),rgba(0,0,0,0.2)_50%,transparent_0,transparent)] bg-[length:1px_5px] z-30 left-auto right-0 dark:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.3),rgba(255,255,255,0.3)_50%,transparent_0,transparent)]"
          style={{
            mask: "linear-gradient(to top, #ffffff 90%, transparent), linear-gradient(to bottom, #ffffff 90%, transparent), linear-gradient(black, black)",
            maskComposite: "exclude"
          }}
        ></div>
      </div>

      {/* Column 3 - with improved gradient */}
      <div className="relative h-full w-full">
        {/* Gradient container with better scroll behavior */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-neutral-100 to-transparent dark:via-neutral-800 will-change-transform backface-visibility-hidden transform-gpu"></div>
        <div
          className="absolute top-[-75px] h-[calc(100%+150px)] w-[1px] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2),rgba(0,0,0,0.2)_50%,transparent_0,transparent)] bg-[length:1px_5px] z-30 left-0 dark:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.3),rgba(255,255,255,0.3)_50%,transparent_0,transparent)]"
          style={{
            mask: "linear-gradient(to top, #ffffff 90%, transparent), linear-gradient(to bottom, #ffffff 90%, transparent), linear-gradient(black, black)",
            maskComposite: "exclude"
          }}
        ></div>
        <div
          className="absolute top-[-75px] h-[calc(100%+150px)] w-[1px] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2),rgba(0,0,0,0.2)_50%,transparent_0,transparent)] bg-[length:1px_5px] z-30 left-auto right-0 dark:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.3),rgba(255,255,255,0.3)_50%,transparent_0,transparent)]"
          style={{
            mask: "linear-gradient(to top, #ffffff 90%, transparent), linear-gradient(to bottom, #ffffff 90%, transparent), linear-gradient(black, black)",
            maskComposite: "exclude"
          }}
        ></div>
      </div>

      {/* Column 4 */}
      <div className="relative h-full w-full">
        <div
          className="absolute top-[-75px] h-[calc(100%+150px)] w-[1px] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2),rgba(0,0,0,0.2)_50%,transparent_0,transparent)] bg-[length:1px_5px] z-30 left-0 dark:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.3),rgba(255,255,255,0.3)_50%,transparent_0,transparent)]"
          style={{
            mask: "linear-gradient(to top, #ffffff 90%, transparent), linear-gradient(to bottom, #ffffff 90%, transparent), linear-gradient(black, black)",
            maskComposite: "exclude"
          }}
        ></div>
        <div
          className="absolute top-[-75px] h-[calc(100%+150px)] w-[1px] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2),rgba(0,0,0,0.2)_50%,transparent_0,transparent)] bg-[length:1px_5px] z-30 left-auto right-0 dark:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.3),rgba(255,255,255,0.3)_50%,transparent_0,transparent)]"
          style={{
            mask: "linear-gradient(to top, #ffffff 90%, transparent), linear-gradient(to bottom, #ffffff 90%, transparent), linear-gradient(black, black)",
            maskComposite: "exclude"
          }}
        ></div>
      </div>
    </div>
  );
};