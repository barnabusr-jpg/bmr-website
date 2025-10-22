"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconChevronDown } from '@tabler/icons-react';
import { cn } from "@/lib/utils";
import { FaqCategory } from "./data";

interface FaqItemProps {
  question: string;
  answer: string;
  category: FaqCategory;
  index: number;
}

export default function FaqItem({ question, answer, category, index }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
      className={cn(
        "rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        isOpen ? "bg-white dark:bg-neutral-800/50 shadow-sm" : "bg-white/50 dark:bg-neutral-900/50"
      )}
    >
      {/* Question header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full p-4 sm:p-6 text-left"
      >
        <h3 className="font-medium text-base sm:text-lg text-neutral-900 dark:text-white pr-2">
          {question}
        </h3>
        <span className="flex items-center ml-2 sm:ml-4 flex-shrink-0">
          {/* Category badge */}
          <span className="hidden sm:block text-xs px-2 py-1 rounded-full mr-3 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
            {category}
          </span>

          {/* Toggle icon - smoother animation */}
          <motion.div 
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex items-center justify-center h-6 w-6 rounded-full bg-neutral-100 dark:bg-neutral-800"
          >
            <IconChevronDown className="h-3.5 w-3.5 text-neutral-600 dark:text-neutral-400 cursor-pointer" />
          </motion.div>
        </span>
      </button>

      {/* Answer content - smoother animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0">
              <div className="h-px bg-neutral-200 dark:bg-neutral-700 mb-3 sm:mb-4" />
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">{answer}</p>
              <div className="block sm:hidden mt-3 text-xs px-2 py-1 rounded-full w-fit bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                {category}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
