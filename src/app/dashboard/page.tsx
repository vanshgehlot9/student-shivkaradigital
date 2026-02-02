"use client";

import React from "react";
import HoloCard from "@/components/ui/HoloCard";
import GlitchText from "@/components/ui/GlitchText";
import { Zap, Terminal, Activity, Crosshair, Wifi } from "lucide-react";

export default function StudentDashboard() {
    return (
        <div className="space-y-8 font-mono">

            {/* HUD Header */}
            <div className="flex justify-between items-end border-b border-white/10 pb-4">
                <div>
                    <div className="flex items-center gap-2 text-[#00F3FF] text-xs mb-1">
                        <Wifi size={12} className="animate-pulse" />
                        <span>SIGNAL_STRONG</span>
                    </div>
                    <GlitchText text="PILOT OVERVIEW" className="text-4xl md:text-6xl font-black text-white tracking-widest" />
                </div>
                <div className="text-right hidden md:block opacity-50">
                    <div className="text-xs">COORDINATES</div>
                    <div className="text-xs text-[#FF3D00]">45.22, 108.99</div>
                </div>
            </div>

            {/* Widget Grid - Draggable Concept */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">

                {/* Large Main Status */}
                <div className="md:col-span-2 lg:col-span-2 row-span-2">
                    <HoloCard className="h-full flex flex-col justify-between overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-20"><Crosshair size={48} /></div>

                        <div>
                            <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-2">Current Objective</h3>
                            <p className="text-3xl font-bold text-white mb-4 leading-tight">
                                Deconstruct the <span className="text-[#00F3FF]">"Saasify"</span> Landing Page Architecture.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full w-3/4 bg-[#00F3FF] shadow-[0_0_10px_#00F3FF]"></div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>Progress: 75%</span>
                                <span>T-Minus 2h</span>
                            </div>
                        </div>
                    </HoloCard>
                </div>

                {/* Stat : XP */}
                <HoloCard className="flex flex-col items-center justify-center text-center">
                    <Zap size={32} className="text-[#FF3D00] mb-2" />
                    <div className="text-4xl font-bold text-white">450</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">XP ACQUIRED</div>
                </HoloCard>

                {/* Stat : Rank */}
                <HoloCard className="flex flex-col items-center justify-center text-center">
                    <Activity size={32} className="text-[#00F3FF] mb-2" />
                    <div className="text-4xl font-bold text-white">#04</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">COHORT RANK</div>
                </HoloCard>

                {/* Data Stream */}
                <div className="md:col-span-2 row-span-1">
                    <HoloCard className="h-full">
                        <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                            <Terminal size={14} className="text-gray-500" />
                            <span className="text-xs text-gray-500 uppercase">System Logs</span>
                        </div>
                        <div className="space-y-2 font-mono text-xs max-h-[100px] overflow-y-auto custom-scrollbar">
                            <LogEntry time="10:42:01" msg="Repo access granted: student-shivkara" />
                            <LogEntry time="10:40:22" msg="Module 'Figma' loaded" highlight />
                            <LogEntry time="09:15:00" msg="Session joined: Foundations" />
                            <LogEntry time="09:00:00" msg="System boot sequence complete" />
                        </div>
                    </HoloCard>
                </div>
            </div>
        </div>
    );
}

const LogEntry = ({ time, msg, highlight }: { time: string, msg: string, highlight?: boolean }) => (
    <div className={`flex gap-3 ${highlight ? 'text-[#00F3FF]' : 'text-gray-400'}`}>
        <span className="opacity-50">[{time}]</span>
        <span>{msg}</span>
    </div>
)
