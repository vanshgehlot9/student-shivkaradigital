"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SmartTabsProps {
    activeTab: "active" | "completed";
    onTabChange: (tab: "active" | "completed") => void;
    counts: {
        active: number;
        completed: number;
    };
}

export function SmartTabs({ activeTab, onTabChange, counts }: SmartTabsProps) {
    return (
        <div className="relative inline-flex p-1 bg-black/50 border border-white/10 backdrop-blur-md">

            {/* Active Tab Background Pill - Controlled by Motion for sliding effect would be ideal, but simple conditional render for now to ensure robustness */}
            <div
                className={cn(
                    "absolute top-1 bottom-1 w-[50%] bg-[#F24E1E]/10 border border-[#F24E1E]/20 transition-all duration-300",
                    activeTab === "active" ? "left-1" : "left-[calc(50%-4px)] translate-x-[calc(100%-4px)]" // Simplified positioning logic
                )}
            />

            <button
                onClick={() => onTabChange("active")}
                className={cn(
                    "relative flex items-center justify-center gap-3 px-8 py-3 min-w-[160px] text-xs font-bold uppercase tracking-widest transition-all duration-300 z-10",
                    activeTab === "active" ? "text-white" : "text-zinc-600 hover:text-zinc-400"
                )}
            >
                <div>Live Ops</div>
                <span className={cn(
                    "px-1.5 py-0.5 text-[9px] font-mono",
                    activeTab === "active" ? "bg-[#F24E1E] text-black" : "bg-zinc-800 text-zinc-500"
                )}>
                    {counts.active}
                </span>

                {/* Active Indicator Line */}
                {activeTab === 'active' && (
                    <motion.div
                        layoutId="activeTabLine"
                        className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#F24E1E] shadow-[0_0_10px_#F24E1E]"
                    />
                )}
            </button>

            <button
                onClick={() => onTabChange("completed")}
                className={cn(
                    "relative flex items-center justify-center gap-3 px-8 py-3 min-w-[160px] text-xs font-bold uppercase tracking-widest transition-all duration-300 z-10",
                    activeTab === "completed" ? "text-white" : "text-zinc-600 hover:text-zinc-400"
                )}
            >
                <div>Archives</div>
                <span className={cn(
                    "px-1.5 py-0.5 text-[9px] font-mono",
                    activeTab === "completed" ? "bg-white text-black" : "bg-zinc-800 text-zinc-500"
                )}>
                    {counts.completed}
                </span>

                {/* Active Indicator Line */}
                {activeTab === 'completed' && (
                    <motion.div
                        layoutId="activeTabLine"
                        className="absolute bottom-0 left-4 right-4 h-[2px] bg-white shadow-[0_0_10px_white]"
                    />
                )}
            </button>
        </div>
    );
}
