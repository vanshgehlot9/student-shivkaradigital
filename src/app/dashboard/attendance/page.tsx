"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardService } from "@/services/dashboard";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp, query, where, getDocs, limit } from "firebase/firestore";

import { AttendanceCalendar, AttendanceDay } from "@/components/attendance/AttendanceCalendar";

// --- Components ---

const ProgressRing = ({ percentage }: { percentage: number }) => {
    const circumference = 2 * Math.PI * 120; // Radius 120
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Rotating Outer Ring */}
            <div className="absolute inset-0 rounded-full border border-dashed border-white/10 animate-spin-slow duration-[20s]" />
            <div className="absolute inset-4 rounded-full border border-white/5 opacity-50" />

            {/* Pulsing Glow Background */}
            <div className="absolute inset-0 bg-emerald-500/5 blur-3xl rounded-full animate-pulse" />

            {/* SVG Ring */}
            <svg className="w-full h-full transform -rotate-90">
                {/* Background Circle */}
                <circle
                    cx="50%"
                    cy="50%"
                    r="120"
                    stroke="#1a1a1a"
                    strokeWidth="12"
                    fill="transparent"
                />
                {/* Progress Circle */}
                <motion.circle
                    cx="50%"
                    cy="50%"
                    r="120"
                    stroke="#10B981"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                    className="filter drop-shadow-[0_0_15px_rgba(16,185,129,0.8)]"
                />
            </svg>

            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-5xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                >
                    {percentage}%
                </motion.div>
                <div className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest mt-2 animate-pulse">
                    Optimal
                </div>
            </div>
        </div>
    );
};

export default function AttendancePage() {
    const [stats, setStats] = useState({
        present: 0,
        absent: 0,
        late: 0,
        total: 0,
        percentage: 0
    });

    const [attendanceData, setAttendanceData] = useState<AttendanceDay[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchAttendanceHistory = async () => {
            if (!user) return;
            try {
                const userId = user.uid;
                const stats = await DashboardService.getAttendanceHistory(userId);

                if (stats.length > 0) {
                    setAttendanceData(stats.map((s: any) => ({
                        date: s.date instanceof Date ? s.date : s.date.toDate(), // Handle Firestore Timestamp
                        status: s.status as 'present' | 'absent' | 'late'
                    })));
                }
            } catch (error) {
                console.error("Error fetching attendance history:", error);
            }
        };

        if (user) {
            fetchAttendanceHistory();
        }
    }, [user]);

    // Auto-Seed Logic for यशवीर (Yashveer)
    useEffect(() => {
        const autoSeed = async () => {
            if (!user) return;

            // Identify Target User (Case Insensitive)
            const name = user.displayName?.toLowerCase() || "";
            const email = user.email?.toLowerCase() || "";

            if (!name.includes("yashveer") && !email.includes("yashveer")) {
                return;
            }

            try {
                // Check if already seeded to prevent infinite reloads or dupes
                const q = query(
                    collection(db, "attendance"),
                    where("studentId", "==", user.uid),
                    limit(1)
                );

                // We use getDocs slightly differently here to ensure we don't spam.
                // If the user has ANY attendance records, we assume valid state and do NOT seed.
                // This prevents re-seeding if they already have data.
                const snapshot = await getDocs(q);

                if (!snapshot.empty) {
                    console.log("Attendance record exists. Skipping auto-seed.");
                    return;
                }

                console.log("Seeding attendance for Yashveer...");

                // Specific Data Requested
                const records = [
                    { date: "2025-12-01T10:00:00", status: "late" },
                    { date: "2025-12-02T09:00:00", status: "present" },
                    { date: "2025-12-03T09:00:00", status: "present" },
                    { date: "2025-12-04T09:00:00", status: "present" },
                    { date: "2025-12-05T10:15:00", status: "late" },
                    { date: "2025-12-06T09:00:00", status: "present" },
                    { date: "2025-12-07T09:00:00", status: "present" },
                    { date: "2025-12-08T09:00:00", status: "present" },
                ];

                const collectionRef = collection(db, "attendance");
                const batchPromises = records.map(r =>
                    addDoc(collectionRef, {
                        studentId: user.uid,
                        studentEmail: user.email,
                        studentName: user.displayName || "Yashveer Tak",
                        date: Timestamp.fromDate(new Date(r.date)),
                        status: r.status,
                        createdAt: Timestamp.now()
                    })
                );

                await Promise.all(batchPromises);

                // Reload to reflect changes
                window.location.reload();

            } catch (error) {
                console.error("Auto-seed error:", error);
            }
        }

        if (user) {
            autoSeed();
        }
    }, [user]);

    useEffect(() => {
        const fetchStats = async () => {
            if (!user) return;
            try {
                const userId = user.uid;
                const data = await DashboardService.getAttendanceStats(userId);
                setStats(data);
            } catch (error) {
                console.error("Error fetching attendance stats:", error);
            }
        };

        if (user) {
            fetchStats();
        }
    }, [user]);

    return (
        <div className="space-y-12 animate-in fade-in duration-700 pb-24 min-h-screen">

            {/* Hero Header */}
            <div className="relative">
                {/* Decorative HUD Lines */}
                <div className="absolute -left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />

                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

                    {/* 3D Ring Visualization */}
                    <div className="relative group cursor-pointer">
                        <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
                        <ProgressRing percentage={stats.percentage} />
                    </div>

                    {/* Text & Quick Stats */}
                    <div className="flex-1 space-y-8 w-full">
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-2 text-xs font-mono text-emerald-500 uppercase tracking-widest mb-2">
                                    <ShieldCheck size={14} className="animate-pulse" />
                                    System Status: Operational
                                </div>
                                <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none relative">
                                    Attendance<br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 filter drop-shadow-[0_0_20px_rgba(52,211,153,0.3)]">
                                        Logbook
                                    </span>
                                </h1>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: "Present", value: String(stats.present).padStart(2, '0'), color: "text-emerald-400", border: "border-emerald-500/20", glow: "group-hover:shadow-[0_0_30px_rgba(52,211,153,0.2)]" },
                                { label: "Absent", value: String(stats.absent).padStart(2, '0'), color: "text-[#F24E1E]", border: "border-red-500/30", glow: "group-hover:shadow-[0_0_30px_rgba(242,78,30,0.3)] animate-pulse" },
                                { label: "Late", value: String(stats.late).padStart(2, '0'), color: "text-amber-400", border: "border-amber-500/20", glow: "group-hover:shadow-[0_0_30px_rgba(251,191,36,0.2)]" },
                                { label: "Total", value: String(stats.total).padStart(2, '0'), color: "text-blue-400", border: "border-blue-500/20", glow: "group-hover:shadow-[0_0_30px_rgba(96,165,250,0.2)]" }
                            ].map((stat, i) => (
                                <div key={i} className={cn(
                                    "bg-[#050505] border p-5 rounded-lg relative overflow-hidden group transition-all duration-300",
                                    stat.border,
                                    stat.glow
                                )}>
                                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">{stat.label}</div>
                                    <div className={cn("text-3xl font-black", stat.color)}>{stat.value}</div>

                                    {/* Decorative Corner */}
                                    <div className={cn("absolute top-0 right-0 w-8 h-8 border-t border-r opacity-20 group-hover:opacity-100 transition-opacity", stat.color.replace('text-', 'border-'))} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid - Full Width Calendar */}
            <div className="bg-[#050505]/50 border border-white/10 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden group hover:border-white/20 transition-colors">

                {/* Background Grid Decoration */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none" />

                <AttendanceCalendar attendanceData={attendanceData} />
            </div>

        </div>
    );
}
