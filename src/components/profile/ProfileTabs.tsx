"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export type ProfileTab = "education" | "resume" | "links" | "skills";

interface ProfileTabsProps {
    activeTab: ProfileTab;
    onTabChange: (tab: ProfileTab) => void;
}

const tabs: { id: ProfileTab; label: string }[] = [
    { id: "education", label: "Qualifications" },
    { id: "resume", label: "Dossier / Resume" },
    { id: "links", label: "Net Links" },
    { id: "skills", label: "Skill Matrix" },
];

export function ProfileTabs({ activeTab, onTabChange }: ProfileTabsProps) {
    return (
        <div className="mb-10">
            <div className="flex items-center gap-1 bg-black/50 border border-white/10 p-1 w-full md:w-fit backdrop-blur-md rounded-lg overflow-x-auto no-scrollbar">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={cn(
                                "relative px-6 py-2.5 rounded-md text-xs font-bold uppercase tracking-widest transition-all duration-300 min-w-[120px] z-10",
                                isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                            )}
                        >
                            <span className="relative z-20">{tab.label}</span>

                            {isActive && (
                                <motion.div
                                    layoutId="activeProfileTab"
                                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-md shadow-[0_0_15px_rgba(37,99,235,0.4)] z-10"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Decorative Connection Line */}
            <div className="w-full h-px bg-gradient-to-r from-blue-500/50 via-transparent to-transparent mt-[-1px] ml-4 max-w-[200px]" />
        </div>
    );
}
