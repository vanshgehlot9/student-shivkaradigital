"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { BookOpen, Clock, AlertCircle, CheckCircle, PlayCircle, Lock } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export type CourseLevel = "beginner" | "intermediate" | "advanced";

interface CourseCardProps {
    title: string;
    tech: string;
    level: CourseLevel;
    lessons: number;
    assessments: number;
    endDate?: string;
    status: "invited" | "in_progress" | "completed" | "expired";
    gifUrl?: string;
    index?: number;
    onClick: () => void;
}

const LevelBadge = ({ level }: { level: CourseLevel }) => {
    const colors = {
        beginner: "bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-[0_0_10px_rgba(52,211,153,0.3)]",
        intermediate: "bg-blue-500/20 text-blue-400 border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.3)]",
        advanced: "bg-purple-500/20 text-purple-400 border-purple-500/50 shadow-[0_0_10px_rgba(168,85,247,0.3)]"
    };

    return (
        <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md", colors[level])}>
            {level}
        </span>
    );
};

export function CourseCard({ title, tech, level, lessons, assessments, endDate, status, gifUrl, index = 0, onClick }: CourseCardProps) {
    // 3D Tilt Effect
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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
            onClick={onClick}
            className="group relative h-[400px] perspective-1000 cursor-pointer"
        >
            <div className="relative h-full w-full bg-[#050505] rounded-xl overflow-hidden border border-white/10 transition-all duration-300 group-hover:border-white/30 group-hover:shadow-[0_0_40px_rgba(0,0,0,0.8)]">

                {/* 1. Animated GIF Background Layer */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-10" />
                    {/* Fallback gradient if GIF fails or isn't provided, actually just show image */}
                    {gifUrl && (
                        <img
                            src={gifUrl}
                            alt="Course Preview"
                            className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500 scale-105 group-hover:scale-110"
                        />
                    )}
                    {!gifUrl && (
                        <div className="w-full h-full bg-zinc-900" />
                    )}
                </div>

                {/* 2. Holographic Overlay Effects */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                    {/* Scanlines */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-20" />

                    {/* Corner Reticles */}
                    <div className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 border-white/30 rounded-tl" />
                    <div className="absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 border-white/30 rounded-tr" />
                    <div className="absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2 border-white/30 rounded-bl" />
                    <div className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 border-white/30 rounded-br" />
                </div>

                {/* 3. Content Layover */}
                <div className="absolute inset-0 z-30 p-6 flex flex-col justify-end" style={{ transform: "translateZ(30px)" }}>

                    {/* Floating Level Badge (Top Right) */}
                    <div className="absolute top-6 right-6">
                        <LevelBadge level={level} />
                    </div>

                    {/* Tech Spec Label */}
                    <div className="mb-2">
                        <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-white/10 border border-white/10 backdrop-blur-md">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#F24E1E] animate-pulse" />
                            <span className="text-[10px] font-mono uppercase tracking-widest text-white/90 font-bold">
                                {tech} Protocol
                            </span>
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-black text-white leading-tight mb-4 drop-shadow-md group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400">
                        {title}
                    </h3>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-2 mb-6 text-xs font-mono text-zinc-400 bg-black/40 p-2 rounded border border-white/5 backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                            <BookOpen size={12} className="text-blue-400" />
                            <span>{lessons} Modules</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle size={12} className="text-emerald-400" />
                            <span>{assessments} Tests</span>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex items-center gap-3">
                        {status === 'invited' ? (
                            <button className="flex-1 bg-white text-black py-3 rounded font-bold uppercase tracking-widest text-xs hover:bg-[#F24E1E] hover:text-white transition-all flex items-center justify-center gap-2">
                                <PlayCircle size={14} />
                                Initialize
                            </button>
                        ) : status === 'expired' ? (
                            <button className="flex-1 bg-white/5 text-zinc-500 py-3 rounded font-bold uppercase tracking-widest text-xs border border-white/10 cursor-not-allowed flex items-center justify-center gap-2">
                                <Lock size={14} />
                                Locked
                            </button>
                        ) : (
                            <button className="flex-1 bg-[#F24E1E] text-white py-3 rounded font-bold uppercase tracking-widest text-xs hover:bg-[#F24E1E]/80 transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(242,78,30,0.4)]">
                                <PlayCircle size={14} />
                                Resume
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
