import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { generateCodeSnippet } from "../utils";
import { DeploymentStage } from "../types";

interface TerminalProps {
  stage: DeploymentStage;
  deploymentCount: number;
}

export default function Terminal({ stage, deploymentCount }: TerminalProps) {
  const [typingComplete, setTypingComplete] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [wrappedLines, setWrappedLines] = useState<string[]>([""]);
  const commandText = stage !== "reset" ? generateCodeSnippet(stage) : "Preparing next deployment...";
  
  // Terminal width properties
  const charsPerLine = 45; // Approximate characters per line
  
  // Reset and start typing when command changes
  useEffect(() => {
    // For success message, display instantly without typing effect
    if (stage === "success") {
      setTypingComplete(true);
      setWrappedLines([""]);
      return;
    }
    
    // For other stages, use typing effect
    setTypingComplete(false);
    setWrappedLines([""]);
    
    let typingTimer: NodeJS.Timeout;
    let currentPosition = 0;
    
    // Type one character at a time
    const typeNextChar = () => {
      if (currentPosition < commandText.length) {
        currentPosition++;
        const newText = commandText.substring(0, currentPosition);
        
        // Handle line wrapping
        updateWrappedLines(newText);
        
        // Randomize typing speed slightly for realism
        const randomDelay = Math.floor(Math.random() * 30) + 30;
        typingTimer = setTimeout(typeNextChar, randomDelay);
      } else {
        setTypingComplete(true);
      }
    };
    
    // Start typing after a short delay
    typingTimer = setTimeout(typeNextChar, 300);
    
    return () => clearTimeout(typingTimer);
  }, [commandText, stage]);
  
  // Handle line wrapping
  const updateWrappedLines = (text: string) => {
    // Split text into lines that fit within terminal width
    const lines: string[] = [];
    let remainingText = text;
    
    while (remainingText.length > 0) {
      if (remainingText.length <= charsPerLine) {
        lines.push(remainingText);
        break;
      }
      
      // Find a good break point
      let breakPoint = charsPerLine;
      // Try to break at a space if possible
      const lastSpaceIndex = remainingText.substring(0, charsPerLine).lastIndexOf(' ');
      if (lastSpaceIndex > 0 && lastSpaceIndex > charsPerLine - 10) {
        breakPoint = lastSpaceIndex + 1;
      }
      
      lines.push(remainingText.substring(0, breakPoint));
      remainingText = remainingText.substring(breakPoint);
    }
    
    setWrappedLines(lines);
  };
  
  return (
    <div className="bg-[#0D1117] dark:bg-[#0D1117] rounded-lg border border-neutral-300 dark:border-neutral-700 overflow-hidden mb-1">
      {/* Terminal header */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#F6F8FA] dark:bg-[#161B22] border-b border-neutral-300 dark:border-neutral-700">
        <div className="flex items-center">
          <div className="flex gap-1.5 mr-3">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-500"></div>
          </div>
          <div className="text-xs text-neutral-600 dark:text-neutral-400">terminal</div>
        </div>
       
      </div>
      
      {/* Terminal content */}
      <div ref={terminalRef} className="p-3 h-28 font-mono text-xs relative overflow-hidden bg-white dark:bg-neutral-900 text-neutral-800 dark:text-white">
        {stage !== "success" ? (
          /* Regular command with typing effect */
          <div>
            {/* First line with prompt and first part of command */}
            <div className="flex">
              <span className="text-neutral-600 dark:text-neutral-400 mr-1.5">&gt;</span>
              <span className="whitespace-pre-wrap">
                {wrappedLines[0]}
                {!typingComplete && wrappedLines.length === 1 && (
                  <motion.span
                    className="inline-block w-1.5 h-3.5 bg-neutral-800 dark:bg-white ml-0.5 align-middle"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  />
                )}
              </span>
            </div>
            
            {/* Additional wrapped lines */}
            {wrappedLines.slice(1).map((line, index) => (
              <div key={index} className="ml-4">
                <span>{line}</span>
                {!typingComplete && index === wrappedLines.length - 2 && (
                  <motion.span
                    className="inline-block w-1.5 h-3.5 bg-neutral-800 dark:bg-white ml-0.5 align-middle"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Success message without typing effect */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-neutral-600 dark:text-neutral-400">✨ Deployment successful! Site is live.</div>
          </motion.div>
        )}
        
        {/* Command output - only shown after typing is complete */}
        {typingComplete && stage === "preparing" && (
          <motion.div 
            className="mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-neutral-600 dark:text-neutral-400">Checking dependencies...</div>
            <div className="text-neutral-600 dark:text-neutral-400">Initializing environment...</div>
          </motion.div>
        )}
        
        {typingComplete && stage === "building" && (
          <motion.div 
            className="mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-amber-600 dark:text-yellow-400">→ Bundling assets...</div>
            <div className="text-neutral-600 dark:text-neutral-400">→ Optimizing code...</div>
          </motion.div>
        )}
        
        {typingComplete && stage === "deploying" && (
          <motion.div 
            className="mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-neutral-600 dark:text-neutral-400">→ Uploading to CDN...</div>
            <div className="text-neutral-600 dark:text-neutral-400">→ Setting up routing...</div>
          </motion.div>
        )}
        
        {/* Success message and status */}
        {stage === "success" && (
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-2 text-neutral-600 dark:text-neutral-300"
          >
            <div className="flex items-center">
              <div className="mr-2 text-neutral-800 dark:text-white">✓</div>
              <span>Deployment #00{deploymentCount + 1} complete</span>
            </div>
            <div className="flex items-center mt-1">
              <div className="mr-2 text-neutral-800 dark:text-white">ℹ</div>
              <span>URL: <span className="text-neutral-600 dark:text-neutral-400 underline">https://example.com</span></span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
