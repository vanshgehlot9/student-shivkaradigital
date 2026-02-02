"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import MagneticButton from "@/components/MagneticButton";
import { Play, Calendar, Zap, Terminal, Command, CheckCircle } from "lucide-react";

export default function StudentDashboard() {
    return (
        <div className="space-y-12">
            {/* Header: Command Center */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 relative">
                <div className="absolute top-0 right-0 p-32 bg-[#FF4D00] opacity-[0.05] blur-[80px] rounded-full pointer-events-none"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full bg-[#FF4D00]/10 border border-[#FF4D00]/20 text-[#FF4D00] text-[10px] uppercase font-bold tracking-widest flex items-center gap-2">
                            <Zap size={10} fill="currentColor" /> System Online
                        </span>
                        <span className="text-gray-500 text-xs uppercase font-mono tracking-widest">v2.0.4</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.85]">
                        COMMAND <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D00] to-[#FF8A00]">CENTER.</span>
                    </h1>
                </div>

                <div className="flex items-center gap-4 relative z-10">
                    <div className="text-right hidden md:block">
                        <div className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-1">Next Sync</div>
                        <div className="text-white font-bold flex items-center justify-end gap-2 text-lg">
                            Today, 5:00 PM <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        </div>
                    </div>
                    <MagneticButton>
                        <button className="h-16 w-16 rounded-2xl bg-[#FF4D00] hover:bg-[#FF4D00] text-white flex items-center justify-center transition-all shadow-[0_0_30px_rgba(255,77,0,0.4)] hover:shadow-[0_0_50px_rgba(255,77,0,0.6)] group">
                            <Play size={24} fill="currentColor" className="group-hover:scale-110 transition-transform" />
                        </button>
                    </MagneticButton>
                </div>
            </div>

            {/* Metrics HUD */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <HUDMetric label="Bootcamp Phase" value="01" sub="Foundations" icon={Terminal} />
                <HUDMetric label="XP Gained" value="450" sub="Level 2" icon={Zap} highlight />
                <HUDMetric label="Attendance" value="98%" sub="Excellent" icon={CheckCircle} />
                <HUDMetric label="Missions" value="12" sub="Pending: 2" icon={Command} />
            </div>

            {/* Main Interface Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left: Journey Map (Liquid Timeline) */}
                <div className="lg:col-span-2 space-y-6">
                    <GlassCard className="p-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#FF4D00] to-transparent opacity-20"></div>

                        <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-2">
                            JOURNEY MAP <span className="text-[#FF4D00]">.</span>
                        </h3>

                        <div className="space-y-0 text-white">
                            <JourneyItem
                                status="completed"
                                title="Induction & Setup"
                                desc="Tools, Accounts, Manifesto"
                                date="Jan 28"
                            />
                            <JourneyItem
                                status="active"
                                title="Figma Variables"
                                desc="Tokens, Modes, Logic"
                                date="Today"
                            />
                            <JourneyItem
                                status="locked"
                                title="Design Systems I"
                                desc="Atomic Design, Scalability"
                                date="Feb 5"
                            />
                            <JourneyItem
                                status="locked"
                                title="Auto-Layout Drill"
                                desc="Speed execution test"
                                date="Feb 8"
                            />
                        </div>
                    </GlassCard>
                </div>

                {/* Right: Critical Alerts */}
                <div className="space-y-6">
                    <div className="p-[1px] rounded-3xl bg-gradient-to-br from-[#FF4D00] to-transparent">
                        <GlassCard className="p-8 h-full bg-[#050505]/80 backdrop-blur-2xl !border-0 rounded-[23px]">
                            <div className="mb-6 flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">Priority Tasks</h3>
                                    <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Execute Immediately</p>
                                </div>
                                <Zap size={16} className="text-[#FF4D00] animate-pulse" />
                            </div>

                            <div className="space-y-4">
                                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:border-[#FF4D00]/30 transition-colors group cursor-pointer relative overflow-hidden">
                                    <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[#FF4D00] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>

                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-sm font-bold text-white group-hover:text-[#FF4D00] transition-colors">Landing Page V1</span>
                                        <span className="text-[9px] text-black bg-[#FF4D00] px-2 py-0.5 rounded font-bold uppercase tracking-wide animate-pulse">Due 2h</span>
                                    </div>
                                    <p className="text-xs text-gray-400 mb-4 font-light leading-relaxed">Replicate the provided SaaS landing page using only auto-layout frames.</p>
                                    <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> High Priority
                                    </div>
                                </div>

                                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:border-white/20 transition-colors opacity-60 hover:opacity-100">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-sm font-bold text-white">Component Lib</span>
                                        <span className="text-[9px] text-gray-400 border border-white/20 px-2 py-0.5 rounded font-bold uppercase tracking-wide">Feb 6</span>
                                    </div>
                                    <p className="text-xs text-gray-400 font-light">Build a button component with 3 variants.</p>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </div>
    );
}

const HUDMetric = ({ label, value, sub, icon: Icon, highlight }: any) => (
    <GlassCard className={`p-4 flex flex-col justify-between h-28 relative overflow-hidden group ${highlight ? 'border-[#FF4D00]/30 bg-[#FF4D00]/5' : ''}`}>
        <div className="flex justify-between items-start z-10">
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{label}</span>
            <Icon size={14} className={highlight ? 'text-[#FF4D00]' : 'text-gray-600'} />
        </div>
        <div className="z-10">
            <div className={`text-3xl font-black tracking-tighter ${highlight ? 'text-[#FF4D00]' : 'text-white'}`}>{value}</div>
            <div className="text-[10px] text-gray-500 font-medium">{sub}</div>
        </div>

        {highlight && <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#FF4D00] blur-[40px] opacity-20"></div>}
    </GlassCard>
)

const JourneyItem = ({ status, title, desc, date }: any) => {
    const isActive = status === 'active';
    const isCompleted = status === 'completed';

    return (
        <div className={`relative pl-10 pb-10 border-l ${isCompleted ? 'border-green-500' : isActive ? 'border-[#FF4D00]' : 'border-white/5'} last:pb-0`}>
            {/* Timeline Node */}
            <div className={`
                absolute -left-[9px] top-0 w-[18px] h-[18px] rounded-full border-4 border-[#030303] 
                ${isCompleted ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]' : isActive ? 'bg-[#FF4D00] shadow-[0_0_15px_rgba(255,77,0,0.6)]' : 'bg-gray-800'}
            `} />

            {isActive && (
                <div className="absolute -left-[29px] top-[-10px] w-[58px] h-[58px] border border-[#FF4D00]/20 rounded-full animate-ping opacity-20 pointer-events-none"></div>
            )}

            <div className={`flex justify-between items-start ${status === 'locked' ? 'opacity-30 blur-[0.5px]' : ''}`}>
                <div>
                    <h4 className={`font-bold text-lg ${isActive ? 'text-white' : 'text-gray-300'}`}>{title}</h4>
                    <p className="text-sm text-gray-500 font-light mt-1">{desc}</p>
                </div>
                <div className={`
                    text-[10px] font-bold font-mono px-2 py-1 rounded border
                    ${isActive ? 'bg-[#FF4D00]/10 border-[#FF4D00]/30 text-[#FF4D00]' : 'bg-white/5 border-white/5 text-gray-500'}
                `}>
                    {date}
                </div>
            </div>
        </div>
    )
}
