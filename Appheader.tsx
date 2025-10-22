"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, User, Mail, Settings2, LogOut } from "lucide-react";
import { motion, easeOut } from "framer-motion";

type Route = string;

export default function AppHeader({ currentRoute }: { currentRoute: Route }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const initialAnimation = {
    opacity: 0,
    scale: 1.3,
    filter: "blur(105px) opacity(0)",
    x: 520,
    y: -150,
    transformPerspective: 500,
  };

  const animateTo = { opacity: 1, scale: 1, filter: "blur(0px) opacity(1)", x: 0, y: 0 };
  const transitionProps = { delay: 0.7, duration: 0.9, ease: easeOut };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    }
    if (isUserDropdownOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isUserDropdownOpen]);

  return (
    <motion.header
      style={{ transformStyle: "preserve-3d", zIndex: "1" }}
      initial={initialAnimation}
      animate={animateTo}
      transition={transitionProps}
    >
      <div className="h-16 border-b rounded-tr-lg border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-white dark:bg-black py-4 px-6">
        <h2 className="text-xl font-semibold capitalize text-neutral-900 dark:text-white">
          {currentRoute}
        </h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search deployments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-72 h-10 pl-10 pr-4 py-2 rounded-md bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors outline-hidden text-neutral-900 dark:text-white"
              aria-label="Search deployments"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" size={16} />
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              className="flex items-center gap-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-full p-1 transition-colors"
              aria-haspopup="true"
              aria-expanded={isUserDropdownOpen}
              aria-label="User account menu"
            >
              <div className="h-9 w-9 rounded-full border-2 border-neutral-300 dark:border-neutral-600 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
                <span className="text-sm font-medium text-neutral-800 dark:text-neutral-100">JD</span>
              </div>
              <ChevronDown
                size={16}
                className={`transition-transform text-neutral-700 dark:text-neutral-300 ${isUserDropdownOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>

            {isUserDropdownOpen && (
              <div className="absolute right-0 z-50 mt-2 w-48 bg-white dark:bg-neutral-900 rounded-md shadow-lg border border-neutral-200 dark:border-neutral-700 py-1" role="menu" aria-label="User menu">
                <div className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700">
                  <div className="font-medium text-neutral-900 dark:text-white">John Doe</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">john@example.com</div>
                </div>
                <div className="py-1">
                  <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800" role="menuitem">
                    <User size={16} /> Profile
                  </button>
                  <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800" role="menuitem">
                    <Mail size={16} /> Messages
                  </button>
                  <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800" role="menuitem">
                    <Settings2 size={16} /> Settings
                  </button>
                </div>
                <div className="border-t border-neutral-200 dark:border-neutral-700 py-1">
                  <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20" role="menuitem">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}

