import React  from "react";
import dynamic from "next/dynamic";

import { Route } from "./Sidebar";

const Sidebar = dynamic(() => import("./Sidebar"), {
  ssr: true,
});
const AppHeader = dynamic(() => import("./Appheader"), {
  ssr: true,
});
const Main = dynamic(() => import("./Main"), {
  ssr: true,
});

interface DashboardLayoutProps {
  currentRoute: Route;
  onNavigate: (route: Route) => void;
}

export default function DashboardLayout({
  currentRoute,
  onNavigate,
}: DashboardLayoutProps) {
  // Add state for mobile overflow
 
 

  // Responsive className with overflow-hidden on mobile after 1s
  const containerClassName =
    "relative w-[125%] scale-[0.5] sm:scale-[1] translate-y-[-70px] xs:translate-y-[-50px] sm:translate-y-[-40px] shadow-2xl min-w-[1500px] h-[790px] sm:h-[740px] mx-auto mt-[-20px] border border-neutral-200 dark:border-neutral-800 rounded-lg"  ;

  const containerStyle = {
    inset: 0,
    transform: "rotateX(39deg) rotateY(29deg) rotate(331deg)",
    transformOrigin: "top left",
    backfaceVisibility: "hidden" as const,
    perspective: "1000px",
    transition: "transform 0.7s ease-out",
  };

  return (
    <div className={containerClassName} style={containerStyle}>
      <div className="flex h-full">
        {/* Sidebar */}
        <Sidebar currentRoute={currentRoute} onNavigate={onNavigate} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-gray-50 dark:bg-neutral-950 rounded-tr-lg">
          <AppHeader currentRoute={currentRoute} />
          <Main />
        </div>
        <div
          className="absolute h-[100%] top-[20%] dark:h-[100%] inset-20 pointer-events-none scale-110 z-10 
                bg-linear-to-b from-transparent to-[rgba(255,255,255,0.9)]
                dark:to-black dark:mix-blend-multiply"
        />
        <div
          className="absolute start-[60%] h-full w-[0%] dark:w-[100%] inset-10 pointer-events-none scale-110 z-10 
                bg-linear-to-r from-transparent to-[rgba(255,255,255,0.9)]
                dark:to-black dark:mix-blend-multiply"
        />
      </div>
    </div>
  );
}
