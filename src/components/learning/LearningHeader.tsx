"use client";

import React from "react";
import { Search, ChevronDown, Terminal, Command } from "lucide-react";
import { StatusSegment, LearningStatus } from "./StatusSegment";

interface LearningHeaderProps {
    activeStatus: LearningStatus;
    onStatusChange: (status: LearningStatus) => void;
    counts: Record<LearningStatus, number>;
}

export function LearningHeader({ activeStatus, onStatusChange, counts }: LearningHeaderProps) {
    return (
        <div className="space-y-8 animate-in fade-in duration-500 relative">

            {/* HUD Decoration Lines */}
            <div className="absolute top-10 right-0 w-32 h-32 border-r-2 border-t-2 border-white/10 rounded-tr-3xl pointer-events-none" />
            <div className="absolute -left-4 top-20 w-1 h-24 bg-gradient-to-b from-transparent via-[#F24E1E]/50 to-transparent pointer-events-none" />

            {/* Top Level: status & Title */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-10">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-mono text-zinc-500">
                        <Terminal size={12} className="text-[#F24E1E]" />
                        <span>Training Simulation Environment v2.4</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase glitch-text" data-text="Learning Hub">
                        Learning Hub
                    </h1>
                    <p className="text-zinc-500 text-sm font-mono max-w-lg">
                        {'>'} Select a module to begin training sequence.
                    </p>
                </div>

                <StatusSegment
                    activeStatus={activeStatus}
                    onStatusChange={onStatusChange}
                    counts={counts}
                />
            </div>

            {/* Secondary: Tactical Search & Filters */}
            <div className="flex items-center gap-3 w-full md:w-auto p-1 border-t border-b border-white/5 py-6 backdrop-blur-sm">
                <div className="relative flex-grow md:flex-grow-0 md:w-80 group">
                    <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-hover:text-[#F24E1E] transition-colors" />
                    <input
                        type="text"
                        placeholder="SEARCH_DATABASE..."
                        className="w-full bg-[#050505] border border-white/10 rounded-none py-3 pl-10 pr-4 text-xs font-mono text-white placeholder:text-zinc-700 focus:outline-none focus:border-[#F24E1E]/50 focus:bg-white/[0.02] transition-all uppercase tracking-wider"
                    />
                    {/* Corner Accents for Input */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/20 pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/20 pointer-events-none" />
                </div>

                <div className="relative group">
                    <button className="flex items-center gap-3 bg-[#050505] border border-white/10 py-3 px-6 text-xs text-zinc-400 font-mono uppercase tracking-widest hover:text-white hover:border-white/30 hover:bg-white/[0.02] transition-all">
                        <Command size={12} />
                        <span>Category: All</span>
                        <ChevronDown size={12} />
                    </button>
                    {/* Corner Accents for Button */}
                    <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-white/20 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-white/20 pointer-events-none" />
                </div>
            </div>
        </div>
    );
}
