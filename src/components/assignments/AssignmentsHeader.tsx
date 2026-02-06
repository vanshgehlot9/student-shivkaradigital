"use client";

import React from "react";
import { Filter, ArrowUpDown, Cpu, Wifi, Activity } from "lucide-react";

export function AssignmentsHeader() {
    return (
        <div className="w-full relative py-12 mb-8">
            {/* Background HUD Lines */}
            <div className="absolute top-0 left-0 w-32 h-[1px] bg-gradient-to-r from-white/20 to-transparent" />
            <div className="absolute top-0 right-0 w-32 h-[1px] bg-gradient-to-l from-white/20 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="flex flex-col md:flex-row justify-between items-end gap-6 relative z-10">

                {/* Title Block with HUD Data */}
                <div className="space-y-4">
                    <div className="flex items-center gap-6 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                        <div className="flex items-center gap-2">
                            <Cpu size={12} className="text-[#F24E1E] animate-pulse" />
                            <span>Sys.Opt: 98%</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Wifi size={12} className="text-emerald-500" />
                            <span>Net.Secure</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Activity size={12} className="text-blue-500" />
                            <span>Live.Feed</span>
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase relative">
                        <span className="relative z-10">Missions</span>
                        {/* Glitch Shadow Effect */}
                        <span className="absolute top-0 left-1 text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent z-0 select-none blur-[1px]">
                            Missions
                        </span>
                    </h1>
                </div>

                {/* Controls - Glass Panel */}
                <div className="flex items-center gap-3 p-1.5 bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm rounded-full">

                    {/* Filter */}
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/50 border border-white/5 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white hover:border-[#F24E1E] hover:bg-[#F24E1E]/10 transition-all group">
                        <Filter size={12} />
                        <span>Filter</span>
                    </button>

                    {/* Sort */}
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/50 border border-white/5 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white hover:border-blue-500 hover:bg-blue-500/10 transition-all group">
                        <ArrowUpDown size={12} />
                        <span>Priority</span>
                    </button>

                </div>
            </div>
        </div>
    );
}
