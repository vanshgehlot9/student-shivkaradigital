"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export type LearningStatus = "invited" | "in_progress" | "completed" | "expired";

interface StatusSegmentProps {
    activeStatus: LearningStatus;
    onStatusChange: (status: LearningStatus) => void;
    counts: Record<LearningStatus, number>;
}

const segments: { id: LearningStatus; label: string }[] = [
    { id: "invited", label: "Invited" },
    { id: "in_progress", label: "In Progress" },
    { id: "completed", label: "Completed" },
    { id: "expired", label: "Expired" }
];

export function StatusSegment({ activeStatus, onStatusChange, counts }: StatusSegmentProps) {
    return (
        <div className="flex items-center gap-1 p-1 bg-[#0A0A0A] border border-white/[0.08] rounded-xl inline-flex overflow-hidden">
            {segments.map((segment) => {
                const isActive = activeStatus === segment.id;

                return (
                    <button
                        key={segment.id}
                        onClick={() => onStatusChange(segment.id)}
                        className={cn(
                            "relative flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 z-10",
                            isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                        )}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="activeSegment"
                                className="absolute inset-0 bg-white/[0.08] rounded-lg border border-white/[0.05] -z-10"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}

                        {segment.label}

                        <span className={cn(
                            "text-[10px] px-1.5 py-0.5 rounded transition-colors",
                            isActive ? "bg-white text-black" : "bg-white/5 text-zinc-600"
                        )}>
                            {counts[segment.id]}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
