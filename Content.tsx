"use client";
import { TextGenerateEffect } from "@/components/common/TextGenerateEffect";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import React from "react";

export default function HomeSection1Content() {
  return (
    <div className="relative flex items-center justify-center pt-6 pb-10 sm:pt-20 sm:pb-[90px] w-full">
      <div className="relative z-10 text-start px-4 md:px-6 w-full mx-auto max-w-[1300px]">
        {/* Use proper heading structure - h1 for main page heading */}
        <motion.div
          layout
          className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <h1 aria-label="Build and launch in minutes, not days">
            <TextGenerateEffect
              duration={0.3}
              speed={0.05}
              className="text-4xl  sm:text-5xl md:text-6xl lg:text-[62px] lg:leading-[100%] tracking-tight text-[var(--foreground)]"
              words="Build and launch"
            />
          </h1>
        </motion.div>

        <motion.div
          layout
          className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <TextGenerateEffect
            duration={0.5}
            speed={0.2}
            className="text-4xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[62px] lg:leading-[70%] mb-4 sm:mb-6 tracking-tight text-[var(--foreground)]"
            words="in minutes, not days."
          />
        </motion.div>

        <motion.p
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-full sm:max-w-[660px] text-base xs:text-lg md:text-xl text-neutral-700 dark:text-neutral-300 mb-6 sm:mb-8"
        >
          Our platform accelerates development with powerful tools that let you
          build and deploy professional websites with unprecedented speed.
        </motion.p>

        <div
          className="mt-6 sm:mt-8 flex flex-col xs:flex-row gap-3 sm:gap-4 justify-start w-full"
        >
          <Button variant="default" aria-label="Get started with our platform">
            Get Started
          </Button>

          <Button variant="outline" aria-label="Learn more about our features">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}
