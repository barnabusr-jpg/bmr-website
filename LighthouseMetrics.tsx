"use client";

import { Gauge } from "@/components/common/Gauge";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface MetricProps {
  title: string;
  value: number;
  color: string; // Changed from enum to direct color string
  description?: string;
}

// Main performance metrics - changed colors to monochrome
const metrics: MetricProps[] = [
  { title: "Performance", value: 100, color: "success", description: "Values are calculated from lab data" },
  { title: "Accessibility", value: 100, color: "success", description: "These checks highlight opportunities to improve the accessibility of your web app" },
  { title: "Best Practices", value: 100, color: "success", description: "Following best practices ensures your site is secure and high quality" },
  { title: "SEO", value: 100, color: "success", description: "These checks ensure that your page is optimized for search engine results" }
];

// Tab-specific detail metrics
const tabMetrics = {
  performance: [
    { name: "First Contentful Paint", value: "0.8s", score: "Fast" },
    { name: "Largest Contentful Paint", value: "1.2s", score: "Fast" },
    { name: "Total Blocking Time", value: "0ms", score: "Fast" },
    { name: "Cumulative Layout Shift", value: "0", score: "Good" },
    { name: "Speed Index", value: "1.4s", score: "Fast" },
  ],
  accessibility: [
    { name: "Color Contrast", value: "Pass", score: "Good" },
    { name: "ARIA Attributes", value: "Pass", score: "Good" },
    { name: "Keyboard Navigation", value: "100%", score: "Fast" },
    { name: "Labels & Alt Text", value: "Pass", score: "Good" },
    { name: "Focus Indicators", value: "Pass", score: "Good" },
  ],
  "best practices": [
    { name: "HTTPS Usage", value: "Yes", score: "Good" },
    { name: "JavaScript Errors", value: "None", score: "Fast" },
    { name: "Image Aspect Ratio", value: "Correct", score: "Good" },
    { name: "Deprecated APIs", value: "None", score: "Good" },
    { name: "Browser Support", value: "Modern", score: "Good" },
  ],
  seo: [
    { name: "Meta Description", value: "Yes", score: "Good" },
    { name: "Crawlable Links", value: "Pass", score: "Good" },
    { name: "Legible Font Sizes", value: "Pass", score: "Fast" },
    { name: "Search Friendly", value: "Yes", score: "Good" },
    { name: "Mobile Optimized", value: "Yes", score: "Fast" },
  ],
};

