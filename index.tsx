"use client";
import React, { useState } from 'react';
import { motion } from "motion/react";
import Image from 'next/image';

interface TemplateProps {
    id: number;
    name: string;
    category: string;
    price: number;
    label?: string;
    image: string;
    features?: string[];
    demo?: string;
    index: number;
}

export default function TemplateCard({
    id,
    name,
    category,
    price,
    label,
    image,
    index = 0
}: TemplateProps) {
    const [rippleEffect, setRippleEffect] = useState({ active: false, x: 0, y: 0 });

    const handleRipple = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setRippleEffect({ active: true, x, y });

        setTimeout(() => {
            setRippleEffect({ active: false, x: 0, y: 0 });
        }, 500);
    };

    return (
        <motion.div
            key={id}
            className="relative overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 shadow-sm hover:shadow-md transition-all min-h-[220px] xs:min-h-[260px] sm:min-h-[320px] flex flex-col group"
            style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeInOut"
            }}
        >
            {/* Label */}
            {label && (
                <div className="absolute top-2 right-2 text-[10px] sm:text-xs font-mono text-white px-2 py-0.5 rounded bg-primary/80 z-20">
                    {label}
                </div>
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10 z-10 pointer-events-none" />

            {/* Details */}
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-20">
                <div className="mb-1">
                    <span className="text-[10px] sm:text-xs text-white/80 font-mono">{category}</span>
                </div>
                <div className="flex justify-between items-center">
                    <h3 className="text-base sm:text-lg font-semibold text-white">{name}</h3>
                    <span className="text-xs sm:text-sm font-medium text-white ml-2 font-mono">${price}</span>
                </div>
            </div>

            {/* Next.js Image for SEO/lazy loading - Updated with width/height/loading attributes */}
            <div className="hidden">
                <Image
                    src={image}
                    alt={`${name} template preview`}
                    width={400}
                    height={300}
                    loading="lazy"
                    fetchPriority="low"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
            </div>

            {/* Preview link with ripple effect */}
            <div
                className="absolute inset-0 cursor-pointer flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 z-30"
                onClick={handleRipple}

            >
                <span className="px-4 py-2 bg-primary text-white text-xs sm:text-sm font-medium rounded shadow">
                    Preview
                </span>
                {rippleEffect.active && (
                    <span
                        className="absolute rounded-full bg-white/10 w-[100px] h-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        style={{
                            left: rippleEffect.x,
                            top: rippleEffect.y,
                            animation: "ripple 0.5s linear"
                        }}
                    />
                )}
                <style jsx>{`
                    @keyframes ripple {
                        to {
                            transform: scale(6);
                            opacity: 0;
                        }
                    }
                `}</style>
            </div>
        </motion.div>
    );
}
