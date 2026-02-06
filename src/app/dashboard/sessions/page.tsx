"use client";

import React, { useState, useEffect } from "react";
import { Video, Calendar, Clock, Lock, Users, Radio } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, getDocs, orderBy, limit, where } from "firebase/firestore";

interface Session {
    id: string;
    title: string;
    description: string;
    startTime: Date;
    endTime: Date;
    meetLink: string;
    status: 'live' | 'scheduled' | 'completed';
}

export default function SessionsPage() {
    const [timeLeft, setTimeLeft] = useState<string>("");
    const [activeSession, setActiveSession] = useState<Session | null>(null);
    const [upcomingSessions, setUpcomingSessions] = useState<Session[]>([]);

    // Countdown Logic
    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setTimeLeft(now.toLocaleTimeString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Fetch Sessions
    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const now = new Date();

                // Fetch all upcoming sessions
                const sessionsQuery = query(
                    collection(db, "sessions"),
                    orderBy("startTime", "asc"),
                    limit(4)
                );
                const snapshot = await getDocs(sessionsQuery);

                const sessions: Session[] = snapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        title: data.title,
                        description: data.description,
                        startTime: data.startTime?.toDate(),
                        endTime: data.endTime?.toDate(),
                        meetLink: data.meetLink,
                        status: data.status
                    };
                });

                // Find active/live session
                const live = sessions.find(s => s.status === 'live');
                if (live) {
                    setActiveSession(live);
                    setUpcomingSessions(sessions.filter(s => s.id !== live.id));
                } else {
                    setActiveSession(sessions[0] || null);
                    setUpcomingSessions(sessions.slice(1));
                }
            } catch (error) {
                console.error("Error fetching sessions:", error);
            }
        };

        fetchSessions();
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-24">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-6">
                <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#F24E1E] uppercase tracking-widest animate-pulse mb-2">
                        <Radio size={14} />
                        Live Transmissions
                    </div>
                    <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Mission Briefings</h1>
                </div>
                <div className="font-mono text-zinc-500 text-sm">
                    SYS_TIME: <span className="text-white">{timeLeft}</span>
                </div>
            </div>

            {/* Active Session (Hero) */}
            {activeSession ? (
                <div className="relative group overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A]">
                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />
                    <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbm95bDN5YnJ2ZDJ4YTNzMmxxeG55YnJ2ZDJ4YTNzMmxxeG55YnJ2ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L1R1TVThqceK6M8M8z/giphy.gif')] opacity-20 bg-cover bg-center mix-blend-overlay" />

                    <div className="relative p-8 md:p-12 flex flex-col items-center text-center z-10">

                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${activeSession.status === 'live' ? 'bg-red-500/10 border-red-500/20 text-red-500 animate-pulse' : 'bg-blue-500/10 border-blue-500/20 text-blue-500'} border text-xs font-bold uppercase tracking-widest mb-6`}>
                            {activeSession.status === 'live' && (
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                </span>
                            )}
                            {activeSession.status === 'live' ? 'Live Session Active' : 'Next Session'}
                        </div>

                        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
                            {activeSession.title}
                        </h2>

                        <p className="text-zinc-400 max-w-2xl mb-8 text-lg">
                            {activeSession.description || "Join for an interactive learning experience."}
                        </p>

                        <a
                            href={activeSession.meetLink || "https://meet.google.com/new"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/btn relative inline-flex items-center gap-3 px-8 py-4 bg-[#F24E1E] text-white font-bold uppercase tracking-widest rounded hover:bg-[#d43d10] transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(242,78,30,0.5)]"
                        >
                            <Video size={20} />
                            Join Live Class
                            <div className="absolute inset-x-0 h-[1px] bottom-0 bg-white/20 group-hover/btn:animate-[scan_1s_ease-in-out_infinite]" />
                        </a>

                        <div className="flex items-center gap-6 mt-8 text-xs font-mono text-zinc-500">
                            <div className="flex items-center gap-2">
                                <Clock size={14} />
                                {activeSession.startTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {activeSession.endTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl">
                    <p className="text-zinc-500 font-mono">No active sessions</p>
                </div>
            )}

            {/* Upcoming Sessions Grid */}
            <div>
                <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Upcoming Transmissions</h3>

                {upcomingSessions.length === 0 ? (
                    <div className="text-center py-8 text-zinc-500 font-mono">
                        No upcoming sessions scheduled
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {upcomingSessions.map((session) => (
                            <div key={session.id} className="p-6 rounded-xl border border-white/10 bg-[#0A0A0A] hover:border-white/20 transition-all group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 rounded bg-zinc-900 text-zinc-400">
                                        <Calendar size={18} />
                                    </div>
                                    <div className="px-2 py-1 rounded bg-zinc-900 border border-white/5 text-[10px] font-mono text-zinc-500 uppercase">
                                        Scheduled
                                    </div>
                                </div>

                                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                    {session.title}
                                </h4>
                                <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 mb-6">
                                    <span>{session.startTime?.toLocaleDateString()}</span>
                                    <span>{session.startTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>

                                <button className="w-full py-3 border border-dashed border-zinc-700 text-zinc-500 text-xs font-mono uppercase hover:text-white hover:border-zinc-500 transition-colors flex items-center justify-center gap-2 cursor-not-allowed">
                                    <Lock size={12} />
                                    Link Encrypted
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}

