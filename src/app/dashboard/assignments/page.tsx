"use client";

import React from "react";
import HoloCard from "@/components/ui/HoloCard";
import GlitchText from "@/components/ui/GlitchText";
import { Link as LinkIcon, Lock, Globe, Clock, ChevronRight } from "lucide-react";

export default function AssignmentsPage() {
    return (
        <div className="space-y-10">
            <div className="flex items-center justify-between">
                <div>
                    <GlitchText text="TACTICAL MAP" className="text-4xl font-black text-white tracking-widest" />
                    <p className="text-gray-500 text-xs font-mono mt-1">SELECT MISSION TO ENGAGE</p>
                </div>
                <div className="px-3 py-1 bg-white/5 rounded border border-white/10 text-[10px] font-mono uppercase">
                    Phase: <span className="text-[#FF3D00]">Infiltration</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Active Mission */}
                <HoloCard className="border-[#00F3FF]/30 ring-1 ring-[#00F3FF]/20 group">
                    <div className="absolute -top-3 left-4 bg-[#00F3FF] text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                        Active Operation
                    </div>

                    <div className="mt-2 mb-6">
                        <h2 className="text-2xl font-bold text-white group-hover:text-[#00F3FF] transition-colors">Landing Page V1</h2>
                        <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                            Objective: Clone Saasify. <br />
                            Constraints: Autolayout required.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Figma URL..."
                                className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-xs text-white focus:border-[#00F3FF] outline-none font-mono"
                            />
                            <button className="bg-[#00F3FF] text-black p-2 rounded hover:bg-white transition-colors">
                                <ChevronRight size={16} />
                            </button>
                        </div>
                        <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono">
                            <span className="flex items-center gap-1"><Clock size={10} /> 02:22:15</span>
                            <span className="flex items-center gap-1"><Globe size={10} /> Public View</span>
                        </div>
                    </div>
                </HoloCard>

                {/* Locked Mission */}
                <HoloCard className="opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Locked</span>
                        <Lock size={14} className="text-gray-600" />
                    </div>

                    <h2 className="text-xl font-bold text-gray-300 mb-2">Design Systems I</h2>
                    <p className="text-xs text-gray-500 mt-2 mb-6">
                        Clear previous objectives to unlock this region.
                    </p>

                    <div className="w-full h-8 bg-white/5 rounded flex items-center justify-center text-[10px] font-mono text-gray-600 border border-white/5">
                        ENCRYPTED
                    </div>
                </HoloCard>

                {/* Locked Mission */}
                <HoloCard className="opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Locked</span>
                        <Lock size={14} className="text-gray-600" />
                    </div>

                    <h2 className="text-xl font-bold text-gray-300 mb-2">Prototyping</h2>
                    <p className="text-xs text-gray-500 mt-2 mb-6">
                        Requires Level 3 Clearance.
                    </p>

                    <div className="w-full h-8 bg-white/5 rounded flex items-center justify-center text-[10px] font-mono text-gray-600 border border-white/5">
                        ENCRYPTED
                    </div>
                </HoloCard>

            </div>
        </div>
    );
}
