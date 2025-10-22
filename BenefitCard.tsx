import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";

export interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
  percentage?: number;
}

export const BenefitCard: React.FC<{ benefit: Benefit }> = ({ benefit }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const percentage = benefit.percentage || 90;
  
  // For 3D tilt effect
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to card center
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Calculate rotation (limited range for subtle effect)
    setRotateX(-y * 0.01); // Inverse Y for natural tilt
    setRotateY(x * 0.01);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    // Reset rotations
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative h-full group perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ z: 10 }}
      transition={{ duration: 0.3 }}
    >
      {/* Card background with 3D effect */}
      <motion.div
        className={cn(
          "relative z-10 p-6 sm:p-8 flex flex-col h-full rounded-xl bg-gradient-to-br",
          "from-white to-neutral-100 dark:from-neutral-900 dark:to-neutral-950",
          "border border-neutral-200/50 dark:border-neutral-800/50",
          "shadow-sm transition-all duration-300"
        )}
        style={{
          transformStyle: "preserve-3d",
          boxShadow: isHovered ? 
            "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)" : 
            "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.02)"
        }}
        animate={{
          rotateX: rotateX,
          rotateY: rotateY,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15,
        }}
      >
        {/* Spotlight effect */}
        <div 
          className={cn(
            "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
            "bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(255,255,255,0.1)_10%,transparent_80%)]",
            "dark:bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(255,255,255,0.06)_10%,transparent_80%)]",
            "pointer-events-none"
          )}
          style={{
            "--x": `${rotateY * 20 + 50}%`,
            "--y": `${rotateX * -20 + 50}%`,
          } as React.CSSProperties}
        />

        {/* Floating icon with shadow */}
        <div className="relative mb-6 perspective">
          <div
            
            className="relative z-10"
          >
            <div className={cn(
              "p-4 w-max rounded-lg inline-flex",
              "bg-neutral-50 dark:bg-neutral-800",
              "border border-neutral-200 dark:border-neutral-700",
              "shadow-lg"
            )}>
              <div 
                className="text-black dark:text-white"
                 
              >
                {benefit.icon}
              </div>
            </div>
          </div>
          
          {/* Icon shadow */}
          <motion.div
            className="absolute -bottom-2 left-0 right-0 mx-auto w-2/3 h-[6px] rounded-full bg-black/10 dark:bg-white/10 blur-md"
            animate={{ 
              scale: isHovered ? 1.1 : 0.9,
              opacity: isHovered ? 0.5 : 0.2
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        {/* Content */}
        <div className="z-10 relative flex flex-col flex-1">
          <h3 
            className="text-lg md:text-xl font-bold text-black dark:text-white mb-2"
            
          >
            {benefit.title}
          </h3>
          
          <p 
            className="text-neutral-600 dark:text-neutral-400 text-sm mb-6 flex-1"
            
          >
            {benefit.description}
          </p>
          
          {/* Progress section */}
          <div 
            className="mt-auto"
               >
            <div className="flex justify-between text-xs mb-2">
              <span className="font-medium text-neutral-700 dark:text-neutral-300">Performance</span>
              <span className="font-bold text-black dark:text-white">{percentage}%</span>
            </div>
            
            {/* Animated progress bar */}
            <div className="h-1.5 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-neutral-800 to-black dark:from-neutral-400 dark:to-white"
                
              />
            </div>
          </div>
        </div>
        
        {/* Animated circles in background for visual interest */}
        <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
          <motion.div 
            className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-neutral-900/5 dark:bg-white/5"
            animate={{ 
              scale: isHovered ? 1.3 : 1,
              x: isHovered ? -5 : 0,
              y: isHovered ? -5 : 0,
            }}
            transition={{ duration: 0.7 }}
          />
          <motion.div 
            className="absolute -left-10 -top-10 w-28 h-28 rounded-full bg-neutral-900/[0.03] dark:bg-white/[0.03]"
            animate={{ 
              scale: isHovered ? 1.2 : 1,
              x: isHovered ? 8 : 0,
              y: isHovered ? 8 : 0,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>
      
      {/* Card reflection (visible only on hover) */}
      <motion.div 
        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-white/20 dark:to-white/10 rounded-b-xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ 
          transformStyle: "preserve-3d", 
          transform: "translateY(2px) rotateX(180deg)",
          filter: "blur(8px)" 
        }}
      />
    </motion.div>
  );
};