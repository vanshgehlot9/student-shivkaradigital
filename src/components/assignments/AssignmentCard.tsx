"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Clock, Calendar, AlertTriangle, ArrowRight, Crosshair, Shield, Activity as ActivityIcon, Scan } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export type AssignmentStatus = "active" | "completed" | "upcoming" | "overdue";
export type UrgencyLevel = "critical" | "high" | "normal" | "none";

interface AssignmentCardProps {
    title: string;
    subject: string;
    status: AssignmentStatus;
    deadline?: string;
    duration?: string;
    urgency?: UrgencyLevel;
    startsIn?: string;
    index?: number;
}

export function AssignmentCard({
    title,
    subject,
    status,
    deadline,
    duration,
    urgency = "normal",
    startsIn,
    index = 0
}: AssignmentCardProps) {
    // 3D Tilt Effect Logic
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
            const width = rect.width;
            const height = rect.height;
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            const xPct = mouseX / width - 0.5;
            const yPct = mouseY / height - 0.5;
            x.set(xPct);
            y.set(yPct);
        }
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Determine color theme based on status/urgency
    const getThemeColor = () => {
        if (status === 'overdue') return "text-red-500 border-red-500 shadow-red-500/20";
        if (urgency === 'critical') return "text-[#F24E1E] border-[#F24E1E] shadow-[#F24E1E]/20";
        if (status === "active") return "text-blue-400 border-blue-400 shadow-blue-500/20";
        if (status === "completed") return "text-emerald-400 border-emerald-400 shadow-emerald-500/20";
        return "text-amber-400 border-amber-400 shadow-amber-500/20"; // Upcoming
    };

    const themeClass = getThemeColor();
    const glowColor = themeClass.split(' ')[0].replace('text-', '');

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative h-full perspective-1000"
        >
            <div className="relative h-full bg-[#050505]/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden transition-all duration-300 group-hover:shadow-[0_0_50px_rgba(0,0,0,0.6)] group-hover:border-white/20">

                {/* 1. Holographic Scanner Effect (Sweeping Laser) */}
                <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[scan_1.5s_ease-in-out_infinite] z-50 pointer-events-none blur-[1px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[scan_1.5s_ease-in-out_infinite] z-40 pointer-events-none" />

                {/* 2. Dynamic Status Border (Pulsing) */}
                <div className={cn(
                    "absolute inset-0 border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none",
                    status === 'active' ? "border-blue-500 animate-pulse" :
                        urgency === 'critical' ? "border-[#F24E1E] animate-pulse" :
                            "border-white/20"
                )} />

                {/* 3. Tech Grid Background Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />

                <div className="relative p-6 flex flex-col h-full z-20" style={{ transform: "translateZ(20px)" }}>

                    {/* Header: Frequency Line & Status */}
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                                <Scan size={12} className="animate-spin-slow" />
                                <span>{subject}</span>
                            </div>
                            {/* Mini Frequency Bar decorative */}
                            <div className="flex gap-0.5 mt-1">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className={cn("w-1 h-2 rounded-sm",
                                        status === 'active' ? "bg-blue-500/50" :
                                            urgency === 'critical' ? "bg-[#F24E1E]/50" :
                                                "bg-zinc-700"
                                    )} style={{ height: ((index * i + title.length) % 8) + 4 }} />
                                ))}
                            </div>
                        </div>

                        {status === 'active' && (
                            <div className="px-2 py-1 rounded border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-wider animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                                Live Link
                            </div>
                        )}
                        {urgency === 'critical' && (
                            <div className="px-2 py-1 rounded border border-red-500/30 bg-red-500/10 text-red-500 text-[10px] font-bold uppercase tracking-wider animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                                Critical
                            </div>
                        )}
                    </div>

                    {/* Title & Info */}
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-white leading-tight mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all">
                            {title}
                        </h3>
                        <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                            <div className="flex items-center gap-1.5">
                                <Clock size={12} className={status === 'active' ? "text-blue-400" : ""} />
                                {duration || "N/A"}
                            </div>
                            <div className="w-px h-3 bg-white/10" />
                            <div className="flex items-center gap-1.5">
                                <Calendar size={12} />
                                {deadline || "N/A"}
                            </div>
                        </div>
                    </div>

                    {/* Footer: Action & Decor */}
                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                        <div className="text-[9px] text-zinc-600 font-mono">
                            ID: MSG-{(index * 137 + subject.length * 42) % 1000}
                        </div>

                        {status === 'active' || status === 'upcoming' ? (
                            <button className="relative overflow-hidden px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors group/btn">
                                <span className="relative z-10 flex items-center gap-2">
                                    {status === 'upcoming' ? 'View' : 'Start'}
                                    <ArrowRight size={12} className="transition-transform group-hover/btn:translate-x-1" />
                                </span>
                            </button>
                        ) : (
                            <button className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
                                Review
                            </button>
                        )}
                    </div>
                </div>

                {/* Bottom Frequency Scan Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
        </motion.div>
    );
}
