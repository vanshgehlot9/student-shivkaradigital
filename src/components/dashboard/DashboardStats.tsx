"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { Target, Layers, CheckCircle, Clock, TrendingUp } from "lucide-react";

// Counter Component for animated numbers
function Counter({ value, suffix = "" }: { value: number, suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 });
    const isInView = useInView(ref, { once: true, margin: "-10px" });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Math.floor(latest).toString();
            }
        });
        return () => unsubscribe();
    }, [springValue]);

    return (
        <span className="flex items-baseline">
            <span ref={ref} className="tabular-nums font-black text-white tracking-tight">{0}</span>
            {suffix && <span className="text-[#F24E1E] ml-1">{suffix}</span>}
        </span>
    );
}

interface StatCardProps {
    label: string;
    value: number;
    suffix?: string;
    icon: React.ReactNode;
    trend?: string;
    color: string;
    delay?: number;
    accentGlow: string;
}

function StatCard({ label, value, suffix, icon, color, delay = 0, accentGlow }: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay, duration: 0.6, ease: "easeOut" }}
            className="group relative"
        >
            <div className={cn(
                "relative overflow-hidden rounded-2xl bg-[#050505]/60 backdrop-blur-xl border border-white/[0.08] p-4 md:p-6 transition-all duration-500",
                "hover:bg-white/[0.04] hover:border-white/[0.2] hover:scale-[1.03] hover:shadow-2xl"
            )}
                style={{
                    boxShadow: `0 0 0 1px rgba(255,255,255,0.02), 0 4px 20px rgba(0,0,0,0.5)`,
                }}
            >
                {/* Dynamic Glow Background */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at center, ${accentGlow}, transparent 70%)`
                    }}
                />

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-white/10 rounded-tl-2xl group-hover:border-white/30 transition-colors" />
                <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-white/10 rounded-tr-2xl group-hover:border-white/30 transition-colors" />

                {/* Holographic Top Border Highlight */}
                <div className={cn("absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500")} />

                <div className="flex items-start justify-between mb-4 md:mb-6 relative z-10">
                    <div className={cn("p-2 md:p-3 rounded-xl bg-white/5 text-white transition-all group-hover:scale-110 group-hover:rotate-[-5deg] ring-1 ring-white/10", color)}>
                        {icon}
                    </div>
                </div>

                <div className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-2 relative z-10 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                    <Counter value={value} suffix={suffix} />
                </div>

                <div className="h-px w-full bg-gradient-to-r from-white/10 via-white/20 to-transparent my-3 md:my-4 group-hover:via-white/40 transition-all duration-500" />

                <p className="text-[10px] md:text-sm font-bold text-zinc-400 uppercase tracking-widest group-hover:text-white transition-colors relative z-10 truncate">
                    {label}
                </p>
            </div>
        </motion.div>
    );
}

import { DashboardService } from "@/services/dashboard";
import { useAuth } from "@/context/AuthContext";

export function DashboardStats() {
    // Determine 2 columns for mobile, 4 for desktop (lg)
    const [stats, setStats] = React.useState({
        assigned: 0,
        active: 0,
        completed: 0,
        modules: 0
    });
    const { user } = useAuth();

    useEffect(() => {
        const fetchStats = async () => {
            if (!user) return;
            const data = await DashboardService.getStats(user.uid);
            setStats(data);
        };

        if (user) {
            fetchStats();
        }
    }, [user]);

    return (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            <StatCard
                label="Tests Assigned"
                value={stats.assigned}
                icon={<Target size={20} className="md:w-6 md:h-6" />}
                color="text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                delay={0}
                accentGlow="rgba(59, 130, 246, 0.4)"
            />
            <StatCard
                label="Active Tests"
                value={stats.active}
                icon={<Clock size={20} className="md:w-6 md:h-6" />}
                color="text-[#F24E1E] shadow-[0_0_15px_rgba(242,78,30,0.3)]"
                delay={0.1}
                accentGlow="rgba(242, 78, 30, 0.4)"
            />
            <StatCard
                label="Completed"
                value={stats.completed}
                icon={<CheckCircle size={20} className="md:w-6 md:h-6" />}
                color="text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)]"
                delay={0.2}
                accentGlow="rgba(52, 211, 153, 0.4)"
            />
            <StatCard
                label="Modules"
                value={stats.modules}
                suffix="+"
                icon={<Layers size={20} className="md:w-6 md:h-6" />}
                color="text-purple-400 shadow-[0_0_15px_rgba(167,139,250,0.3)]"
                delay={0.3}
                accentGlow="rgba(167, 139, 250, 0.4)"
            />
        </div>
    );
}
