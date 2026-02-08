"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Users, Calendar, Clock, CheckCircle2, XCircle, AlertCircle, Loader2, Plus, Search, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import Link from "next/link";

interface AttendanceRecord {
    id: string;
    studentEmail: string;
    studentName?: string;
    date: Date;
    status: 'present' | 'absent' | 'late' | 'excused';
    sessionType: string;
    notes?: string;
}

export default function AdminAttendancePage() {
    const [studentEmail, setStudentEmail] = useState("");
    const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
    const [status, setStatus] = useState<'present' | 'absent' | 'late' | 'excused'>('present');
    const [sessionType, setSessionType] = useState("Bootcamp");
    const [notes, setNotes] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [recentRecords, setRecentRecords] = useState<AttendanceRecord[]>([]);
    const [loadingRecords, setLoadingRecords] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");

    // Fetch recent attendance records
    useEffect(() => {
        const fetchRecentRecords = async () => {
            try {
                const q = query(
                    collection(db, "attendance"),
                    orderBy("createdAt", "desc"),
                    limit(10)
                );
                const snapshot = await getDocs(q);
                const records: AttendanceRecord[] = snapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        studentEmail: data.studentEmail || "",
                        studentName: data.studentName,
                        date: data.date?.toDate() || new Date(),
                        status: data.status || 'present',
                        sessionType: data.sessionType || "Unknown",
                        notes: data.notes
                    };
                });
                setRecentRecords(records);
            } catch (error) {
                console.error("Error fetching recent records:", error);
            } finally {
                setLoadingRecords(false);
            }
        };

        fetchRecentRecords();
    }, [successMessage]); // Refetch when a new record is added

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!studentEmail.trim()) return;

        setIsSubmitting(true);
        setSuccessMessage("");

        try {
            await addDoc(collection(db, "attendance"), {
                studentEmail: studentEmail.trim().toLowerCase(),
                date: Timestamp.fromDate(new Date(date)),
                status,
                sessionType,
                notes: notes.trim() || null,
                createdAt: Timestamp.now()
            });

            setSuccessMessage(`Attendance recorded for ${studentEmail}`);
            setStudentEmail("");
            setNotes("");
            // Keep date and status for quick consecutive entries

        } catch (error) {
            console.error("Error recording attendance:", error);
            alert("Failed to record attendance. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const statusConfig = {
        present: { icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
        absent: { icon: XCircle, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30" },
        late: { icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" },
        excused: { icon: AlertCircle, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30" }
    };

    return (
        <div className="min-h-screen bg-[#000000] text-white p-8 font-sans">
            {/* Header */}
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <Link href="/dashboard" className="flex items-center gap-2 text-xs text-zinc-500 hover:text-white transition-colors mb-4">
                            <ArrowLeft size={14} />
                            Back to Dashboard
                        </Link>
                        <div className="flex items-center gap-2 text-xs font-mono text-[#F24E1E] uppercase tracking-widest mb-2">
                            <ShieldCheck size={14} />
                            Admin Panel
                        </div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter">
                            Attendance <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F24E1E] to-orange-400">Record</span>
                        </h1>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-[#F24E1E] flex items-center justify-center shadow-[0_0_30px_rgba(242,78,30,0.4)]">
                        <Users size={24} />
                    </div>
                </div>

                {/* Success Message */}
                {successMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-lg flex items-center gap-2"
                    >
                        <CheckCircle2 size={16} />
                        {successMessage}
                    </motion.div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-[#050505] border border-white/10 rounded-2xl p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Student Email */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Student Email</label>
                            <div className="relative">
                                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
                                <input
                                    type="email"
                                    value={studentEmail}
                                    onChange={(e) => setStudentEmail(e.target.value)}
                                    required
                                    placeholder="student@example.com"
                                    className="w-full h-12 pl-12 pr-4 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-[#F24E1E] transition-all"
                                />
                            </div>
                        </div>

                        {/* Date */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Date</label>
                            <div className="relative">
                                <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                    className="w-full h-12 pl-12 pr-4 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:border-[#F24E1E] transition-all"
                                />
                            </div>
                        </div>

                        {/* Session Type */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Session Type</label>
                            <select
                                value={sessionType}
                                onChange={(e) => setSessionType(e.target.value)}
                                className="w-full h-12 px-4 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:border-[#F24E1E] transition-all appearance-none cursor-pointer"
                            >
                                <option value="Bootcamp" className="bg-zinc-900">Bootcamp</option>
                                <option value="Regular Class" className="bg-zinc-900">Regular Class</option>
                                <option value="Workshop" className="bg-zinc-900">Workshop</option>
                                <option value="Mentorship" className="bg-zinc-900">Mentorship</option>
                            </select>
                        </div>

                        {/* Status */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Status</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {(Object.keys(statusConfig) as Array<keyof typeof statusConfig>).map((key) => {
                                    const config = statusConfig[key];
                                    const Icon = config.icon;
                                    const isSelected = status === key;
                                    return (
                                        <button
                                            key={key}
                                            type="button"
                                            onClick={() => setStatus(key)}
                                            className={cn(
                                                "h-12 rounded-lg border flex items-center justify-center gap-2 text-sm font-medium capitalize transition-all",
                                                isSelected
                                                    ? `${config.bg} ${config.border} ${config.color}`
                                                    : "bg-white/[0.02] border-white/10 text-zinc-500 hover:border-white/20"
                                            )}
                                        >
                                            <Icon size={16} />
                                            {key}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Notes (Optional)</label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Any additional notes..."
                                rows={3}
                                className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-[#F24E1E] transition-all resize-none"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting || !studentEmail.trim()}
                        className="w-full h-14 bg-[#F24E1E] hover:bg-[#D43D13] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(242,78,30,0.3)] hover:shadow-[0_0_30px_rgba(242,78,30,0.5)]"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="animate-spin" size={18} />
                                Recording...
                            </>
                        ) : (
                            <>
                                <Plus size={18} />
                                Record Attendance
                            </>
                        )}
                    </button>
                </form>

                {/* Recent Records */}
                <div className="space-y-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <Clock size={18} className="text-zinc-500" />
                        Recent Records
                    </h2>

                    {loadingRecords ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="animate-spin text-zinc-500" size={24} />
                        </div>
                    ) : recentRecords.length === 0 ? (
                        <div className="text-center py-12 text-zinc-600 text-sm">
                            No attendance records yet.
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {recentRecords.map((record) => {
                                const config = statusConfig[record.status];
                                const Icon = config.icon;
                                return (
                                    <div
                                        key={record.id}
                                        className="bg-[#050505] border border-white/10 rounded-lg p-4 flex items-center justify-between hover:border-white/20 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", config.bg, config.border, "border")}>
                                                <Icon size={18} className={config.color} />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-white">{record.studentEmail}</div>
                                                <div className="text-xs text-zinc-500">
                                                    {record.date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} • {record.sessionType}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cn("text-xs font-mono uppercase", config.color)}>
                                            {record.status}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