export function LighthouseMetrics() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState(metrics.map(() => 0));
  const [activeTab, setActiveTab] = useState("performance");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, {
      threshold: 0.2,
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const animationDuration = 1800;
      const stepTime = 20;
      const steps = animationDuration / stepTime;

      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const progress = Math.min(currentStep / steps, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);

        setAnimatedValues(metrics.map(metric =>
          Math.ceil(metric.value * easeOutQuart)
        ));

        if (progress >= 1) {
          clearInterval(timer);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  return (
    <div ref={containerRef} className="flex flex-col h-full">
      <div className="flex items-center mb-2 sm:mb-3">
        <div className="p-1 bg-neutral-200 dark:bg-neutral-700 rounded-lg mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-neutral-500 dark:text-neutral-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
          </svg>
        </div>
        <h3 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-white">Lighthouse Performance</h3>
      </div>

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Chrome Lighthouse-style UI with 2-column layout */}
        <div className="flex flex-col md:flex-row gap-2 sm:gap-3 mt-1 flex-1">
          {/* Left column - Website Screenshot */}
          <div className="w-full md:w-[65%] h-[160px] sm:h-[220px] md:h-auto relative rounded-md overflow-hidden border border-neutral-200 dark:border-neutral-700">
            <div className="absolute inset-0 z-10 flex items-start justify-start">
              {isVisible && (
                <Image
                  src="/image.png"
                  alt="Website Screenshot"
                  fill
                  className="object-cover object-top-left"
                  style={{ objectPosition: "top left" }}
                  priority
                />
              )}
            </div>
            <div className={`absolute inset-0 bg-linear-to-br from-neutral-200 dark:from-neutral-700 to-neutral-100 dark:to-black transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>
          </div>

          {/* Right column - Metrics */}
          <div className="flex-1 flex flex-col mt-2 md:mt-0">
            {/* Chrome-like tabs */}
            <div className="flex border-b border-neutral-200 dark:border-neutral-700 mb-1 sm:mb-2 overflow-x-auto">
              {["performance", "accessibility", "best practices", "seo"].map((tab) => (
                <button
                  key={tab}
                  className={`py-1 px-1.5 sm:py-1.5 sm:px-2 cursor-pointer text-[10px] sm:text-[11px] font-medium capitalize whitespace-nowrap ${activeTab === tab
                      ? "text-neutral-600 dark:text-neutral-400 border-b-[1px] border-neutral-600 dark:border-neutral-400"
                      : "text-neutral-600 dark:text-neutral-400 border-b-[1px] border-transparent hover:text-neutral-800 dark:hover:text-neutral-300"
                    }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Main metrics display */}
            <div className="bg-neutral-50 dark:bg-neutral-900 p-1.5 sm:p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 mb-1 sm:mb-2">
              <div className="flex flex-wrap gap-1">
                {metrics.map((metric, index) => (
                  <div
                    key={metric.title}
                    className={`flex-1 min-w-[48px] sm:min-w-[60px] flex flex-col items-center p-1 rounded-lg ${activeTab.toLowerCase() === metric.title.toLowerCase()
                        ? 'bg-neutral-100 dark:bg-neutral-800/50'
                        : ''
                      }`}
                  >
                    <div className="w-[36px] h-[36px] sm:w-[48px] sm:h-[48px] mb-1">
                      <Gauge
                        value={animatedValues[index]}
                        primary={metric.color}
                        secondary="#d1d5db"
                        strokeWidth={6}
                        showValue={true}
                        size="100%"
                        className={{
                          textClassName: 'text-[18px] sm:text-[25px] font-bold text-neutral-900 dark:text-white',
                          svgClassName: `transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`,
                          primaryClassName: 'dark:stroke-white',
                          secondaryClassName: 'stroke-neutral-200 dark:stroke-neutral-700'
                        }}
                      />
                    </div>
                    <span className="text-[7px] sm:text-[8px] font-medium text-neutral-600 dark:text-neutral-300 mt-0.5 text-center">{metric.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional details - now fixed height to prevent layout shift */}
            <div className="bg-white dark:bg-neutral-900/50 p-1.5 sm:p-2 rounded-lg border border-neutral-200 dark:border-neutral-700/50 flex-1 h-[90px] sm:h-[120px] overflow-y-auto">
              <h4 className="text-[10px] sm:text-xs font-semibold text-neutral-900 dark:text-white mb-1 sm:mb-2 uppercase">
                {activeTab === "best practices" ? "Best Practices Metrics" : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Metrics`}
              </h4>
              <div className="flex flex-col gap-1">
                {tabMetrics[activeTab as keyof typeof tabMetrics].map((detail) => (
                  <div key={detail.name} className="flex justify-between items-center text-[9px] sm:text-[10px]">
                    <div className="flex items-center gap-1">
                      <div className={`w-1.5 h-1.5 rounded-full ${detail.score === 'Fast' ? 'bg-neutral-500' :
                          detail.score === 'Moderate' ? 'bg-orange-500' :
                            'bg-neutral-500'
                        }`}></div>
                      <span className="text-neutral-700 dark:text-neutral-300">{detail.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-neutral-600 dark:text-neutral-400">{detail.value}</span>
                      <span className={`text-[9px] sm:text-[10px] font-medium px-1 py-0.5 rounded ${detail.score === 'Fast' ? 'bg-neutral-500/20 text-neutral-700 dark:text-neutral-400' :
                          detail.score === 'Moderate' ? 'bg-orange-500/20 text-orange-700 dark:text-orange-400' :
                            'bg-neutral-500/20 text-neutral-700 dark:text-neutral-400'
                        }`}>{detail.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status footer */}
            <div className="mt-1 pt-1 flex justify-between items-center text-[9px] sm:text-[10px]">
              <span className="text-neutral-600 dark:text-neutral-400">
                {isVisible ? 'Analysis Complete' : 'Analyzing...'}
              </span>
              <span className="text-neutral-600 dark:text-neutral-400 font-medium">
                {isVisible ? new Date().toLocaleDateString() : ''}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
