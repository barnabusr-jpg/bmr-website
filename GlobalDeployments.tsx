"use client";

import { useRef } from 'react';
import { Globe } from '@/components/common/Globe';
import { useTheme } from '@/components/ThemeProvider';

// Define region metadata for markers
interface RegionData {
    name: string;
    location: [number, number];
    uptime: string;
    latency: string;
    deployments: number;
    status: 'active' | 'maintenance' | 'issue';
    size: number;
}

// Expanded metadata for existing markers
const regions: RegionData[] = [
    { name: "Manila", location: [14.5995, 120.9842], uptime: "99.9%", latency: "44ms", deployments: 23, status: 'active', size: 0.03 },
    { name: "Mumbai", location: [19.076, 72.8777], uptime: "99.8%", latency: "51ms", deployments: 157, status: 'active', size: 0.1 },
    { name: "Dhaka", location: [23.8103, 90.4125], uptime: "99.7%", latency: "73ms", deployments: 42, status: 'active', size: 0.05 },
    { name: "Cairo", location: [30.0444, 31.2357], uptime: "99.5%", latency: "88ms", deployments: 67, status: 'maintenance', size: 0.07 },
    { name: "Beijing", location: [39.9042, 116.4074], uptime: "99.9%", latency: "63ms", deployments: 184, status: 'active', size: 0.08 },
    { name: "São Paulo", location: [-23.5505, -46.6333], uptime: "99.6%", latency: "110ms", deployments: 95, status: 'active', size: 0.1 },
    { name: "Mexico City", location: [19.4326, -99.1332], uptime: "99.7%", latency: "67ms", deployments: 78, status: 'active', size: 0.1 },
    { name: "New York", location: [40.7128, -74.006], uptime: "99.99%", latency: "24ms", deployments: 231, status: 'active', size: 0.1 },
    { name: "Tokyo", location: [34.6937, 135.5022], uptime: "99.95%", latency: "48ms", deployments: 156, status: 'issue', size: 0.05 },
    { name: "Istanbul", location: [41.0082, 28.9784], uptime: "99.6%", latency: "92ms", deployments: 61, status: 'active', size: 0.06 },
];

// Calculate total metrics
const totalDeployments = regions.reduce((sum, region) => sum + region.deployments, 0);
const averageUptime = "99.8%";
const activeRegions = regions.filter(r => r.status === 'active').length;

export function GlobalDeployments() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    // Configure the globe with our regions - use neutral markers with neutral base
    const globeConfig = {
        width: 320, // Responsive: smaller width for mobile
        height: 320,
        devicePixelRatio: 2,
        phi: 0,
        theta: 0.3,
        dark: theme === 'dark' ? 2 : 0,
        diffuse: theme === 'dark' ? 0.6 : 0,
        mapSamples: 16000,
        mapBrightness: theme === 'dark' ? 0.9 : 0.8,
        baseColor: theme === 'dark' ? [0.5, 0.5, 0.5] as [number, number, number] : [0.9, 0.9, 0.9] as [number, number, number],
        markerColor: [0.1, 0.5, 1] as [number, number, number],
        glowColor: theme === 'dark' ? [0.11, 0.11, 0.11] as [number, number, number] : [0.8, 0.8, 0.8] as [number, number, number],
        markers: regions.map(region => ({
            location: region.location,
            size: region.size,
        })),
        onRender: () => {},
    };

    return (
        <div
            className="flex flex-col h-full relative"
            ref={containerRef}
        >
            <div className="flex items-center mb-2 sm:mb-3">
                <div className="p-1 bg-neutral-200 dark:bg-neutral-800 rounded-lg mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-neutral-500 dark:text-neutral-500/80">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525" />
                    </svg>
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-[var(--foreground)]">Global Deployments</h3>
            </div>

            {/* Live Status badge - moved to top right corner */}
            <div className="absolute top-2 sm:top-4 right-0 z-20">
                <div className="bg-white/60 dark:bg-neutral-800/50 text-neutral-600 dark:text-neutral-400 text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full backdrop-blur-xs border border-neutral-200 dark:border-neutral-700/30 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                    Live Status
                </div>
            </div>

            <div className="flex-1 relative min-h-[180px] sm:min-h-[260px] overflow-hidden">
                {/* The globe visualization */}
                <div className="absolute inset-0 flex items-center justify-center scale-100 sm:scale-110">
                    <div className="w-[180px] h-[180px] sm:w-[320px] sm:h-[320px]">
                        <Globe config={{ ...globeConfig, width: 320, height: 320 }} />
                    </div>
                </div>

                {/* Less intense gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-b from-white/0 via-white/5 to-white/20 dark:from-neutral-900/0 dark:via-neutral-900/10 dark:to-neutral-900/30 pointer-events-none"></div>

                {/* Dashboard metrics overlay */}
                <div className="absolute left-0 right-0 bottom-0 p-1 sm:p-2 pointer-events-none">
                    <div className="flex  flex-row justify-between gap-1 sm:gap-0">
                        <div className="flex gap-1 sm:gap-3 text-[10px] sm:text-xs">
                            <div className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-xs p-1 sm:p-1.5 rounded-md border border-neutral-200 dark:border-neutral-700/30">
                                <span className="block text-neutral-500 dark:text-neutral-200 font-medium">{totalDeployments}</span>
                                <span className="block text-neutral-500">Deployments</span>
                            </div>
                            <div className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-xs p-1 sm:p-1.5 rounded-md border border-neutral-200 dark:border-neutral-700/30">
                                <span className="block text-neutral-500 dark:text-neutral-200 font-medium">{averageUptime}</span>
                                <span className="block text-neutral-500">Uptime</span>
                            </div>
                            <div className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-xs p-1 sm:p-1.5 rounded-md border border-neutral-200 dark:border-neutral-700/30">
                                <span className="block text-neutral-500 dark:text-neutral-200 font-medium">{activeRegions}</span>
                                <span className="block text-neutral-500">Regions</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-1 sm:mt-2 text-[9px] sm:text-[10px] text-neutral-500 flex items-center justify-between">
                <span>Edge Network</span>
                <span className="text-neutral-500 dark:text-neutral-400">Global Coverage</span>
            </div>
        </div>
    );
}
