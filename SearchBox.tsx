"use client";

import { IconSearch } from '@tabler/icons-react';
import { motion } from "motion/react";

interface SearchBoxProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function SearchBox({ searchQuery, setSearchQuery }: SearchBoxProps) {
  return (
    <motion.div 
      className="w-full max-w-lg mx-auto"
      initial={{ opacity: 0, y: 5 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <input
          type="text"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 sm:py-3 pl-10 sm:pl-12 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm sm:text-base text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <IconSearch className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-400 dark:text-neutral-500" />
        </div>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors duration-200"
          >
            <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </motion.div>
  );
}
