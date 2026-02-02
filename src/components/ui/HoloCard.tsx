"use client";

import React from "react";
import { motion } from "framer-motion";

interface HoloCardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function HoloCard({ children, className = "", onClick }: HoloCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            className={`glass-holo rounded-2xl p-6 relative group transition-all duration-300 ${className}`}
            onClick={onClick}
        >
            {/* Chromatic Aberration Layers (RGB Split) - Visible on Hover */}
            <div className="absolute inset-0 rounded-2xl border border-red-500/0 group-hover:border-red-500/30 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[1px] translate-y-[1px] pointer-events-none mix-blend-screen"></div>
            <div className="absolute inset-0 rounded-2xl border border-cyan-500/0 group-hover:border-cyan-500/30 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-[1px] -translate-y-[1px] pointer-events-none mix-blend-screen"></div>

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 rounded-tl-lg"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 rounded-br-lg"></div>
        </motion.div>
    );
}
